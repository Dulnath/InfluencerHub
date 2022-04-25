import React from 'react'
import Menu from './Menu'
import axios from "axios"
import {Container,Row,Col} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';


function AllUsers(){
    const [apiData,setApiData] = useState([]);
    const loggedInUser = localStorage.getItem("token");

    useEffect(()=>{        
        axios.get('http://localhost:5000/api/useraccounts').then(res=>{
            setApiData(res.data);
        })
    },[])

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
                        <h3>All Users</h3>
                        <hr />
                        {apiData.map((data)=>{
                            return(
                                <React.Fragment>
                                    <Container fluid="md" className='p-3 mb-2 border border-primary rounded'  key={data._id}>
                                        <Row>
                                            <Col xs={6} md={4}><b>Name </b> : {data.firstName + " " + data.lastName}</Col>
                                            <Col xs={6} md={4}><b>Type </b> : {data.category}</Col>
                                            <Col xs={6} md={4}><b>Email </b> : {data.email}</Col>
                                        </Row>
                                    </Container>
                                </React.Fragment>
                            )
                        })}
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

export default AllUsers;