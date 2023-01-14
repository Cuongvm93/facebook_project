const {createCmt,getSelectComment}=require ("../model/comment.model")
module.exports.createCmt=async (req,res)=>{
    try{
     let result=await createCmt(req.body.sender_cmt,req.body.id_post,req.body.contentCmt)
     res.status(200).json({
        status:"success!"
     })
    }
    catch(err){
        res.status(500).json(errr)
    }
}
module.exports.getSelectComment= async(req,res)=>{
    try{
        console.log(req.params.id);
        let [result]= await getSelectComment(req.params.id)
        console.log(result);
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}