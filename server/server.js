const exp = require("express");
const app = exp();
require('dotenv').config(); //process.env (makes all environemnt vars available in process(local obj in nodejs)  process.env is a variable
const mongoose = require('mongoose')
const userApp = require('./API/userApi')
const adminApp = require('./API/adminApi')
const authorApp = require('./API/authorApi')
const cors = require('cors');
app.use(cors());

const port = process.env.PORT || 4000 //if port no in env file doesnt exist it takes port no which is after || operator

//db connection
mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,()=>console.log("server listening on port ",port,".."))
    console.log("DB connection success")
})
.catch(err=>console.log("Error in DB connection ",err))

// body parser
app.use(exp.json())
//connect API routes
app.use('/user-api',userApp)
app.use('/author-api',authorApp)
app.use('/admin-api',adminApp)

app.use((err,req,res,next)=>{
    console.log("err obj in express error handler: ",err)
    res.send({message:err.message})
})