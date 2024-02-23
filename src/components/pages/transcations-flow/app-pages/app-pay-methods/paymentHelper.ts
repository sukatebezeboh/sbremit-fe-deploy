import { Payment } from "truelayer-embedded-payment-page";

export const lunchTruelayerEPP = () => {
  const payment = Payment({
    payment_id: "82829796-efb0-429d-8b1f-29d7e1595997",
    resource_token:
      "eyJhbGciOiJSUzUxMiIsImtpZCI6IkRCejExcEFuUGNXVndqaFBNWERuckNyQ0ZrT1p0Y2FqYWtjU21GNmJiVk0iLCJ0eXAiOiJKV1QifQ.eyJzY29wZSI6InBheW1lbnQiLCJjbGllbnRfaWQiOiJzYW5kYm94LXNicmVtaXQtYmJhMjBjIiwianRpIjoiODI4Mjk3OTYtZWZiMC00MjlkLThiMWYtMjlkN2UxNTk1OTk3IiwibmJmIjoxNzA4NDMxMTEyLCJleHAiOjE3MDg0MzIwMTIsImlzcyI6Imh0dHBzOi8vYXBpLnRydWVsYXllci1zYW5kYm94LmNvbS9wYXltZW50cy1nYXRld2F5IiwiYXVkIjoiaHR0cHM6Ly9hcGkudHJ1ZWxheWVyLXNhbmRib3guY29tIn0.dZYGYs7SCAQkWKzWPwxbjfAFm5L_cj7R2Zs0NX3C4pyiFPnNS-sye4uL4UYmwFsl1Ltvxd9avFkdYscAwt_dMLKGnLHQCyGPn5epR3CplXzX33DeeE3ioDMyRe00TZFgfpOrTeLl8pCKtY0kzXQ9sUXAzDP4T8qBqXX0U_TajcQcGbMSeTVwMvi8J8NmHiQz_R-0AOPMMqbRPleBe-EhrV28QNd3bbdiTPEvh3_vkWcJuYL6cGJ1YHb7xAioJTQTDXthdDG-a5c02QwfmAiMccF58SGOo09yCegW9JgRMCsmWu9q_S0Rvjnwi_qIyWc8QSiTn4nZwlWXtj1S979qSw",
    return_uri: "https://fe-uat.sbremit.co.uk/transfer-complete",

    onLoad: () => {
      console.log("onLoad called");
    },
    onHandoffStart: () => {
      console.log("onHandoffStart called"); // the customer has used a QR code to continue with their mobile bank app.
    },
    onAbort: () => {
      console.log("onAbort called");
    },
    onError: (error) => {
      console.log("onError called", error);
    },
    onDone: () => {
      console.log("onDone called");
    },
  });

  payment.start();
};
