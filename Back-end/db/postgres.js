const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    database: "carnet",
    password: "aguacate",
    port: 5432,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}