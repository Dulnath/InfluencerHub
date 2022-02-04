import React from 'react'
import Menu from './Menu'
import axios from "axios"
import {Container,Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class AllUsers extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[]
        };
    }

    componentDidMount(){
        axios.get('http://localhost:5000/api/useraccounts').then(res => {
            this.setState({
                data: res.data
            });
        });
    }

    render(){
        return(
            <div>
                <Menu/>
                <div className="container-fluid" style={{marginTop:"30px"}}>
                    <div
                    className="container-fluid"
                    style={{
                        position: "absolute",
                        textAlign: "center",
                        marginTop: "10px",
                        paddingTop:"5px"
                    }}
                    >
                    {this.state.data.map(data => {
                            return(
                                <React.Fragment>
                                    <Container fluid="md" className='p-3 mb-2 bg-secondary text-white'>
                                        <Row>
                                            <Col xs={6} md={4}><b>Name </b> : {data.firstName + " " + data.lastName}</Col>
                                            <Col xs={6} md={4}><b>Type </b> : {data.type}</Col>
                                            <Col xs={6} md={4}><b>Email </b> : {data.email}</Col>
                                        </Row>
                                    </Container>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
            </div>       
        )
    }
}

export default AllUsers;