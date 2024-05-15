import crypto from "crypto";
import { toastAction } from "redux/actions/actions";

export const CDN_DOMAIN = "https://cdn.eu.trustpayments.com/js/latest/st.js";
export const JWTusername = process.env.REACT_APP_TRUST_PAYMENT_JWT_USERNAME;
export const JWTsecretKey = process.env.REACT_APP_TRUST_PAYMENT_JWT_SECRETKEY;

const getBase64URLEncodedString = (data: any) => {
  const jsonString = JSON.stringify(data);

  //Encode the string in Base64
  const base64String = Buffer.from(jsonString).toString("base64");

  //Convert Base64 to Base64URL
  const base64URLEncodedString = base64String
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  return base64URLEncodedString;
};

export const getJWTtoken = (
  header: any,
  payload: any,
  secret: string
): string => {
  const encodedHeader = getBase64URLEncodedString(header);
  const encodedPayload = getBase64URLEncodedString(payload);
  const encodedToken = `${encodedHeader}.${encodedPayload}`;

  // Use HMAC SHA256 to hash the concatenated string with the secret key
  const signature = crypto
    .createHmac("sha256", secret)
    .update(encodedToken)
    .digest("base64");

  const formatSignature = signature
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");

  // Return the JWT token consisting of encoded header, payload, and signature
  return `${encodedHeader}.${encodedPayload}.${formatSignature}`;
};

export const getErrorMessage = (errorCode: string): string => {
  const toastMessage = (message: string) => {
    toastAction({
      show: true,
      type: "warning",
      message: `${message}`,
    });
    return message;
  };

  const errorCodeNum = parseInt(errorCode);

  // console.log(errorCodeNum, errorCode);

  if (errorCodeNum >= 30000 && errorCodeNum <= 39999) {
    return toastMessage(
      "Field error. Please check the submitted fields and try again."
    );
  }

  switch (errorCode) {
    case "0":
      return "";
    case "70000":
      return toastMessage(
        "Payment declined by your bank. Please try a different method of payment."
      );
    case "71000":
      return toastMessage(
        "Soft decline from the card issuer. Please try again with necessary authentication."
      );
    case "60010":
    case "60034":
    case "99999":
      return toastMessage(
        "There has been a problem processing the request. Please contact support for assistance."
      );
    default:
      return toastMessage(
        "Unknown error code. Please contact support for assistance."
      );
  }
};
