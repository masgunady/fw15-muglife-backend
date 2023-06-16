const deliveryRouter = require("express").Router()
const deliveryController = require("../controllers/delivery.controller")

deliveryRouter.get("/", deliveryController.getAllDeliveryMethod)
deliveryRouter.post("/", deliveryController.createDeliveryMethod)
deliveryRouter.get("/:id", deliveryController.getOneDelivery)

module.exports = deliveryRouter
