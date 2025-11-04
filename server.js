import express from 'express'
import fs from 'node:fs/promises'
import dotenv from 'dotenv'

import { jsonParser, urlencoder } from './middleware/expressJson.js'
import { corsUse } from './middleware/corsSetup.js'
import { blogpostsRoute } from './routes/blogpostsRoute.js'
import { writeBlogpostRoute } from './routes/writeBlogpostRoute.js'
import { readBlogpostRoute } from './routes/readBlogpostRoute.js'
import { patchBlogpostRoute } from './routes/patchBlogpostRoute.js'
import { swaggerSetup, swaggerServe } from './middleware/swaggerSetup.js'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(jsonParser)
app.use(corsUse)
app.use(urlencoder)
app.use('/api-docs', swaggerServe, swaggerSetup)

app.get('/test', (req, res) => {
    res.status(200).json({ lorem: 'ipsum' })
})

app.get('/blogposts', blogpostsRoute)

app.get('/blogposts/:id', readBlogpostRoute)

app.get('/blogposts/api', async (req, res) => {
    try {
        const html = await fs.readFile('./api/api.html', {
            encoding: 'utf-8',
        })
        res.send(html)
    } catch (err) {
        res.status(500).send(`something went wrong with the html? ${err}`)
    }
})

app.post('/blogposts', writeBlogpostRoute)

app.patch('/blogposts/:id', patchBlogpostRoute)

app.use((req, res) => {
    res.status(404).json({ status: '404', message: 'there is nothing here :(' })
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
