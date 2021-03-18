import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { paths } from "../../../util/paths";
import axios from "axios";
import http from "../../../util/http";
// import "./App.css";
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe("pk_test_51IRO98LR6ZSV0Ja4g66DDSiCPiUasKR3B2a1gZ8Qb7FfC6nmKSfJmTitbTa6mHi7f7nEfHBkYsc1kWLWmc2SZCXf00SPR70HyD");
const ProductDisplay = ({ handleClick }: any) => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <button type="button" id="checkout-button" role="link" onClick={handleClick}>
      Checkout
    </button>
  </section>
);
const Message = ({ message }: any) => (
  <section>
    <p>{message}</p>
  </section>
);
export default function App() {
  const [message, setMessage] = useState("");
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }
    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  const handleClick = async (event: any) => {
    const stripe = await stripePromise;
    const response = await http.post("/stripe/payment/card", {
      "items": [
        {
          "name": "SBRemit Transfer - GBP->XAF",
          "unitCost": "10000",
          "quantity": 1
        },
        {
          "name": "MTN Mobile Money Service Fee",
          "unitCost": "199",
          "quantity": 1
        }
      ]
    });
    const session = response.data;
    // When the customer clicks on the button, redirect them to Checkout.
    const result = await stripe?.redirectToCheckout({
        sessionId: session.data.id
    });
    if (result?.error) {
      // If `redirectToCheckout` fails due to a browser or network
      // error, display the localized error message to your customer
      // using `result.error.message`.
    }
  };
  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay handleClick={handleClick} />
  );
}

