import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import MainMenu from "../Main/MainMenu";

const Update = () => {
    const navigate = useNavigate();
    const id = useParams().id;
    const [inputs, setInputs] = useState(null);
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
    <div style={{background:"white",height:"100vh",padding:"40px"}}>
    {inputs!=null?(<Container>
      
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
    </Form></Container>):(<>
      <h2>asdasd</h2>
      </>)}
    </div>
     
    </div>
  );
};

export default Update;
