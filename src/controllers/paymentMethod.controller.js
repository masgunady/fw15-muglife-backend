const errorHandler = require("../helpers/errorHandler.helper")
const paymentMethodModel = require("../models/paymentMethod.model")

exports.getPM = async (request, response) => {
    try {
        let pm = await paymentMethodModel.findAll()
        return response.json({
            success: true,
            message: "Payment method",
            results: pm,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
