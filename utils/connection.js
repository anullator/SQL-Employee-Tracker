const { Pool } = require('pg');

// database connection
const pool = new Pool(
    {
        // PostgreSQL username
        user: 'postgres',
        // PostgreSQL password
        password: 'bootcamppass3',
        host: 'localhost',
        database: 'employee_db',
    },
    console.log(`Connected to the employee_db database.`)
)

module.exports = { pool };