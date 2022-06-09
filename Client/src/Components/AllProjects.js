import { React, useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import EditProject from './EditProject';

function AllProjects() {
    const [listOfProjects, setListOfProjects] = useState([]);
    const [openEdit, setOpenEdit] = useState();
    const [selected, setSelected] = useState();

    useEffect(() => {
        axios.get("/getProjects").then((response) => {
            setListOfProjects(response.data);
        })
    }, [])

    const editWindow = (id) => {
        setSelected(id);
        setOpenEdit(!openEdit);
    }

    function handleDelete(_id) {
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
        <div className='background'>
            <div id="allProjects">
                <h1>All Projects</h1>

                {listOfProjects.map((project) => {
                    return (
                        <div>
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
                                    <Button className="projectButton1" variant="secondary" size="sm" type="submit" onClick={() => { navigate(`/allEvents/${project.projectName}/${project._id}`) }}>View all events</Button>
                                    <Button className="projectButton1" variant="success" size="sm" type="submit" onClick={() => { navigate(`/addEvents/${project.projectName}/${project._id}`) }}>Add Event</Button>
                                    <Button className="projectButton2" variant="warning" size="sm" type="submit" onClick={() => editWindow(project._id)}>Edit Project</Button>
                                    <Button className="projectButton2" variant="danger" size="sm" type="submit" onClick={() => handleDelete(project._id)}>Delete Project</Button>
                                </div>
                            </Card>

                            {(selected === project._id) ?
                                openEdit &&
                                <div>
                                    <EditProject projectID={project._id}/>
                                </div> : null
                            }

                        </div>
                    );
                })}

            </div >
        </div>

    );
}

export default AllProjects;