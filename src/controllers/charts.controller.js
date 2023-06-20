const errorHandler = require("../helpers/errorHandler.helper")
const chartsModel = require("../models/charts.model")

exports.getChart = async (request, response) => {
    try {
        const { id } = request.user
        const chartsData = await chartsModel.findOne(id)
        return response.json({
            success: true,
            message: "charts",
            results: chartsData,
        })
    } catch (err) {
        return errorHandler(response, err)
    }
}

exports.insertChart = async (request,response)=>{
    try {
        // console.log(request.body)
        const { id } = request.user
        const data = {id,...request.body}
        const charts = await chartsModel.insert(data)
        if(!charts){
            throw Error("add_charts_failed")
        }
        return response.json({
            success: true,
            message: "Add charts success",
            results: charts
        })
    } catch (error) {
        return errorHandler(response, error)
    }
}

