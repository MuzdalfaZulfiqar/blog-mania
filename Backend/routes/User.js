const express = require('express')
// get the router
const router = express.Router()
// get user schema
const User = require('../models/Users')

// express validator setup
const {body, validationResult} = require("express-validator")

// bcrypt js setup for password hashing
const bcryptjs = require("bcryptjs")

// web token setup for user auth
const jwt = require("jsonwebtoken")
const jwt_secret = "blogMania"

let fetchUser = require("../middleware/fetchUser")
let success = false;

// creating api endpoint
router.post("/createUser"
    ,
    [
    // add a validator
    body("name", "Cannot be less than 3 characters").isLength({min:3}),
    body("email", "Not a valid email").isEmail(),
    body("password", "Password is not present").exists()
    ],
    async (req, res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            success = false;
            res.send({success, errors})
        }
        

        try {
            // check if the user with such email exists or not
            let user = await User.findOne({email :req.body.email})
            if(user){
                success = false;
            res.send({success, error : "User with such email already exists"})
            }

            // we did not got the user now we can be asured that the user is a new one so now create hashed password
            const salt = await bcryptjs.genSalt(10)
            const secPassword = await bcryptjs.hash(req.body.password, salt)

            // now move to stage of creating it
            user = await User.create({
                name : req.body.name,
                email : req.body.email,
                password : secPassword
            })
            success = true;
            res.send({success, user})
        } catch (error) {     
            res.send({success, error : "Not able to create a user"})
        }
    }
)


router.post("/login",
    [
        body("email", "Not a valid email").isEmail(),
        body("password", "Password is not present").exists()
    ],
    async (req, res)=>{
        let errors = validationResult(req)
        // errors in input
        if(!errors.isEmpty()){
            success = false;
            res.send({success, errors})
        }

        // not errors in input
        try {
            // check if the user with such email exists or not
            let user = await User.findOne({email : req.body.email})
            if(!user){
                success = false;
                res.send({success, error : "User with such email does not exist"})
            }

            // yes exists so now match the input password with the one the user you got from db
            const samePassword  = bcryptjs.compare(req.body.password, user.password)
            if(!samePassword){
                success = false;
                res.send({success, error : "Invalid Password"})
            }

            // the email is okay and the password in correct create a token 
            // the payload having our user id 
            let data = {
                user : {
                    id : user._id
                }
            }
            const token = jwt.sign(data, jwt_secret)
            success = true;
            res.send({success, token})
        } catch (error) {
            success = false;
            res.send({success, error : "Error while login"})
        }

    }
)


router.get("/getUser"
    , fetchUser,
    async (req,res)=>{
        try {
            let user = await User.findById(req.user.id).select("-password")
            if(!user){
                success = false
                res.send({success, error : "User cannot be found"})
            }

            res.send(user)
        } catch (error) {
            success = false
            res.send({success, error : "User cannot be found"})
        }
    }
)


// exporting router
module.exports = router