// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from "./Components/NavBar";
import BlogState from "./Context/Blog/BlogState";
import Home from "./Components/Home";
import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import BlogDisplay from "./Components/BlogDisplay";
import AuthorBlogs from "./Components/AuthorBlogs";
import AllBlogsForAllUser from "./Components/AllBlogsForAllUser";
import EditBlog from "./Components/EditBlog";

function App() {
  return (
    <BlogState>
      <NavBar />
      <div>
        <Routes>
          <Route path="/" element={<AllBlogsForAllUser />} />
          <Route path="/write" element={<Home />} />
          {/* <Route path="/blogDisplay" element={<BlogDisplay />} /> */}
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authorBlogs" element={<AuthorBlogs />} />
          {/* <Route path="/blogs" element={<AllBlogsForAllUser />} /> */}
          <Route path="/blogs/:id" element={<BlogDisplay />} />
          <Route path="/blogs/edit/:id" element={<EditBlog />} />
        </Routes>
      </div>
    </BlogState>
  );
}

export default App;
