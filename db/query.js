const pool = require('./pool');
const bcrypt = require("bcryptjs");

async function addUsername(username, firstName, lastName, password) {
    try {
        const hashedPassword = bcrypt.hash(password, 10)
        await pool.query(
        'INSERT INTO usernames (username, firstName, lastName, password) VALUES($1, $2, $3, $4)', 
        [username, firstName, lastName, hashedPassword]);
    } catch (err) {

    }
}

module.exports = {
    addUsername
}