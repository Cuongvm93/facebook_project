const { database } = require("firebase-admin")
const {uploadPost,getAllPost,deleteLovePost}= require("../model/post.model")
module.exports.uploadpost= async(req,res)=>{
    try{
        let result= await uploadPost(req.cookies.cookieToken.id_user,req.body.content,JSON.stringify(req.body.media),req.body.private)
        .then(()=>{
            res.status(200).json({
                Message:"Success!",
                status:"success"
            })
        })
        
        
    }
    catch(err){
        res.status(500).json(err)
    }
}
module.exports.getAllPost= async(req,res)=>{
    try{
        let result =await getAllPost(req.cookies.cookieToken.id_user)
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
// delete post of love

module.exports.deleteLovePost= async(req,res)=>{
    try{
        let result =await deleteLovePost(req.body.id_post)
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
