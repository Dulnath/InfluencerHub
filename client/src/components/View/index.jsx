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
import { FaStar } from 'react-icons/fa';

function View() {
    const loggedInUser = localStorage.getItem("token");
    const [listOfUsers, setListOfUsers] = useState([]);
    const [firstName, setFirstName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setUserEmail] = useState();
    const [category, setUserCategory] = useState();
    const [listOfRatings, setListOfRatings] = useState([]);
    const { id } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/users/getuser/${id}`).then((response) => {

            setFirstName(response.data.firstName);
            setLastName(response.data.lastName);
            setUserEmail(response.data.email);
            setUserCategory(response.data.category);
        })
        axios.get("http://localhost:5000/getRatings").then((response) => {
            setListOfRatings(response.data);

        })
    }, [])

    if (loggedInUser) {

        const filteredList = listOfRatings.filter((a) => a.ratingGivenTo.includes(`${id}`));
        let r = filteredList.map((item) => item.rating)

        let sum = 0;
        for (let num of r) {
            sum = sum + num
        }
        let val = 0;
        val = sum / filteredList.length;

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
                        {
                            (filteredList.length > 0) ?
                                <div>
                                    <FaStar
                                        size={50}
                                        color='#FFD700'
                                    />
                                    <h4>{val} / 5</h4>
                                </div>: null

                        }

                        <Row> <h5>{category}</h5></Row>
                        <Row> <h10>{email}</h10></Row>
                        <Row><p>A paragraph is a series of sentences that are organized and coherent, and are all related to a single topic.
                            Almost every piece of writing you do that is longer than a few sentences should be organized into paragraphs.
                            This is because paragraphs show a reader where the subdivisions of an essay begin and end, and thus help the reader
                            see the organization of the essay and grasp its main points.</p></Row>
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
