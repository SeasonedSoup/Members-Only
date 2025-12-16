const pool = require('./pool');
const bcrypt = require("bcryptjs");


class UserTbl {
    async addUsername(username, firstName, lastName, password) {
        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            await pool.query(
            'INSERT INTO usernames (username, firstName, lastName, password) VALUES($1, $2, $3, $4)', 
            [username, firstName, lastName, hashedPassword]);
        } catch (err) {
            return err;
        }
    }

    async giveMembership(username) {
        try {
            await pool.query (`UPDATE usernames SET ismember = true WHERE username = ($1)`, [username]);
        } catch (err) {
            return err;
        }
    }

    async giveAdmin(username) {
        try {
            await pool.query (`UPDATE usernames SET isadmin = true WHERE username = ($1)`, [username]);
        } catch (err) {
            return err;
        }
    }
}

class MessageTbl {
    async createMessage(topic, message, userId) {
        try {
            await pool.query(`INSERT INTO messages (topic, message, username_id) VALUES($1, $2, $3)`, [topic, message, userId]);       
        } catch (err) {
            return err;
        }
    }

    async getAllMessages() {
        try {
            const {rows} = await pool.query(`SELECT messages.id AS message_id, topic, message, created_at FROM messages JOIN usernames ON usernames.id = messages.username_id`);
            console.log(rows);
            return rows;
        } catch (err) {
            return err;
        }
    }
 
    async deleteMessage(messageId) {
        await pool.query(`DELETE FROM messages WHERE id = ($1)`, [messageId]);
    }
}
module.exports = {
    UserTbl,
    MessageTbl
}