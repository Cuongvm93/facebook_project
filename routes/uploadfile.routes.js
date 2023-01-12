const express=require("express")
const router=express.Router()
const {uploadpost,getAllPost} =require("../controller/photo.controller")
router.post("/",uploadpost)
router.get("/",getAllPost)
module.exports=router