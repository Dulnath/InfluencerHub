import React,{ useState, useEffect } from 'react'
import axios from "axios"
import Menu from './Menu';
import {Container,Card,Col,Row} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';
import styles from '../styles/styles.module.css';

function CommentReports(){
    const [data, setApiData] = useState([]);
    const loggedInUser = localStorage.getItem("token");
    
    async function loadData(){
        axios.get('http://localhost:5000/api/reports/reportedcomments').then(res => {
            setApiData(res.data);
        })
    }

    useEffect(() => {
        loadData();
    }, [])

    if(loggedInUser){
        return(
            <div className={styles.background}>
                <Menu/>
            <div className={styles.heading}>
                <h3>Comment Reports</h3>
                <hr />
            </div>
            <Container className="p-10 mb-2" fluid="md">
               {data.map(data => {
                   return(
                    <React.Fragment key={data._id}>
                        <Card className={styles.record}>
                            <Card.Header> <b>{data.cFname + " " + data.cLname}</b> </Card.Header>
                            <Card.Body>
                                    <Row>
                                        <Card.Text as={Col}><b>Comment </b> : {data.text}</Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text as={Col}><b>Reported Because of </b> : {data.repType}</Card.Text>
                                    </Row>
                                    <Row>
                                        <Card.Text as={Col}><b>Description </b> : {data.description}</Card.Text>
                                    </Row>
                                    <Row>
                                        <Col sm={8}></Col>
                                        <Col>
                                                <span className={styles.btnRed}>Delete</span>
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
    }else{
        return(
            <div>
                <AdminLogin></AdminLogin>
            </div>  
        )
    }
}

export default CommentReports;