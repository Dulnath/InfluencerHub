import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const id = useParams().id;
    const [inputs, setInputs] = useState(null);
    useEffect(() => {
        const fetchHandler = async () => {
          await axios
            .get(`http://localhost:8080/api/users/getuser/${id}`)
            .then((res) => res.data)
            .then((data) => setInputs(data));
        };
    
        fetchHandler();
      }, [id]);

  const history = useNavigate();
  

  console.log(inputs);

  const sendRequest = async () => {
    await axios
      .put(`http://localhost:8080/api/users/getuser/${id}`, {
        firstName: String(inputs.firstName),
        email: String(inputs.email),
      })
      .then((res) => res.data);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/"));
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
    <div className="container">
    {inputs!=null?(<>
      
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter email" onChange={handleChange}  value={inputs.firstName}  name="firstName"/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword" >
        <Form.Label>email</Form.Label>
        <Form.Control type="email" placeholder="email"  onChange={handleChange}  value ={inputs.email} name="email"/>
      </Form.Group>
    
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form></>):(<>
      <h2>asdasd</h2>
      </>)}
    </div>
     
    </div>
  );
};

export default Update;
