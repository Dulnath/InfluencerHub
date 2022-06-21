import React from 'react'
import MainMenu from '../Main/MainMenu'
import { useState, useEffect } from "react";
import axios from 'axios';
import ParseJwt from '../../utilities/ParseJwt';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const Paymenti = () => {

    const [notificationList, setNotificationList] = useState([]);
    const [dollers, setDollers] = useState([]);
 
  
    const token = localStorage.getItem("token");
    const loggedinuser = ParseJwt(token);
    
 useEffect(()=>{
  axios.get("http://localhost:5000/getPayment").then((response) => {
        setNotificationList(response.data.payments);			
        console.log(response.data.payments);
       
        
 }) 
    			
      },[])	
    


  console.log(loggedinuser._id);
  console.log(notificationList.influencerId);

//setDollers(notificationList.amount)
//console.log(dollers);
    
    const notificationsdisplayed = notificationList.filter((notifications) => notifications.influencerId === loggedinuser._id)
    
   console.log(notificationsdisplayed);
      return(
      <div style={{height:"100vh",background:"#e6e6e6"}}>
      <MainMenu></MainMenu>
  {notificationsdisplayed.map((p)=>(
    <>
    <div>{p.paidby}
    
    
    </div>
    <div>{p.amount}</div>
  
    </>
   
  ))}
   
        </div>
  )
  
}

export default Paymenti
