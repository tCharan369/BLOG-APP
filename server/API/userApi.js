const exp = require('express')
const userApp = exp.Router();
const UserAuthor = require('../models/userAuthorModel')
const expressAsyncHandller = require('express-async-handler');
const createUserOrAuthor = require('./createUserOrAuthor')
const Article = require('../models/articleModel')
//API

//create new user
userApp.post('/user',expressAsyncHandller(createUserOrAuthor))

// commnets
userApp.put('/comment/:articleId',expressAsyncHandller(async(req,res)=>{
    //get comment obj
    const commentObj = req.body
    //add comments obj to comments array of article
    const articleWithComments =  await Article.findOneAndUpdate(
        {articleId:req.params.articleId},
        {$push:{comments:commentObj}}, 
        {returnOriginal:false})
    res.send({message:"comment added",payload:articleWithComments})
}))

module.exports = userApp;

