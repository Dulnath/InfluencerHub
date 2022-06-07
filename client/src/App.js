import { Routes, Route } from "react-router-dom"
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

import Home from './components/admin-pages/Home'
import AllUsers from './components/admin-pages/AllUsers'
import NewUsers from './components/admin-pages/NewUsers'
import AdminLogin from './components/admin-pages/AdminLogin';
import CommentReports from './components/admin-pages/CommentReports'
import AccountReports from './components/admin-pages/AccountReports';
import SuspendedUsers from './components/admin-pages/SuspendedUsers'
import AdminSettings from './components/admin-pages/AdminSettings'
import FirstLogin from './components/admin-pages/FirstLogin'
import EditAccount from './components/admin-pages/EditAccount'

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
