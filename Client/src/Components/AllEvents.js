import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import axios from "axios";
import EditEvent from './EditEvent';
import EventCard from "./EventCard";

function AllEvents() {
    const [listOfEvents, setListOfEvents] = useState([]);
    const [openEdit, setOpenEdit] = useState();
    const [selected, setSelected] = useState();
    const [openEventCard, setOpenEventCard] = useState();

    useEffect(() => {
        axios.get("/getEvent").then((response) => {
            setListOfEvents(response.data);
        })
    }, []);

    const { projectName, projectID } = useParams();

    const editWindow = (id) => {
        setSelected(id);
        setOpenEdit(!openEdit);
    }

    const eventCard = (id) => {
        setSelected(id);
        setOpenEventCard(!openEventCard);
    }

    const handleDelete = (_id) => {
        axios.delete(`/deleteEvent/${_id}`)
            .then((res) => {
                console.log(res);
                console.log(res.data);
            })

        const newList = listOfEvents.filter((event) => event._id !== _id);
        alert("Event was deleted");
        setListOfEvents(newList);
    }

    let navigate = useNavigate();

    const filteredList = listOfEvents.filter((event) => event.projectName === projectName);
    return (
        <div id="allEvents">
            <h1 style={{ textAlign: "center" }}>{projectName}</h1>
            <h3>All Events</h3>

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
                                <Button variant="success" size="sm" type="submit" onClick={() => { eventCard(events._id) }}>View Event Card</Button>
                                <Button className="eventButton" variant="warning" size="sm" type="submit" onClick={() => { editWindow(events._id) }}>Edit Event</Button>
                                <Button className="eventButton" variant="danger" size="sm" type="submit" onClick={() => { handleDelete(events._id) }}>Delete Event</Button>
                            </div>
                        </Card>

                        {(selected === events._id) ?
                            openEdit &&
                            <div>
                                <EditEvent eventID={events._id} projectID={projectID}/>
                            </div> : null
                        }

                        {(selected === events._id) ?
                            openEventCard &&
                            <div>
                                <EventCard eventID={events._id}/>
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

            <br />
            <Button variant="secondary" size="lg" onClick={() => { navigate(`/addEvents/${projectName}`) }}>Add new event</Button>

        </div>
    );
}

export default AllEvents;