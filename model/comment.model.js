const db =require("../utils/database")
module.exports.createCmt= (sender,id_post,content)=>{
    let id_comment=Math.random()
 db.execute(`insert into comment (id_post,id_sender,comment) values ("${id_post}","${sender}","${content}") `)
 .then(()=>{
  return db.execute(`select id_owner from post where id_post=${id_post}`)
 })
 .then((data) => {
    console.log(data)
    return  db.execute(`insert into notification (sender_noti,reciver_noti,type_noti) values ("${sender}","${data[0][0].id_owner}","Comment")`)
 })
 .catch(err=> console.log(err))
}
module.exports.getAllComment=async (id_user)=>{
   let [data1] = await db.execute(`select a.id_post,a.id_owner,a.like,a.haha, a.cry,a.happy, a.content, a.private, a.photo, a.date,b.display_name, b.avatar from(select * from (select * from post where post.id_owner in (select b.id_owner from (select id_owner as id_owner from friend where id_friend="${id_user}" 
    union
    select id_friend from friend where id_owner="${id_user}") as b)) as a union select * from post where id_owner="${id_user}") as a, user as b where a.id_owner =b.id_user and a.private="public" order by a.date desc`)
    // console.log(data1);
    let [data2] = await db.execute(`select count(id_post) as numberCmt, id_post from comment group by id_post`)
    for(let index=0;index<data1.length; index++){
        let find= data2.find(item=>{
            return item.id_post== data1[index].id_post
        })
        if(find){
            data1[index]['number_cmt']= find.numberCmt
        }
    }
    return data1
}
module.exports.getSelectComment=(id_post)=>{
    return db.execute(`select a.id_comment, a.id_post, a.id_sender, a.comment,b.display_name, b.avatar, a.time from (select * from comment where id_post="${id_post}") as a, user as b where a.id_sender=b.id_user order by a.time desc`)
}
module.exports.getCountCmt= ()=>{
    return db.execute(`select count(id_post) as numberCmt, id_post from comment group by id_post`)
}