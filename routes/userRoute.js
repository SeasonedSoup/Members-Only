const {Router} = require("express");
const passport = require("passport");

const userController = require('../controllers/userController')
const userRouter = Router();

userRouter.get('/sign-up', userController.getSignUp);
userRouter.post('/sign-up', userController.postSignUp);
userRouter.get('/member', userController.getMembershipPage);
userRouter.post('/become-member', userController.postAttemptMembership);
module.exports = userRouter;