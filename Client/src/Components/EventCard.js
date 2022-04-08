// import { React, useEffect, useState } from "react";
// import {  useParams, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { CloseButton } from 'react-bootstrap';

//  function EventCard(){
//     // const [eventName,setEventName] = useState();
//     // const [eventDescription,setEventDescription] = useState();
//     // const [eventStartDate,setEventStartDate] = useState();
//     // const [eventEndDate,setEventEndDate] = useState();
//     const [event,setEvent] = useState();

//     const { id } = useParams();

//     let navigate = useNavigate();

//     useEffect(() =>{
//         axios.get(`/getEvent/${id}`).then((res) => {
//             console.log("Hello");
//             // setEventName(res.data.event.eventName);
//             // setEventDescription(res.data.event.eventDescription);
//             // setEventStartDate(res.data.event.eventStartDate);
//             // setEventEndDate(res.data.event.eventEndDate);
//             setEvent(res.data.event);
//             console.log("EventData",res.data.event);
//         });
//         if(event){
//             console.log(event.eventName);
//         }else{
//             console.log("No data");
//         }
//     // eslint-disable-next-line
//     },[]);

//     console.log(event);
//     return(
//         <div>
//             <CloseButton className="closeButton" onClick={() => { navigate("/allProjects") }} />
//             {event.eventName}
//         </div>
//     );
    
//  }


//  export default EventCard;

import React from 'react';

function EventCard() {
    return(
        <div>
            <p>Hello</p>        

        </div>
    );
}

export default EventCard;