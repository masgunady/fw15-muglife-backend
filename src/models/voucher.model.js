const db = require("../helpers/db.helper")
const table = "vouchers"

exports.insert = async function(data){
    const query = `
    INSERT INTO ${table} (
        "picture",
        "code", 
        "name", 
        "percentage", 
        "maxAmount", 
        "descriptions", 
        "expiredIn")
    VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`

    const values = [data.picture, data.code, data.name, data.percentage, data.maxAmount, data.descriptions, data.expiredIn]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.search = params.search || ""
    params.sort = params.sort || "id"
    params.sortBy = params.sortBy || "ASC"
    const offset = (params.page - 1) * params.limit

    const countQuery = `
    SELECT COUNT(*)::INTEGER
    FROM ${table}
    WHERE "name" LIKE $1`

    const countvalues = [`%${params.search}%`]
    const { rows: countRows } = await db.query(countQuery, countvalues)

    const query = `
    SELECT
        "id",
        "picture",
        "name",
        "percentage",
        "maxAmount",
        "descriptions",
        "expiredIn",
        "createdAt",
        "updatedAt"
    FROM ${table}
    WHERE "name" ILIKE $3
    ORDER BY ${params.sort} ${params.sortBy}
    LIMIT $1 OFFSET $2
    `
    const values = [params.limit, offset, `%${params.search}%`]
    const { rows } = await db.query(query, values)
    return {
        rows,
        pageInfo: {
            totalData: countRows[0].count,
            page: params.page,
            limit: params.limit,
            totalPage: Math.ceil(countRows[0].count / params.limit),
        },
    }
}

exports.findOne = async function(id){
    const query = `
    SELECT * FROM "${table}"
    WHERE "id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
    DELETE FROM ${table} WHERE "id"=$1 RETURNING *
`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
} 

