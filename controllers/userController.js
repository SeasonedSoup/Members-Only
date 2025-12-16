const db = require('../db/query')
const {body, validationResult, matchedData} = require("express-validator");

const emptyErr = "must not be empty";
const [messageTable, userTable] = [new db.MessageTbl, new db.UserTbl]

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

            await messageTable.addUsername(userInfo.username, userInfo.firstName, userInfo.lastName, userInfo.password)
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
    const user = res.locals.currentUser
    if (!user) {
        res.status(401).send(`You are not yet validated as a user`);
        return;
    }

    const {secret} = req.body;
    if (secret === 'ducky') {
        await userTable.giveMembership(user.username);
        res.redirect('/')
    } else if (secret === 'sneakyadmin'){
        await userTable.giveAdmin(user.username);
        res.redirect('/')
    } else {
        res.redirect('/member')
    }
}

function getMessageForm(req, res) {
    res.render("messageForm")
}

async function postMessage(req, res) {
    const user = res.locals.currentUser
    if (!user) {
        res.status(401).send(`You are not yet validated as a user`);
        return;
    }

    try {
        const {topic, message} = req.body 
        await messageTable.createMessage(topic, message, user.id);
        res.redirect('/')
    } catch (err) {
        return err;
    }
}

async function getMessages(req, res) {
    const user = res.locals.currentUser
    if (!user) {
        res.status(401).send(`You are not yet validated as a user`);
        return;
    }
    const messages = await messageTable.getAllMessages()
    res.render("homepage", {messages: messages, currentUser: user})
}

async function postRemoveMessage(req, res) {
    const user = res.locals.currentUser
    if (!user || !user.isadmin) {
        res.status(401).send(`You are not yet validated as a user nor an admin`);
        return;
    } 
    

    const messageId = req.body.messageId;

    await messageTable.deleteMessage(messageId);
    res.redirect("/");
}

module.exports = {
    getSignUp,
    postSignUp,
    getMembershipPage,
    postAttemptMembership,
    getMessageForm,
    postMessage,
    getMessages,
    postRemoveMessage
};