const userAuthor = require('../models/userAuthorModel')

async function createUserOrAuthor(req,res){
    //logic to create user or author
        //get user/author obj from req
        const newUserAuthor = req.body;
        //find the user by email id (using email to identify user/author)
        const userInDb = await userAuthor.findOne({email:newUserAuthor.email})
        //if user or author exists with that email
        if(userInDb!=null){
            //check roles ( 1 email - 1 role)
            if(newUserAuthor.role === userInDb.role){
                res.status(200).send({message:newUserAuthor.role,payload:userInDb})
            }else{
                //if role is not matched
                res.status(200).send({message:"Invalid role"})
            }
        }else{
            let newUser = new userAuthor(newUserAuthor)
            let newUserOrAuthorDoc = await newUser.save()
            res.status(201).send({message:newUserOrAuthorDoc.role,payload:newUserOrAuthorDoc})
        }
}   

module.exports = createUserOrAuthor;