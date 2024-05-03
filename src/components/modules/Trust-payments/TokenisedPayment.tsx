import _env from "env";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { LOADING } from "redux/actionTypes";
import { settings } from "util/settings";
import { getJWTtoken } from "./trustPaymentHelper";
import axios from "axios";
import http from "util/http";

interface TokenisedPaymentProps {
  currencyiso3a: string;
  mainamount: number;
  transferId: string;
  transactionreference: string;
  setEnabled: Function;
  transactionId: string;
}

const CDN_DOMAIN = "https://cdn.eu.trustpayments.com/js/latest/st.js";
const JWTusername = process.env.REACT_APP_TRUST_PAYMENT_JWT_USERNAME;
const JWTsecretKey = process.env.REACT_APP_TRUST_PAYMENT_JWT_SECRETKEY;

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

  const credentialsonfile = "2";

  const maimountWithoutDecimal = mainamount.toString().replace(".", "");
  const UtcTimestamp = Math.floor(Date.now() / 1000); //Time in seconds since Unix epoch

  const successfulRedirectURL = `${_env.APP_HOST}/transfer-completed/${transferId}?payment_type=trust_payment`;
  const TRUST_NOTIFICATION_WEBHOOK_URL =
    settings.TRUST_NOTIFICATION_WEBHOOK_URL;

  const payload = {
    payload: {
      accounttypedescription: "ECOM",
      baseamount: maimountWithoutDecimal,
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

  useEffect(() => {
    if (isLoading) {
      dispatch({
        type: LOADING,
        payload: "Please wait while we load payment authentication form...",
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
      dispatch({ type: LOADING, payload: true }); // remove message from loader

      const st = (window as any).SecureTrading({
        jwt: jwtToken,
        livestatus: liveStatus,
        submitOnError: false,
        submitOnSuccess: false,
        submitOnCancel: false,
        // disableNotification: true,
        submitCallback: function (data: any) {
          setIsLoading(false); // update isLoading state to false when script is loaded
          // upddate enabled state to false at trustPaymentOptions state
          setEnabled((props: any) => ({
            ...props,
            enabled: false,
          }));

          http.post(TRUST_NOTIFICATION_WEBHOOK_URL, {
            data,
            tokenisedPayment: true, //add a flag for tokenisedPayment TRUST_NOTIFICATION_WEBHOOK_URL
          });

          !data?.hasUserClosedAcsWindow &&
            window.location.replace(successfulRedirectURL);
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
