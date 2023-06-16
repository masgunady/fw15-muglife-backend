const db = require("../helpers/db.helper")

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page -1)* limit
    const query= `
    SELECT * FROM "productDeliveryMethods" WHERE "name" LIKE $3 ORDER BY ${sort} ${sortBy} LIMIT $1 OFFSET $2`

    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query,values)
    return rows
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "productDeliveryMethods" ("name")
    VALUES ($1) RETURNING *
    `
    const values = [data.name]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
    DELETE FROM "productDeliveryMethods" WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

exports.findOne = async function(id){
    const query =`
    SELECT * FROM "productDeliveryMethods" WHERE id=$1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

