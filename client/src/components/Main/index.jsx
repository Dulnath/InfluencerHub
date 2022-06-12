import styles from "./styles.module.css";
import SearchM from "../SearchM";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import {  useNavigate} from "react-router-dom";
import image from "../../images/user.jpg";
import Dropdown from 'react-bootstrap/Dropdown';
import {Link,Outlet} from 'react-router-dom'

import Login from '../Login/index'
function Main(props) {
	//const loggedInUser = localStorage.getItem("token");
	const [fname, setUserName] = useState('');
	const [id, setId] = useState('');
	const navigate = useNavigate();
	const loggedInUser = localStorage.getItem('token')

	//logout function
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	//By this,we are retrieving the firstName of user
	useEffect(() => {
		const userToken = localStorage.getItem("token");
		const user = ParseJwt(userToken);
		if (userToken) {
			const response = axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((response) => {

				setUserName(response.data.firstName);
				setId(response.data._id);
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

					<div className={styles.main_container}>
						<nav className={styles.navbar}>
							<h1>InfluencerHub</h1>
							<Dropdown>
								<Dropdown.Toggle variant="success" id="dropdown-basic">
									{fname} &ensp;
									<img src={image} className={styles.image1_img} alt="..." />
								</Dropdown.Toggle>

								<Dropdown.Menu>
									<Dropdown.Item><Link to = {'/profileview'}>Profile</Link></Dropdown.Item>
									<Dropdown.Item><Link to={`/update/${id}`}>Settings</Link></Dropdown.Item>

								</Dropdown.Menu>
							</Dropdown>

							<button className={styles.white_btn} onClick={handleLogout}>
								Logout
							</button>

						</nav>
						

						<h2><button className={styles.white_btn1} onClick={() => { navigate(`/detailm`) }}>
							View All Businesses
						</button></h2>

						<SearchM />
					</div>
				</nav>
			</div>
					);
		}else{
			return(
				<div>
					<Login></Login>
				</div>
			)
		}
};

export default Main;
