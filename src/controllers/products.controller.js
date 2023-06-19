const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const productsModel = require("../models/products.model")
const deliveryModel = require("../models/delivery.model")
const catgeoryModel = require("../models/category.model")
// const userModel = require("../models/user.model")

exports.getAllProducts = async function (req, res) {
    try {
        const { rows: results, pageInfo } = await productsModel.findAll(
            req.query
        )
        return res.json({
            success: true,
            message: "List of all Products",
            pageInfo,
            results,
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.getOneProducts = async (req, res) => {
    try {
        const {id} = req.user
        const products = await productsModel.findOneByUserId(id)
        if(!products){
            throw Error("products_not_found")
        }
        return res.json({
            success: true,
            message: "Products",
            results: products
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getOneProductsNonUser = async (req, res) => {
    try {
        const id = req.params.id
        const products = await productsModel.findOne(id)
        if(!products){
            throw Error("products_not_found")
        }
        return res.json({
            success: true,
            message: "Products",
            results: products
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.getOne = async (req, res) => {
    try {
        const {id} = req.params
        const products = await productsModel.findOne(id)
        if(!products){
            throw Error("products_not_found")
        }
        return res.json({
            success: true,
            message: "Products",
            results: products
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}

exports.createProducts = async (req,res) => {
    try {
        // const {role} = request.user
        // if(role === "standard"){
        //     throw Error("only_admin_have_access")
        // }

        const data = {
            ...req.body,
        }

        console.log(data)
        const deliveryMethod = await deliveryModel.findOne(data.product_delivery_id)
        if(!deliveryMethod){
            throw Error("delivery_method_not_found")
        }

        const categoryProduct = await catgeoryModel.findOne(data.product_category_id)
        if(!categoryProduct){
            throw Error("product_category_not_found")
        }

        if (req.file) {
            data.picture = req.file.path
        }

        const products = await productsModel.insert(data)
        return res.json({
            success: true,
            message: "New Product Created !",
            results: products
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.updateProduct = async (req, res)=>{
    try {
        const {id} = req.params
        const products = await productsModel.findOne(id)  
        console.log(products)   
        if(!products){
            throw Error("product_not_found")
        } 
        const data = {...req.body}
        console.log(data)
        if (req.file) {
            data.picture = req.file.path
        }

        if(data.product_category_id){
            const category = await catgeoryModel.findOne(data.product_category_id)
            if(!category){
                throw Error("category_not_found")
            }
        }
        if(data.product_delivery_id){
            const deliveryData = await deliveryModel.findOne(data.product_delivery_id)
            if(!deliveryData){
                throw Error("delivery_method_not_found")
            }
        }
        const updateProduct = await productsModel.update(id, data)
        if(!updateProduct){
            throw Error("product_update_failed")
        }
        return res.json({
            success: true,
            message: "Update Product Success",
            results: updateProduct
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}

exports.deleteProduct = async (req, res)=>{
    try {
        const {id} = req.params
        const dataProduct = await productsModel.findOne(id)
        if(dataProduct){
            throw Error("product_not_found")
        }
        const dltProduct = await productsModel.destroy(id)
        return res.json({
            success: true,
            message: "Delete Product success",
            results: dltProduct
        })
    } catch (error) {
        return errorHandler(res, error)
    }
}
