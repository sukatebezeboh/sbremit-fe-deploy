import { queryClient } from "index";
import { useMutation } from "react-query";
import { toastAction } from "redux/actions/actions";
import endpoints from "util/endpoints";
import { postRequest } from "util/http";
import { parseEndpointParameters } from "../../../../../util/util";

export const Verifictions = {
  id: "IDENTITY",
  document: "DOCUMENT",
};

export const getVerificationStatus = (user: any, verificationType: string) => {
  let verificationList: any[] = [];
  //check if the user has a verification property and push into verificationList
  if (user?.verifications) {
    for (const key in user?.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }

  const verification: any = verificationList.find(
    (method) => method.type === verificationType
  );

  // const isVerificationAttempted =
  //   verification && verification.status !== "PENDING";

  return verification?.status || "PENDING";
};

export const checkToShowVerificationForm = (user: any) => {
  let verificationList = [];

  if (user?.verifications) {
    for (const key in user.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }
  const idVerification = verificationList?.find(
    (method: { type: string }) => method.type === "IDENTITY"
  );

  const docVerification = verificationList?.find(
    (method: { type: string }) => method.type === "DOCUMENT"
  );

  const docIsPending = docVerification && docVerification?.status === "PENDING";

  const idIsPending = idVerification && idVerification?.status === "PENDING";

  const docOrIdIsPending = docIsPending || idIsPending;

  if (
    !Boolean(user?.meta?.verified) &&
    !Boolean(user?.meta?.submittedVerificationData) &&
    docOrIdIsPending
  ) {
    return false; // Show the form to submit data
  } else {
    return true; // Submitted, don't show the form
  }
};

export const useUpdateFormVerification = (
  userId: string,
  skipVerification: boolean,
  onSuccess: Function
) => {
  return useMutation(
    (values: any) => {
      return postRequest(
        { ...values, skipVerification },
        parseEndpointParameters(endpoints.VERIFICATION, userId),
        "Failed to to submit form, Pls try again"
      );
    },
    {
      onSuccess: () => {
        toastAction({
          show: true,
          type: "success",
          timeout: 10000,
          message: "Personal Details submitted successfully",
        });
        queryClient.invalidateQueries(
          parseEndpointParameters(endpoints.USER, userId)
        );
        onSuccess();
      },
    }
  );
};
