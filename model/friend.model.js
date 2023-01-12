const db =require("../utils/database")
module.exports.getAllFriend= (id_user)=>{
 return db.query(`select id_owner as friend from friend where id_friend="${id_user}" 
 union
 select id_friend from friend where id_owner="${id_user}"` )
 
}
module.exports.acceptFriend=(sender, receiver)=>{
    return db.query(`insert into friend (id_friend,id_owner) values ("${sender}","${receiver}")`)
}
