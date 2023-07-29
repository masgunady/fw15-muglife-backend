const router = require("express").Router()
const authMiddleware = require("../middlewares/auth.middleware")

router.get("/", (request, response) => {
    return response.json({
        success: true,
        message: "Backend is running well"
    })
})

router.use("/auth", require("./auth.router"))
router.use("/categories", require("../routers/category.router"))
router.use("/products", require("./products.router"))
router.use("/delivery-method", require("./delivery.router"))
router.use("/transactions",authMiddleware, require("./transactions.router"))
router.use("/changePassword", authMiddleware, require("./changePassword.router"))
router.use("/profile", authMiddleware, require("./profile.router"))
router.use("/vouchers", authMiddleware, require("./voucher.router"))
router.use("/charts", authMiddleware, require("./charts.router"))
router.use("/chat", authMiddleware, require("./chat.router"))
router.use("/payment-method", require("./paymentMethod.router"))

router.use("*", (request, response) => {
    return response.status(404).json({
        success: false,
        message: "Resource not found"
    })
})

module.exports = router
