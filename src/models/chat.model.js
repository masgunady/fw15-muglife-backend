const db = require("../helpers/db.helper")
const table = "conversations"
const tableCR = "conversation_replies"


exports.findListConversation = async (id) => {
    const query =`
    SELECT 
    "c".id AS "conversationId",
    "c"."user_1",
    "profile_1"."fullName" AS "fullName_1",
    "profile_1"."picture" AS "picture_1",
    "c"."user_2",
    "profile_2"."fullName" AS "fullName_2",
    "profile_2"."picture" AS "picture_2",
    "cr"."message_content" AS "last_message"
    FROM "${table}" "c"
    INNER JOIN (
        SELECT conversation_id, MAX(id) AS last_reply_id
        FROM conversation_replies
        GROUP BY conversation_id
    ) max_replies ON c.id = max_replies.conversation_id
    INNER JOIN conversation_replies cr ON max_replies.last_reply_id = cr.id
    INNER JOIN "profile" "profile_1" ON "c"."user_1" = "profile_1"."userId"
    INNER JOIN "profile" "profile_2" ON "c"."user_2" = "profile_2"."userId"
    WHERE user_1 = $1 OR user_2 = $1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}
exports.showConversation = async (id) => {
    const query =`
    SELECT 
    "c". *,
    "p"."fullName",
    "p"."picture"
    FROM "${tableCR}" "c"
    INNER JOIN "profile" "p" ON "c"."user_id" = "p"."userId"
    WHERE "c"."conversation_id" = $1`

    const values = [id]
    const {rows} = await db.query(query, values)
    return rows
}

exports.insertMessage = async(data) => {
    const query = `
    INSERT INTO "${tableCR}" 
    ("conversation_id", "user_id", "message_content") 
    VALUES ($1, $2, $3) RETURNING *
    `  
    const values = [data.conversation_id, data.user_id, data.message_content]   
    const {rows} = await db.query(query, values)
    return rows[0]
}
exports.insertConversation = async(data) => {
    const query = `
    INSERT INTO "${table}" 
    ("user_1", "user_2") 
    VALUES ($1, $2) RETURNING *
    `  
    const values = [data.sender_id, data.user_id]   
    const {rows} = await db.query(query, values)
    return rows[0]
}

exports.checkConversation = async(data) => {
    const query =`
    SELECT 
    *
    FROM "${table}"
    WHERE 
    (user_1 = $1 AND user_2 = $2) OR (user_1 = $2 AND user_2 = $1)
    `
    const values = [data.sender_id, data.user_id]
    const {rows} = await db.query(query, values)
    return rows[0]
}
