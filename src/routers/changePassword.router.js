const changePasswordRouter = require("express").Router()
const changePasswordController = require("../controllers/changePassword")
// const validate = require("../middlewares/validator.middleware")

changePasswordRouter.patch("/", changePasswordController.updateChangePassword)

module.exports = changePasswordRouter
