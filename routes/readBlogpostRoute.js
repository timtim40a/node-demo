import { db } from '../db/db.js'

export const readBlogpostRoute = (req, res) => {
    const blogpostId = parseInt(req.params.id)

    const sql = `
        SELECT b.*, 
        JSON_ARRAYAGG(
            JSON_OBJECT(
                'id', a.id,
                'name', a.name,
                'surname', a.surname,
                'email', a.email
            )
        ) AS authors 
        FROM blogposts AS b 
        JOIN blogposts_authors as j 
            ON b.id = j.blogpost_id 
        JOIN authors AS a 
            ON j.author_id = a.id 
        WHERE b.id = ? 
        GROUP BY b.id`

    db.query(sql, [blogpostId], (err, results) => {
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'there is a problem loading the database X(',
            })
        }

        if (results.length === 0) {
            res.status(404).json({
                status: '404',
                message: 'not found :?',
            })
        }

        const blogpost = results[0]
        try {
            blogpost.authors = JSON.parse(blogpost.authors)
        } catch {
            // if MySQL already returns as object, skip
        }

        res.status(200).json(results)
    })
}
