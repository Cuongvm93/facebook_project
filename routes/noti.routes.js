const express=require("express")
const router=express.Router()
const {createOneNoti,deleteOne,getNoti}=require("../controller/noti.controller")
router.post("/",createOneNoti)
router.delete("/",deleteOne)
router.get("/:id",getNoti)
module.exports=router