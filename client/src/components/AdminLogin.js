import React from "react";
import { useNavigate } from 'react-router-dom';
import {Form,Button,Container} from 'react-bootstrap'
import { useState } from 'react'

function AdminLogin(){
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

    function refreshPage() {
        window.location.reload(false);
    }

	async function loginUser(event) {
		event.preventDefault()

		const response = await fetch('http://localhost:5000/api/useraccounts/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
				password
			}),
		})

		const data = await response.json()

		if (data.user) {
            console.log(data.user);
            const currentPath = window.location.pathname;
			localStorage.setItem('token', data.user)
			alert('Login successful')

            if(currentPath === '/dashboard'){
                refreshPage();
            }else{
                navigate('/dashboard');
            }
		} else {
			alert('Please check your username and password')
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
                    <Button variant="primary" type="submit">
                        Login
                    </Button>
                </Form>
            </Container>
        </div>
    )
}
export default AdminLogin;