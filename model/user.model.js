
const db =require("../utils/database")
module.exports.getAllUser= ()=>{
 return db.query('SELECT * FROM USER')
 
}
module.exports.addUser=(iduser,pass,email,displayName)=>{
    return db.execute(`insert into user (id_user,password,email,display_name) values ("${iduser}","${pass}","${email}","${displayName}")`)
}
module.exports.getOneUser=(id_user)=>{
    return db.execute(`select * from user where id_user="${id_user}" `)
}
module.exports.updateUser=(avatar,cover,displayName,work,study,live,dating,id_user)=>{
    return db.execute(`Update user set avatar=?, cover=?, display_name=? ,work=?, school=?,live=?,dating=? where id_user=?`,[avatar,cover,displayName,work,study,live,dating,id_user])
}
module.exports.getOneUser=(id_user)=>{
    return db.execute(`select * from user where id_user="${id_user}"`)
}
