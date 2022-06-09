import { Route, Routes, Navigate } from "react-router-dom";
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Home from './components/admin-pages/Home'
import AllUsers from './components/admin-pages/AllUsers'
import NewUsers from './components/admin-pages/NewUsers'
import AdminLogin from './components/admin-pages/AdminLogin';
import CommentReports from './components/admin-pages/CommentReports'
import AccountReports from './components/admin-pages/AccountReports';
import SuspendedUsers from './components/admin-pages/SuspendedUsers'
import AdminSettings from './components/admin-pages/AdminSettings'
import FirstLogin from './components/admin-pages/FirstLogin'
import Category from './components/Category/category'
import EditAccount from './components/admin-pages/EditAccount'
import Main from "./components/Main";
import Signup from "./components/Singup/index";
import SignupBusiness from './components/Singup/indexb'
import Login from "./components/Login";
import Business from "./components/Business"
import EmailVerify from "./components/EmailVerify";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Detail from "./components/Detail";
import View from "./components/View";
import Search from "./components/Search";
import Filter from "./components/Filter";
import ViewAdmin from './components/ViewAdmin'

function App() {
  const user = localStorage.getItem('token');
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
        <Route path="firstlogin" element={<FirstLogin />} />
        <Route path="editaccount" element={<EditAccount />} />
      </Route>
      {user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
      <Route path="/signupb" exact element={<SignupBusiness />} />
      <Route path="/category" exact element={<Category />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/users/:id/verify/:token" element={<EmailVerify />} />
			<Route path="/forgot-password" element={<ForgotPassword />} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset />} />
			<Route path="/detail" exact element={<Detail />} />
			<Route path="/search" exact element={<Search />} />
			<Route path="/view/:id" exact element={<View />} />
      <Route path="/viewadmin/:id" exact element={<ViewAdmin />} />
			<Route path="/filter" exact element={<Filter />} />
      <Route path="/business" exact element={<Business />} />
    </Routes>
  );
};

export default App;

