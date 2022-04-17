import emailjs from "emailjs-com";
import React from "react";
import { Button } from "react-bootstrap";

export default function RequesttoCollaborateProject() {
  function sendEmail(e) {
    e.preventDefault();

    let data = {
      Subject:
        "Dummy Influencer Name is asking you to collaborate on Dummy Project Name",
      InfluencerName: "Dummy Influencer Name",
      Email: "veenaka.official@gmail.com",
      Message:
        "Dummy Business Name is asking you to collaborate on Dummy Project Name. Login to InfluencerHub for more details.",
    };
    emailjs
      .send("service_9rzf7v8", "template_c400xbq", data, "boORYqYrAEoh981w7")
      .then(
        (result) => {
          alert(
            "Your request to collaborate on the project was sent to the Influencer"
          );
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
        Request to Collaborate on the project
      </Button>
    </div>
  );
}
