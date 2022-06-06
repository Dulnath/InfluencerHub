import { Routes, Route } from "react-router-dom"
import React from 'react'
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
import EditAccount from './components/EditAccount'

function App() {
  return (
    <Routes>
          <Route path="adminlogin" element={<AdminLogin />}></Route>
          <Route>
          <Route path="dashboard" element={<Home />} />
          <Route path="allUsers" element={<AllUsers />} />
          <Route path="newUsers" element={<NewUsers />} />
          <Route path="accountReports" element={<AccountReports />} />
          <Route path="commentReports" element={<CommentReports />} />
          <Route path="suspendedusers" element={<SuspendedUsers />} />
          <Route path="adminsettings" element={<AdminSettings />} />
          <Route path="firstlogin" element={<FirstLogin/>}/>
          <Route path="editaccount" element={<EditAccount/>}/>
          </Route>
      </Routes>
  );
}

export default App;
