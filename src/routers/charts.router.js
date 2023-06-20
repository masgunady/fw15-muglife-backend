const chartsRouter = require("express").Router()
const chartsController = require("../controllers/charts.controller")

chartsRouter.get("/", chartsController.getChart)
chartsRouter.post("/", chartsController.insertChart)

module.exports = chartsRouter
