import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap'
import { useParams } from "react-router-dom";
import image from "../../images/user.jpg";
import styles from "./styles.module.css";
import Login from '../Login/index'
import AllPosts from '../posts-and-comments/AllPosts';
import ParseJwt from '../../utilities/ParseJwt';

function View() {
    const loggedInUser = localStorage.getItem("token");
    const userMain = ParseJwt(loggedInUser)
    const [listOfUsers, setListOfUsers] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setUserEmail] = useState();
    const [category, setUserCategory] = useState();
    const { id } = useParams();
    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/getuser/${id}`).then((response) => {

            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setUserEmail(response.data.email);
            setUserCategory(response.data.category);            
        })

    }, [])


    if (loggedInUser && userMain.category==="business") {
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



                    <React.Fragment>
                        <Container fluid="md" className='p-3 mb-2 border border-primary rounded' style={{ border: '2px solid #000000', paddingTop: "5px", paddingBottom: "5px", paddingLeft: "5px" }} >
                        <div class="card-deck">
                  <div class="card" className={styles.card}>
   
                  <div class="card-body">  
                 
                     <img src={image} className={styles.image_img} alt="..."/>
                     <h3 class="card-title">{firstName+" "+ lastName}</h3>
                   <Row> <h5>{category}</h5></Row> 
                   <Row> <h10>{email}</h10></Row> 
                   <Row><p>A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. 
                       Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. 
                       This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader 
                       see the organization of the essay and grasp its main points.


                       Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or
                        a single long illustration of a general point. It might describe a place, character, or process; narrate a series 
                        of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. 
                        Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most 
                        important of these is a topic sentence.</p></Row> 
                   <button className={styles.button}>
                       Follow 
                    </button> 
                    <button className={styles.button1}>
                       Report
                     </button> 
                     <button className={styles.button}>
                       Add Project
                     </button>
                     <button className={styles.button}>
                       Add Event
                     </button> 
                     <button className={styles.button}>
                       Change schedules of the project
                     </button>
                     <button className={styles.button}>
                       Change schedules of the event
                     </button>
                     <button className={styles.button}>
                       Pay Influencer
                     </button>
                     <button className={styles.button}>
                       Request a Payment Refund
                     </button>
                  </div>
                  </div>
                  </div>

                        </Container>
                    </React.Fragment>
                </div >
                <Container>
                    <AllPosts></AllPosts>
                </Container>
            </div >


        );
    }
    else if(loggedInUser && userMain.category==="influencer"){
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



                    <React.Fragment>
                        <Container fluid="md" className='p-3 mb-2 border border-primary rounded' style={{ border: '2px solid #000000', paddingTop: "5px", paddingBottom: "5px", paddingLeft: "5px" }} >
                        <div class="card-deck">
                  <div class="card" className={styles.card}>
   
                  <div class="card-body">  
                 
                     <img src={image} className={styles.image_img} alt="..."/>
                     <h3 class="card-title">{firstName+" "+ lastName}</h3>
                   <Row> <h5>{category}</h5></Row> 
                   <Row> <h10>{email}</h10></Row> 
                   <Row><p>A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic. 
                       Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs. 
                       This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader 
                       see the organization of the essay and grasp its main points.


                       Paragraphs can contain many different kinds of information. A paragraph could contain a series of brief examples or
                        a single long illustration of a general point. It might describe a place, character, or process; narrate a series 
                        of events; compare or contrast two or more things; classify items into categories; or describe causes and effects. 
                        Regardless of the kind of information they contain, all paragraphs share certain characteristics. One of the most 
                        important of these is a topic sentence.</p></Row> 
                   <button className={styles.button}>
                       Follow 
                    </button> 
                    <button className={styles.button1}>
                       Report
                     </button> 
                     <button className={styles.button}>
                       Accept Project
                    </button> 
                    <button className={styles.button}>
                       Reject Project
                    </button>
                    <button className={styles.button}>
                       Accept Event
                    </button> 
                    <button className={styles.button}>
                       Reject Event
                    </button>
                    <button className={styles.button}>
                       Accept Payment Refund
                    </button> 
                    <button className={styles.button}>
                       Reject Payment Refund
                    </button>

                  </div>
                  </div>
                  </div>

                        </Container>
                    </React.Fragment>
                </div >
                <Container>
                    <AllPosts></AllPosts>
                </Container>
            </div >


        );
    }
    
    else {
        return (
            <div>
                <Login></Login>
            </div>
        )
    }
};

export default View;
