import React from 'react'
import { Outlet, Link } from "react-router-dom";
import { useState,useEffect } from 'react'
import axios from "axios"
import Menu from './Menu'
import {Row,Col,Form,Button} from 'react-bootstrap'
import AdminLogin from './AdminLogin';
import ParseJwt from '../utilities/ParseJwt';

function EditAccount(){
    const loggedInUser = localStorage.getItem("token");
    const [fname, setFName] = useState('');
    const [lname,setLName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo,setContactNo] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordRep,setPasswordRep] = useState('');


    useEffect(()=>{
        const userToken = localStorage.getItem('token');
        const user = ParseJwt(userToken)
        
        if(userToken){
            axios.get('http://localhost:5000/api/useraccounts/'+user.id).then(res=>{
            setFName(res.data.firstName);
            setLName(res.data.lastName);
            setEmail(res.data.email);
            setContactNo(res.data.phoneNo);
        })
        }
    },[])

    async function updateUserAccount(event){
        event.preventDefault();
        const user = ParseJwt(localStorage.getItem('token'))
        if(password===passwordRep&&password!==''){

            if(!email){
                alert('Enter a new email!');
                return;
            }

            const response = await fetch('http://localhost:5000/api/useraccounts/updateaccount/'+user.id, {
                method: 'PUT',
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
            const data = await response.json();
            console.log(data.status);
            if (data.status === 'ok') { 
                alert('Account Information has been updated');
            }else{
                console.log('could not update user account')
            }
        }else if(password!==passwordRep && password!==''){
            alert('Passwords do not Match!');
            return;
        }else{
            if(!email){
                alert('Enter a new email!');
                return;
            }
            const response = await fetch('http://localhost:5000/api/useraccounts/updateaccount/'+user.id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fname,
                    lname,
                    email,
                    contactNo
                }),
            })
            const data = await response.json();
            console.log(data.status);
            if (data.status === 'ok') { 
                alert('Account Information has been updated');
            }else{
                console.log('could not update user account')
            }
        }
        
    }
    if(loggedInUser){
        return(
            <div>
                <Menu></Menu>
                <div className="container" style={{marginTop:"30px"}}>
                <h3>Edit Account Information</h3>
                <hr />
                <Form>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="fName">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" placeholder='First Name' value={fname} onChange={(e)=>setFName(e.target.value)} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="lName">
                        <Form.Label>Last Name</Form.Label>
                        <Form.Control type="text" placeholder='Last Name' value={lname} onChange={(e)=>setLName(e.target.value)}/>
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)} disabled/>
                        </Form.Group>

                        <Form.Group as={Col} controlId="contactNo">
                        <Form.Label>Contact Number</Form.Label>
                        <Form.Control type="text" placeholder='Contact No' value={contactNo} onChange={(e)=>setContactNo(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <br />
                    <h3>Change Password</h3>
                    <hr />
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Password">
                            <Form.Control type="password" placeholder="Old Password" value={oldPassword} onChange={(e)=>setOldPassword(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="Password">
                            <Form.Control type="password" placeholder="New Password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        </Form.Group>
                    </Row>
                    <Row className="mb-3">
                    <Form.Group as={Col} controlId="Password">
                        <Form.Control type="password" placeholder="Repeat New Password" value={passwordRep} onChange={(e)=>setPasswordRep(e.target.value)}/>
                    </Form.Group>
                    </Row>

                    <Row>
                        <Col xs={6} md={1}>
                        </Col>
                        <Col xs={12} md={8}>
                        <Button variant="primary" type="submit" onClick={updateUserAccount}>
                            Update
                        </Button>
                        </Col>
                        <Col xs={6} md={2}>
                        <Link to='/adminsettings' className='text-decoration-none'>
                            <Button variant="secondary" >
                                Go Back
                            </Button>
                        </Link>
                        <Outlet/>
                        </Col>
                    </Row>
                    </Form>
                </div>
            </div>
        )
    }else{
        return(
            <AdminLogin></AdminLogin>
        )
    }
}

export default EditAccount;