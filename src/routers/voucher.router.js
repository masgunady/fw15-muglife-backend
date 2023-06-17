const voucherRouthe = require("express").Router()
const voucherController = require("../controllers/voucher.controller")
const {uploadMiddleware} = require("../middlewares/upload.middleware")

voucherRouthe.post("/", uploadMiddleware("picture"), voucherController.createVoucher)
voucherRouthe.get("/", voucherController.getAllVoucher)
voucherRouthe.delete("/:id", voucherController.deleteVoucher)

module.exports = voucherRouthe
