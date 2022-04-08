import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AllProjects({project}) {
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
                            <Button className="projectButton1" variant="secondary" size="sm" type="submit" onClick={() => {navigate(`/allEvents/${project.projectName}`)}}>View all events</Button>
                            <Button className="projectButton1" variant="success" size="sm" type="submit" onClick={() => {navigate(`/addEvents/${project.projectName}`)}}>Add Event</Button>
                            <Button className="projectButton2" variant="warning" size="sm" type="submit" onClick={() => {navigate(`/editProject/${project._id}`)}}>Edit Project</Button>
                            <Button className="projectButton2" variant="danger" size="sm" type="submit" onClick={() => handleDelete(project._id)}>Delete Project</Button>
                        </div>
                    </Card>
                );
            })}
        </div >

    );
}

export default AllProjects;