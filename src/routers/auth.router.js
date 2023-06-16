const authRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const authController = require("../controllers/auth.controller")

authRouter.post("/login", authController.login)
authRouter.post("/register", authController.register)
authRouter.post("/forgotPassword", authController.forgotPassword)
authRouter.post("/resetPassword", authController.resetPassword)

module.exports = authRouter
