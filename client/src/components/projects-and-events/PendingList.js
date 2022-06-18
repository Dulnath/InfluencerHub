import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import MainMenu from '../Main/MainMenu';
import ParseJwt from '../Utilities/ParseJwt';

function PendingList() {
    const [listOfProjects, setListOfProjects] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");

    let name = firstName + " " + lastName;
    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        axios.get("http://localhost:5000/getProjects").then((response) => {
            setListOfProjects(response.data);
        })
        axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((res) => {
            setFirstName(res.data.firstName);
            setLastName(res.data.lastName);
        })
    }, [])

    const acceptProject = (id) => {
        axios.put(`http://localhost:5000/acceptProject/${id}`,{
        }).then(() => {
            console.log("Project has been accepted");
        })

        const newList = listOfProjects.filter((project) => project._id !== id);
        setListOfProjects(newList);
    }

    const rejectProject = (id) => {
        axios.put(`http://localhost:5000/rejectProject/${id}`,{
        }).then(() => {
            console.log("Project has been rejected");
        })

        const newList = listOfProjects.filter((project) => project._id !== id);
        setListOfProjects(newList);
    }

    const filteredList = listOfProjects.filter((project) => project.influencerName === name && project.isAccepted === null);
    return (
        <div className='background'>
            <MainMenu></MainMenu>
            <div id="allProjects">
                <h1>Pending Projects</h1>

                {(filteredList.length > 0) ? filteredList.map((project) => {
                    return (
                        <div>
                            <Card className="detailsCard" border="dark">
                                <div className="details">
                                    <span className="title">Project created by:</span>
                                    <span className="data">{project.businessName}</span>
                                </div><br/>
                                <div className="details">
                                    <span className="title">Project Name:</span>
                                    <span className="data">{project.projectName}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Project Description:</span>
                                    <span className="data">{project.projectDescription}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Project Start Date:</span>
                                    <span className="data">{project.projectStartDate}</span>
                                </div>
                                <div className="details">
                                    <span className="title">Project End Date:</span>
                                    <span className="data">{project.projectEndDate}</span>
                                </div>
                                <div>
                                    <Button className="projectButton2" variant="danger" size="sm" type="submit" onClick={() => {rejectProject(project._id)}}>Reject Project</Button>
                                    <Button className="projectButton2" variant="success" size="sm" type="submit" onClick={() => {acceptProject(project._id)}}>Accept Project</Button>
                                </div>
                            </Card>
                        </div>
                    );
                }) : (
                    <div>
                        <p>No pending projects yet</p>
                    </div>
                )
                }

            </div >
        </div>

    );
}

export default PendingList;