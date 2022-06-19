import React, { useRef, useEffect } from "react";
import MainMenu from "../Main/MainMenu";
export default function Payment() {
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
                           value: 650.0,
                        },
                     },
                  ],
               });
            },
            onApprove: async (data, actions) => {
               const order = await actions.order.capture();
               console.log(order);
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
      <div className="container" style={{ justifyContent: "center", margin:"auto",padding:"10%", width: "60%",height:"100vh" }}>
         <div ref={paypal} style={{margin:"auto", padding:"5%"}}></div>
      </div>
      </div>
   );
}
