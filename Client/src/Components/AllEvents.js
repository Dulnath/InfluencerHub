import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { Button, Card } from 'react-bootstrap';

function AllEvents() {
    const [listOfEvents, setListOfEvents] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        Axios.get("/getEvent").then((response) => {
            setListOfEvents(response.data);
        })
    }, [])

    return (
        <div id="allEvents">
            <h1>All Events</h1>
            {listOfEvents.map((events) => {
                return (
                    <div>
                        <Card className="detailsCard" border="dark">
                            <div className="details">
                                <span class="title">Event Name:</span>
                                <span class="data">{events.eventName}</span>
                            </div>
                            <div className="details">
                                <span class="title">Event Description:</span>
                                <span class="data">{events.eventDescription}</span>
                            </div>
                            <div className="details">
                                <span class="title">Event Start Date:</span>
                                <span class="data">{events.eventStartDate}</span>
                            </div>
                            <div className="details">
                                <span class="title">Event End Date:</span>
                                <span class="data">{events.eventEndDate}</span>
                            </div>
                            <div>
                            </div>
                        </Card>
                    </div>
                );
            })}

        </div>
    );
}

export default AllEvents;