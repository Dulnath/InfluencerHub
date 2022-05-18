import React, { useEffect, useState } from 'react'
import axios from "axios"
import Menu from './Menu';
import {Container,Card,Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';
import styles from '../styles/styles.module.css';
import FormatDate from '../utilities/FormatDate';

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
    
    function RenderRestoreBtn(props){
        const today = new Date(FormatDate(Date.now()));
        const restoreDate = new Date(props.uRestoreDate);
        if(restoreDate > today){
            return(
                <span className={styles.btnDisable}>Restore</span>
            );
        }else{
            return(
                <span className={styles.btnGreen} onClick={() => restoreAccount(props.uid)}>Restore</span>
            );
        }
    }

    function loadData(){
        axios.get('http://localhost:5000/api/useraccounts').then(res => {
            setData(res.data);
        });
    }

    function RenderMessage(uRestoreDate){
        const today = new Date(FormatDate(Date.now()));
        
        const restoreDate = new Date(uRestoreDate.uRestoreDate);
        console.log(today);
        console.log(restoreDate);
        var message = '';
        if(restoreDate <= today){
            message = 'Restore Account!';
            return(
                <Row>
                    <span className={styles.success_msg_permenant}>{message}</span>
                </Row>
            );
        }else{
            return(
                <Row>
                    <Card.Title as={Col}><span className='text-primary'>{message}</span></Card.Title>
                </Row>
            );
        }
    }

    

    async function restoreAccount(id) {

        console.log(id);

        const response = await fetch('http://localhost:5000/api/useraccounts/restoreaccount/' + id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                isActive: true
            }),
        })
        const data = await response.json();
        console.log(data.status);
        if (data.status === 'ok') {
            alert('Account Restored');
            loadData();
        } else {
            console.log('oops! something went wrong');
        }
    }

    useEffect(()=>{
        loadData();
    },[])

    if(loggedInUser){
       return(
            <div className={styles.background}>
                     <Menu/>
                <div className={styles.heading}>
                <h3>Suspended Users</h3>
                <hr />
                </div>
                <div className={styles.scrollbox}>
                <Container className="p-10 mb-2" fluid="md">
                   {data.map(data => {
                        if(!data.isActive){
                            return(
                                <React.Fragment style={{padding:"10px"}} key={data._id}>
                                    <Card className={styles.record}>
                                        <Card.Header> <b>{data.firstName + " " + data.lastName}</b> </Card.Header>
                                        <Card.Body>
                                               <RenderMessage uRestoreDate={data.restoreDate}/>
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
                                                        <RenderRestoreBtn uid={data._id} uRestoreDate={data.restoreDate}/>
                                                    </Col>
                                                </Row>
                                                
                                        </Card.Body>
                                    </Card>
                                </React.Fragment>
                            );
                        }else{
                            return (
                                <div></div>
                            );
                        }
                    })}
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

export default SuspendedUsers;