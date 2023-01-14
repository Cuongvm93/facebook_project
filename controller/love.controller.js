const {addLove,getOwnerOfPost}= require("../model/love.model")
const {createOneNoti}=require("../model/noti.model")
const {updatePostLove }=require("../model/post.model")
module.exports.addLove=async (req,res)=>{
    try{
        await addLove(req.body.sender,req.body.id_post)
        await updatePostLove(req.body.id_post)
        let result =await getOwnerOfPost(req.body.id_post)
        await createOneNoti(req.body.sender,result[0][0].id_owner,"React")
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}