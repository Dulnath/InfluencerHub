import emailjs from "emailjs-com";
import React from "react";

export default function Collaborate() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9rzf7v8",
        "template_c400xbq",
        e.target,
        "boORYqYrAEoh981w7"
      )
      .then(
        (result) => {
          alert("Collaboration request sent successfully");
        },
        (error) => {
          console.log(error.text);
        }
      );
    e.target.reset();
  }
  return (
    <div>
      <div className="container">
        <form onSubmit={sendEmail}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Business Name"
                name="Business Name"
              />
            </div>
            <div className="col-8 form-group mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Influencer Name"
                name="Influencer Name"
              />
            </div>
            <div className="col-8 form-group mx-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Enter Influencer Email Address"
                name="email"
              />
            </div>
            <div className="col-8 form-group mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Enter Project Name"
                name="Project Name"
              />
            </div>
            <div className="col-8 form-group mx-auto">
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="8"
                placeholder="Type your message"
                name="Message"
              ></textarea>
            </div>
            <div className="col-8 pt-3 mx-auto">
              <input
                type="submit"
                className="btn btn-info"
                value="Request to collaborate"
              ></input>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
