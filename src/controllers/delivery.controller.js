const errorHandler = require("../helpers/errorHandler.helper")
const deliveryModel = require("../models/delivery.model")

exports.getAllDeliveryMethod = async (request, response) => {
    try {
        let data = await deliveryModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({
            success: true,
            message: "Get all delivery method successfully",
            results: data
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}

exports.createDeliveryMethod = async (request,response)=>{
    try {
        const data = {...request.body}
        const category = await deliveryModel.insert(data)
        if(!category){
            throw Error("add_category_failed")
        }
        return response.json({
            success: true,
            message: "Add category success",
            results: category
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

exports.getOneDelivery = async (request, response) => {
    try {
        const { id } = request.params
        const deliveryMethod = await deliveryModel.findOne(id)
        return response.json({
            success: true,
            message: "article view",
            results: deliveryMethod,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}
