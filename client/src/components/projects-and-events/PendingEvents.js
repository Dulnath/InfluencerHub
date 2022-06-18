import React,{ useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import axios from "axios";
import EventCard from "./EventCard";
import MainMenu from '../Main/MainMenu';

function PendingEvents() {
    const [listOfEvents, setListOfEvents] = useState([]);
    const [selected, setSelected] = useState();
    const [openEventCard, setOpenEventCard] = useState();
    const [businessName, setBusinessName] = useState();

    //Retrieve all events
    useEffect(() => {
        axios.get("http://localhost:5000/getEvent").then((response) => {
            setListOfEvents(response.data);
        })
        axios.get(`http://localhost:5000/getProject/${projectID}`).then((response) => {
            setBusinessName(response.data.project.businessName);
        })
    }, []);

    const { projectName, projectID } = useParams();

    //Open event card
    const eventCard = (id) => {
        setSelected(id);
        setOpenEventCard(!openEventCard);
    }

    const acceptEvent = (id) => {
        axios.put(`http://localhost:5000/acceptEvent/${id}`,{
        }).then(() => {
            console.log("Event has been accepted");
        })

        const newList = listOfEvents.filter((event) => event._id !== id);
        setListOfEvents(newList);
    }

    const rejectEvent = (id) => {
        axios.put(`http://localhost:5000/rejectEvent/${id}`,{
        }).then(() => {
            console.log("Event has been rejected");
        })

        const newList = listOfEvents.filter((event) => event._id !== id);
        setListOfEvents(newList);
    }


    let navigate = useNavigate();

    const filteredList = listOfEvents.filter((event) => event.projectID === projectID && event.isAccepted === null);
    return (
        <div className="background">
            <MainMenu></MainMenu>
            <div id="allEvents">
                <h1 style={{ textAlign: "center" }}>{projectName}</h1>
                <h3>All Events</h3><br/>
                <h4>Business Name: {businessName}</h4>

                {filteredList.length > 0 ? (filteredList.map((events) => {
                    return (
                        <div>
                            <Card className="detailsCard" border="dark">
                                <div className="details">
                                    <span className="title">Event Name:</span>
                                    <span className="data">{events.eventName}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Event Description:</span>
                                    <span className="data">{events.eventDescription}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Event Start Date:</span>
                                    <span className="data">{events.eventStartDate}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Event End Date:</span>
                                    <span className="data">{events.eventEndDate}</span>
                                </div>
                                <div>
                                    <Button variant="secondary" size="sm" type="submit" onClick={() => { eventCard(events._id) }}>View Event Card</Button>
                                    <Button className="eventButton" variant="danger" size="sm" type="submit" onClick={() => { rejectEvent(events._id) }}>Reject Event</Button>
                                    <Button className="eventButton" variant="success" size="sm" type="submit" onClick={() => { acceptEvent(events._id) }}>Accept Event</Button>                                    
                                </div>
                            </Card>

                            {(selected === events._id) ?
                                openEventCard &&
                                <div>
                                    <EventCard eventID={events._id} />
                                </div> : null
                            }

                        </div>
                    );
                })
                ) : (
                    <div>
                        <p>No events have been added yet</p>
                    </div>
                )}

            </div>
        </div>

    );
}

export default PendingEvents;