import crypto from "crypto";

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
