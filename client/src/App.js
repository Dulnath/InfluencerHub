import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import CreateNotificationforaddproject from "./components/CreateNotificationforaddproject";
import CreateNotificationforaddevent from "./components/CreateNotificationforaddevent";
//import "bootstrap/dist/css/bootstrap.min.css";

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route
              path="/addproject"
              element={<CreateNotificationforaddproject />}
            ></Route>
            <Route
              path="/addevent"
              element={<CreateNotificationforaddevent />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    );
  }
}
