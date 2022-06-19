import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import ParseJwt from "../Utilities/ParseJwt";



const FirstLogin = () => {

 // const loggedInUser = localStorage.getItem('token')

  
  const [img, setImg] = useState();
  const [url, setUrl] = useState();
 // const [photo, setPhoto] = useState();
  console.log(img);

  const userToken = localStorage.getItem('token');

    const user = ParseJwt(userToken)//{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}
    
  


  const postDetails = async(e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("file", img);
    data.append("upload_preset", "aoiregoj");
    data.append("cloud_name", "dwx7injsq");
  await  fetch("https://api.cloudinary.com/v1_1/dwx7injsq/image/upload", {
      method: "post",
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        console.log(setUrl(data.url));
      });
      sendRequest();
  };
  const sendRequest = async () => {

    await axios
      .put(`http://localhost:5000/api/users/getuser/${user._id}`, {
        img: String(url),
    
      })
      .then((res) => res.data)
     
  
 if(url!=null){
  console.log(url);
  alert("Uploaded successfully");
 }else{
  console.log("Not uploaded");
  alert("Not uploaded,try again");
 }
 
       
 
     
  };
  const sendForm=async() => {

    await axios
      .put(`http://localhost:5000/api/users/getuser/${user._id}`, {
        dob:date,
        product:option,
        address:String(address),
        
        isFirstlogin:Boolean(false),
        fblink:String(fblink),
        instalink:String(instalink),
      })
      .then((res) => res.data)
      .then((data)=>{
        console.log(data.user);
      })
  
   
  
  
  }
 
const [date, setDate] = useState("")
const [address, setAddress] = useState("")
const [option, setOption] = useState("")
const [fblink, setFblink] = useState("")
const [instalink, setInstalink] = useState("")


  return (
    <div className="container" style={{display:"flex",justifyContent:"center",marginTop:"100px"}}>
      <Container>
        <Row>
          <Col>
            <div className="container">
            <h2>We need more details about you</h2>
              <form onSubmit={postDetails}>
              <div style={{margin:"50px",backgroundColor:"",width:"500px",marginLeft:"0px"}}>
            
              <h5>Upload a profile picture</h5>
              <input
                type="file"
             
                onChange={(e) => setImg(e.target.files[0])}
              />
              <div style={{marginTop:"50px",backgroundColor:"yellow",padding:"10px",width:"60px",height:"40px",borderRadius:"5px",justifyContent:"center"}}>
              <input type="submit"label="Upload"/></div>
              
              </div>
            
              </form>
           
         
            </div>
          </Col>
      
         
        </Row>
        <Row>
          <Form  onSubmit={sendForm}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Date of birth</Form.Label>
              <Form.Control  
              value={date}
              onChange={(e)=>setDate(e.target.value)} type="date" placeholder="Enter date of birth" />
            </Form.Group>

           
           
          <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Address</Form.Label>
          <Form.Control
          value={address} 
          onChange={(e)=>setAddress(e.target.value)}
          type="text" placeholder="Enter your address line 1" />
     
        </Form.Group>
        <Form.Label>Select which products you are going to market</Form.Label>
        <Form.Select onChange={(e)=>setOption(e.target.value)} aria-label="Default select example">
        
        
        
      
        <option value="Food">Food</option>
        <option value="Cosmetics">Cosmetics</option>
        <option value="Other">Other</option>
 
      </Form.Select>
        <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Facebook link</Form.Label>
        <Form.Control 
        value={fblink}
        onChange={(e)=>setFblink(e.target.value)}
        type="text" placeholder="url" />
        
        
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Instagram link</Form.Label>
      <Form.Control
      value={instalink}
      onChange={(e)=>{setInstalink(e.target.value)}}
      type="text" placeholder="url" />
 
    </Form.Group>
            
            <Button variant="primary" type="submit">
              Submit
            </Button>
<h2>{option}</h2>
<h2>{fblink}</h2>
<h2>{instalink}</h2>
          </Form>
        </Row>
        <Row></Row>
        <Row></Row>
        <Row></Row>
      </Container>
    </div>
  );
};
export default FirstLogin;
