const express=require("express")
const router=express.Router()
const {createOneNoti,deleteOne}=require("../controller/noti.controller")
router.post("/",createOneNoti)
router.delete("/",deleteOne)
module.exports=router