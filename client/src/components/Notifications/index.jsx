import styles from "./styles.module.css";
import {  useNavigate} from "react-router-dom";
import { useState, useEffect } from "react";
import axios from 'axios';
import ParseJwt from '../../utilities/ParseJwt';
import React, { Component }  from 'react';
import MainMenu from '../Main/MainMenu';
import { Button, Card } from "react-bootstrap";
function ViewNotifications() {

    const [notificationList, setNotificationList] = useState([]);	

	const token = localStorage.getItem("token");
	const loggedinuser = ParseJwt(token);
	

	useEffect(()=> {
		axios.get("http://localhost:5000/notifications").then((response) => {
			setNotificationList(response.data);						
		})		
	},[])

	function MarkAsRead(_ID){
		axios.put(`http://localhost:5000/notifications/update/${_ID}`).then((response) => {
            console.log("Notification has been updated");
        }).catch((error) => {
            console.log(error.response);
        });
	};
	
	const notificationsdisplayed = notificationList.filter((notifications) => notifications.ReceiverId === loggedinuser._id)	
	return(
		<div>
		<MainMenu></MainMenu>	
		{notificationsdisplayed.map((notifications) => {			
			if(notifications.Seen === false){
				MarkAsRead(notifications._id);
			return (
			  <div>
				<Card border="dark">
				  <div className="details">					
					<span className="data">{notifications.Notificationmessage}</span>
				  </div>				  
				</Card>
			  </div>			  
			);			
			}			
		  }		  
		  )}
		  </div>
		  )
}
export default ViewNotifications;