import React from 'react';
import {useState, useEffect } from 'react';
import axios, { Axios } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Card from 'react-bootstrap/Card';
import {Container,Row,Col} from 'react-bootstrap'
import Login from '../Login';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

//import { uuid } from "uuidv4";
import uuid from 'react-uuid';
import View from '../View';

function Search() {
    const [listOfUsers, setListOfUsers] = useState([]);
    const loggedInUser = localStorage.getItem("token");
    const [searchTerm,setSearchTerm] = useState('');
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const [searchResults, setSearchResults] = useState([]);


 
   // const category= localStorage.getItem("token");
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/getUsers").then((response) => {
             setListOfUsers(response.data);
        })
    }, [])


    if(loggedInUser){
        //if(category=="Influencer"){
    return (
      
    
        <div id="allUsers">
            <div className="container" style={{marginTop:"30px"}}>
                        <div
                        className="container"
                        style={{
                            position: "absolute",
                            marginTop: "10px",
                            paddingTop:"5px",
                            paddingBottom:"10px"
                        }}
                        ></div>
            <h1>All Users</h1>
    

            {listOfUsers.map((user,id) => {
                return (
                    <React.Fragment>
      <Container fluid="md" className='p-3 mb-2 border border-primary rounded' style={{border:'2px solid #000000', paddingTop:"5px", paddingBottom:"5px" ,paddingLeft:"5px"}} key={user._id}>
                                    <Row>
                                    <Col xs={4} md={3}><b>Id </b> : {user._id}</Col>
                                        <Col xs={4} md={3}><b>Name </b> : {user.firstName + " " + user.lastName}</Col>
                                        <Col xs={4} md={3}><b>Email </b> : {user.email}</Col>
                                        
                                        <Col xs={4} md={3}><b>Category </b> : {user.category}</Col>
            
                                        <Col xs={3} md={2}><b> <button className="btn btn-success"
                        onClick={() => {navigate(`/view/${user._id}`)}}
                        >View
                        
                    </button> </b></Col>
                                        
                                        <Col xs={3} md={2}><b>  <Button variant="danger" className="mx-3">Follow</Button></b></Col>
                                       
                                    </Row>
                                    
                                </Container>
</React.Fragment>





                );
            })}
        </div >
</div >
    );
        }
        else{
            return(
                <div>
                    <Login></Login>
                </div>  
        )
    }

};

export default Search;