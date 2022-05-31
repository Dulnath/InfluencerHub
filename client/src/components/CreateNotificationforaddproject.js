import React from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";

function CreateNotificationforaddproject() {
  const CreateNotificationforaddproject = async () => {
    Axios.post("/createProject", {
      InvolvedInfluencerName: "Kumar Sangakkara",
      InvolvedBusinessName: "Kokabura Bats",
      Eventhappened: "Request for project collaboration",
      Notificationmessage: "Whatever the notification message",
    }).then((res) => {
      alert("Notification created successfully");
      console.log("Notification created");
    });
  };

  return (
    <div>
      <Button
        variant="primary"
        type="submit"
        onClick={CreateNotificationforaddproject}
      >
        Add New Project
      </Button>
    </div>
  );
}

export default CreateNotificationforaddproject;
