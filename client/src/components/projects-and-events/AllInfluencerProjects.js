import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProject from './EditProject';
import MainMenu from '../Main/MainMenu';
import ParseJwt from '../Utilities/ParseJwt';

function AllInfluencerProjects() {
    const [listOfProjects, setListOfProjects] = useState([]);
    const [openEdit, setOpenEdit] = useState("");
    const [selected, setSelected] = useState("");
    const [userID, setUserID] = useState("");
    const [category, setCategory] = useState("");

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        const user = ParseJwt(userToken);
        // Retrieve all projects
        axios.get("http://localhost:5000/getProjects").then((response) => {
            setListOfProjects(response.data);
        })
        axios.get(`http://localhost:5000/api/users/getuser/${user._id}`).then((res) => {
            setUserID(res.data._id);
            setCategory(res.data.category);
        })
    }, [])

    let navigate = useNavigate();

    const filteredList = listOfProjects.filter((project) => project.influencerID === userID && project.isAccepted === 'true')
    return (
        <div className='background'>
            <MainMenu></MainMenu>
            <div id="allProjects">
                <h1>All Accepted Projects</h1>
                {(filteredList.length > 0) ? filteredList.map((project) => {
                    return (
                        <div>
                            <Card className="detailsCard" border="dark">
                                <div className="details">
                                    <span className="title">Created by:</span>
                                    <span className="data">{project.businessName}</span><br />
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
                                    <Button className="projectButton1" variant="secondary" size="sm" type="submit" onClick={() => { navigate(`/allEvents/${project.projectName}/${project._id}`) }}>View all events</Button>

                                </div>
                            </Card>
                        </div>
                    );
                }) : (
                    <div>
                        <p>No projects have been added yet</p>
                    </div>
                )
                }

            </div >
        </div>

    );
}

export default AllInfluencerProjects;