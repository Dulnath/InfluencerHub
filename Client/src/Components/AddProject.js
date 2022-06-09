import { React, useState } from 'react'
import { Button, CloseButton, Form, Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';

function AddProject() {
    const [projectName, setProjectName] = useState("");
    const [projectDescription, setprojectDescription] = useState("");
    const [projectStartDate, setprojectStartDate] = useState("");
    const [projectEndDate, setprojectEndDate] = useState("");

    const createProject = () => {
        Axios.post("/createProject", {
            projectName,
            projectDescription,
            projectStartDate,
            projectEndDate
        }).then((res) => {
            alert("Project created successfully");
            console.log("Project created");
        });
    }

    let navigate = useNavigate();

    const navAllProjects = () => { navigate("/allProjects") }

    return (
        <div className='background'>
            <div className="projectCard">
                <Card border="dark" >
                    <Card.Header>
                        <div className="projectCardHeader">
                            Create a Project
                            <CloseButton className="closeButton" onClick={navAllProjects} />
                        </div>
                    </Card.Header>
                    <Card.Body className='cardBody'>
                        <Form>
                            <Form.Group>
                                <h5>Project Name</h5>
                                <Form.Control as="textarea"
                                    rows={1}
                                    placeholder='Add Project Name'
                                    onChange={(event) => { setProjectName(event.target.value) }}>
                                </Form.Control><br />
                            </Form.Group>

                            <Form.Group>
                                <h5>Project Description</h5>
                                <Form.Control as="textarea"
                                    rows={3}
                                    placeholder='Add Project Description'
                                    onChange={(event) => { setprojectDescription(event.target.value) }}>
                                </Form.Control><br />
                            </Form.Group>

                            <h5>Project Duration</h5>

                            <Form.Label>Start Date</Form.Label><br />
                            <div>
                                <input
                                    type="date"
                                    min={new Date().toISOString().split('T')[0]}
                                    max={projectEndDate}
                                    value={projectStartDate}
                                    onChange={(event) => { setprojectStartDate(event.target.value) }} />
                            </div><br />

                            <Form.Label>End Date</Form.Label><br />
                            <div>
                                <input
                                    type="date"
                                    min={projectStartDate}
                                    value={projectEndDate}
                                    onChange={(event) => { setprojectEndDate(event.target.value) }} />
                            </div><br />
                        </Form>

                    </Card.Body>

                    <Card.Footer className='cardFooter'>
                        <Button variant="success" size="lg" type="submit" onClick={createProject}>Add Project</Button>
                    </Card.Footer>

                </Card>

            </div>
        </div>
    );
}

export default AddProject;
