import React from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import Menu from './Menu';
import AdminLogin from './AdminLogin';
import UserCount from './UserCount';
import NonApproved from './NonApproved';

function Home() {
    const loggedInUser = localStorage.getItem("token");

    if(loggedInUser){
        return(
            <div>                
                <Menu/>
                <Container>
                    <hr />
                        <div className="home border-secondary text-center">
                            <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                            <h1 class="h2" style={{paddingLeft:"20px"}}>Dashboard</h1>
                            <div class="btn-toolbar mb-2 mb-md-0">
                            <div style={{paddingRight:"20px"}}>
                            </div>
                            </div>
                        </div>
                    <Container>
                        <Row>
                            <Col>
                            <UserCount/>
                            <h2>Total Users</h2>
                            </Col>
                            <Col>
                            <NonApproved/>
                            <h2>New Users</h2>
                            </Col>
                        </Row>
                    </Container>
                    </div>
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

export default Home;