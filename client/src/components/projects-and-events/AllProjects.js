import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import EditProject from "./EditProject";
import MainMenu from "../Main/MainMenu";
import ParseJwt from "../Utilities/ParseJwt";

function AllProjects() {
  const [listOfProjects, setListOfProjects] = useState([]);
  const [openEdit, setOpenEdit] = useState();
  const [selected, setSelected] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [category, setCategory] = useState();

  let name;
  if (category === "business") {
    name = firstName;
  } else if (category === "influencer") {
    name = firstName + " " + lastName;
  }
  const userToken = localStorage.getItem("token");
  const user = ParseJwt(userToken);

  useEffect(() => {
    // Retrieve all projects
    axios.get("http://localhost:5000/getProjects").then((response) => {
      setListOfProjects(response.data);
    });
    axios
      .get(`http://localhost:5000/api/users/getuser/${user._id}`)
      .then((res) => {
        setFirstName(res.data.firstName);
        setLastName(res.data.lastName);
        setCategory(res.data.category);
      });
  }, []);

  // Open edit project window
  const editWindow = (id) => {
    setSelected(id);
    setOpenEdit(!openEdit);
  };

  // Delete a project
  function handleDelete(_id) {
    axios.get(`http://localhost:5000/getProject/${_id}`).then((response) => {
      axios
        .post(`http://localhost:5000/notificationDeleteProject`, {
          ReceiverId: response.data.project.influencerID,
          SenderId: user._id,
          Eventhappened: "Deletion of a project",
          Notificationmessage:
            response.data.project.businessName +
            " " +
            "deleted" +
            " " +
            response.data.project.projectName +
            " " +
            "project",
        })
        .then((res) => {
          alert("Notification created successfully");
          console.log("Notification created");
        });
    });
    axios.delete(`http://localhost:5000/deleteProject/${_id}`).then((res) => {
      console.log(res);
      console.log(res.data);
    });

    const newList = listOfProjects.filter((project) => project._id !== _id);
    alert("Project was deleted");
    setListOfProjects(newList);
  }

  let navigate = useNavigate();

  const filteredList = listOfProjects.filter(
    (project) =>
      project.businessName === name || project.influencerName === name
  );
  return (
    <div className="background">
      <MainMenu></MainMenu>
      <div id="allProjects">
        <h1>All Projects</h1>

        {filteredList.length > 0 ? (
          filteredList.map((project) => {
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
                    <Button
                      className="projectButton1"
                      variant="secondary"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        navigate(
                          `/allEvents/${project.projectName}/${project._id}`
                        );
                      }}
                    >
                      View all events
                    </Button>
                    <Button
                      className="projectButton1"
                      variant="success"
                      size="sm"
                      type="submit"
                      onClick={() => {
                        navigate(
                          `/addEvents/${project.projectName}/${project._id}`
                        );
                      }}
                    >
                      Add Event
                    </Button>
                    <Button
                      className="projectButton2"
                      variant="warning"
                      size="sm"
                      type="submit"
                      onClick={() => editWindow(project._id)}
                    >
                      Edit Project
                    </Button>
                    <Button
                      className="projectButton2"
                      variant="danger"
                      size="sm"
                      type="submit"
                      onClick={() => handleDelete(project._id)}
                    >
                      Delete Project
                    </Button>
                  </div>
                </Card>

                {selected === project._id
                  ? openEdit && (
                      <div>
                        <EditProject projectID={project._id} />
                      </div>
                    )
                  : null}
              </div>
            );
          })
        ) : (
          <div>
            <p>No events have been added yet</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AllProjects;