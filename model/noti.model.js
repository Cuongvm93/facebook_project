const db=require("../utils/database")
module.exports.createOneNoti=(sender,reciver,type)=>{
    return db.query(`insert into notification (sender_noti,reciver_noti,type_noti) values ("${sender}","${reciver}","${type}") `)
}
module.exports.getNoti=(reciver)=>{
    return db.execute(`select a.id,a.sender_noti,a.reciver_noti,a.type_noti,a.time, b.avatar, b.display_name from notification as a, user as b where a.reciver_noti="${reciver}" and a.sender_noti=b.id_user order by a.time desc`)
}
module.exports.deleteOne=(sender,reciver,type)=>{
    return db.execute(`delete from notification where sender_noti="${sender}" and reciver_noti="${reciver}" and type_noti="${type}"`)
}