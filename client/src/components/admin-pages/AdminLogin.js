import React from "react";
import { useNavigate } from 'react-router-dom';
import {Form,Button,Container} from 'react-bootstrap'
import { useState } from 'react'
import styles from '../../styles/styles.module.css';

function AdminLogin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
    const [error, setErrorMsg] = useState('');

    function refreshPage() {
        window.location.reload(false);
    }

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/useraccounts/login', {//https://localhost:5000/postNotification
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({//convert email, password form items to json
				email,
				password
			}),
		})//send post request

		const data = await response.json()

		if (data.user) {
            console.log(data.test);
            const currentPath = window.location.pathname;
			localStorage.setItem('token', data.user)

            if(data.test){
                console.log('first login');
                navigate('/firstlogin');
                return;
            }
			if(currentPath === '/dashboard'){
                refreshPage();
            }else{
                navigate('/dashboard');
            }
		} else {
            setErrorMsg('Please check your username and password');
		}
	}

    return(
        <div>
            <Container className="text-center col-md-3 border border-dark rounded-3" style={{marginTop:"300px"}}>
                <h2 style={{paddingTop:"40px"}}>Admin Login</h2>
                <Form style={{padding:"40px"}} onSubmit={loginUser}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)} 
                        type="email" 
                        placeholder="Enter email" 
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Password" 
                        />
                    </Form.Group>
                    {error && <div className={styles.error_msg}>{error}</div>}
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>    
            </Container>
        </div>
    )
}
export default AdminLogin;