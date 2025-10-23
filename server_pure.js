import http from 'http'

let body = ''
// Create a local HTTP server
const server = http.createServer((req, res) => {
    if (req.method == 'POST') {
        req.on('data', (chunk) => (body += chunk))
        req.on('end', () => {
            console.log('Received:', body)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ received: JSON.parse(body) }))
        })
    } else if (req.method == 'GET') {
        res.end(`<b>${JSON.stringify(body)}<b>`)
    }
})

server.listen(4000, () =>
    console.log('Server running on http://localhost:4000')
)

// Now send a POST request to that server
const data = JSON.stringify({
    woodpecker: 'peckish',
})

const secret = JSON.stringify({
    joker: 'rocket',
    page: 2,
})

const options = {
    hostname: 'localhost',
    port: 4000,
    path: '/',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(secret),
    },
}

const req = http.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`)

    res.on('data', (d) => {
        process.stdout.write(d)
    })
})

req.on('error', (error) => {
    console.error(error)
})

req.write(secret)
req.end()
