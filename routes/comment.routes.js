const express=require("express")
const router=express.Router()
const {createCmt,getSelectComment}=require("../controller/comment.controller")
router.post("/",createCmt)
router.get("/:id",getSelectComment)
module.exports=router