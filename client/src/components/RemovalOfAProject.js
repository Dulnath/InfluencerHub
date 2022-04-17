import emailjs from "emailjs-com";
import React from "react";
import { Button } from "react-bootstrap";

export default function RemovalOfAProject() {
  function sendEmail(e) {
    e.preventDefault();

    let data = {
      Subject: "A project in which you have collaborated was deleted",
      InfluencerName: "Dummy Influencer Name",
      Email: "veenaka.official@gmail.com",
      Message:
        "The project Dummy Project Name was deleted by dummy Business Name. Login to InfluencerHub for more details.",
    };
    emailjs
      .send("service_9rzf7v8", "template_c400xbq", data, "boORYqYrAEoh981w7")
      .then(
        (result) => {
          alert("Project was deleted. Notification sent");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }
  return (
    <div>
      <Button variant="primary" type="submit" onClick={sendEmail}>
        Notify influencer that the project was deleted
      </Button>
    </div>
  );
}
