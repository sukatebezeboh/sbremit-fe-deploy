import _env from "env";
import { generateCheckoutInfo, getPaymentStatus } from "redux/actions/actions";
import { Payment } from "truelayer-embedded-payment-page";
import { paths } from "util/paths";
import { consoleLogOnLocalHost } from "../../utils/reuseableUtils";

export const lunchTruelayerEPP = (
  transferId: string,
  payment_id: string,
  resource_token: string,
  history: any
) => {
  const payment = Payment({
    payment_id,
    resource_token,
    return_uri: `${_env.APP_HOST}/transfer-completed/${transferId}?payment_type=truelayer`, //for dev: http://localhost:3000/
    open_bank_in_new_tab: true,
    production: process.env.REACT_APP_ENV === "production",

    onLoad: () => {
      consoleLogOnLocalHost("onLoad called");
    },
    onHandoffStart: () => {
      consoleLogOnLocalHost("onHandoffStart called"); // the customer has used a QR code to continue with their mobile bank app.
    },
    onAbort: () => {
      consoleLogOnLocalHost("onAbort called");
    },
    onError: (error) => {
      consoleLogOnLocalHost(`onError called: ${error}`);
    },
    onDone: () => {
      consoleLogOnLocalHost("onDone called");
      history.push(`/transfer-completed/${transferId}?payment_type=truelayer`);
    },
  });

  payment.start();
};

export const generateCheckoutIDforAxcssPayment = (
  tranferId: string,
  history: any
) => {
  const handleCheckoutID = (checkoutID: string) => {
    if (checkoutID !== null) {
      history.push(paths.AXCESS_MERCHANT, {
        transaferId: tranferId,
        checkoutId: checkoutID,
      });
    }
  };

  // this exp make api request to the server to generate checkout ID
  generateCheckoutInfo(tranferId, handleCheckoutID, history, "axcessms");
};

export const generateCheckoutInfoForTrulayerPayment = (
  transferId: string,
  history: any
) => {
  const handleTruelayerCheckoutInfo = (data: any) => {
    const { payment_id, resource_token } = data || {};

    if (payment_id !== null && resource_token !== null) {
      lunchTruelayerEPP(transferId, payment_id, resource_token, history);
    }
  };

  generateCheckoutInfo(
    transferId,
    handleTruelayerCheckoutInfo,
    history,
    "truelayer"
  );
};
