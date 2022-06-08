import styles from "./styles.module.css";
import Search from "../Search";
import {Nav,Navbar,Container} from 'react-bootstrap'
import { Outlet, Link } from "react-router-dom";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardContent from 'react-bootstrap/Card';
import { Row, Col, NavLink } from 'react-bootstrap'
import Login from '../Login';
import { useParams, useNavigate} from "react-router-dom";


function Business(props) {
    const loggedInUser = localStorage.getItem("token");
    const [fname, setUserName] = useState('');
   
    const navigate = useNavigate();
		const handleLogout = () => {
			localStorage.removeItem("token");
			window.location.reload();
		};


    useEffect(() => {
		const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        if(userToken){
			const response = axios.get(`http://localhost:8080/api/users/getuser/${user._id}`).then((response) => {
        
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
            <h2><button className={styles.white_btn1}  onClick={() => {navigate(`/detail`)}}>
					View All influencers
				</button></h2>
			<Search />
	
		</div>
	);
};

export default Business;
