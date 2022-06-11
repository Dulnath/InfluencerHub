import styles from "./styles.module.css";
import Search from "../Search";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import image from "../../images/user.jpg";
import Login from '../Login/index'
import { Outlet, Link } from "react-router-dom";

function Main(props) {
	const loggedInUser = localStorage.getItem("token");
	const cUser = ParseJwt(loggedInUser);
	const [fname, setUserName] = useState('');
	const navigate = useNavigate();

	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};


	useEffect(() => {
		const userToken = localStorage.getItem("token");
		const user = ParseJwt(userToken);
		if (userToken) {
			const response = axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((response) => {

				setUserName(response.data.firstName);
			})
			if (response.staus !== 'ok') {
				setUserName('default');
			}
		}
	}, [])
	if (loggedInUser) {
		
		return (
			<div className={styles.main_container}>
				<nav className={styles.navbar}>
					<h1>InfluencerHub</h1>
					<h2> User:{fname}</h2>
					<img src={image} className={styles.image1_img} alt="..." />

					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>

				</nav>

				<h2><button className={styles.white_btn1} onClick={() => { navigate(`/detail`) }}>
					View All influencers
				</button></h2>

				<Search />

			</div>
		);
	} else {
		return (
			<div>
				<Login></Login>
			</div>
		);
	}
};

export default Main;
