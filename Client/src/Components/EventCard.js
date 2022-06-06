import { React, useEffect, useState } from "react";
import {  useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CloseButton } from 'react-bootstrap';

 function EventCard(){
    const [eventName,setEventName] = useState();
    const [eventDescription,setEventDescription] = useState();
    const [eventStartDate,setEventStartDate] = useState();
    const [eventEndDate,setEventEndDate] = useState();

    const { id } = useParams();

    let navigate = useNavigate();

    useEffect(() =>{
        axios.get(`/getEvent/${id}`).then((res) => {
            console.log("Hello");
            setEventName(res.data.event.eventName);
            setEventDescription(res.data.event.eventDescription);
            setEventStartDate(res.data.event.eventStartDate);
            setEventEndDate(res.data.event.eventEndDate);
            console.log("EventData",res.data.event);
        });
    // eslint-disable-next-line
    },[]);

    return(
        <div>
            <CloseButton className="closeButton" onClick={() => { navigate("/allProjects") }} />
            {eventName}
            {eventDescription}
            {eventStartDate}
            {eventEndDate}
        </div>
    );  
 }

 export default EventCard;