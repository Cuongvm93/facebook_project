const { getAllUser,selectone}= require("../model/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwtsecret = "the most secret string of text in history"  
module.exports.checklogin=async(req,res,next)=>{
    const{email, password}=req.body;
    let result= await getAllUser()
    let error={}
    let find= result[0].find(item=>{
       return item.email==email;
    })
    if(find){
        const hash= find.password
       let checkpass=bcrypt.compareSync(password, hash)
       console.log(checkpass);
       if(checkpass == true){
        //check times-login
        // let times_log=find.last_login_times
        // if (times_log=="null") {
        //     times_log=1
        // }else{
        //     times_log++
        // }
        
        // gửi cookies lưu ở trình duyệt
        // req.session.id_user=find.id_user
        res.cookie("cookieToken",{id_user:find.id_user},{sign:"true"})
        // res.redirect("/")
        next()
       }else{
        error['err_pass']="Password incorrect!"
       }
    }else{
        error['err_email']="Email is not exist"
    }
    
    if(error.err_pass || error.err_email){

    
       res.status(500).json(error)
    }
 }