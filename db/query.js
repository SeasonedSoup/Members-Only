const pool = require('./pool');

async function addUsername(username, firstName, lastName, hash) {
    await pool.query(
        'INSERT INTO usernames (username, firstName, lastName, password) VALUES($1, $2, $3, $4)', 
        [
            username,
            firstName,
            lastName,
            hash
        ]);
}

module.exports = {
    addUsername
}