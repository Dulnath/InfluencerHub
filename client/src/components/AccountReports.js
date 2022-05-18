import React, { useState, useEffect } from 'react'
import axios from "axios"
import Menu from './Menu';
import { Container, Card, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';
import styles from '../styles/styles.module.css';
import FormatDate from '../utilities/FormatDate';

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

    async function loadData() {
        axios.get('http://localhost:5000/api/reports/reportedaccounts').then(res => {
            setApiData(res.data);
        })
    }

    async function deleteReport(id) {
        axios.delete('http://localhost:5000/api/reports/reportedaccounts/delete/' + id)
            .then((res) => {
                console.log(res.status);
                console.log('Report Deleted');
                loadData();
            }).catch((error) => {
                console.log(error);
                alert('problem deleting report');
            });
    }

    async function suspendAccount(id, repId) {

        console.log(id);
        console.log(repId);

        const today = new Date(FormatDate(Date.now()));
        const restoreDay = new Date(today);
        restoreDay.setDate(restoreDay.getDate() + 7);
        console.log(today);
        console.log(restoreDay);

        const response = await fetch('http://localhost:5000/api/useraccounts/suspendaccount/' + id, {
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
        const data = await response.json();
        console.log(data.status);
        if (data.status === 'ok') {
            deleteReport(repId);
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
                                    <Card.Header> <b>{data.firstName + " " + data.lastName}</b> </Card.Header>
                                    <Card.Body>
                                        <RenderType userType={data.category}></RenderType>
                                        <Row>
                                            <Card.Text as={Col}><b>Email </b> : {data.email}</Card.Text>
                                        </Row>
                                        <Row>
                                            <Card.Text as={Col}><b>Contact Number </b> : {data.phoneNo}</Card.Text>
                                        </Row>
                                        <Row>
                                            <Card.Text as={Col}><b>Description </b> : {data.description}</Card.Text>
                                        </Row>
                                        <Row>
                                            <Col sm={8}></Col>
                                            <Col>
                                                <span className={styles.btnRed} onClick={() => suspendAccount(data.accountID, data._id)}>Suspend</span>
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