
const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "hospitalmanagement",
    password: process.env.DB_PASSWORD,
    port: 5432
})

module.exports = pool;