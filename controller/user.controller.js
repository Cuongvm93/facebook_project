const{getAllUser,addUser,updateUser,getOneUser}= require("../model/user.model")
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports.getAllUser= async (req,res)=>{
    try{
        console.log(req.cookies.cookieToken);
        let result= await getAllUser()
        // console.log(result[0]);
        res.status(200).json(result[0])
    }
    catch(err)
    {
        res.status(500).json(err)
    }

}
module.exports.addUser= async(req,res)=>{

 try{
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    console.log(hash);
    console.log("1212121212",req.body);
    let result= await addUser(req.body.username,hash,req.body.email,req.body.name)
    // res.status(200).json({
    //     status:"success"
    // })
    res.status(200).json({
        status:"success!"
    })
 }
 catch(err)
 {
    res.status(500).json(err)
 }
}
module.exports.login =(req,res)=>{
    
   res.status(200).json({
    mess:"success!",
    status:"sucess" 
   })
    
        // res.redirect("/")
    }
// Update User
module.exports.updateUser= async (req,res)=>{
    try{
        await updateUser(req.body.avatar,req.body.cover,req.body.displayName, req.body.work,req.body.study,req.body.live,req.body.dating,req.params.id)
        res.status(200).json({
            status:"success!"
        })
    }
    catch(err){
        res.status(500).json(err)
    }
}
module.exports.getOneUser= async(req,res)=>{
    try{
        let [resutl]= await getOneUser(req.params.id)
        res.status(200).json(result)
    }
    catch(err)
    {
        res.status(500).json(err)
    }
}