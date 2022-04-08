import { React, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from 'react-bootstrap';
import axios from "axios";

function AllEvents() {
    const [listOfEvents, setListOfEvents] = useState([]);

    useEffect(() => {
        axios.get("/getEvent").then((response) => {
            setListOfEvents(response.data);
        })
    }, []);

    const { projectName } = useParams();

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

    return (
        <div id="allEvents">
            <h1 style={{ textAlign: "center" }}>{projectName}</h1>
            <h3>All Events</h3>

            {listOfEvents.filter((event) => event.projectName === projectName).map((events) => {
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
                                <Button variant="success" size="sm" type="submit" onClick={() => { navigate(`/event/${events._id}`) }}>View Event Card</Button>
                                <Button className="eventButton" variant="warning" size="sm" type="submit" onClick={() => { navigate(`/editEvent/${events._id}`) }}>Edit Event</Button>
                                <Button className="eventButton" variant="danger" size="sm" type="submit" onClick={() => { handleDelete(events._id) }}>Delete Event</Button>
                            </div>
                        </Card>
                    </div>
                );
            })}

        </div>
    );
}

export default AllEvents;