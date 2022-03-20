import React from 'react'
import Menu from './Menu'
import axios from "axios"
import {Container,Row,Col} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import AdminLogin from './AdminLogin';

class AllUsers extends React.Component{
    constructor(){
        super();
        this.state = {
            data:[],
            isLogged:false
        };
    }

    componentDidMount(){
        const loggedInUser = localStorage.getItem("token");
        if(loggedInUser){

            console.log('user is logged in');
            this.setState({isLogged:true});
            console.log(this.isLogged);

            axios.get('http://localhost:5000/api/useraccounts').then(res => {
            this.setState({
                data: res.data
            });
        });
        }
        
    }

    render(){
        if(this.state.isLogged){
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
                        {this.state.data.map(data => {
                                if(data.isActive){
                                    return(
                                        <React.Fragment>
                                            <Container fluid="md" className='p-3 mb-2 border border-primary rounded'>
                                                <Row>
                                                    <Col xs={6} md={4}><b>Name </b> : {data.firstName + " " + data.lastName}</Col>
                                                    <Col xs={6} md={4}><b>Type </b> : {data.type}</Col>
                                                    <Col xs={6} md={4}><b>Email </b> : {data.email}</Col>
                                                </Row>
                                            </Container>
                                        </React.Fragment>
                                    );
                                }else{
                                    return(
                                        <div></div>
                                    );
                                }
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
}

export default AllUsers;