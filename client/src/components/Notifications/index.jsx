import { useState, useEffect } from "react";
import axios from 'axios';
import ParseJwt from '../../utilities/ParseJwt';
import React, { Component }  from 'react';
import MainMenu from '../Main/MainMenu';
import {Container,Row,Col, Button, Dropdown, DropdownButton} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import styles from './styles.module.css';
function ViewNotifications() {

    const [notificationList, setNotificationList] = useState([]);
	const [newestFirst, setNewestFirst] = useState(true);	

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
	
	let sortedList;
    if (newestFirst === true) {
        sortedList = notificationsdisplayed.sort((a, b) => new Date(b.NotificationTime) - new Date(a.NotificationTime));
    } else {
        sortedList = notificationsdisplayed.sort((a, b) => new Date(a.NotificationTime) - new Date(b.NotificationTime))
    }
	return(
		<div>
		<MainMenu></MainMenu>
		<div>
                <DropdownButton variant="success" title="Sort By">
                    <Dropdown.Item onClick={() => setNewestFirst(true)}>Newest First</Dropdown.Item>
                    <Dropdown.Item onClick={() => setNewestFirst(false)}>Oldest first</Dropdown.Item>
                </DropdownButton>
        </div>	
		<br/>
		<br />
		<br />
		{sortedList.map((sortedList) => {					
			return (
			  <div>
				 <Container fluid="md" className={styles.record}>				  
				  <Row>
                     <Col>{sortedList.Notificationmessage}<span className={styles.btn} onClick={() => MarkAsRead(sortedList._id)}>Mark As Read</span></Col>                       
                </Row>                          
                    </Container>
			  </div>			  
			);			
		  }		  
		  )}
		  </div>
		  )
}
export default ViewNotifications;