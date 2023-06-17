const db = require("../helpers/db.helper")

exports.insert = async function (data) {
    const query = `
    INSERT INTO "profile" ("userId", "orderedId", "picture", "fullName", "address", "gender", "username", "birthDate")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *
    `
    const values = [data.userId, data.orderedId, data.picture, data.fullName, data.address, data.gender, data.username, data.birthDate]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.findOneByUserId = async function (userId) {
    const query = `
    SELECT
    "p"."picture",
    "p"."username",
    "p"."fullName",
    "u"."email",
    "u"."phoneNumber",
    "p"."gender",
    "p"."address",
    "p"."birthDate",
    "p"."orderedId",
    "p"."createdAt",
    "p"."updatedAt"
    FROM "profile" "p"
    JOIN "users" "u" ON "u"."id" = "p"."userId"
    WHERE "p"."userId"=$1
    `
    const values = [userId]
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.updateByUserId = async function (userId, data) {
    const query = `
    UPDATE "profile"
    SET 
    "orderedId"=COALESCE(NULLIF($4::INTEGER, NULL), "orderedId"), 
    "picture"=COALESCE(NULLIF($2, NULL), "picture"), 
    "fullName"=COALESCE(NULLIF($3, ''), "fullName"),
    "job"=COALESCE(NULLIF($4, ''), "job"), 
    "about"=COALESCE(NULLIF($6, ''), "about"), 
    "username"=COALESCE(NULLIF($6, ''), "username"), 
    "gender"=COALESCE(NULLIF($5::BOOLEAN, NULL), "gender"), 
    "address"=COALESCE(NULLIF($7, ''), "address"), 
    "birthDate"=COALESCE(NULLIF($8::DATE, 'NOW'), "birthDate")
    WHERE "userId"=$1
    RETURNING *
    `
    const values = [userId, data.picture, data.fullName, data.orderedId, data.gender, data.job, data.about, data.birthDate]
    const {rows} = await db.query(query, values)
    return rows[0]
}
