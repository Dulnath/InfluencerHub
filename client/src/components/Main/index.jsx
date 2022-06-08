import styles from "./styles.module.css";
import Search from "../Search";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


function Main(props) {
    const loggedInUser = localStorage.getItem("token");
    const [fname, setUserName] = useState('');
   

		const handleLogout = () => {
			localStorage.removeItem("token");
			window.location.reload();
		};


    useEffect(() => {
		const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        if(userToken){
			const response = axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((response) => {
        
            setUserName(response.data.user.firstName);
            
            console.log(response.data);
		})
		if(response.staus!=='ok'){
			setUserName('default');
		}
	}
        
       
    }, [])



	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>InfluencerHub</h1>
				<h2> User:{fname}</h2>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
				
			</nav>
			<Search />
	
		</div>
	);
};

export default Main;
