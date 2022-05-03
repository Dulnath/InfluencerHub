import React from 'react'
import Menu from './Menu'
import axios from "axios"
import {Container,Row,Col} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';
import styles from '../styles/styles.module.css';

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
                <div className={styles.background}>
                    <Menu />
                    <div className={styles.heading}>
                            <h3>All Users</h3>
                            <hr />
                        </div>
                        <div className={styles.scrollbox}>
                        <Container>
                            <div>
                                {apiData.map((data) => {
                                    if(data.adminVerified){
                                        return (
                                            <React.Fragment key={data._id}>
                                                <Container fluid="md" className={styles.record} >
                                                    <Row>
                                                        <Col xs={6} md={4}><b>Name </b> : {data.firstName + " " + data.lastName}</Col>
                                                        <Col xs={6} md={4}><b>Type </b> : {data.category}</Col>
                                                        <Col xs={6} md={4}><b>Email </b> : {data.email}</Col>
                                                    </Row>
                                                </Container>
                                            </React.Fragment>
                                        )
                                    }
                                })}
                            </div>
                        </Container>
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