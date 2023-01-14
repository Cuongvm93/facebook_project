const {createOneNoti,deleteOne,getNoti}=require("../model/noti.model")
module.exports.createOneNoti= async(req,res)=>{
    try{
        console.log(req.body);
        await createOneNoti(req.body.sender,req.body.reciver,req.body.type)
        res.status(200).json({status:"success!"})
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
module.exports.deleteOne= async(req,res)=>{
    try{
        await deleteOne(req.body.sender,req.body.reciver,req.body.type)
        res.status(200).json({
            Message:"success!"
        })
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}
module.exports.getNoti=async (req,res)=>{
    try{
        let [result]=await getNoti(req.params.id)
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}   