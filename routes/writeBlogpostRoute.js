import { db } from '../db/db.js'

export const writeBlogpostRoute = (req, res) => {
    const title = req.body.title || undefined
    const summary = req.body.summary || undefined
    const text = req.body.text || undefined
    if (!title || !text) {
        res.status(422).json({
            status: '422',
            message: `there are some missing fields: ${
                title ? 'text' : 'title'
            })`,
        })
    } else {
        db.query(
            `INSERT INTO blogposts (title, summary, text, date_posted) VALUES (?,?,?,NOW())`,
            [title, summary, text],
            (err, results) => {
                if (err) {
                    res.status(500).json({
                        status: '500',
                        message: 'there is a problem loading the database X(',
                    })
                }
                res.status(201).json({
                    status: 201,
                    message: 'blogpost has been successfully created',
                })
            }
        )
    }
}
