const {Pool} = require("pg");

require('dotenv').config();

module.exports = new Pool({
    host: "localhost",
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: member,
    port: 3000
});