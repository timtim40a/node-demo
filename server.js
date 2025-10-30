import express from 'express'
import fs from 'node:fs/promises'
import dotenv from 'dotenv'
import { jsonParser } from './middleware/expressJson.js'
import { corsUse } from './middleware/corsSetup.js'
import { blogpostsRoute } from './routes/blogpostsRoute.js'
dotenv.config()

const app = express()

const port = process.env.PORT || 3000

app.use(jsonParser)
app.use(corsUse)

app.get('/test', (req, res) => {
    res.status(200).json({ lorem: 'ipsum' })
})

app.get('/blogposts', blogpostsRoute)

app.use((req, res) => {
    res.status(404).json({ status: '404', message: 'there is nothing here :(' })
})

app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`)
})
