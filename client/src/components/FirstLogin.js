import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Container, Button, Form} from 'react-bootstrap'
import mongoose from 'mongoose'

function FirstLogin(){
    const navigate = useNavigate();
    const [password, setPassword] = useState('')

    function parseJwt (token) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    };

    async function updatePassoword(event){
        event.preventDefault()

        const userToken = localStorage.getItem("token");
        const user = parseJwt(userToken);
        const id = user.id;
        console.log(id);
        
        const response = await fetch('http://localhost:5000/api/useraccounts/firstlogin/'+id, {
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
            console.log('password updated');
            navigate('../dashboard');  
        }else{
            console.log('could not update password')
        }
    }

    return(
        <div>
            <Container className="text-center col-md-3 border border-dark rounded-3" style={{marginTop:"300px"}}>
                <h4 style={{paddingTop:"40px"}} className='text-danger'>New Password</h4>
                <Form style={{padding:"40px"}} onSubmit={updatePassoword}>
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

export default FirstLogin;