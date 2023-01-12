const express=require("express")
const router=express.Router()
const {checklogin}= require("../middeware/checklogin")
const{login}= require("../controller/user.controller")
router.post("/",checklogin,login)
module.exports=router
