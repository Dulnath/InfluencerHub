import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Menu from './Menu'
import {Accordion,Container,Row,Col,Form,Button} from 'react-bootstrap'
import AdminLogin from './AdminLogin';

function AdminSettings(){

    const [fname, setFName] = useState('')
    const [lname,setLName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo,setContactNo] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep,setPasswordRep] = useState('');
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem("token");

    async function registerUser(event) {
        event.preventDefault()

        
        if(password === passwordRep){
            const response = await fetch('http://localhost:5000/api/useraccounts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    contactNo,
                    password
                }),
            })

            const data = await response.json()

            if (data.status === 'ok') {
                console.log('data submitted')
                navigate('../dashboard');
                alert('Sucessfully registered New Admin')   
            }
        }else{
            alert('Passwords do not match!!!');
        }

        
    }



    if(loggedInUser){
        return(
            <div>
                <Menu/>
                <Accordion defaultActiveKey="1" style={{padding:"10px 40px 0px 40px"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="text-decoration-none text-dark">Register new Admin</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Form onSubmit={registerUser}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formFirstName">
                                                <Form.Control
                                                 value={fname}
                                                 onChange={(e)=>setFName(e.target.value)}
                                                 type="text" 
                                                 placeholder="First Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formLastName">
                                                <Form.Control
                                                 value={lname}
                                                 onChange={(e)=>setLName(e.target.value)}
                                                 type="text" 
                                                 placeholder="Last Name" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formEmail">
                                                <Form.Control 
                                                value={email}
                                                onChange={(e)=>setEmail(e.target.value)}
                                                type="email" 
                                                placeholder="Email" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formContactNo">
                                                <Form.Control
                                                value={contactNo}
                                                onChange={(e)=>setContactNo(e.target.value)} 
                                                type="text" 
                                                placeholder="Contact Number" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formPassword">
                                                <Form.Control 
                                                value={password}
                                                onChange={(e)=>setPassword(e.target.value)}
                                                type="password" 
                                                placeholder="Password" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formPasswordRep">
                                                <Form.Control
                                                value={passwordRep}
                                                onChange={(e)=>setPasswordRep(e.target.value)} 
                                                type="password" 
                                                placeholder="Repeat Password" />
                                            </Form.Group>
                                        </Col>
                                        <Button variant="primary" type="submit">
                                            Register
                                        </Button>
                                    </Row>
                                </Form>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion> 
            </div>       
        )
    }else{
        return(
            <div>
                <AdminLogin></AdminLogin>
            </div>  
        )
    }
}

export default AdminSettings;