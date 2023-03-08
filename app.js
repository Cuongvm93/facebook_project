const express=require("express")
const bodyparser=require("body-parser")
const multer=require("multer")
const upload=multer()
const cors=require("cors")
const app=express()
const session= require("express-session")
const cookieparser=require("cookie-parser")
const http = require('http').Server(app);
const io = require('socket.io')(http);
app.use(cookieparser("secrect"))
// const ejsLint = require('ejs-lint');
const port=3000
const routerUpload = require("./routes/uploadfile.routes")
const routesUser=require("./routes/user.routes")
const routerLogin=require("./routes/login.routes")
const routerNoti=require("./routes/noti.routes")
const routerFriend=require("./routes/friend.routes")
const routerCmt=require("./routes/comment.routes")
const routerLove=require("./routes/love.routes")
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';
const MySQLStore = require('express-mysql-session')(session);
const {getAllPost,getOptionPost}=require("./model/post.model")
const {getOneUser,updateUserStatus,removeStatus,find_socketId}=require("./model/user.model")
const {getAllFriend}=require("./model/friend.model")
const {getAllComment,getCountCmt}= require("./model/comment.model")
const {postloved}=require("./model/love.model")
const { promise } = require("bcrypt/promises")
const { on } = require("events")


const options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: 'admin',
	database: 'facebook_project'
};
const sessionstore=new MySQLStore(options)
app.use(session({
    secret: 'mysecrect', // fill anything
    resave: false,
    saveUninitialized: true,
    store:sessionstore
  }))
app.set("view engine", "ejs");
// app.set("views", `${__dirname}/view`);
app.use(express.static("public"))
app.use(upload.array())
app.use(cors())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended:true}))
app.use("/api/v1/post",routerUpload)
app.use("/api/v1/user",routesUser)
app.use("/api/v1/login",routerLogin)
app.use("/api/v1/noti",routerNoti)
app.use("/api/v1/friend",routerFriend)
app.use("/api/v1/comment",routerCmt)
app.use("/api/v1/love",routerLove)
app.get("/user/:id",(req,res)=>{

    let relation;
    let allpost;
  
    if (req.cookies.cookieToken.id_user==req.params.id) {
        relation="me"
    }
    
     Promise.all([getOneUser(req.params.id), getAllFriend(req.params.id),getOptionPost(req.params.id),getOneUser(req.cookies.cookieToken.id_user),getCountCmt(),postloved(req.cookies.cookieToken.id_user) ])
     .then(data=>{
        // console.log(data[0][0]);
        // console.log(data[1][0]);
        // console.log(data[2][0]);
        if (relation != "me") {
           let findindex=data[1][0].findIndex(item =>{
            return item.friend==req.cookies.cookieToken.id_user
           })
        //    console.log(findindex);
           if (findindex != -1) {
            allpost=data[2][0].filter(item=>{
                return (item.private=="friend" || item.private=="Public")
            })
            relation="friend"
           }else{
            allpost=data[2][0].filter(item=> item.private=="Public")
            relation="non-friend"
           }
        }else{
            allpost=data[2][0]
        }
        for(let index=0;index<allpost.length; index++){
            let find= data[4][0].find(item=>{
                return item.id_post== allpost[index].id_post
            })
            if(find){
                allpost[index]['number_cmt']= find.numberCmt
            }
        }
        let arr=data[5][0].map(item=>item.id_post)
        console.log(data[0][0][0]);
        // console.log(allpost);
        res.render("profile",{dataProfile:data[0][0][0],friend:data[1][0], relation:relation,dataPost:allpost, viewer:data[3][0][0],postLoved:arr})
     })    
})
app.get("/",(req,res)=>{
    if (req.cookies.cookieToken) {
    //   getAllComment(req.cookies.cookieToken.id_user)
    //   .then(data=>{
    //     res.json(data)
    //   })
       Promise.all([getAllComment(req.cookies.cookieToken.id_user),getAllPost(req.cookies.cookieToken.id_user),postloved(req.cookies.cookieToken.id_user)])
       .then(data=>{
        console.log("post_loved",data[2][0]);
        let arr=data[2][0].map(item=>item.id_post)
        console.log(data[0]);
        res.render("home",{dataPost:data[0],owner:data[1][0][0][0],noti:data[1][1][0],postLoved:arr})
       })

       
        
        // getAllPost(req.cookies.cookieToken.id_user)
        // .then(data=>{
        //     console.log("data Post",data[0][0]);
        // // {dataPost:data[0][0],avatar:data[1][0][0]}
        // res.render("home",{dataPost:data[0][0],owner:data[1][0][0],noti:data[2][0]})
        // })
        
    }else{
        res.redirect("/login")
    }
    
})
app.get("/login",(req,res)=>{
    res.sendFile("login.html",{root:"./public"})
})
// app.get("/home",(req,res)=>{
//     res.sendFile("home.html",{root:"./public"})
// })
app.get("/logout",(req,res)=>{
    res.clearCookie("cookieToken")
    res.status(200).json({
        status:"success!"
    })
    res.end()
})
// real time with socket Io
let onlineUser=[];
let addUser=function(username, socketId){
    !onlineUser.some(item=>item.username === username)&&
    onlineUser.push({username:username,id:socketId})
}
let removeUser=  async function(id){
    let findIndex=onlineUser.findIndex((item)=>{
        item.id==id
    })
    if (findIndex) {
        onlineUser.splice(findIndex,1)
    }
    
}
io.on('connection', (socket) => {
    socket.on('addUser',async (data)=>{
        await updateUserStatus(socket.id,"online",data)
        // addUser(data,socket.id)
        // console.log(onlineUser);
    })
    console.log(`⚡: ${socket.id} user just connected`);
    socket.on('disconnect', async () => {
     await removeStatus(socket.id)
      console.log(socket.id,' user disconnected');
      console.log(onlineUser);
    })
    socket.on('lovepost',async (data)=>{
        // let getid= onlineUser.find((item)=>{
        //     return item.username === data.reciver
        // })
        // let id= getid.id
        console.log(22222);
        let [result] = await find_socketId(data.reciver)
        console.log( result[0].socket_id);
        io.to(result[0].socket_id).emit('getnotifiLove',data)
    })
});
 
http.listen(port,()=>{
    console.log(`server is running on http://localhost/${port}`);
})
