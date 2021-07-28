const { Pool } = require('pg')

const pool = new Pool({
    host: 'localhost',
    user: 'admin',
    database: "tesis",
    password: "secret",
    port: 5433,
    max: 5,
    idleTimeoutMillis: 5000,
    connectionTimeoutMillis: 2000
})

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}