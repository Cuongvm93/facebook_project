const express=require("express")
const router=express.Router()
const {checklogin}= require("../middeware/checklogin")
const{login}= require("../controller/user.controller")
router.get("/logout",(req,res)=>{
    res.session.destroy(err=>{
        if (err) {
            console.log(err);
        }else{
            res.redirect("/login")
        }
    })
})
module.exports=router