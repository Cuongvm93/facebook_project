const express=require("express")
const router=express.Router()
const{acceptFriend}=require("../controller/friend.controller")
router.post("/",acceptFriend)
module.exports=router;