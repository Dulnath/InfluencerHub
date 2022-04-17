import emailjs from "emailjs-com";
import React from "react";
import { Button } from "react-bootstrap";

export default function NotificationAddevent() {
  function sendEmail(e) {
    e.preventDefault();

    let data = {
      Subject: "An event was added to a project that you have collaborated",
      InfluencerName: "Dummy Influencer Name",
      Email: "veenaka.official@gmail.com",
      Message:
        "An event was added by Dummy Business Name to Dummy Project Name. Login to InfluencerHub for more details.",
    };
    emailjs
      .send("service_9rzf7v8", "template_c400xbq", data, "boORYqYrAEoh981w7")
      .then(
        (result) => {
          alert("Event added. Notification sent");
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
        Notify influencer that event is added
      </Button>
    </div>
  );
}
