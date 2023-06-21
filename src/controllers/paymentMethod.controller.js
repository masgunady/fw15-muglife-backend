const errorHandler = require("../helpers/errorHandler.helper")
const paymentMethodModel = require("../models/paymentMethod.model")
const transactionsModel = require("../models/transactions.model")

exports.getPM = async(request, response)=>{
    try{
        const data = await paymentMethodModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy,
        )
        return response.json({
            success: true,
            message:"list of all payment method",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}

exports.setPayment = async(request, response)=>{
    try{
        const {id} = request.user
        const data = await transactionsModel.changeStatus(id, request.body)
        return response.json({
            success: true,
            message:"True",
            results:data
        })
    }catch(err){
        return errorHandler(response, err)
    }
}
