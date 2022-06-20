import React, { useRef, useEffect } from "react";
import MainMenu from "../Main/MainMenu";
import { useParams } from "react-router-dom";
import axios from "axios";

import ParseJwt from "../Utilities/ParseJwt";

export default function Payment() {
  const id = useParams().id;
  const userToken = localStorage.getItem("token");
  const user = ParseJwt(userToken);
  let NotificationTime = new Date().toLocaleString();
  const NotifyInfluencer = (_id) => {
    axios.get(`http://localhost:5000/getProject/${_id}`).then((response) => {
      axios
        .post("http://localhost:5000/createNotification", {
          ReceiverId: response.data.project.influencerID,
          SenderId: user._id,
          Eventhappened: "Payment to a project",
          NotificationTime,
          Notificationmessage:
            response.data.project.businessName +
            " paid you for " +
            response.data.project.projectName +
            " project",
        })
        .then((res) => {
          console.log("Notification created");
        });
    });
  };

  const paypal = useRef();
  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Cool looking table",
                amount: {
                  currency_code: "USD",
                  value: 5.0,
                },
                payee: {
                  email_address: "sb-jbv3l17277353@personal.example.com",
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          const order = await actions.order.capture();
          console.log(order);
          console.log("eeee");
          // console.log({...order});
          console.log(order.purchase_units);
          const q = order.purchase_units;
          console.log("ki");
          console.log(q[0].payee.email_address);

          NotifyInfluencer(id);
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypal.current);
  }, []);
  return (
    <div>
      <MainMenu></MainMenu>
      <div
        className="container"
        style={{
          justifyContent: "center",
          margin: "auto",
          padding: "10%",
          width: "60%",
          height: "100vh",
        }}
      >
        <div ref={paypal} style={{ margin: "auto", padding: "5%" }}></div>
      </div>
    </div>
  );
}
