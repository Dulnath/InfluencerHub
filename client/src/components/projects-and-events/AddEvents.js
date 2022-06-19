import React,{ useEffect, useState } from 'react';
import { Card, CloseButton, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import MainMenu from '../Main/MainMenu';

function AddEvents() {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");
    const [projectStartDate, setProjectStartDate] = useState("");
    const [projectEndDate, setProjectEndDate] = useState("");
    const [influencerName, setInfluencerName] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [influencerID, setInfluencerID] = useState("");
    const [businessID, setBusinessID] = useState("");

    const { projectName, projectID } = useParams();

    // Create an event
    const createEvent = () => {
        Axios.post("http://localhost:5000/createEvent", {
            influencerName,
            influencerID,
            businessName,
            businessID,
            projectID,
            projectName,
            eventName,
            eventDescription,
            eventStartDate,
            eventEndDate
        }).then((res) => {
            //alert("Event created successfully");
            console.log("Event created");
            navigate(`/allBusinessEvents/${projectName}/${projectID}`) 
        });
    }

    // Retrieve data of project
    useEffect(() => {
        Axios.get(`http://localhost:5000/getProject/${projectID}`).then((response) => {
            setProjectStartDate(response.data.project.projectStartDate);
            setProjectEndDate(response.data.project.projectEndDate);
            setInfluencerName(response.data.project.influencerName);
            setBusinessName(response.data.project.businessName);
            setInfluencerID(response.data.project.influencerID);
            setBusinessID(response.data.project.businessID);
        })
        // eslint-disable-next-line
    }, []);

    let navigate = useNavigate();

    return (
        <div className='background'>
            <MainMenu></MainMenu>
            <div className="projectCard">
                <Card border='dark'>
                    <Card.Header>
                        <div className="projectCardHeader">
                            Add Event
                            <CloseButton className="closeButton" onClick={() => { navigate(`/allBusinessEvents/${projectName}/${projectID}`) }} />
                        </div>
                    </Card.Header>
                    <Card.Body className='cardBody'>
                        <Form>
                            <Form.Group>
                                <h5>Event Name</h5>
                                <Form.Control as="textarea"
                                    rows={1}
                                    placeholder='Add Event Name'
                                    onChange={(event) => { setEventName(event.target.value) }}>
                                </Form.Control><br />
                            </Form.Group>

                            <Form.Group>
                                <h5>Event Description</h5>
                                <Form.Control as="textarea"
                                    rows={3}
                                    placeholder='Add Event Description'
                                    onChange={(event) => { setEventDescription(event.target.value) }}>
                                </Form.Control><br />
                            </Form.Group>

                            <h5>Event Duration</h5>

                            <Form.Label>Start Date</Form.Label><br />
                            <div>
                                <input
                                    type="date"
                                    min={projectStartDate}
                                    max={projectEndDate}
                                    value={eventStartDate}
                                    onChange={(event) => { setEventStartDate(event.target.value) }} />
                            </div><br />

                            <Form.Label>End Date</Form.Label><br />
                            <div>
                                <input
                                    type="date"
                                    min={eventStartDate}
                                    max={projectEndDate}
                                    value={eventEndDate}
                                    onChange={(event) => { setEventEndDate(event.target.value) }} />
                            </div><br />

                        </Form>

                    </Card.Body>

                    <Card.Footer className="cardFooter">
                        <Button variant="success" size="lg" type="submit" onClick={createEvent}>Add Event</Button>
                    </Card.Footer>
                </Card>
            </div>

        </div>
    );
}

export default AddEvents;