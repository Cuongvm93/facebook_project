const express=require("express")
const router =express.Router()
const {addLove}=require("../controller/love.controller")
router.post("/:id",addLove)
module.exports=router