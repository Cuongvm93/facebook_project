const db=require("../utils/database")
module.exports.createOneNoti=(sender,reciver,type)=>{
    return db.query(`insert into notification (sender_noti,reciver_noti,type_noti) values ("${sender}","${reciver}","${type}") `)
}
module.exports.getNoti=(reciver)=>{
    return db.execute(`select * from notification where reciver_noti="${reciver}" order by time desc`)
}
module.exports.deleteOne=(sender,reciver,type)=>{
    return db.execute(`delete from notification where sender_noti="${sender}" and reciver_noti="${reciver}" and type_noti="${type}"`)
}