import { useState, useEffect } from "react";
import axios from 'axios';
import ParseJwt from '../../utilities/ParseJwt';
import React, { Component }  from 'react';
import MainMenu from '../Main/MainMenu';
import { Card } from "react-bootstrap";
import {Container,Row,Col, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from '../../styles/styles.module.css';
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
		{notificationsdisplayed.map((notificationsdisplayed) => {					
			return (
			  <div>
				<Card border="dark">				  
				  <Row>
                     <Col xs={7} md={10}>{notificationsdisplayed.Notificationmessage}<span className={styles.btnRed} onClick={() => MarkAsRead(notificationsdisplayed._id)}>Mark As Read</span></Col>                       
                </Row>                          
                    </Card>
			  </div>			  
			);			
		  }		  
		  )}
		  </div>
		  )
}
export default ViewNotifications;