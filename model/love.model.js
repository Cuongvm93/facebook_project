const db =require("../utils/database")
module.exports.addLove= (sender,id_post)=>{
   return db.execute(`insert into love (sender_love,id_post) values ("${sender}", "${id_post}")`)
}
module.exports.getOwnerOfPost=(id_post)=>{
    return db.execute(`select id_owner from post where id_post ="${id_post}"`)
}
module.exports.postloved=(id_user)=>{
    return db.execute(`select id_post from love where sender_love="${id_user}"`)
}