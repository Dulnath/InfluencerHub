import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import Menu from './Menu'
import {Accordion,Container,Row,Col,Form,Button} from 'react-bootstrap'
import AdminLogin from './AdminLogin';
import emailjs from '@emailjs/browser';
import { Outlet, Link } from "react-router-dom";


function AdminSettings(){

    const [fname, setFName] = useState('')
    const [lname,setLName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo,setContactNo] = useState('');
    const [password] = useState(generateP());
    const navigate = useNavigate();
    const loggedInUser = localStorage.getItem("token");
    const form = useRef();

    function generateP() {
        var pass = '';
        var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 
                'abcdefghijklmnopqrstuvwxyz0123456789@#$';
          
        for (let i = 1; i <= 8; i++) {
            var char = Math.floor(Math.random()
                        * str.length + 1);
              
            pass += str.charAt(char)
        }
          
        return pass;
    }

    function sendEmail(e){
        
        e.preventDefault();
        let data = {
            firstName:fname,
            lastName:lname,
            Email:email,
            pswrd:password
        }
        emailjs.send('gmail', 'template_x894tin', data, 'user_n4zSmO5iVS8LRqNYkq1XA')
        .then((result) => {
            console.log(result.text);
            console.log('Sent Mail')
        }, (error) => {
            console.log(error.text);
        });
    }

    async function registerUser(event) {
        event.preventDefault();
        
        if(!fname||!lname||!contactNo||!email){
            alert('Please fill all fields!');
        }else{
            console.log(password);
            if(!password){
                alert('There is no password');
                return;
            }
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
                    sendEmail(event);
                    console.log('data submitted')
                    navigate('../dashboard');
                    alert('Sucessfully registered New Admin')   
                }else{
                    alert('Registration Error!');
                }
        }       
        
    }



    if(loggedInUser){
        return(
            <div>
            <Menu/>
            <div className="container" style={{marginTop:"30px"}}>    
                    <div
                  className="container"
                  style={{
                    position: "absolute",
                    marginTop: "10px",
                    paddingTop:"5px"
                  }}
                >
                <h3>Settings</h3>
                <hr />
                <Accordion defaultActiveKey="1" style={{padding:"10px 0px 10px 0px"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header className="text-decoration-none text-dark">Register new Admin</Accordion.Header>
                        <Accordion.Body>
                            <Container>
                                <Form ref={form} onSubmit={(e)=>{
                                    registerUser(e)
                                }}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formFirstName">
                                                <Form.Control
                                                 value={fname}
                                                 onChange={(e)=>setFName(e.target.value)}
                                                 type="text"
                                                 name='fname' 
                                                 placeholder="First Name" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formLastName">
                                                <Form.Control
                                                 value={lname}
                                                 onChange={(e)=>setLName(e.target.value)}
                                                 type="text"
                                                 name='lname' 
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
                                                name='email' 
                                                placeholder="Email" />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3" controlId="formContactNo">
                                                <Form.Control
                                                value={contactNo}
                                                onChange={(e)=>setContactNo(e.target.value)} 
                                                type="text"
                                                name='contactNo' 
                                                placeholder="Contact Number" />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Button variant="primary" type="submit"> 
                                            Register
                                        </Button>
                                    </Row>
                                </Form>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                <Link to='/editaccount' className='text-decoration-none'>
                <div className="d-grid gap-2">
                    <Container fluid="md" className='p-3 mb-2 border border-primary rounded dark'>
                        <Row>
                            <b>Edit Account</b>
                        </Row>
                    </Container>
                </div>
                </Link>
                <Outlet/>                                          
                </div>
            </div> 
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