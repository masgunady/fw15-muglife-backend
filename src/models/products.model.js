const db = require("../helpers/db.helper")

const table = "products"

exports.findAll = async function(page, limit, search, sort, sortBy){
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5
    search = search || ""
    sort = sort || "id"
    sortBy = sortBy || "ASC"
    const offset = (page - 1) * limit

    const query = `
    SELECT * FROM "${table}" 
    WHERE "name" LIKE $3 
    ORDER BY "${sort}" ${sortBy} 
    LIMIT $1 OFFSET $2
    `
    const values = [limit, offset, `%${search}%`]
    const {rows} = await db.query(query, values)
    return rows
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

exports.findOneByUserId = async function(userId){

    const query = `
    SELECT
    "u"."id",
    "p"."picture",
    "p"."fullName" as "name",
    "p"."username",
    "u"."email",
    "r"."code" as "role",
    "p"."phoneNumber",
    "p"."job",
    "p"."about",
    "p"."createdAt",
    "p"."updatedAt"
    FROM "${table}" "p"
    JOIN "users" "u" ON "u"."id" = "p"."userId"
    JOIN "role" "r" ON "r"."id" = "u"."roleId"
    WHERE "p"."userId"=$1
    `
    

    const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByEmail = async function(email){
    const query = `
    SELECT * FROM "${table}"
    WHERE "email"=$1
    `
    const values = [email]
    const {rows} = await db.query(query, values)
    return rows[0]
}
 

exports.insert = async function(data){
    const query = `
    INSERT INTO "${table}" 
    ("picture", "name", "description", "variant", "product_delivery_id", product_category_id ) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `  
    const values = [data.picture, data.name, data.description, data.variant, data.product_delivery_id, data.product_category_id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
  
exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"), 
    "name"=COALESCE(NULLIF($3, ''), "name"), 
    "description"=COALESCE(NULLIF($4, ''), "description"), 
    "variant"=COALESCE(NULLIF($5::JSONB, NULL), "variant"), 
    "product_delivery_id"=COALESCE(NULLIF($6::INTEGER, NULL), "product_delivery_id"),
    "product_category_id"=COALESCE(NULLIF($7::INTEGER, NULL), "product_category_id")
    
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.picture, data.name, data.description, data.product_delivery_id, data.product_category_id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.updateByUserId = async function(userId, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"), 
    "name"=COALESCE(NULLIF($3, ''), "name"), 
    "price"=COALESCE(NULLIF($4, ''), "price"), 
    "description"=COALESCE(NULLIF($5, ''), "description"), 
    "stock"=COALESCE(NULLIF($6, ''), "stock"), 
    "product_size_id"=COALESCE(NULLIF($7::INTEGER, NULL), "product_size_id"),
    "product_delivery_id"=COALESCE(NULLIF($8::INTEGER, NULL), "product_delivery_id"),
    "product_category_id"=COALESCE(NULLIF($9::INTEGER, NULL), "product_category_id")
    
    WHERE "id"=$1
    RETURNING *
    `
    const values = [userId, data.picture, data.fullName, data.username, data.phoneNumber, data.job, data.about]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function(id){
    const query = `
    DELETE FROM "${table}" 
    WHERE "id"=$1
    RETURNING *
    `  
    const values = [id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

