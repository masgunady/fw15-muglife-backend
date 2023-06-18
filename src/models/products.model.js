const db = require("../helpers/db.helper")

const table = "products"

exports.findAll = async function (params) {
    params.page = parseInt(params.page) || 1
    params.limit = parseInt(params.limit) || 5
    params.category = params.category || ""
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
    "pr"."id",
    "pr"."name",
    "pr"."picture",
    "c"."name" as "category",
    "d"."name" as "deliveryMethod",
    "pr"."descriptions",
    "pr"."variant",
    "pr"."createdAt",
    "pr"."updatedAt"
    FROM ${table} "pr"
    JOIN "categories" AS "c" ON "c"."id" = "pr"."product_category_id"
    JOIN "productDeliveryMethods" AS "d" ON "d"."id" = "pr"."product_delivery_id"
    WHERE "pr"."name" ILIKE $1
    AND "c"."name" ILIKE $2
    GROUP BY "pr"."id", "c"."name", "d"."name"
    ORDER BY ${params.sort} ${params.sortBy} LIMIT $3 OFFSET $4`

    const values = [
        `%${params.search}%`,
        `%${params.category}%`,
        params.limit,
        offset,
    ]
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
    SELECT
    "pr"."id",
    "pr"."name",
    "pr"."picture",
    "d"."name" as "deliveryMethod",
    "pr"."descriptions",
    "pr"."variant",
    "pr"."createdAt",
    "pr"."updatedAt"
    FROM ${table} "pr"
    JOIN "productDeliveryMethods" AS "d" ON "d"."id" = "pr"."product_delivery_id"
    WHERE "pr"."id"=$1
    `
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}


exports.findOneByIdAndVariant = async function(id, code){
    const query = `
    SELECT 
    id,
    name,
    decription,
    "sku",
    FROM ${table} 
    CROSS JOIN jsonb_array_elements("variant") as "sku"
    WHERE "sku"->> "code" ANY($2) AND id ANY($1)
    `
    const values = [id, code]
    const {rows} = await db.query(query, values)
    return rows
}

exports.updateQty = async function(id, code, qty){
    const query = `
    with product as (
        SELECT ('{'||index-1||', quantity}')::TEXT[] as path
        FROM ${table}, jsonb_array_elements(variant) with ordinality arr(sku, index)
        WHERE sku->> "code" = $2 AND id = $1
    ) UPDATE products SET variant = jsonb_set(variant, product.path, '${qty}'), false) FROM product
    WHERE id=$1
    RETURNING *`

    const values = [id, code]
    const {rows} = await db.query(query, values)
    return rows
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
    ("picture", "name", "descriptions", "variant", "product_delivery_id", product_category_id ) 
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `  
    const values = [data.picture, data.name, data.descriptions, data.variant, data.product_delivery_id, data.product_category_id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
  
exports.update = async function(id, data){
    const query = `
    UPDATE "${table}" 
    SET 
    "picture"=COALESCE(NULLIF($2, ''), "picture"), 
    "name"=COALESCE(NULLIF($3, ''), "name"), 
    "descriptions"=COALESCE(NULLIF($4::TEXT, NULL), "descriptions"), 
    "variant"=COALESCE(NULLIF($5::JSONB, NULL), "variant"), 
    "product_delivery_id"=COALESCE(NULLIF($6::INTEGER, NULL), "product_delivery_id"),
    "product_category_id"=COALESCE(NULLIF($7::INTEGER, NULL), "product_category_id")
    
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.picture, data.name, data.descriptions, data.variant, data.product_delivery_id, data.product_category_id]   
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

