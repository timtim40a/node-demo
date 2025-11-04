import { db } from '../db/db.js'

export const patchBlogpostRoute = (req, res) => {
    const id = parseInt(req.params.id)

    try {
        const { title, summary, text } = req.body
        if (!title && !summary && !text) {
            res.status(422).json({
                status: '422',
                message: `no fields to update`,
            })
        }

        const fields = []
        const values = []

        if (title) {
            fields.push('title = ?')
            values.push(title)
        }
        if (summary) {
            fields.push('summary = ?')
            values.push(summary)
        }
        if (text) {
            fields.push('text = ?')
            values.push(text)
        }

        const sql = `UPDATE blogposts SET ${fields.join(', ')} WHERE id = ?`
        values.push(id)

        console.log('SQL:', sql)
        console.log('Values:', values)

        db.query(sql, values, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: '500',
                    message:
                        'there is a problem loading the database X( ' +
                        err.cause,
                })
            }
            if (results.affectedRows === 0) {
                res.status(404).json({
                    status: '404',
                    message: `There is no blogpost with id ${id} o_0`,
                })
            }
            res.status(201).json({
                status: 201,
                message: `blogpost with id:${id} has been successfully updated`,
            })
        })
    } catch (err) {
        res.status(422).json({
            status: '422',
            message: `no fields to update ` + err,
        })
    }
}
