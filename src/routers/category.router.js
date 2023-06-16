const categoryRouter = require("express").Router()
const categoryController = require("../controllers/categories.controller")

categoryRouter.get("/", categoryController.getAllCategories)
categoryRouter.post("/", categoryController.createCategory)

module.exports = categoryRouter
