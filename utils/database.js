const mysql=require("mysql2")
const pool=mysql.createPool({
    host:"localhost",
    user:"root",
    password:"admin",
    database:"facebook_project"
})
const db=pool.promise();
module.exports=db