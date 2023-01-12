const { getAllUser,selectone}= require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const jwtsecret = "the most secret string of text in history"  
module.exports.validate=async(req,res,next)=>{
    console.log(req.body);
    const{email,username, password, repassword}=req.body;
    console.log(email);
    let result= await getAllUser()
    console.log("middle",result[0]);
    let find= result[0].find(item=>{
       return item.email==email;
    })
    let find1=result[0].find(item=>{
        return item.id_user==username
    })
    const error={}
    if(find){
       error['err_email']="email da ton tai"
    }
    if(find1){
        error['err_username']="username đã tồn tại"
    }
    if(password!==repassword){
       error['err_pass']='pass nhap lai khong trung'
    }
    if(!error.err_email && !error.err_pass && !error.err_username){
       next();
    }else{
       res.status(500).json(error)
    }
 }