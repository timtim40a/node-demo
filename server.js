import express from 'express'
import fs from 'node:fs/promises'

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello from Express')
})

app.use(express.static('public'))

app.get('/secret', async (req, res, next) => {
    try {
        const data = await fs.readFile('./secret/secret-data.json', {
            encoding: 'utf-8',
        })
        console.log(JSON.stringify(data))
        res.json(JSON.parse(data))
    } catch (err) {
        res.status(500).send(`something broke? ${err}`)
        next(err)
    }
})

// app.get('/public/data.json', (req, res) => {
//     console.log(res)

//     res.sendFile()
// })

app.get('/secret2', async (req, res) => {
    try {
        const html = await fs.readFile('./secret/secret-html.html', {
            encoding: 'utf-8',
        })
        console.log(html)
        res.send(html)
    } catch (err) {
        res.status(500).send(`something went wrong? ${err}`)
    }
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
