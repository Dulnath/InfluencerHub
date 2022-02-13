import React from 'react'
import {Form,Button,Container} from 'react-bootstrap'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function FirstLogin(){
    const navigate = useNavigate();
	const [password, setPassword] = useState('')

    async function updatePasswrd(e){
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/useraccounts/login', {
			method: 'PUT',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				password
			}),
		})

        const data = await response.json()

        if (data.status === 'ok') {
            console.log('password updated')
            navigate('../dashboard');  
        }else{
            alert('Could not update Password');
        }
    }

    return(
        <div>
            <Container className="text-center col-md-3 border border-dark rounded-3" style={{marginTop:"300px"}}>
                <h4 style={{paddingTop:"40px"}} className="danger">Enter new Password</h4>
                <Form style={{padding:"40px"}} onSubmit={updatePasswrd}>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)} 
                        type="password" 
                        placeholder="Password" 
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Update Password
                    </Button>
                </Form>
            </Container>
        </div>
    )
}

export default FirstLogin;