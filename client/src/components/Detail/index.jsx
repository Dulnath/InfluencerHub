/*

import React from 'react';
import {useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button} from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import {Container,Row,Col} from 'react-bootstrap'
import Login from '../Login';
import { Outlet, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



import styles from "./styles.module.css";

// *snip*
 
function Search() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const loggedInUser = localStorage.getItem("token");
  const [inputText, setInputText] = useState("");
  const [searchTerm,setSearchTerm] = useState('');

  const navigate = useNavigate();

  const view = () => {
      navigate("/view")
  }
 // const category= localStorage.getItem("token");
  useEffect(() => {
      axios.get("http://localhost:8080/api/users/getUsers").then((response) => {
          setListOfUsers(response.data);
      })
  }, [])
/*
  setActiveUser(user,index){
    this.setState({
      currentUser:null,
      currentIndex:-1
    })
  }
*/

/*
  return (
    <div className="search">
      <input type="text" placeholder="searchbyfirstname" value={users.firstName}  onChange={this.users.firstName} />
      
      <Button variant="primary"
      onClick={this.user.firstName}
    
      >
        Search</Button>

      {listOfUsers.map((user,index)=>{

      // (index== currentIndex ? "active":"")
      // onclick = { () =>this.setActiveUser(user,index)}
      // key={index}

      <React.Fragment>
      <Container fluid="md" className='p-3 mb-2 border border-primary rounded' style={{border:'2px solid #000000', paddingTop:"5px", paddingBottom:"5px" ,paddingLeft:"5px"}} key={user._id}>
                                    <Row>
                                        <Col xs={4} md={3}><b>Name </b> : {user.firstName + " " + user.lastName}</Col>
                                        <Col xs={4} md={3}><b>Email </b> : {user.email}</Col>
                                        
                                        <Col xs={4} md={3}><b>Category </b> : {user.category}</Col>
            
                                        <Col xs={3} md={2}><b> <button className="btn btn-success"
                        onClick={view}>View
                    </button> </b></Col>
                                        
                                        <Col xs={3} md={2}><b>  <Button variant="danger" className="mx-3">Follow</Button></b></Col>
                                       
                                    </Row>
                                    
                                </Container>
  </React.Fragment>
       
      })}
      
    </div>
  );
}
export default Search;*/
 /* let inputHandler = (e) => {
    //convert input text to lower case
    var lowerCase = e.target.value.toLowerCase();
    setInputText(lowerCase);
  }
  const navigate = useNavigate();

  const view = () => {
      navigate("/view")
  }
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
          

<input
className='form-control'
type='search'
placeholder='search'
onChange={inputHandler}
>

</input>
<Button variant="primary">Search</Button>

          {listOfUsers.map((user) => {
              return (
                  <React.Fragment>
    <Container fluid="md" className='p-3 mb-2 border border-primary rounded' style={{border:'2px solid #000000', paddingTop:"5px", paddingBottom:"5px" ,paddingLeft:"5px"}} key={user._id}>
                                  <Row>
                                      <Col xs={4} md={3}><b>Name </b> : {user.firstName + " " + user.lastName}</Col>
                                      <Col xs={4} md={3}><b>Email </b> : {user.email}</Col>
                                      
                                      <Col xs={4} md={3}><b>Category </b> : {user.category}</Col>
          
                                      <Col xs={3} md={2}><b> <button className="btn btn-success"
                      onClick={view}>View
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

export default Search;*/

/*function Search({ placeholder, data }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    useEffect(() => {
        axios.get("http://localhost:8080/api/users/getUsers").then((response) => {
            setFilteredData(response.data);
        })
    }, [])
  
    const handleFilter = (event) => {
      const searchWord = event.target.value;
      setWordEntered(searchWord);
      const newFilter = user.filter((user) => {
        return user.category.toLowerCase().includes(searchWord.toLowerCase());
      });
  
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
      }
    };
  
    const clearInput = () => {
      setFilteredData([]);
      setWordEntered("");
    };
  
    return (
      <div className="search">
        <div className="searchInputs">
          <input
            type="text"
            placeholder={placeholder}
            value={wordEntered}
            onChange={handleFilter}
          />
          <div className="searchIcon">
            {filteredData.length === 0 ? (
              <SearchIcon />
            ) : (
              <CloseIcon id="clearBtn" onClick={clearInput} />
            )}
          </div>
        </div>
        {filteredData.length != 0 && (
          <div className="dataResult">
            {filteredData.slice(0, 15).map((value, key) => {
              return (
                <a className="dataItem" href={user.id} target="_blank">
                  <p>{user.title} </p>
                </a>
              );
            })}
          </div>
        )}
      </div>
    );
  }
  
  export default Search;*/




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
/*
import React from 'react'

import axios from "axios"
import {Container,Row,Col} from 'react-bootstrap'
import { useState,useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Login from '../Login';


function Search(){
    const [apiData,setApiData] = useState([]);
    const loggedInUser = localStorage.getItem("token");

    useEffect(()=>{        
        axios.get('http://localhost:8080/api/users/getUsers').then(res=>{
            setApiData(res.data);
        })
    },[])

    if(loggedInUser){
            return(
                <div>
                   
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
                        {apiData.map((data)=>{
                            return(
                                <React.Fragment>
                                <Container fluid="md" className='p-3 mb-2 border border-primary rounded'  key={user._id}>
                                    <Row>
                                        <Col xs={6} md={4}><b>First Name </b> : {user.firstName}</Col>
                                        <Col xs={6} md={4}><b>Last Name </b> : {user.lastName}</Col>
                                        <Col xs={6} md={4}><b>Email </b> : {user.email}</Col>
                                    </Row>
                                </Container>
                                </React.Fragment>
                            )
                        })}
                        </div>
                    </div>
                </div>       
            ) 
        }else{
            return(
                <div>
                    <Login></Login>
                </div>  
        )
    }
}

export default Search;*/