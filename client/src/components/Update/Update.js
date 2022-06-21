import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MainMenu from "../Main/MainMenu";

const Update = () => {
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
        lastName:String(inputs.lastName),
        fblink:String(inputs.fblink),
        instalink:String(inputs.instalink),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest()
    if(inputs.category==='business'){
      navigate('/business');
    }else{
      navigate('/home')
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
    <div style={{background:"#e6e6e6",height:"100vh"}}>
    <MainMenu></MainMenu>
    <div className="" style={{display:"flex",justifyContent:"left",width:"800px",marginLeft:"100px"}}>
    {inputs!=null?(<>
      <Container>
      <Row>
      <Col>
      <div style={{backgroundColor:"grey"}}>
      <img src={inputs.img} style={{width:"100%",height:"40%"}}/>
      
     </div>
      </Col>
      <Col>
      <form onSubmit={postDetails}>
      <div style={{margin:"50px",backgroundColor:"",width:"auto",marginLeft:"0px"}}>
    
      <h5>Edit profile picture</h5>
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
        <Form.Label>FirstName</Form.Label>
        <Form.Control type="text" placeholder="Enter email" onChange={handleChange}  value={inputs.firstName}  name="firstName"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Last name</Form.Label>
      <Form.Control type="text" placeholder="Enter email" onChange={handleChange}  value={inputs.lastName}  name="lastName"/>
    </Form.Group>

     
    
      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>Address</Form.Label>
        <Form.Control type="text" placeholder="address"  onChange={handleChange}  value={inputs.address}  name="address"/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>facebook link</Form.Label>
        <Form.Control type="text" placeholder="url"  onChange={handleChange}   value={inputs.fblink}   name="fblink"/>
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

export default Update;
