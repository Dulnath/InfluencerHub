import React from 'react';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from './components/Home'
import AllUsers from './components/AllUsers'
import NewUsers from './components/NewUsers'
import AdminLogin from './components/AdminLogin';
import CommentReports from './components/CommentReports'
import AccountReports from './components/AccountReports';
import SuspendedUsers from './components/SuspendedUsers'
import AdminSettings from './components/AdminSettings'
import FirstLogin from './components/FirstLogin'

ReactDOM.render(
  <BrowserRouter>
      <Routes>
          <Route path="/" element={<AdminLogin />}></Route>
          <Route>
          <Route path="dashboard" element={<Home />} />
          <Route path="allUsers" element={<AllUsers />} />
          <Route path="newUsers" element={<NewUsers />} />
          <Route path="accountReports" element={<AccountReports />} />
          <Route path="commentReports" element={<CommentReports />} />
          <Route path="suspendedusers" element={<SuspendedUsers />} />
          <Route path="adminsettings" element={<AdminSettings />} />
          <Route path="firstlogin" element={<FirstLogin/>}/>
          </Route>
      </Routes>
    </BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
