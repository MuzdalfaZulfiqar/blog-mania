const express = require('express')
const router = express.Router()

let Blog = require("../models/Blog")

let fetchUser = require("../middleware/fetchUser")
const { body, validationResult } = require('express-validator')

let success = false

const multer = require('multer');
const path = require('path');


// Configure Multer for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'Backend/uploads/'); // Save files to 'uploads' directory
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    },
  });
  
  const upload = multer({ storage });
  
  // Define the route for handling image uploads
  router.post('/uploadImage', upload.single('image'), (req, res) => {
    if (req.file) {
      res.json({ success: 1, file: { url: `Backend/uploads/${req.file.filename}` } });
    } else {
      res.json({ success: 0, message: 'Image upload failed' });
    }
  });
  

router.post("/createBlog",

    // validation array we only need to check that some content must exist
    // [
    //     body("content", "Blog cannot be empty").exists()
    // ],
    async (req,res)=>{
        // let errors = validationResult(req)
        // if(!errors.isEmpty()){
        //     success = false;
        //     res.send({success, errors})
        // }

        try {

            let blog = await Blog.create({
                title : req.body.title,
                author : req.body.author,
                authorName : req.body.authorName,
                briefDescription : req.body.briefDescription,
                content : req.body.content,
                categories : req.body.categories,
                likes : req.body.likes,
                isSaved : req.body.isSaved,
                comments : req.body.comments
            })
    
            success = true;
            res.send({success, blog})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }
    }
)

router.get("/getAll", 
    async (req, res)=>{
        try {
            
            let blogs = await Blog.find({})
           if (!blogs){
            res.send({success, error : "Not able to get the blogs"})
           }
    
           success = true
           res.send({success, blogs})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }
    }
)

// the blog with particular id
router.get("/getBlog/:id",
    async (req,res)=>{
        let id = req.params.id
        try {
            let blog = await Blog.findById(id)
            if(!blog){
                res.send({success, error : "Not able to get the blog"})
            }

            success = true
            res.send({success, blog})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }
    }
)

// get the blogs of a particular author
router.get("/getBlogsByAuthor",
    fetchUser, 
    async (req, res)=>{
        let userId = req.user.id;
        try {
            let blogs = await Blog.find({author : userId})
            if(!blogs){
                res.send({success, error : "Not able to get the blog of the author"})
            }

            success = true
            res.send({success,blogs})
        } catch (error) {
             res.send({success, error : "Internal Server Error"})
        }
    }
)




router.delete("/deleteBlog/:id",
    fetchUser,
    async (req,res)=>{
        let userId = req.user.id;
        let blogId = req.params.id

        try {
            let blog = await Blog.findOne({_id : blogId})
        
            if(!blog){
                res.send({success, error : "Not able to get the blog"})
            }

            if(blog.author != userId){
                res.send({success, error : "Sorry you do not have the access to delete this blog"})
            }

            blog = await Blog.findByIdAndDelete({_id : blogId})
            if(!blog){
                res.send({success, error : "Blog cannot be deleted"})
            }


            success = true
            res.send({success,blog})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }
    }
)

router.put("/updateBlog/:id",

    fetchUser,
    async (req,res)=>{
        let userId = req.user.id;
        let blogId = req.params.id

        let { title, author, authorName, categories, content, comments, likes,isSaved} = req.body

        try {
            let blog = await Blog.findOne({_id : blogId})
        
            if(!blog){
                res.send({success, error : "Not able to get the blog"})
            }

            if(blog.author != userId){
                res.send({success, error : "Sorry you do not have the access to update this blog"})
            }
            let newBlog = {};
            if(title){newBlog.title = title}
            if(categories){newBlog.categories= categories}
            if(content){newBlog.content=content}
            if(briefDescription){newBlog.briefDescription=briefDescription}
            if(comments){newBlog.comments = comments}
            if(likes){newBlog.likes = likes}
            if(isSaved){newBlog.isSaved = isSaved}
            if(author){newBlog.author=author}
            if(authorName){newBlog.authorName=authorName}

            blog = await Blog.findByIdAndUpdate(blogId, {$set : newBlog}, {new : true})

            success = true
            res.send({success,blog})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }
    }
)


// get route for category
router.get("/getBlogsByCategory/:category",
    async (req, res)=>{

        let category = req.params.category;

        try {
            // search the blog collection and whole documents of it where categories is an array having the category value
            let blogs = await Blog.find({categories : category})
            if(!blogs){
                res.send({success, error : "Sorry the category cannot be found"})
            }

            success = true
            res.send({success, blogs})
        } catch (error) {
            res.send({success, error : "Internal Server Error"})
        }

    }
)

module.exports = router
