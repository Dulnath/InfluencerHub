import React, { useState, useEffect } from 'react'
import axios from "axios"
import Menu from './Menu';
import { Container, Card, Button, Col, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';
import styles from '../styles/styles.module.css';

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

    useEffect(() => {
        axios.get('http://localhost:5000/api/reports/reportedaccounts').then(res => {
            setApiData(res.data);
        })
    }, [])

    if (loggedInUser) {
        return (
            <div className={styles.background}>
                <Menu />
                <div className={styles.heading}>
                    <h3>Account Reports</h3>
                    <hr />
                </div>

                <Container className="p-10 mb-2" fluid="md">
                    {data.map(data => {
                        return (
                            <React.Fragment key={data._id}>
                                <Card className={styles.record}>
                                    <Card.Header> <b>{data.firstName + " " + data.lastName}</b> </Card.Header>
                                    <Card.Body>
                                        <RenderType userType={data.type}></RenderType>
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
                                                <span className={styles.btnRed}>Suspend</span>
                                                <span className={styles.btnGreen}>Dismiss</span>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                </Card>
                            </React.Fragment>
                        );
                    })}
                </Container>
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