const products = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
const {uploadMiddleware} = require("../middlewares/upload.middleware")
// const authMiddleware = require("../middlewares/auth.middleware")
const productsController = require("../controllers/products.controller")

products.get("/", productsController.getAllProducts)
products.get("/:id", productsController.getOneProductsNonUser)
products.post("/admin/",  uploadMiddleware("picture"), productsController.createProducts)
// products.patch("/", uploadMiddleware("picture"), productsController.updateProfile)

module.exports = products

