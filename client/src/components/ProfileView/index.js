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

const ProfileView = () => {
  const navigate = useNavigate();

  const handleEdit = (e) => {
    e.preventDefault();
    if(userType==="influencer"){
      window.location = `/update/${id}`;
    }else{
      window.location = `/updateb/${id}`;
    }
   
  };
  const [fname, setFName] = useState("");
  const [lname, setLName] = useState("");
  const [userType, setUserType] = useState("");
  const { id } = useParams();
  const [image, setUserImage] = useState();

  useEffect(() => {
    const userToken = localStorage.getItem("token"); //dpasfjfwa.adaisoixfn.sdfawsfcopi

    const user = ParseJwt(userToken); //{id=d12313123jop121o,email='kumuthu@gmail.com', fname="kumuthu"}
    if (userToken) {
      axios
        .get("http://localhost:5000/api/users/getuser/" + user._id)
        .then((res) => {
          setFName(res.data.firstName);
          setLName(res.data.lastName);
          setUserType(res.data.category);
          setUserImage(res.data.img)
          
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
                src={image}
              />
            </div>
          </Col>
          <Col>
            <div style={{ marginTop: "50px", padding: "20px" }}>
              <h4>{fname}</h4>
            </div>
          </Col>

          <Col>
          {
            (userType === 'business') ? 
            <button 
            style={{
              border: "solid",
              marginTop: "20px",
              borderRadius: "10px",
              padding: "10px",
              color: "green",
            }} onClick={() => { navigate(`/allBusinessProjects`) }}>
              View Projects
            </button>:
            <button 
            style={{
              border: "solid",
              marginTop: "20px",
              borderRadius: "10px",
              padding: "10px",
              color: "green",
            }} onClick={() => { navigate(`/allInfluencerProjects`) }}>
              View Projects
            </button>
          }
          </Col>
          <Col>
          {
            (userType === 'business') ? 
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
            </button> :
             <button
             style={{
               border: "solid",
               marginTop: "20px",
               borderRadius: "10px",
               padding: "10px",
               color: "green",
             }} 
              onClick={() => { navigate(`/acceptProjects`) }}>
               Pending projects
             </button>
          }
            
          </Col>
          <Col>
            {" "}
            <button
              onClick={handleEdit}
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
