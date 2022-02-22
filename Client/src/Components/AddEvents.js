import { React,useState } from 'react';
import { Card,CloseButton,Form,Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function AddEvents() {
    const [eventName, setEventName] = useState("");
    const [eventDescription, setEventDescription] = useState("");
    const [eventStartDate, setEventStartDate] = useState("");
    const [eventEndDate,setEventEndDate] = useState("");

    const createEvent = () => {
        Axios.post("http://localhost:5000/createEvent",{
            eventName,
            eventDescription,
            eventStartDate,
            eventEndDate
        }).then((res) => {
            console.log("Event created");
        });
    }

    let navigate = useNavigate();

    return (
        <div>
            <div className="projectCard">
                <Card border='dark'>
                    <Card.Header>
                        <div className="projectCardHeader">
                            Add Event
                            <CloseButton className="closeButton" onClick={() => { navigate("") }} />
                        </div>
                    </Card.Header>
                    <Card.Body>
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
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max="2030-12-31"
                                onChange={(event) => { setEventStartDate(event.target.value) }} /><br />
                            <Form.Label>End Date</Form.Label><br />
                            <input
                                type="date"
                                min={new Date().toISOString().split('T')[0]}
                                max="2030-12-31"
                                onChange={(event) => { setEventEndDate(event.target.value) }} /><br />

                        </Form>
                        <Card.Footer style={{ paddingLeft: '50%' }}>
                            <Button variant="primary" size="lg" type="submit" onClick={createEvent}>Add Event</Button>
                        </Card.Footer>

                    </Card.Body>
                </Card>
            </div>

        </div>
    );
}

export default AddEvents;