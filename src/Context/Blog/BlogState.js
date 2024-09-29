import React from 'react'
import BlogContext from './BlogContext'
import Modal from "react-bootstrap/Modal";

function BlogState(props) {

    const [show, setShow] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const [variant, setVariant] = React.useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // let success = false
    let host = "http://localhost:3001";

    let [blogs, setBlogs] = React.useState([])

    async function createBlog(title,author,authorName, briefDescription, content, comments,categories,likes,isSaved){
        try {
            let response = await fetch(`${host}/api/blog/createBlog`,
                {
                    method : 'POST',
                    headers : {
                        "Content-type": "application/json",
                        "auth-token" : localStorage.getItem("auth-token")
                    }
                    ,
                     body: JSON.stringify({title, author,authorName, briefDescription, content, comments,categories,likes,isSaved})
                }
            )
            let data = await response.json()

            let {success, blog} = data;
            if (success) {
                setMessage("Published Successfully")
                setVariant("Success")
                setShow(true);
                setTimeout(() => {
                  setShow(false);
                //   we can later on decide that how to show the preview
                //   navigate('/login'); // Redirect to login after successful signup
                }, 2000);
              }
              else{
                setVariant("Error")
                setMessage("Could not be Published")
                setShow(true)
              }
        } catch (error) {
        }
    }

    async function getAll() {
        try {
            let response = await fetch("http://localhost:3001/api/blog/getAll",
                {
                    method : 'GET',
                    headers : {
                        "Content-type": "application/json"
                    }
                }
            )


            let data = await response.json()
            // success=true
            setBlogs(data.blogs)
        } catch (error) {
        }
    }

    async function getBlogById(id) {
        try {
            let response = await fetch(`http://localhost:3001/api/blog/getBlog/${id}`,
                {
                    method : "GET",
                    headers :{
                          "Content-type": "application/json"
                    }
                }
            )
            let data = await response.json()
            setBlogs(data.blog)

        } catch (error) {
            
        }
    }
    

    async function getBlogByAuthor() {
        try {
            let response = await fetch(`http://localhost:3001/api/blog/getBlogsByAuthor`,
                {
                    method : "GET",
                    headers :{
                          "Content-type": "application/json",
                          "auth-token" : localStorage.getItem("auth-token")
                    }
                }
            )
            let data = await response.json()
            setBlogs(data.blogs)

        } 
        catch (error) {
            
        }
    }

    async function deleteBlog(id){
        console.log(id)
        try {
            let response = await fetch(`http://localhost:3001/api/blog/deleteBlog/${id}`,
                {
                    method : "DELETE",
                    headers :{
                          "Content-type": "application/json",
                          "auth-token" : localStorage.getItem("auth-token")
                    }
                }
            )
            let data = await response.json()
            let {success, blog} = data
            if(success){
                setMessage("Deleted Successfully")
                setVariant("Success")
                setShow(true);
                setTimeout(() => {
                  setShow(false);
                //   we can later on decide that how to show the preview
                //   navigate('/login'); // Redirect to login after successful signup
                }, 2000);
            }
        } catch (error) {
            setVariant("Error")
            setMessage("Could not be Deleted")
            setShow(true)
        }
    }

  return (
    <>
    <BlogContext.Provider value={{blogs, getAll, createBlog,getBlogById,getBlogByAuthor,deleteBlog}}>
        {props.children}
    </BlogContext.Provider>
    {
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{variant}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
           {message}
          </Modal.Body>

        </Modal>
      }
    </> 
  )
}

export default BlogState