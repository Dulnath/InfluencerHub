import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Container, Row, Col, NavLink } from 'react-bootstrap'
import Login from '../Login';
import { useParams, useNavigate} from "react-router-dom";



//new one
function View() {
    const loggedInUser = localStorage.getItem("token");
    const [listOfUsers, setListOfUsers] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
   const [email, setUserEmail] = useState();
  const [category, setUserCategory] = useState();

    const { id } = useParams();

    let navigate = useNavigate();

    


    useEffect(() => {
        axios.get(`http://localhost:8080/api/users/getuser/${id}`).then((response) => {
        
          

            setFirstName(response.data.user.firstName);
            setLastName(response.data.user.lastName);
           setUserEmail(response.data.user.email);
           setUserCategory(response.data.user.category);
           // console.log("ProjectData", res.data.user);
            console.log(response.data);
        })
       
    }, [])




    
    return (


        <div id="allUsers">
            <div className="container" style={{ marginTop: "30px" }}>
                <div
                    className="container"
                    style={{
                        position: "absolute",
                        marginTop: "10px",
                        paddingTop: "5px",
                        paddingBottom: "10px"
                    }}
                ></div>

                <h1> HI </h1>
                <React.Fragment>
                    <Container fluid="md" className='p-3 mb-2 border border-primary rounded' style={{ border: '2px solid #000000', paddingTop: "5px", paddingBottom: "5px", paddingLeft: "5px" }} >
                        <Row>
                            <Col xs={4} md={3}><b>Name </b> : {firstName} </Col>
                            <Col xs={4} md={3}><b>Email </b> : {email}</Col>

                            <Col xs={4} md={3}><b>Category </b> : {category}</Col>


                            <Col xs={3} md={2}><b>  <Button variant="danger" className="mx-3">Follow</Button></b></Col>

                        </Row>

                    </Container>
                </React.Fragment>



            </div >
        </div >


    );





};

export default View;
