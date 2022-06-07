import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import CardContent from 'react-bootstrap/Card';
import { Container, Row, Col, NavLink } from 'react-bootstrap'
import Login from '../Login';
import { useParams, useNavigate} from "react-router-dom";
import ParseJwt from '../../utilities/ParseJwt';
//import { Axios } from 'axios';

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
            //console.log(response.data.user._id);
        })
       
    }, [])

    const loggedinuser = ParseJwt(localStorage.getItem("token"));
    const sendersid = loggedinuser._id;
    const receiversid = id;     
        
        const NotifyAddProject = async () => {   
            
            axios.get(`http://localhost:8080/api/users/getuser/${sendersid}`).then((response) => {
                
                const firstNamelog = response.data.user.firstName;
                const lastNamelog = response.data.user.lastName; 
                
            axios.post("http://localhost:8080/createProject", {
            InvolvedInfluencerId: receiversid,
              InvolvedBusinessId: sendersid,
              Eventhappened: "Invitation for project collaboration",
              Notificationmessage: firstNamelog + " " + lastNamelog + " " + "is inviting you to collaborate on a project" ,
            }).then((res) => {
              alert("Notification created successfully");
              console.log("Notification created");
            });
        });
    }

    const NotifyAddEvent = async () => {          
        axios.get(`http://localhost:8080/api/users/getuser/${sendersid}`).then((response) => {
                
            const firstNamelog = response.data.user.firstName;
            const lastNamelog = response.data.user.lastName; 
        
        axios.post("http://localhost:8080/createEvent", {
        InvolvedInfluencerId: receiversid,
          InvolvedBusinessId: sendersid,
          Eventhappened: "Event addition",
          Notificationmessage: firstNamelog + " " + lastNamelog + " " + "added an event" ,
        }).then((res) => {
          alert("Notification created successfully");
          console.log("Notification created");
        });
    })
}

const NotifyChangeDatesProject = async () => {          
    axios.get(`http://localhost:8080/api/users/getuser/${sendersid}`).then((response) => {
            
        const firstNamelog = response.data.user.firstName;
        const lastNamelog = response.data.user.lastName; 
    
    axios.post("http://localhost:8080/createEvent", {
    InvolvedInfluencerId: receiversid,
      InvolvedBusinessId: sendersid,
      Eventhappened: "Schedule change of a project",
      Notificationmessage: firstNamelog + " " + lastNamelog + " " + "changed schedules of a project" ,
    }).then((res) => {
      alert("Notification created successfully");
      console.log("Notification created");
    });
})
}

const NotifyChangeDatesEvent = async () => {          
    axios.get(`http://localhost:8080/api/users/getuser/${sendersid}`).then((response) => {
            
        const firstNamelog = response.data.user.firstName;
        const lastNamelog = response.data.user.lastName; 
    
    axios.post("http://localhost:8080/createEvent", {
    InvolvedInfluencerId: receiversid,
      InvolvedBusinessId: sendersid,
      Eventhappened: "Schedule change of an event",
      Notificationmessage: firstNamelog + " " + lastNamelog + " " + "changed schedules of an event" ,
    }).then((res) => {
      alert("Notification created successfully");
      console.log("Notification created");
    });
})
}

const NotifyMakePayment = async () => {          
    axios.get(`http://localhost:8080/api/users/getuser/${sendersid}`).then((response) => {
            
        const firstNamelog = response.data.user.firstName;
        const lastNamelog = response.data.user.lastName; 
    
    axios.post("http://localhost:8080/createEvent", {
    InvolvedInfluencerId: receiversid,
      InvolvedBusinessId: sendersid,
      Eventhappened: "Business paid an influencer",
      Notificationmessage: firstNamelog + " " + lastNamelog + " " + "paid you." ,
    }).then((res) => {
      alert("Notification created successfully");
      console.log("Notification created");
    });
})
}

const NotifyRequestPaymentRefund = async () => {          
    axios.get(`http://localhost:8080/api/users/getuser/${sendersid}`).then((response) => {
            
        const firstNamelog = response.data.user.firstName;
        const lastNamelog = response.data.user.lastName; 
    
    axios.post("http://localhost:8080/createEvent", {
    InvolvedInfluencerId: receiversid,
      InvolvedBusinessId: sendersid,
      Eventhappened: "Business requested a payment refund",
      Notificationmessage: firstNamelog + " " + lastNamelog + " " + "requests a payment refund from you." ,
    }).then((res) => {
      alert("Notification created successfully");
      console.log("Notification created");
    });
})
}

   if(category==='influencer'|| category==='Influencer') {
        return (
        /*   
            <div>
 <h1> HI </h1>
        <h2>firstname: {firstName}</h2>
        <h2>email: {email}</h2>
            </div>
*/

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
                            
                                <Button variant="primary" onClick={NotifyAddProject}>Add Project</Button>
                                  <Button variant="primary" onClick={NotifyAddEvent}>Add Event</Button>
                                  <Button variant="primary" onClick={NotifyChangeDatesProject}>Change dates of a project</Button>
                                  <Button variant="primary" onClick={NotifyChangeDatesEvent}>Change dates of an event</Button>
                                  <Button variant="primary" onClick={NotifyMakePayment}>Pay influencer</Button>
                                  <Button variant="primary" onClick={NotifyRequestPaymentRefund}>Request a Payment Refund</Button>
                            
                            
                            
                        </Container>
                    </React.Fragment>



                    </div >
            </div >


                    );

        
    
  

}
else{
    return (
        /*   
            <div>
 <h1> HI </h1>
        <h2>firstname: {firstName}</h2>
        <h2>email: {email}</h2>
            </div>
*/

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
}

}

export default View;





