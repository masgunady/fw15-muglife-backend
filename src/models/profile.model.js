const db = require("../helpers/db.helper")

exports.insert = async function (data) {
    const query = `
    INSERT INTO "profile" ("userId", "picture", "fullName", "job", "about", "username")
    VALUES ($1, $2, $3, $4, $5, $6) RETURNING *
    `
    const values = [data.userId, data.picture, data.fullName, data.job, data.about, data.username]
    const {rows} = await db.query(query, values)
    return rows[0]
}
