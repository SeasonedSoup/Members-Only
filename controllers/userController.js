const db = require('../db/query')
const {body, validationResult, matchedData} = require("express-validator");

const emptyErr = "must not be empty";

const validateUser = [
    body("firstName", `First Name ${emptyErr}`)
    .trim().notEmpty(),
    body("lastName", `Last Name ${emptyErr}`)
    .trim().notEmpty(),
    body("username", `Username (email*) ${emptyErr}`)
    .trim().notEmpty().isEmail().withMessage("Must be an email"),
    body("password", `password ${emptyErr}`).trim().notEmpty()
    .isLength({min: 8}).withMessage(`password must be atleast 8 characters`),
    body("confirmPassword")
    .notEmpty().withMessage("Confirmation of password is required")
    .bail()
    .custom((value, {req}) => value === req.body.password).withMessage("Passwords do not match")
]

function getSignUp(req, res) {
    res.render("sign-up");
}

const postSignUp = [validateUser, 
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            console.log(errors);
            return;
        }

        try {
            const userInfo = req.body;

            await db.addUsername(userInfo.username, userInfo.firstName, userInfo.lastName, userInfo.password)
            res.redirect('/');
        } catch(err) {
        return next(err);
        }
    }
]

function getMembershipPage(req, res) {
    res.render("membership");
}

async function postAttemptMembership(req, res) {
    const username = res.locals.currentUser
    if (!username) {
        res.status(401).send(`You are not yet validated as a user`);
    }

    const {secret} = req.body;
    if (secret === 'ducky') {
        await db.giveMembership(username)
        res.redirect('/')
    } else {
        res.redirect('/member')
    }
}
module.exports = {
    getSignUp,
    postSignUp,
    getMembershipPage,
    postAttemptMembership
};