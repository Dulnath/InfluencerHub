import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./Components/posts-and-comments/CreatePost";
import EditPost from "./Components/posts-and-comments/EditPost";
import Home from "./Components/posts-and-comments/Home";
import PostDetails from "./Components/posts-and-comments/PostDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/add" element={<CreatePost />}></Route>
            <Route path="/edit/:id" element={<EditPost />}></Route>
            <Route path="/post/:id" element={<PostDetails />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
