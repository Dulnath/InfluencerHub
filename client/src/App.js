import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreatePost from "./components/CreatePost";
import EditPost from "./components/EditPost";
import Home from "./components/Home";
import PostDetails from "./components/PostDetails";
import "bootstrap/dist/css/bootstrap.min.css";
import RequesttoCollaborateProject from "./components/RequesttoCollaborateProject";
import NotificationAddevent from "./components/Notificationaddevent";
import RemovalOfAProject from "./components/RemovalOfAProject";

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
            <Route
              path="/collaborateProject"
              element={<RequesttoCollaborateProject />}
            ></Route>
            <Route
              path="/notificationaddevent"
              element={<NotificationAddevent />}
            ></Route>
            <Route
              path="/removalofaproject"
              element={<RemovalOfAProject />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
