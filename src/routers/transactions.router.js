const transactions = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middlewares")
// const authMiddleware = require("../middlewares/auth.middleware")
const transactionsController = require("../controllers/transactions.controller")

transactions.get("/", transactionsController.getAllTransactions)
transactions.post("/", transactionsController.createTransaction)
// transactions.get("/:id", transactionsController.getOneProductsNonUser)
// transactions.patch("/", uploadMiddleware("picture"), transactionsController.updateProfile)

module.exports = transactions

