import React, { useEffect, useState } from 'react'
import axios from "axios"
import Menu from './Menu';
import {Container,Card,Button,Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';
import styles from '../styles/styles.module.css';

function RenderType(props){
    let type = props.userType
    if (type === 'influencer') {
        return(
            <Row>
                <Card.Title as={Col}><b>Type</b> : <span className='text-success'>{type}</span></Card.Title>
            </Row>
        );
    } else {
        return(
            <Row>
                <Card.Title as={Col}><b>Type</b> : <span className='text-primary'>{type}</span></Card.Title>
            </Row>
        );
    }
}

function SuspendedUsers(){
    const [data,setData] = useState([]);
    const loggedInUser = localStorage.getItem("token");

    
    

    useEffect(()=>{
        axios.get('http://localhost:5000/api/useraccounts').then(res => {
            setData(res.data);
        });
    },[])

    if(loggedInUser){
        return(
            <div className={styles.background}>
                    <Menu/>
                <div className={styles.heading}>
                <h3>Suspended Users</h3>
                <hr />
                </div>
                <Container className="p-10 mb-2" fluid="md">
                   {data.map(data => {
                        if(!data.isActive){
                            return(
                                <React.Fragment style={{padding:"10px"}} key={data._id}>
                                    <Card className={styles.record}>
                                        <Card.Header> <b>{data.firstName + " " + data.lastName}</b> </Card.Header>
                                        <Card.Body>
                                               <RenderType userType={data.category}/>
                                                <Row>
                                                    <Card.Text as={Col}><b>Email </b> : {data.email}</Card.Text>
                                                </Row>
                                                <Row>
                                                    <Card.Text as={Col}><b>Contact Number </b> : {data.phoneNo}</Card.Text>
                                                </Row>
                                                <Row>
                                                    <Col sm={10}></Col>
                                                    <Col>
                                                        <span className={styles.btnGreen}>Restore</span>
                                                    </Col>
                                                </Row>
                                        </Card.Body>
                                    </Card>
                                </React.Fragment>
                            );
                        }
                    })}
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

export default SuspendedUsers;