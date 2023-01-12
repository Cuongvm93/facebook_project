const {acceptFriend}=require("../model/friend.model")
module.exports.acceptFriend= async(req,res)=>{
    try{
        console.log(req.body);
        console.log(req.body.sender,req.body.reciver);
        await acceptFriend(req.body.sender,req.body.reciver)
        res.status(200).json({
            status:"success!"
        })
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}