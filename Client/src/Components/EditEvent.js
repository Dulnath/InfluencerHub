import { React, useState, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import axios from "axios";

function EditEvent(props) {
    const [eventName, setEventName] = useState();
    const [eventDescription, setEventDescription] = useState();
    const [eventStartDate, setEventStartDate] = useState();
    const [eventEndDate, setEventEndDate] = useState();

    const editEvent = () => {
        axios.put(`/updateEvent/${props.eventID}`, {
            eventName,
            eventDescription,
            eventStartDate,
            eventEndDate
        }).then((res) => {
            alert("Project has been edited");
            console.log("Project edited");
        });
    }

    useEffect(() => {
        axios.get(`/getEvent/${props.eventID}`).then((res) => {
            setEventName(res.data.event.eventName);
            setEventDescription(res.data.event.eventDescription);
            setEventStartDate(res.data.event.eventStartDate);
            setEventEndDate(res.data.event.setEventEndDate);
            console.log(res.data.event);
        });
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <div className="eventCard">
                <Card border="dark" >
                    <Card.Header>
                        <div className="eventCardHeader">
                            Edit an Event         
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Form>
                            <Form.Group>
                                <h5>Edit Event Name</h5>
                                <Form.Control as="textarea"
                                    rows={1}
                                    placeholder='Add Event Name'
                                    value={eventName}
                                    onChange={(event) => { setEventName(event.target.value) }}>
                                </Form.Control><br />
                            </Form.Group>

                            <Form.Group>
                                <h5>Edit Event Description</h5>
                                <Form.Control as="textarea"
                                    rows={3}
                                    placeholder='Add Event Description'
                                    value={eventDescription}
                                    onChange={(event) => { setEventDescription(event.target.value) }}>
                                </Form.Control><br />
                            </Form.Group>

                            <h5>Edit Event Duration</h5>

                            <Form.Label>Start Date</Form.Label><br />
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max="2030-12-31"
                                value={eventStartDate}
                                onChange={(event) => { setEventStartDate(event.target.value) }} /><br />
                            <Form.Label>End Date</Form.Label><br />
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max="2030-12-31"
                                value={eventEndDate}
                                onChange={(event) => { setEventEndDate(event.target.value) }} /><br />
                        </Form>
                        <Card.Footer style={{ paddingLeft: '50%' }}>
                            <Button variant="warning" size="lg" type="submit" onClick={editEvent}>Edit Project</Button>
                        </Card.Footer>

                    </Card.Body>
                </Card>

            </div>
        </div>
    );
}

export default EditEvent;