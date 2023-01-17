const express=require("express")
const router =express.Router()
const {addLove,deleteLove}=require("../controller/love.controller")
const {deleteLovePost}=require("../controller/photo.controller")
router.post("/:id",addLove)
router.delete("/",deleteLove,deleteLovePost)
module.exports=router