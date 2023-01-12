const express=require("express")
const router=express.Router()
const {validate}= require("../middeware/authSignUp")
const{getAllUser,addUser,updateUser}= require("../controller/user.controller")
router.get("/",getAllUser)
router.post("/",validate,addUser)
router.put("/:id",updateUser)
module.exports=router
