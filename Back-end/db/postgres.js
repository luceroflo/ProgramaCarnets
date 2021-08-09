const { Pool } = require('pg')

const pool = new Pool({
    host: '192.168.43.9',
    user: 'postgres',
    database: "carnet_simon",
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