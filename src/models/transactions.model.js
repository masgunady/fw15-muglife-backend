const db = require("../helpers/db.helper")

const table = "transactions"

exports.findAll = async function(id, page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE user_id = $1 AND status_payment = 1
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $2 OFFSET $3
    `

    const values = [id, limit, offset]
    const {rows} = await db.query(query, values)
    return rows
}
exports.findAllSuccess = async function(id, page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE user_id = $1 AND status_payment = 2
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $2 OFFSET $3
    `

    const values = [id, limit, offset]
    const {rows} = await db.query(query, values)
    return rows
}
// exports.insert = async function(data){
//     const query = `
//     INSERT INTO "${table}" 
//     ("invoiceNum", "total", "items", "voucherId" ) 
//     VALUES ($1, $2, $3) RETURNING *
//     `  
//     const values = [data.invoiceNum, data.total, data.items]   
//     const {rows} = await db.query(query, values)
//     return rows[0]
// }
exports.findItemByIdAndVariant = async (id, code) => {
    const query = `
    SELECT id, 
    name, 
    "sku"
    FROM products
    CROSS JOIN jsonb_array_elements("variant") as "sku"
    WHERE "sku"->> 'code' = ANY($2) AND id = ANY ($1);
    `
    const values = [id, code]   
    const {rows} = await db.query(query, values)
    return rows
}
exports.insert = async (data) => {
    console.log(data)
    const query = `
    INSERT INTO transactions
    ("invoiceNum", "total", "items", "voucherId", "user_id", "status_payment", "payment_method") VALUES
    ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *
    `
    const values = [data.invoiceNum, data.total, data.items, data.voucherId, data.id, data.status_payment, data.payment_method]   
    const {rows} = await db.query(query, values)
    return rows
} 

exports.changeStatus = async (id,data) => {
    console.log(id,data)
    const query = `
    UPDATE "transactions" SET "status_payment" = 2, "payment_method" = $2, "total" = $3 WHERE "id" = $1 
    `
    const values = [data.id, data.payment_method, data.total]   
    const {rows} = await db.query(query, values)
    return rows[0]
} 
