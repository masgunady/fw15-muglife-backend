const products = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const {uploadMiddleware} = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const productsController = require("../controllers/products.controller")

products.get("/", productsController.getAllProducts)
products.get("/:id", productsController.getOne)
products.delete("/:id", productsController.deleteProduct)
products.post("/admin/",  uploadMiddleware("picture"), productsController.createProducts)
products.patch("/admin/:id", uploadMiddleware("picture"), productsController.updateProduct)

module.exports = products

