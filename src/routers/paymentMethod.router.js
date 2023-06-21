const paymentMethodRouter = require("express").Router()
const paymentMethodController = require("../controllers/paymentMethod.controller")
const authMiddleware = require("../middlewares/auth.middleware")


paymentMethodRouter.get("/", paymentMethodController.getPM)
paymentMethodRouter.post("/",authMiddleware, paymentMethodController.setPayment)


module.exports = paymentMethodRouter
