const {Router} = require("express");
const userController = require('../controllers/userController')
const userRouter = Router();

userRouter.get('/', userController.getSignUp);
module.exports = userRouter;