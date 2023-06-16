const errorHandler = require("../helpers/errorHandler.helper")
const categoriesModel = require("../models/category.model")

exports.getAllCategories = async (request, response) => {
    try {
        let data = await categoriesModel.findAll(
            request.query.page,
            request.query.limit,
            request.query.search,
            request.query.sort,
            request.query.sortBy
        )
        return response.json({
            success: true,
            message: "Get all categories successfully",
            results: data
        })
    } catch(error) {
        return errorHandler(response, error)
    }
}

exports.createCategory = async (request,response)=>{
    try {
        const data = {...request.body}
        const category = await categoriesModel.insert(data)
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

