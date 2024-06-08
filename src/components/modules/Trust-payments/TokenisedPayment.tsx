import _env from "env";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { LOADING } from "redux/actionTypes";
import { toastAction } from "redux/actions/actions";
import http from "util/http";
import { settings } from "util/settings";
import {
  CDN_DOMAIN,
  JWTsecretKey,
  JWTusername,
  getJWTtoken,
} from "./trustPaymentHelper";
import { useHistory } from "react-router-dom";

interface TokenisedPaymentProps {
  currencyiso3a: string;
  mainamount: number;
  transferId: string;
  transactionreference: string;
  setEnabled: Function;
  transactionId: string;
}

const credentialsonfile = "2";

const TokenisedPayment = ({
  currencyiso3a,
  mainamount,
  transactionreference,
  transferId,
  setEnabled,
  transactionId,
}: TokenisedPaymentProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();

  // const maimountWithoutDecimal = mainamount.toString().replace(".", "");
  const UtcTimestamp = Math.floor(Date.now() / 1000); //Time in seconds since Unix epoch

  const successfulRedirectURL = `/transfer-completed/${transferId}?payment_type=trust_payment`;
  const TRUST_NOTIFICATION_WEBHOOK_URL =
    settings.TRUST_NOTIFICATION_WEBHOOK_URL;

  const payload = {
    payload: {
      accounttypedescription: "ECOM",
      mainamount: Number(mainamount),
      currencyiso3a: currencyiso3a,
      sitereference: settings.TRUST_PAYMENT_SITE_REFERENCE,
      requesttypedescriptions: ["THREEDQUERY", "AUTH"],
      credentialsonfile: credentialsonfile, //This must be set to “2”, to indicate the new transaction is using previously-stored credentials.
      parenttransactionreference: transactionreference,
      orderreference: transactionId,
    },
    iat: UtcTimestamp,
    iss: JWTusername,
  };

  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const onEnded = () => {
    setIsLoading(false); // update isLoading state to false when script is loaded
    // upddate enabled state to false at trustPaymentOptions state
    setEnabled((props: any) => ({
      ...props,
      enabled: false,
    }));

    dispatch({ type: LOADING, payload: false });
  };

  useEffect(() => {
    if (window.location.href.includes("localhost")) {
      toastAction({
        show: true,
        type: "warning",
        message: `Trust payment st.js library will block requests from localhost/XXXX environment. Please run tests using your IPv4 address.`,
      });
      onEnded();
      return;
    }
    if (isLoading) {
      dispatch({
        type: LOADING,
        payload: "Loading payment authentication form...",
      });
    } else {
      dispatch({ type: LOADING, payload: false });
    }
  }, [isLoading]);

  useEffect(() => {
    const paymentScript = document.createElement("script");
    const jwtToken = getJWTtoken(header, payload, JWTsecretKey || "");
    const liveStatus = process.env.REACT_APP_ENV === "production" ? 1 : 0;

    const onPaymentWidgetReady = () => {
      const st = (window as any).SecureTrading({
        jwt: jwtToken,
        livestatus: liveStatus,
        submitOnError: false,
        submitOnSuccess: false,
        submitOnCancel: false,
        // disableNotification: true,
        submitCallback: function (data: any) {
          onEnded();

          if (!data?.hasUserClosedAcsWindow) {
            http.post(TRUST_NOTIFICATION_WEBHOOK_URL, {
              data,
              tokenisedPayment: true, //add a flag for tokenisedPayment TRUST_NOTIFICATION_WEBHOOK_URL
            });
            history.push(successfulRedirectURL);
          }
        },
      });

      st.Components({ startOnLoad: true });
    };

    // update isLoading state to false when script load error
    paymentScript.onerror = () => {
      setIsLoading(false);
    };

    paymentScript.src = CDN_DOMAIN;
    paymentScript.onload = onPaymentWidgetReady;

    const paymentFormContainer = containerRef.current;

    if (paymentFormContainer) {
      paymentFormContainer.appendChild(paymentScript);
    }

    return () => {
      if (
        paymentFormContainer &&
        paymentScript.parentNode === paymentFormContainer
      ) {
        paymentFormContainer.removeChild(paymentScript);
      }
    };
  }, [containerRef]);

  return (
    <div ref={containerRef}>
      <div id="st-notification-frame"></div>
      <div id=" st-animated-card"></div>
      <form
        id="st-form"
        action={TRUST_NOTIFICATION_WEBHOOK_URL}
        method="POST"
      />
    </div>
  );
};

export default TokenisedPayment;
