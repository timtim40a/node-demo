import express from 'express'
import fs from 'node:fs/promises'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = process.env.PORT || 3000

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

app.get('/secret3', async (req, res) => {
    const newName = req.query.name
    const newSurname = req.query.surname
    const newEntry = `{${newName}:"${newSurname}"}\n`
    try {
        await fs.writeFile(
            './secret/secret-data.json',
            newEntry,
            { flag: 'a+' },
            (err) => {}
        )
    } catch (err) {}
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
