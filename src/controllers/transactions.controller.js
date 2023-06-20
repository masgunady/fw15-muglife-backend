const moment = require("moment/moment")
const errorHandler = require("../helpers/errorHandler.helper")
// const fileRemover = require("../helpers/fileRemover.helper")
const transactionsModel = require("../models/transactions.model")
const productsModel = require("../models/products.model")
const chartsModel = require("../models/charts.model")
const { customAlphabet } = require("nanoid")
// const userModel = require("../models/user.model")

exports.getAllTransactions = async(req, res) => {
    try {
        const {id} = req.user
        const transactions = await transactionsModel.findAll(
            id,
            req.query.page, 
            req.query.limit, 
            req.query.search, 
            req.query.sort, 
            req.query.sortBy
        )

        return res.json({
            success: true,
            message: "List of All Transactions",
            results: transactions
        })
    } catch (err) {
        return errorHandler(res, err)
    }
}


exports.createTransaction = async (req, res) => {
    try {
        const {id} = req.user
        const status_payment = 1
        const payment_method = null
        const products = await productsModel.findItemByIdAndVariant(req.body.itemId, req.body.variant)
        console.log(products)
        req.body.variant.forEach((code, varIndex) => {
            products.forEach((product, index)=> {
                if(product.sku.code === code){
                    products[index].sku.reqQuantity = parseInt(req.body.quantity[varIndex])
                }
            })
        })
        for(const product of products){
            if(product.sku.reqQuantity > product.sku.quantity){
                delete product.sku.reqQuantity
                return res.json({
                    success: false,
                    message: `Item only left ${product.sku.quantity}`,
                    results: product
                })
            }
        }
        
        const nanoid = customAlphabet("1234567890", 10)
        // console.log(nanoid)
        const invoiceNum = `INV/CF/${moment().format("DDMMYYYY")}/${nanoid()}`
        // console.log(invoiceNum)

        const items = products.map(item => ({
            id: item.id,
            name: item.name,
            picture: item.picture,
            price: item.sku.price,
            total: item.sku.price * item.sku.reqQuantity,
            code: item.sku.code,
            variant: item.sku.name,
            quantity: item.sku.reqQuantity
        })) 
        const total = items.reduce((prev, item) => prev + item.total, 0)
        // console.log(invoiceNum)
        const results = await transactionsModel.insert({
            id,
            status_payment,
            payment_method,
            invoiceNum,
            total,
            items: JSON.stringify(items)
        })
        // console.log( results)
        const uQty = products.reduce((prev, item) => {

            const calc = item.sku.quantity - item.sku.reqQuantity
            prev.push(calc)
            return prev
        },[])
        // console.log(uQty)
        let updateCount = 0
        for(const item of items){
            await productsModel.updateQty(item.id, item.code, uQty[updateCount])
            updateCount++
        }

        //delete cart
        await chartsModel.destroy(id)

        return res.json({
            success: true,
            message: "Transaction Created !",
            results
        })
    } catch (err) {
        return errorHandler(res, err)
    }
} 

