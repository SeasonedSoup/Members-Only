const db = require('../db/query')
const {body, validationResult, matchedData} = require("express-validator");

const emptyErr = "must not be empty";

const validateUser = [
    body("firstName", `First Name ${emptyErr}`)
    .trim().notEmpty(),
    body("lastName", `Last Name ${emptyErr}`).
    trim().notEmpty()
]

function getSignUp(req, res) {
    res.render("sign-up");
}

async function postSignUp(req, res, next) {
    try {
         const userInfo = req.body;

        await db.addUsername(userInfo.username, userInfo.firstName, userInfo.lastName, userInfo.password)
        res.redirect('/');
    } catch(err) {
        return next(err);
    }
}



module.exports = {
    getSignUp,
    postSignUp,
};