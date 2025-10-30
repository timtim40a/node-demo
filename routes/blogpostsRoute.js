import { db } from '../db/db.js'

export const blogpostsRoute = (req, res) => {
    db.query('SELECT * FROM blogposts', (err, results) => {
        if (err) {
            res.status(500).json({
                status: '500',
                message: 'there is a problem loading the database X(',
            })
        }
        res.status(200).json(results)
    })
}
