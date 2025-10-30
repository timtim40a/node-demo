import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

// create a new MySQL connection
const connection = mysql.createConnection({
    host: process.env.DATABASE_HOSTNAME,
    user: 'root',
    password: process.env.DATABASE_PW,
    database: process.env.DATABASE_NAME,
})
// connect to the MySQL database
connection.connect((error) => {
    if (error) {
        console.error('Error connecting to MySQL database:', error)
    } else {
        console.log('Connected to MySQL database!')
    }
})

export { connection as db }
