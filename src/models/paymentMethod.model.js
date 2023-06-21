const db = require("../helpers/db.helper")

exports.findAll = async function(){
    const query =`
    SELECT * FROM "paymentMethod"`

    const {rows} = await db.query(query)
    return rows
}

// exports.insert = async function (data) {
    
//     const query = `
//     INSERT INTO "charts" ("user_id", "item_id", "variant", "quantity")
//     VALUES ($1, $2, $3, $4) RETURNING *
//     `
//     const values = [data.id, data.item_id, data.variant, data.quantity]
//     const { rows } = await db.query(query, values)
//     return rows[0]
// }

// exports.destroy = async(id)=>{
//     const queries = `
//   DELETE FROM "charts"
//   WHERE "user_id"=$1
//   RETURNING *
//   `
//     const values = [id]

//     const {rows} = await db.query(queries, values)
//     return rows[0]
// }
