import { db } from '../db/db.js'

export const readBlogpostRoute = (req, res) => {
    const blogpostId = parseInt(req.params.id)
    db.query(
        `SELECT * FROM blogposts AS b WHERE b.id = ${blogpostId}`,
        (err, results) => {
            if (err) {
                res.status(500).json({
                    status: '500',
                    message: 'there is a problem loading the database X(',
                })
            }
            res.status(200).json(results)
        }
    )
}
