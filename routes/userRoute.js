const {Router} = require("express");
const userController = require('../controllers/userController')
const userRouter = Router();

userRouter.get('/', userController.getSignUp);
userRouter.post('/', userController.postSignUp);

module.exports = userRouter;