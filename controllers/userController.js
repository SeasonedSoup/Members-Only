const db = require('../db/query')

function getSignUp(req, res) {
    res.render("sign-up");
}

async function postSignUp(req, res) {
    const userInfo = req.body;

    await db.addUsername(userInfo.username, userInfo.firstName, userInfo.lastName, userInfo.password)
    res.redirect('/');
}

module.exports = {
    getSignUp,
    postSignUp
};