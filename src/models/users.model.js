const db = require("../helpers/db.helper")

exports.insert = async function (data) {
    const query = `
    INSERT INTO "users" ("email", "password", "phoneNumber", "roleId")
    VALUES ($1, $2, $3, $4) RETURNING *
    `
    const values = [data.email, data.password, data.phoneNumber, data.roleId]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.findOneByEmail = async function (email) {
    const query = `
    SELECT *
    FROM "users"
    WHERE "email"=$1
    `
    const values = [email]
    const { rows } = await db.query(query, values)
    return rows[0]
}

exports.update = async function (id, data) {
    const query = `
    UPDATE "users"
    SET "email"=COALESCE(NULLIF($2, ''), "email"), 
    "password"=COALESCE(NULLIF($3, ''), "password"), 
    "roleId"=COALESCE(NULLIF($4::INTEGER, NULL), "roleId")
    WHERE "id"=$1
    RETURNING *
    `
    const values = [id, data.email, data.password, data.roleId]
    const {rows} = await db.query(query, values)
    return rows[0]
}
