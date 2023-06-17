const moment = require("moment")
const errorHandler = require("../helpers/errorHandler.helper")
const voucherModel = require("../models/voucher.model")

exports.createVoucher = async (req, res) => {
    try {
        const data = { ...req.body }
        if (!data) {
            throw Error("Input values not found")
        }
        if (req.file) {
            data.picture = req.file.path
        }

        const expiredInMinutes = data.expiredIn || 0 

        const expiredIn = moment().add(expiredInMinutes, "minutes")
        data.expiredIn = expiredIn.format("YYYY-MM-DD HH:mm:ss")

        const vouchers = await voucherModel.insert(data)
        if (!vouchers) {
            throw Error("create_voucher_failed")
        }
        return res.json({
            success: true,
            message: "Create voucher success",
            results: vouchers,
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getAllVoucher = async function (req, res) {
    try {
        const { rows: results, pageInfo } = await voucherModel.findAll(
            req.query
        )
        return res.json({
            success: true,
            message: "List of all voucher",
            pageInfo,
            results,
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.deleteVoucher = async function (request, response) {
    try {
        const {id} = request.params
        const article = await voucherModel.findOne(id)
        if (!article) {
            throw Error("voucher_not_found")
        }
        const data = await voucherModel.destroy(id)
        return response.json({
            success: true,
            message: "Delete voucher success",
            results: data,
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}
