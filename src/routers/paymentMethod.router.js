const paymentMethodRouter = require("express").Router()
const paymentMethodController = require("../controllers/paymentMethod.controller")

paymentMethodRouter.get("/", paymentMethodController.getPM)

module.exports = paymentMethodRouter
