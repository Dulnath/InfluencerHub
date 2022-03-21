import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import {Container, Button, Form} from 'react-bootstrap'
import ParseJwt from '../utilities/ParseJwt';

function FirstLogin(){
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [passwordRep, setPasswordRep] = useState('');

    async function updatePassoword(event){
        event.preventDefault()

        const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        localStorage.clear();
        const id = user.id;
        const email = user.email;
        console.log(id);
        
        if(password===passwordRep){
            const response = await fetch('http://localhost:5000/api/useraccounts/firstlogin/'+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password,
                    email
                }),
            })
            const data = await response.json()
        

            if (data.status === 'ok') {
                navigate('/'); 
                console.log('password updated');
            }else if(data.status === 'duplicate'){
                console.log('new password cannot be same as old password') 
                navigate('/');
                alert('new password cannot be same as old password');
                
            }else{
                console.log('could not update password')
            }

        }else{
            alert('Passwords do not Match!');
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
                    <Form.Group className="mb-3" controlId="formBasicPassword2">
                        <Form.Control
                        value={password}
                        onChange={(e)=>setPasswordRep(e.target.value)} 
                        type="password" 
                        placeholder="Re-Enter Password" 
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