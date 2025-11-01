import { db } from '../db/db.js'

export const blogpostsRoute = (req, res) => {
    db.query('SELECT b.*, GROUP_CONCAT(CONCAT(a.name, " ", a.surname) SEPARATOR ", ") AS authors FROM blogposts AS b JOIN blogposts_authors as j ON b.id = j.blogpost_id JOIN authors AS a ON j.author_id = a.id GROUP BY b.id', (err, results) => {
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'there is a problem loading the database X(',
            })
        }
        res.status(200).json(results)
    })
}
