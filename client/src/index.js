import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import "mdb-react-ui-kit/dist/css/mdb.min.css"
import { AuthContextProvider } from "./context/AuthContext";
ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
		<AuthContextProvider><App /></AuthContextProvider>
			
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById("root")
);
