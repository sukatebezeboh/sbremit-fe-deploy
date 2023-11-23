export const Verifictions = {
  id: "IDENTITY",
  document: "DOCUMENT",
};

export const checkVerification = (user: any, verificationType: string) => {
  let verificationList: any[] = [];
  //check if the user has a verification property and push into verificationList
  if (user?.verifications) {
    for (const key in user?.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }

  const verification = verificationList.find(
    (method) => method.type === verificationType
  );

  const isVerificationAttempted =
    verification && verification.status !== "PENDING";

  return isVerificationAttempted || false;
};
