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
import ParseJwt from '../Utilities/ParseJwt';
//test comment
function View() {
  const loggedInUser = localStorage.getItem("token");
  const userMain = ParseJwt(loggedInUser)
  const [listOfUsers, setListOfUsers] = useState([]);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setUserEmail] = useState();
  const [category, setUserCategory] = useState();
  const { id } = useParams();
  const [firstNamelog, setfirstName] = useState();
  const [lastNamelog, setlastName] = useState();
  const navigate = useNavigate();

  const sendersid = userMain._id;
  const receiversid = id;
  useEffect(() => {
      axios.get(`http://localhost:5000/api/users/getuser/${id}`).then((response) => {

          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setUserEmail(response.data.email);
          setUserCategory(response.data.category);            
      })

      axios.get(`http://localhost:5000/api/users/getuser/${sendersid}`).then((response) => {
          
          setfirstName(response.data.firstName);
          setlastName(response.data.lastName);
      }) 

  }, [])
  
    const NotifyAddProject = async () => {      
      axios.post("http://localhost:5000/createProject", {
        ReceiverId: receiversid,
        SenderId: sendersid,
        Eventhappened: "Invitation for project collaboration",
        Notificationmessage: firstNamelog + " " + lastNamelog + " " + "is inviting you to collaborate on a project" ,
      }).then((res) => {
        alert("Notification created successfully");
        console.log("Notification created");
      });    
}

const NotifyAddEvent = async () => {         
  axios.post("http://localhost:5000/createEvent", {
  ReceiverId: receiversid,
    SenderId: sendersid,
    Eventhappened: "Event addition",
    Notificationmessage: firstNamelog + " " + lastNamelog + " " + "added an event",
  }).then((res) => {
    alert("Notification created successfully");
    console.log("Notification created");
  });

}

const NotifyChangeDatesProject = async () => {          
  axios.post("http://localhost:5000/updateProject", {
  ReceiverId: receiversid,
    SenderId: sendersid,
    Eventhappened: "Schedule change of a project",
    Notificationmessage: firstNamelog + " " + lastNamelog + " " + "changed schedules of a project" ,
  }).then((res) => {
    alert("Notification created successfully");
    console.log("Notification created");
  });
}

const NotifyChangeDatesEvent = async () => {          
   axios.post("http://localhost:5000/updateEvent", {
  ReceiverId: receiversid,
    SenderId: sendersid,
    Eventhappened: "Schedule change of an event",
    Notificationmessage: firstNamelog + " " + lastNamelog + " " + "changed schedules of an event" ,
  }).then((res) => {
    alert("Notification created successfully");
    console.log("Notification created");
  });
}

const NotifyMakePayment = async () => {          
  axios.post("http://localhost:5000/makepayment", {
  ReceiverId: receiversid,
    SenderId: sendersid,
    Eventhappened: "Business paid an influencer",
    Notificationmessage: firstNamelog + " " + lastNamelog + " " + "paid you." ,
  }).then((res) => {
    alert("Notification created successfully");
    console.log("Notification created");
  });
}

const NotifyRequestPaymentRefund = async () => {          
  axios.post("http://localhost:5000/requestrefund", {
  ReceiverId: receiversid,
    SenderId: sendersid,
    Eventhappened: "Business requested a payment refund",
    Notificationmessage: firstNamelog + " " + lastNamelog + " " + "requests a payment refund from you." ,
  }).then((res) => {
    alert("Notification created successfully");
    console.log("Notification created");
  });
}


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
                     <button className={styles.button} onClick={NotifyAddProject}>
                       Add Project
                     </button>
                     <button className={styles.button} onClick={NotifyAddEvent}>
                       Add Event
                     </button> 
                     <button className={styles.button} onClick={NotifyChangeDatesProject}>
                       Change schedules of the project
                     </button>
                     <button className={styles.button} onClick={NotifyChangeDatesEvent}>
                       Change schedules of the event
                     </button>
                     <button className={styles.button} onClick={NotifyMakePayment}>
                       Pay Influencer
                     </button>
                     <button className={styles.button} onClick={NotifyRequestPaymentRefund}>
                       Request a Payment Refund
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