import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { refreshUserDetails, toastAction } from "redux/actions/actions";
import http from "util/http";

// INVALID VALID PENDING FAILED ATTEMPTED

/**
 * PENDING - new user / never tried to verify
 * ATTEMPTED - usr has verified but we still await
 */

// "phoneCode": null,
//             "state": null,

interface ComplyCubeVerificationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const ComplyCubeVerification = ({
  open,
  setOpen,
}: ComplyCubeVerificationProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const [complyCubeToken, setComplyCubeToken] = useState("");
  const [verificationType, setVerificationType] = useState<
    "identity" | "document"
  >("identity");
  const history = useHistory();

  const isFormVerified = Boolean(user?.meta?.verified);

  const location_country = user?.profile?.location_country;
  const userCountry = location_country === "GB" ? "UK" : location_country;

  let verificationList = [];

  if (user?.verifications) {
    for (const key in user.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }

  const idVerification = verificationList?.find(
    (method: { type: string }) => method.type === "IDENTITY"
  );
  const invalidIdVerification =
    idVerification && idVerification.status === "PENDING";

  const documentVerification = verificationList?.find(
    (method: { type: string }) => method.type === "DOCUMENT"
  );
  const invalidDocumentVerification =
    documentVerification && documentVerification.status === "PENDING";

  const verificationCompleted = Boolean(user?.meta?.verifed);
  //!invalidIdVerification || !invalidDocumentVerification;

  const checkAndUpdateVerificationType = () => {
    //if id verification is not pending and doc is pending update verificationType to doc
    if (!invalidIdVerification && invalidDocumentVerification) {
      setVerificationType("document");
    } else {
      // reset to identity
      setVerificationType("identity");
    }
  };

  const stages: any = [
    {
      name: "intro",
      options: {
        heading: `SB Remit ${verificationType} verification`,
        message: [
          `Only ${userCountry} Government issued documents are accepted.`,
          `Passport or Drivers License or Residence Permit or National Identity Card`,
        ],
        startButtonText: `Verify your ${userCountry} ${verificationType}`,
      },
    },
    "userConsentCapture",
  ];

  if (invalidIdVerification) {
    stages.push({
      name: "faceCapture",
      options: {
        mode: "photo",
      },
    });
  }

  if (invalidDocumentVerification) {
    const documentCountry = { country: user?.profile?.location_country }; // "GB"
    stages.push({
      name: "documentCapture",
      options: {
        documentTypes: {
          passport: documentCountry,
          driving_license: documentCountry,
          national_identity_card: documentCountry,
          residence_permit: documentCountry,
        },
      },
    });
  }

  useEffect(() => {
    if (open && complyCubeToken) {
      openComplyCube();
      setOpen(false);
    }
    checkAndUpdateVerificationType();
  }, [open]);

  useEffect(() => {
    if (!verificationCompleted) {
      // fetch Token /verification-token-experience
      http
        .get("/verification-token-experience") // data.token
        .then((res) => {
          if (res.data.status === "200") {
            setComplyCubeToken(res.data.data.token);
          }
        })
        .catch((error) =>
          toastAction({
            show: true,
            type: "error",
            timeout: 15000,
            message: "An error occurred. Please try again.",
          })
        );
    }
  }, []);

  const openComplyCube = () => {
    const newWindow: any = window;
    const complycube = newWindow?.ComplyCube.mount({
      token: complyCubeToken,
      stages,
      onComplete: function (data: any) {
        //console.log("Capture complete", data);
        const listOfData = [];
        if (data?.documentCapture) {
          listOfData.push(
            http.put("/verification-token-experience", {
              verificationId: documentVerification.id,
              verificationData: data,
              // verificationData: data?.documentCapture
            })
          );
        }
        if (data?.faceCapture) {
          listOfData.push(
            http.put("/verification-token-experience", {
              verificationId: idVerification.id,
              verificationData: data,
              // verificationData: data?.faceCapture
            })
          );
        }
        Promise.all(listOfData)
          .then(() => {})
          .catch(() => {})
          .finally(() => {
            complycube.updateSettings({ isModalOpen: false });
            refreshUserDetails(() => {
              checkSubmittedVerification();
            });
          });

        /**
           {
               documentCapture: {documentId: '6501d77d9f98560008d03834', documentType: 'driving_license'}
               faceCapture: {liveVideoId: "6501d7539f98560008d03812"}
            }
            */
      },
      onError: (err: any) => console.log("complycube-error", err),
      onModalClose: () => complycube.updateSettings({ isModalOpen: false }),
    });
  };

  //this check prompt user if either of the verication is still pending
  const checkSubmittedVerification = () => {
    //if id or doc is still pending
    if (invalidDocumentVerification) {
      toastAction({
        show: true,
        type: "error",
        timeout: 10000,
        title: "Identity failed!",
        message: "ID verification was not successful, Please try again",
      });
    } else if (invalidDocumentVerification) {
      toastAction({
        show: true,
        type: "error",
        timeout: 10000,
        title: "Document failed!",
        message: "Document verification was not successful, Please try again",
      });
    } else {
      toastAction({
        show: true,
        type: "info",
        timeout: 10000,
        title: "Great News",
        message: "Your ID verification is now in progress",
      });
    }
  };

  if (!complyCubeToken) {
    return null;
  }

  return <div id="complycube-mount"></div>;
};
