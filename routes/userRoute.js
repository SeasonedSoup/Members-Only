const {Router} = require("express");

const userController = require('../controllers/userController')
const userRouter = Router();

userRouter.get('/sign-up', userController.getSignUp);
userRouter.post('/sign-up', userController.postSignUp);

userRouter.get('/member', userController.getMembershipPage);
userRouter.post('/become-member', userController.postAttemptMembership);

userRouter.get('/create-message', userController.getMessageForm);
userRouter.post('/create-message', userController.postMessage);

userRouter.get('/homepage', userController.getMessages);
userRouter.post('/remove-message', userController.postRemoveMessage);
module.exports = userRouter;