import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';

function EventCard(props) {

    const [projectName, setProjectName] = useState("");
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate, setEventEndDate] = useState("");

    //  const {id} = useParams();


    useEffect(() => {
        axios.get(`/getEvent/${props.eventID}`).then((res) => {
            setProjectName(res.data.event.projectName);
            setEventName(res.data.event.eventName);
            setEventDescription(res.data.event.eventDescription);
            setEventStartDate(res.data.event.eventStartDate);
            setEventEndDate(res.data.event.eventEndDate);
        });
        // eslint-disable-next-line
    }, []);

    console.log(props.eventID);
    return (
        <div >
            <Card border="dark" className="eventCard">
                <h2 style={{ textAlign: "center" }}>Event Card</h2><br/>
                <table id="table">
                    <tr>
                        <td style={{fontWeight:"500"}}>Project Name</td>
                        <td>{projectName}</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight:"500"}}>Event Name</td>
                        <td>{eventName}</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight:"500"}}>Event Description</td>
                        <td>{eventDescription}</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight:"500"}}>Event Start Date</td>
                        <td>{eventStartDate}</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight:"500"}}>Event End Date</td>
                        <td>{eventEndDate}</td>
                    </tr>
                    <tr>
                        <td style={{fontWeight:"500"}}>Event Duration</td>
                        <td>{ eventEndDate } - { eventStartDate }</td>
                    </tr>
        
                </table>
            </Card>

        </div>
    );
}

export default EventCard;