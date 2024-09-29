import React from 'react'
// get the blog context to make the api requets
import { useContext ,useEffect} from "react";
import BlogContext from "../Context/Blog/BlogContext"
import BlogsCard from './BlogsCard';
import { useNavigate } from "react-router-dom";


function AllBlogsForAllUser() {
    let navigate = useNavigate()

    let context = useContext(BlogContext)
    let {blogs,getAll} = context

    function handleBlogView(id){
        // defining the route here so that when user clicks on the blog it will move to thsis page now we have defined a route for this in our app.js page so when we will go to this page a new component where it will get the id from the params and then based on that id it will get the content
        navigate(`/blogs/${id}`)
      }
    
    useEffect(()=>{
    // with this we will have something in our blogs
        getAll()  
    },[])

    console.log(blogs)
    let allMappedBlogs = blogs.map((blog)=>{
        return (
          <BlogsCard
            id = {blog._id}
            name = {blog.authorName}
            title = {blog.title}
            briefDescription = {blog.briefDescription}
            createdAt = {blog.createdAt}
            viewBlog = {handleBlogView}
            content = {blog.content}
          />
        )
      })
  return (
    <>
     <div className='container d-flex flex-column align-items-center'>
      <h2 className='my-4'>Blogs</h2>
      <div className='d-flex flex-column align-items-center w-100'>
        {allMappedBlogs}
      </div>
    </div>
    </>
  )
}

export default AllBlogsForAllUser
