
const db =require("../utils/database.js")
module.exports.uploadPost= (id_owner,content, photo, private)=>{
  console.log("photo",photo);
  if (photo==undefined) {
    return db.execute(`insert into post (id_owner, content,private ) values ("${id_owner}",'${content}','${private}')`)
  }else{
    return db.execute(`insert into post (id_owner, content,photo,private ) values ("${id_owner}",'${content}','${photo}','${private}')`)
  }
 
}
module.exports.getAllPost=(id_user)=>{
//  let data1= db.execute(`select a.id_post,a.id_owner,a.like,a.haha, a.cry,a.happy, a.content, a.private, a.photo, a.date,b.display_name, b.avatar from(select * from (select * from post where post.id_owner in (select b.id_owner from (select id_owner as id_owner from friend where id_friend="${id_user}" 
//  union
//  select id_friend from friend where id_owner="${id_user}") as b)) as a union select * from post where id_owner="${id_user}") as a, user as b where a.id_owner =b.id_user and a.private="public" order by a.date desc
//  `)
 let data2= db.execute(`select avatar,display_name,id_user from user where id_user="${id_user}"`)
 let data3= db.execute(`
 select a.id,a.sender_noti,a.reciver_noti,a.type_noti,a.time, b.avatar, b.display_name from notification as a, user as b where a.reciver_noti="${id_user}" and a.sender_noti=b.id_user
 `)
 return Promise.all([data2,data3])
}
// get option post
module.exports.getOptionPost=(id_user)=>{
  return db.execute(`SELECT * FROM facebook_project.post where id_owner="${id_user}" order by date desc`)
}
module.exports.updatePostLove=(id_post)=>{
  db.execute(`select love from post where id_post="${id_post}"`)
  .then(data=>{
    console.log(data);
    if (data[0][0].love==null) {
      return db.execute(`update post set love=ifnull(love,0) +1 where id_post="${id_post}"`)
    }else{
      return db.execute(`update post set love=love +1 where id_post= "${id_post}"`)
    }
  })
  .catch(err=>{
    console.log(err);
  })
}
module.exports.deleteLovePost=(id_post)=>{
  db.execute(`select love from post where id_post="${id_post}"`)
  .then(data=>{
    console.log(data);
    
      return db.execute(`update post set love=love - 1 where id_post="${id_post}"`)
    
  })
  .catch(err=>{
    console.log(err);
  })
}