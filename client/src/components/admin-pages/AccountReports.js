import React, { useState, useEffect } from 'react'
import axios from "axios"
import Menu from './Menu';
import { Container, Card, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from '../Login/index'
import styles from '../../styles/styles.module.css';
import FormatDate from '../../utilities/FormatDate';
import emailjs from '@emailjs/browser';
import image from "../../images/user.jpg";

function RenderType(props) {
    let type = props.userType
    if (type === 'influencer') {
        return (
            <Row>
                <Card.Title as={Col}><b>Type</b> : <span className='text-success'>{type}</span></Card.Title>
            </Row>
        );
    } else {
        return (
            <Row>
                <Card.Title as={Col}><b>Type</b> : <span className='text-primary'>{type}</span></Card.Title>
            </Row>
        );
    }
}

function AccountReports() {
    const [data, setApiData] = useState([]);
    const loggedInUser = localStorage.getItem("token");

    function sendEmail(uData){
        let data = {
            firstName:uData.firstName,
            lastName:uData.lastName,
            Email:uData.email,
            Subject:"IncluencerHub Account Suspension",
            Message:"This is to inform you that your influencerHub account has been suspended for 1 week"
        }
        emailjs.send('gmail', 'template_kr4q4vl', data, 'user_n4zSmO5iVS8LRqNYkq1XA')
        .then((result) => {
            console.log(result.text);
            console.log('Sent Mail')
        }, (error) => {
            console.log(error.text);
        });
    }

    async function loadData() {
        axios.get('http://localhost:5000/api/reports/reportedaccounts').then(res => {
            setApiData(res.data);
        })
    }

    async function deleteReport(id) {
        axios.delete(`http://localhost:5000/api/reports/reportedaccounts/delete/${id}`)
            .then((res) => {
                console.log(res.status);
                console.log('Report Deleted');
                loadData();
            }).catch((error) => {
                console.log(error);
                alert('problem deleting report');
            });
    }

    async function suspendAccount(data) {

        console.log(data._id);
        console.log(data.accountID);

        const today = new Date(FormatDate(Date.now()));
        const restoreDay = new Date(today);
        restoreDay.setDate(restoreDay.getDate() + 7);
        console.log(today);
        console.log(restoreDay);

        const response = await fetch(`http://localhost:5000/api/useraccounts/suspendaccount/${data.accountID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                suspendedDate: today,
                restoreDate: restoreDay,
                isActive: false
            }),
        })
        const resData = await response.json();
        console.log(resData.status);
        if (resData.status === 'ok') {
            deleteReport(data._id);
            sendEmail(data);
        } else {
            console.log('oops! something went wrong');
        }
    }

    useEffect(() => {
        loadData();
    }, [])

    if (loggedInUser) {
        return (
            <div className={styles.background}>
                <Menu />
                <div className={styles.heading}>
                    <h3>Account Reports</h3>
                    <hr />
                </div>

                <div className={styles.scrollbox}>
                <Container className="p-10 mb-2" fluid="md">
                    {data.map(data => {
                        return (
                            <React.Fragment key={data._id}>
                                <Card className={styles.record}>
                                <img src={image} className={styles.image1_img} alt="..."/>
                                    <Card.Header> <b>{data.firstName + " " + data.lastName}</b> </Card.Header>
                                    <Card.Body>
                                        <RenderType userType={data.category}></RenderType>
                                        <Row>
                                            <Card.Text as={Col}><b>Email </b> : {data.email}</Card.Text>
                                        </Row>
                                        <Row>
                                            <Card.Text as={Col}><b>Description </b> : {data.description}</Card.Text>
                                            <Col sm={5}></Col>
                                            <Col>
                                                <span className={styles.btnRed} onClick={() => suspendAccount(data)}>Suspend</span>
                                                <span className={styles.btnGreen} onClick={()=>deleteReport(data._id)}>Dismiss</span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </React.Fragment>
                        );
                    })}
                </Container>
                </div>
            </div>
        )
    } else {
        return (
            <div>
                <AdminLogin></AdminLogin>
            </div>
        )
    }
}

export default AccountReports;