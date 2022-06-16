import React,{useRef} from 'react'
import { useState } from 'react'
import Menu from './Menu'
import {Accordion,Container,Row,Col,Form,Button} from 'react-bootstrap'
import AdminLogin from '../Login/index'
import emailjs from '@emailjs/browser';
import { Outlet, Link } from "react-router-dom";
import styles from '../../styles/styles.module.css';
function AdminSettings(){

    const [fname, setFName] = useState('')
    const [lname,setLName] = useState('')
    const [email, setEmail] = useState('')
    const [contactNo,setContactNo] = useState('');
    const [password] = useState(generateP());
    const loggedInUser = localStorage.getItem("token");
    const form = useRef();
    const [error, setErrorMsg] = useState('');
    const [success,setSuccessMsg] = useState('');

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

    function fieldValidation(){
        let emailRegex = new RegExp(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)
        let phoneRegex = new RegExp(/^[0-9\b]+$/)
        let emailValid = emailRegex.test(email)
        let phoneValid = phoneRegex.test(contactNo)
        console.log(emailValid+" "+phoneValid)

        if(!phoneValid){
            setErrorMsg('phone number invalid')
        }

        if(emailValid && phoneValid){
            return true
        }else{
            return false
        }
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

        let formValid = fieldValidation()

        if(!formValid){
            return
        }
    
        if(!fname||!lname||!contactNo||!email){
            setErrorMsg('Please fill all fields!');
        }else{
            console.log(password);
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
                   // navigate('../dashboard');
                    setSuccessMsg('Sucessfully registered New Admin');
                    setFName('');setLName('');setEmail('');setContactNo('');

                }else{
                    setErrorMsg('Registration Error');
                }
        }       
        
    }



    if(loggedInUser){
        return(
            <div className={styles.background}>
            <Menu/>
            <div className={styles.heading}>
            <h3>Settings</h3>
                <hr />
            </div>
                <Container>
                    <Accordion defaultActiveKey="1" className={styles.accordion}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header >Register new Admin</Accordion.Header>
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
                                    <Row className={styles.form_container}>
                                        {error && <div className={styles.error_msg}>{error}</div>}
                                        {success && <div className={styles.success_msg}>{success}</div>}   
                                    </Row>
                                </Form>
                            </Container>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
                
                <Link to='/editaccount' className='text-decoration-none'>
                <div className="d-grid gap-2">
                    <Container fluid="md" className={styles.editAccount}>
                            Edit Account
                    </Container>
                </div>
                </Link>
                <Outlet/> 
                </Container>
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