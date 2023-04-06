// const { Pool } = require('pg');

// const pool = new Pool({
//     host: "localhost",
//     port: 5432,
//     user: "postgres",
//     password: "Kitanda8841",
//     database: "dindin"
// });

// module.exports = pool

const knex = require('knex')({
    client: process.env.DB_CLIENT,
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USE,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE
    }
});

module.exports = knex


