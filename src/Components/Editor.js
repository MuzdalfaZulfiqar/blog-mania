import React, { useEffect, useRef } from "react";
import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Code from "@editorjs/code";
import Paragraph from "@editorjs/paragraph";
import Image from "@editorjs/image";
import Quote from "@editorjs/quote";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";
import Warning from "@editorjs/warning";

// get the blog context to make the api requets
import { useContext } from "react";
import BlogContext from "../Context/Blog/BlogContext"

const DEFAULT_INITIAL_DATA = {
  time: new Date().getTime(),
  blocks: [
    {
      type: "header",
      data: {
        text: "This is my awesome editor!",
        level: 1,
      },
    },
  ],
};

const EDITOR_HOLDER_ID = "editorjs";

const Editor = () => {
  // let [user, setUser] = React.useState({});

  // the setup for context
  let context = useContext(BlogContext)
  // we will use the create function when user will click on submit blog button
  let {blogs, getAll, createBlog} = context


  // dealing with this form because we have different types of inputs that our user wants while creatin the blog
  let [formData, setFormData] = React.useState({
    title: "",
    // author is object at start just for some testing purpose
    author: {},
    authorName : "",
    // the content will be the one we will get from the user when he will add somethinng in editor
    content: "",
    // it will be an array and we will deal its length based on user input dynamically
    categories: [],
    likes: 0,
    isSaved: false,
    comments: [],
    categoriesNumber : 0 ,
    briefDescription : ''
    // this is just to decide that how many categories user wants to add
  });
  function handleChange(event) {
    let {name,value} = event.target
    setFormData((prevForm)=>(
      {...prevForm,
        [name] : value
      }
    ))
  }
  function handleSubmit(event) {
    event.preventDefault();
    createBlog(formData.title,formData.author,formData.authorName,formData.briefDescription, formData.content,formData.comments,formData.categories,formData.likes,formData.isSaved)
  }

  function handleCategoriesInputChange(event){
      let value = event.target.value;
      
      setFormData((prevForm)=>{
        return (
        {  ...prevForm,
          categoriesNumber : value,
          categories :  Array.from({ length: value }, (_, i) => "")}
        )
      })
  }

  function handleIndividualCategory(event,index){
      let updatedCategoryArray = [...formData.categories]
      updatedCategoryArray[index] = event.target.value
      setFormData((prevForm)=>{
          return (
            {
              ...prevForm,
              categories : updatedCategoryArray
            }
          )
      })
  }
  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      let response = await fetch("http://localhost:3001/api/user/getUser", {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      let user = await response.json();
      // console.log("user = " + JSON.stringify(user));
      // setUser(user1);
      setFormData((prevForm) => {
        return { ...prevForm, author: user , authorName : user.name};
      });
    } catch (error) {}
  }

  const ejInstance = useRef(null);

  useEffect(() => {
    if (!ejInstance.current) {
      initEditor();
    }

    return () => {
      if (ejInstance.current) {
        ejInstance.current.destroy();
        ejInstance.current = null;
      }
    };
  }, []);

  const initEditor = () => {
    const editor = new EditorJS({
      holder: EDITOR_HOLDER_ID,
      logLevel: "ERROR",
      data: DEFAULT_INITIAL_DATA,
      onReady: () => {
        ejInstance.current = editor;
      },
      onChange: async () => {
        if (ejInstance.current) {
          const contentOfEditor = await ejInstance.current.saver.save();
          // Put your logic here to save this data to your DB
          setFormData((prevForm) => {
            return {
              ...prevForm,
              content: contentOfEditor,
            };
          });
        }
      },
      autofocus: true,
      tools: {
        header: Header,
        list: List,
        code: Code,
        paragraph: Paragraph,
        image: {
          class: Image,
          inlineToolbar: true,
          config: {
            uploader: {
              uploadByFile: async (file) => {
                const formData = new FormData();
                formData.append("image", file);
                // Implement file upload logic here
                try {
                  let response = await fetch("http://localhost:3001/api/blog/uploadImage",
                    {
                      method: "POST",
                      body: formData,
                    }
                  )

                  const result = await response.json();
                  if (result.success) {
                    return {
                      success: 1,
                      file: {
                        url: `http://localhost:3001/${result.file.url}`,
                      },
                    };
                  } else {
                    return { success: 0, message: "Image upload failed" };
                  }
                } catch (error) {
                  console.error("Error uploading image:", error);
                  return { success: 0, message: "Image upload failed" };
                }
                
              },
            },
          },
        },
        quote: Quote,
        delimiter: Delimiter,
        "inline-code": InlineCode,
        warning: Warning,
      },
    });
  };

  return (
    <>
      <React.Fragment>
        
        
      <form onSubmit={handleSubmit} 
      className="container col-md-10"
      >
        <div  className="container col-md-8">

          <div className="mb-3">
            <label for="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control input"
              id="title"
              aria-describedby="title"
              placeholder="Enter title of blog"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="briefDescription" className="form-label">
              Brief Description 
            </label>
            <input
              type="text"
              className="form-control input"
              id="briefDescription"
              aria-describedby="briefDescription"
              placeholder="Enter brief description of blog"
              name="briefDescription"
              value={formData.briefDescription}
              onChange={handleChange}
            />
          </div>
          <div className="mb-3">
            <label for="categories" className="form-label">
              Categories
            </label>
            <input 
            type="Number" className="form-control input" id="categories" 
            placeholder="Enter # of categories"
            name = "categoriesNumber"
            value={formData.categoriesNumber}
            onChange={handleCategoriesInputChange}
            />
          </div>
          {/* {console.log(formData.categories)} */}

          {formData.categories.map((category,index)=>(
            <div key={index} className="form-group my-2">
            <label htmlFor={`category-${index}`}>
              Category {index + 1}
            </label>

            <input
              type="text"
              className="form-control inputBorder input"
              id={`category-${index}`}
              placeholder={`Enter category `}
              value={category}
              onChange={(event) => handleIndividualCategory(event,index)}
            />
          </div>
          ))}
        </div>

        <div id={EDITOR_HOLDER_ID} className="w-100"> </div>
        <div   className="container col-md-8">

          <button type="submit" className="btn publishButton">
            Publish
          </button>
        </div>
      </form>
      </React.Fragment>

    </>
  );
};

export default Editor;
