const exp = require('express')
const adminApp = exp.Router();

//API
adminApp.get("/",(req,res)=>{
    res.send({message:"From admin api"});
})
module.exports = adminApp;