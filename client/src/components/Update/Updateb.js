import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MainMenu from "../Main/MainMenu";

const Updateb = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const [inputs, setInputs] = useState(null);
    const [img, setImg] = useState();
    const [url, setUrl] = useState();
    console.log(id);
    useEffect(() => {
        const fetchHandler = async () => {
          await axios
            .get(`http://localhost:5000/api/users/getuser/${id}`)
            .then((res) => res.data)
            .then((data) => setInputs(data))
            .then(console.log(inputs));
        };
    
        fetchHandler();
      }, [id]);

  const history = useNavigate();
  

  console.log(inputs);








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
      sendRequest1();
  };
  const sendRequest1 = async () => {

    await axios
      .put(`http://localhost:5000/api/users/getuser/${id}`, {
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






  const sendRequest = async () => {
    await axios
      .put(`http://localhost:5000/api/users/getuser/${id}`, {
        firstName: String(inputs.firstName),
        email: String(inputs.email),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
    if(inputs.category==='business'){
      navigate('/business');
    }else{
      navigate('/')
    }
  };
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  console.log(inputs);
  if(id){
      
  }
  return (
    <div>
    <MainMenu></MainMenu>
    <div className="" style={{display:"flex",justifyContent:"left",width:"800px",marginLeft:"100px"}}>
    {inputs!=null?(<>
      <Container>
      <Row>
      <Col>
      <div>
      <img src={inputs.img} style={{ height: "250px", width: "250px",margin:"50px",borderRadius:"50px" }}/>
      
     </div>
      </Col>
      <Col>
      <form onSubmit={postDetails}>
      <div style={{margin:"50px",backgroundColor:"",width:"auto",marginLeft:"0px"}}>
    
      <h5>Edit profile businesss logo picture</h5>
      <input
        type="file"
     
        onChange={(e) => setImg(e.target.files[0])}
      />
      <div style={{marginTop:"50px",backgroundColor:"yellow",padding:"10px",width:"60px",height:"40px",borderRadius:"5px",justifyContent:"center"}}>
      <input type="submit"label="Upload"/></div>
      
      </div>
    
      </form>
   
      
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter email" onChange={handleChange}  value={inputs.firstName}  name="firstName"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>email</Form.Label>
        <Form.Control type="email" placeholder="email"  onChange={handleChange}  value ={inputs.email} name="email"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>age</Form.Label>
        <Form.Control type="email" placeholder="age"  onChange={handleChange}  name="email"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>DOB</Form.Label>
        <Form.Control type="date" placeholder="date of birth"  onChange={handleChange}   name="email"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>address</Form.Label>
        <Form.Control type="email" placeholder="address"  onChange={handleChange} name="email"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>website url</Form.Label>
        <Form.Control type="email" placeholder="website url"  onChange={handleChange}   name="email"/>
      </Form.Group>

    
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
      
      </Col>
      </Row>
      
   
      </Container>
     </>):(<>
      <h2>asdasd</h2>
      </>)}
    </div>
     
    </div>
  );
};

export default Updateb;
