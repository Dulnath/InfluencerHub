//import { Link } from "react-router-dom";
import "./styles.module.css";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import ParseJwt from "../Utilities/ParseJwt";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import AllPosts from "../posts-and-comments/AllPosts";
import MainMenu from "../Main/MainMenu";
import styles from "./styles.module.css";

const ProfileView = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate('/login');
  };

  const handleEdit = (e) => {
    e.preventDefault()
    window.location = `/update/${id}`
  }
  const [fname, setFName] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const userToken = localStorage.getItem("token"); //dpasfjfwa.adaisoixfn.sdfawsfcopi

    const user = ParseJwt(userToken); //{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}
    if (userToken) {
      axios
        .get("http://localhost:5000/api/users/getuser/" + user._id)
        .then((res) => {
          setFName(res.data.firstName);

        });
    }
  }, []);

  return (
    <div className="main_container">
      <MainMenu></MainMenu>
      <Container>
        <Row>
          <Col>
            {" "}
            <div
              className="container"
              style={{
                height: "300px",
                width: "300px",
                backgroundColor: "#f2fa40",
                marginTop: "50px",
                padding: "20px",
                borderRadius: "20px",
              }}
            >
              <img
                style={{ height: "250px", width: "250px" }}
                src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80"
              />
            </div>
          </Col>
          <Col>
            <div style={{ marginTop: "50px", padding: "20px" }}>
              <h4>{id}</h4>
              <h4>{fname}</h4>
            </div>
          </Col>


          <Col>
            <button 
            style={{
              border: "solid",
              marginTop: "20px",
              borderRadius: "10px",
              padding: "10px",
              color: "green",
            }} onClick={() => { navigate(`/allProjects`) }}>
              View Projects
            </button>
          </Col>
          <Col>
            <button
            style={{
              border: "solid",
              marginTop: "20px",
              borderRadius: "10px",
              padding: "10px",
              color: "green",
            }} 
             onClick={() => { navigate(`/manageprojects`) }}>
              Manage Projects
            </button>
          </Col>
          <Col>
            {" "}

            <button onClick={handleEdit}

              style={{
                border: "solid",
                marginTop: "20px",
                borderRadius: "10px",
                padding: "10px",
                color: "blue",
              }}
            >
              Edit profile
            </button>




          </Col>
        </Row>
        <Row>
          <Col></Col>
          <Col> </Col>
          <Col></Col>
        </Row>
      </Container>
      <Container>
        <AllPosts id={id}></AllPosts>
      </Container>
    </div>
  );
};

export default ProfileView;
