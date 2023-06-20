const db = require("../helpers/db.helper")

const table = "transactions"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "invoiceNum" LIKE $3 
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
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
    const query = `
    INSERT INTO transactions
    ("invoiceNum", "total", "items", "voucherId") VALUES
    ($1, $2, $3, $4)
    RETURNING *
    `
    const values = [data.invoiceNum, data.total, data.items, data.voucherId]   
    const {rows} = await db.query(query, values)
    return rows
} 
