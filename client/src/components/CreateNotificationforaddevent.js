import React from "react";
import Axios from "axios";
import { Button } from "react-bootstrap";

function CreateNotificationforaddevent() {
  const CreateNotificationforaddevent = async () => {
    Axios.post("/createEvent", {
      InvolvedInfluencerName: "Kumar Sangakkara",
      InvolvedBusinessName: "Kokabura Bats",
      Eventhappened: "An event is added to whatever the project",
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
        onClick={CreateNotificationforaddevent}
      >
        Add New Event
      </Button>
    </div>
  );
}

export default CreateNotificationforaddevent;
