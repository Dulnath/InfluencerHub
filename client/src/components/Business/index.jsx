import styles from "./styles.module.css";
import Search from "../Search";
import { Outlet, Link } from "react-router-dom";
import ParseJwt from "../../utilities/ParseJwt";
import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from '../Login';
import { useParams, useNavigate} from "react-router-dom";
import image from "../../images/user.jpg";
//import user from "../../../../server/models/user";
import Dropdown from 'react-bootstrap/Dropdown';
import { DropdownButton } from "react-bootstrap";
import MainMenu from "../Main/MainMenu";

function Business(props) {
    const loggedInUser = localStorage.getItem("token");
	const [id,setUsrId] = useState('')
    const [fname, setUserName] = useState('');
	const [category,setCategory] = useState('');

   
    const navigate = useNavigate();
	
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

    useEffect(() => {
		const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        if(userToken){
		
			const response = axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((response) => {
			
            setUserName(response.data.firstName);
			setUsrId(response.data._id);
			setCategory(response.data.category)
	
			console.log(response.data._id);
		})
		if(response.staus!=='ok'){
			setUserName('default');
		}
	}
        
       
    }, [])



	if(loggedInUser){
			return (
				<div className={styles.main_container}>
					<MainMenu></MainMenu>
			
					<h2><button className={styles.white_btn1}  onClick={() => {navigate(`/detail`)}}>
							View All influencers
						</button></h2>
					<Search category={category}/>
			
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

export default Business;
