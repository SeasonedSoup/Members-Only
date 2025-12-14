const pool = require('./pool');
const bcrypt = require("bcryptjs");

async function addUsername(username, firstName, lastName, password) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        await pool.query(
        'INSERT INTO usernames (username, firstName, lastName, password) VALUES($1, $2, $3, $4)', 
        [username, firstName, lastName, hashedPassword]);
    } catch (err) {
        return err;
    }
}

async function giveMembership(username) {
    try {
        await pool.query (`UPDATE usernames SET ismember = true WHERE username = ($1)`, [username]);
    } catch (err) {
        return err;
    }
}

async function createMessage(topic, message, userId) {
    try {
        await pool.query(`INSERT INTO messages (topic, message, username_id) VALUES($1, $2, $3, $4)`, [topic, message, userId])
    } catch (err) {
        return err;
    }
}

module.exports = {
    addUsername,
    giveMembership,
    createMessage
}