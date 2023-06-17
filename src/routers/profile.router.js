const profileRouter = require("express").Router()
const profileController = require("../controllers/profile.controller")
const {uploadMiddleware} = require("../middlewares/upload.middleware")
const validate = require("../middlewares/validator.middleware")

profileRouter.get("/", profileController.getProfile)
profileRouter.patch("/", uploadMiddleware("picture"), validate("updateProfile"), profileController.updateProfile)

module.exports = profileRouter
