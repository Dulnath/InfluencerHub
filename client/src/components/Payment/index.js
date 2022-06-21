import MainMenu from '../Main/MainMenu';
import axios from "axios";
import React, { useState } from "react";
import ReactDOM from "react-dom"
import { useParams } from "react-router-dom";
import ParseJwt from "../Utilities/ParseJwt";
const PayPalButton = window.paypal.Buttons.driver("react", { React, ReactDOM });



const Payment =() =>{
   const id =useParams().id

   const userToken = localStorage.getItem("token");
  const user = ParseJwt(userToken);  
const [doller, setDoller] = useState("");
const [pypl, setPypl] = useState("");
  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: doller,
          },
          payee: {
            email_address: pypl
          }
        },
      ],
    });
  };
  const onApprove =async (data, actions) => {
   console.log(data);
   const order = await actions.order.capture();
   console.log(order);
   console.log(id);
   console.log("hello");

   console.log(user._id);
   axios.get(`http://localhost:5000/getProject/${id}`).then((response) => {
    

          console.log(response.data);
          axios.post('http://localhost:5000/createPayment',{
            amount:order.purchase_units[0].amount.value,
            bid:user._id,
            iid:response.data.project.influencerID,
            paidto:response.data.project.influencerName,
            paidby:response.data.project.businessName,
            time:order.purchase_units[0].amount.value,
            project:response.data.project.projectName,
         })
               console.log(response.data.project.influencerID);
               axios.get(`http://localhost:5000/api/users/getuser/${response.data.project.influencerID}`).then((response)=>{
                  console.log(response.data);
               })
         })
      
       
      
      
    

  
   console.log(order.purchase_units[0].amount.value);
  



  
    return actions.order.capture();

    
  };
 
  return (
   <div>
   <MainMenu/>
   <div style={{display:"flex",justifyContent:"center",flexDirection:"column",marginLeft:"450px",marginTop:"100px"}}>
 
   <div> <input type="text" value={doller}  onChange={(e)=>setDoller(e.target.value)} placeholder="Enter the amount"/></div>
  <div> <input type="text" value={pypl}  onChange={(e)=>setPypl(e.target.value)} placeholder="Enter the influencers paypal email address"/></div>
  <div>
  <PayPalButton
  createOrder={(data, actions) => createOrder(data, actions)}
  onApprove={(data, actions) => onApprove(data, actions)}
  
/></div>
  
   </div></div>
  
  
  );
}
export default Payment;