import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Signupb from "./components/Singup/indexb";
import Category from "./components/Category/category";
import ForgotPassword from "./components/ForgotPassword";
import PasswordReset from "./components/PasswordReset";
import Detail from "./components/Detail";
import View from "./components/View";
import Payment from "./components/Payment";


function App() {
	const user = localStorage.getItem("token");

	return (
		<Routes>
			{user && <Route path="/" exact element={<Main />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/signupb" exact element={<Signupb />} />
			<Route path="/category" exact element={<Category />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path="/forgot-password" element={<ForgotPassword/>} />
			<Route path="/password-reset/:id/:token" element={<PasswordReset/>} />
			<Route path="/detail" exact element={<Detail />} />
			<Route path="/view/:id" exact element={<View />} />
			<Route path ="/payment" exact element={<Payment/>}/>

		</Routes>
	);
}

export default App;
