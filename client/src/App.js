import { Route, Routes, Navigate } from "react-router-dom";
import Main from "./components/Main";
import Signup from "./components/Singup";
import Login from "./components/Login";
import Signupb from "./components/Singup/indexb";
import Category from "./components/Category/category";
import Detail from "./components/Detail";
import View from "./components/View";

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
			<Route path="/detail" exact element={<Detail />} />
			<Route path="/view/:id" exact element={<View />} />
		</Routes>
	);
}

export default App;
