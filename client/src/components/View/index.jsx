import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row } from 'react-bootstrap'
import { useNavigate, useParams } from "react-router-dom";
import image from "../../images/user.jpg";
import styles from "./styles.module.css";
import Login from '../Login/index'
import AllPostsExternal from '../posts-and-comments/AllPostsExternal';
import MainMenu from '../Main/MainMenu';

//test comment
function View() {
  const loggedInUser = localStorage.getItem("token");  
  const [listOfUsers, setListOfUsers] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setUserEmail] = useState();
  const [category, setUserCategory] = useState();
  const { id } = useParams(); 
  const navigate = useNavigate();

  useEffect(() => {
      axios.get(`http://localhost:5000/api/users/getuser/${id}`).then((response) => {

          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setUserEmail(response.data.email);
          setUserCategory(response.data.category);            
      })       

  }, [])

    if (loggedInUser) {
        return (

            <div id="allUsers">
                <MainMenu></MainMenu>
                <div>
                    <div
                        className="container"
                        style={{
                            position: "absolute",
                            marginTop: "10px",
                            paddingTop: "5px",
                            paddingBottom: "10px",
                            border: "none"
                        }}
                    ></div>
                    <div className={styles.profile}>
                            <img src={image} className={styles.image_img} alt="..." />
                        <hr />
                        <Row><h3 className="card-title">{firstName + " " + lastName}</h3></Row>
                        <Row> <h5>{category}</h5></Row>
                        <Row> <h10>{email}</h10></Row>
                        <Row><p>A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic.
                            Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.
                            This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader
                            see the organization of the essay and grasp its main points.</p></Row>
                     <button className={styles.button1} onClick={()=>{navigate(`/report/${id}`)}}>
                       Report
                     </button> 
                    </div>
                    
                </div >
                <Container>
                    <AllPostsExternal id={id}></AllPostsExternal>
                </Container>
            </div >


        );
    } else {
        return (
            <div>
                <Login></Login>
            </div>
        )
    }
};

export default View;