const express = require('express')
const { validationResult ,body} = require('express-validator')
const router = express.Router()

let Comment = require("../models/Comment")
const fetchUser = require('../middleware/fetchUser')
let success = false

router.post("/createComment",
    // we need this because we need to know our user who has logged in
    fetchUser,
    [
        body("content").exists()
    ],
    async (req,res)=>{

        let commentorId = req.user.id
        
        let errors = validationResult(req)
        if(!errors.isEmpty()){
            success = false;
            res.send({success, errors})
        }

        // let user = User.find
        try {
            let comment = await Comment.create({

                // in the frontend use this id to make a request for finding user with id = commentorId
                commentor : commentorId,
                blog : req.body.blog,
                content : req.body.content
            })

            if(!comment){
                success = false;
                res.send({success, error : "Comment was not added"})
            }

            success = true;
                res.send({success,comment})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }
    }
)

// get the comments of a particular blog
router.get("/getComments/:blogId",
    async (req,res)=>{
        let blogId = req.params.blogId 
        
        try {
            
            let comments = await Comment.find({blog : blogId})
            if(!comments){
                success = false;
                res.send({success, error : "Comments not found"})
            }

            success = true;
            res.send({success,comments})
        } catch (error) {
            res.send({success, error : "Internal Server Error"}) 
        }
    }
)

module.exports = router