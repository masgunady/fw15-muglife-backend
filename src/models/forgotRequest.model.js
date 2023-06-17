const db = require("../helpers/db.helper")

exports.findOneByEmail = async function (email) {
    const query = `
    SELECT * FROM "forgotRequest" WHERE email=$1
    `
    const values = [email]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.insert = async function (data) {
    const query = `
    INSERT INTO "forgotRequest" ("email")
    VALUES ($1) RETURNING *
    `
    const values = [data]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroy = async function (id) {
    const query = `
    DELETE FROM "forgotRequest" WHERE "id"=$1 RETURNING *`
    const values = [id]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.destroyByEmail = async function (email) {
    const query = `
    DELETE FROM "forgotRequest" WHERE "email"=$1 RETURNING *`
    const values = [email]
    const {rows} = await db.query(query, values)
    return rows
}
