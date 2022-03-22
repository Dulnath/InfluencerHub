import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AllProjects() {
    const [listOfProjects, setListOfProjects] = useState([]);

    useEffect(() => {
        axios.get("/getProjects").then((response) => {
            setListOfProjects(response.data);
        })
    }, [])

    function handleDelete(_id){
        axios.delete(`/deleteProject/${_id}`)
        .then((res) => {
            console.log(res);
            console.log(res.data);
        })

        const newList = listOfProjects.filter((project) => project._id !== _id);
        alert("Project was deleted");
        setListOfProjects(newList);
    }

    let navigate = useNavigate();

    return (
        <div id="allProjects">
            <h1>All Projects</h1>

            {listOfProjects.map((project) => {
                return (
                    <Card className="detailsCard" border="dark">
                        <div className="details">
                            <span class="title">Project Name:</span>
                            <span class="data">{project.projectName}</span>
                        </div>
                        <div className="details">
                            <span class="title">Project Description:</span>
                            <span class="data">{project.projectDescription}</span>
                        </div>
                        <div className="details">
                            <span class="title">Project Start Date:</span>
                            <span class="data">{project.projectStartDate}</span>
                        </div>
                        <div className="details">
                            <span class="title">Project End Date:</span>
                            <span class="data">{project.projectEndDate}</span>
                        </div>
                        <div>
                            <Button variant="success" size="sm" type="submit" onClick={() => {navigate("/addEvents")}}>Add Event</Button>
                            <Button className="projectButton" variant="warning" size="sm" type="submit" onClick={() => {navigate(`/editProject/${project._id}`)}}>Edit Project</Button>
                            <Button className="projectButton" variant="danger" size="sm" type="submit" onClick={() => handleDelete(project._id)}>Delete Project</Button>
                        </div>
                    </Card>
                );
            })}
        </div >

    );
}

export default AllProjects;