const transactionsRouter = require("express").Router()
// const validate = require("../middlewares/validator.middleware")
// const uploadMiddleware = require("../middlewares/upload.middlewares")
// const authMiddleware = require("../middlewares/auth.middleware")
const transactionsController = require("../controllers/transactions.controller")

transactionsRouter.get("/", transactionsController.getAllTransactions)
transactionsRouter.get("/history", transactionsController.getAllTransactionsSuccess)
transactionsRouter.post("/", transactionsController.createTransaction)
// transactions.get("/:id", transactionsController.getOneProductsNonUser)
// transactions.patch("/", uploadMiddleware("picture"), transactionsController.updateProfile)

module.exports = transactionsRouter

