import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import {
  refreshUserDetails,
  userVerificationAction,
} from "../../../redux/actions/actions";
import { constants } from "../../../util/constants";
import { userVerificationValidator } from "../../../util/form-validators";
import PageHeading from "../../modules/page-heading/PageHeading";

import Body from "./Verification.css";
import VerificationForm from "./VerificationForm";
import { ComplyCubeVerification } from "./ComplyCubeVerification";
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";
import styled from "styled-components";

// INVALID VALID PENDING FAILED
interface VerificationMethod {
  type: string;
  status: string;
}

function checkIdVerificationStatus(user: any): boolean {
  let verificationList: VerificationMethod[] = [];

  if (user?.verifications) {
    for (const key in user.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }

  //cehck if meta.verified is true
  if (Boolean(user.meta?.verified)) {
    return true;
  }

  const idVerification = verificationList.find(
    (method) => method.type === "IDENTITY"
  );

  const docVerification = verificationList.find(
    (method) => method.type === "DOCUMENT"
  );

  const idAttempted = idVerification && idVerification.status !== "PENDING";
  const docAttempted = docVerification && docVerification.status !== "PENDING";

  const verificationAttempted = idAttempted && docAttempted;

  return verificationAttempted ?? false;
}

const checkToShowVerificationForm = (user: any) => {
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

export const VerificationComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [displayComplyCubeVerification, setDisplayComplyCubeVerification] =
    useState(false);
  const history = useHistory();

  const [method, setMethod] = useState("");
  const user = useSelector((state: any) => state.auth.user);
  const [isFormVerified, setFormVerified] = useState(false);
  const [openFormVerification, setOpenFormVerification] = useState(false);

  const transferId = new URLSearchParams(window.location.search).get("t");
  // console.log("transferId", user?.username);

  const initialValues: any = {
    // phoneCode: "+01",
    address2: "",
    location_country: user?.profile?.location_country,
    city: user?.profile?.city,
    username: user?.username,
    ...user?.profile,
  };

  useEffect(() => {
    //refreshUserDetails();
    setFormVerified(checkToShowVerificationForm(user));
  }, [user]);

  useEffect(() => {
    setSelectedCountry(initialValues.location_country);
  }, [initialValues.location_country]);

  const isIdAttempted = checkIdVerificationStatus(user); //user?.meta?.verified !== "1" ? false : true;

  const verifyUser = async (values: any) => {
    delete values.email;
    delete values.username;
    const resetState = () => {
      setOpenFormVerification(false);
      refreshUserDetails();
      //setFormVerified(true);
      //setDisplayComplyCubeVerification(true);
    };
    //console.log(values);
    await userVerificationAction(values, resetState);
  };

  return (
    <VerificationComponentStyles>
      <div className="container">
        {openFormVerification && (
          <Body>
            <div className="page-content">
              <Formik
                initialValues={{ ...initialValues }}
                validationSchema={userVerificationValidator}
                onSubmit={(values) => {
                  verifyUser(values);
                }}
              >
                {({ errors, touched, values }: any) => (
                  <VerificationForm
                    onCancel={() => setOpenFormVerification(false)}
                    {...{
                      errors,
                      touched,
                      values,
                      selectedCountry,
                      setSelectedCountry,
                      setFormVerified,
                    }}
                  />
                )}
              </Formik>
            </div>
          </Body>
        )}
        <>
          <p>{isFormVerified ? "✅" : "❌"} Form Verification</p>
          <p>{isIdAttempted ? "✅" : "❌"} Identity Verification</p>
          <p>{isIdAttempted ? "✅" : "❌"} Document upload</p>
        </>

        {/* <ComplyCubeVerification /> */}

        <ComplyCubeVerification
          open={displayComplyCubeVerification}
          setOpen={setDisplayComplyCubeVerification}
        />

        <div className="btns">
          <Button
            variant="contained"
            //style={{ background: "#fcd20f", color: "#333333" }}
            size="large"
            onClick={() => {
              setOpenFormVerification(true);
            }}
            disabled={isFormVerified}
          >
            Start form verification
          </Button>
          <Button
            variant="contained"
            //style={{ background: "#fcd20f", color: "#333333" }}
            size="large"
            onClick={() => {
              setDisplayComplyCubeVerification(true);
            }}
            disabled={isIdAttempted}
          >
            Start ID verification
          </Button>
        </div>
      </div>
      <GoToDahboard />
    </VerificationComponentStyles>
  );
};

const GoToDahboard = () => {
  const history = useHistory();
  return (
    <Button
      variant="outlined"
      style={{ background: "#fcd20f", color: "#333333" }}
      size="large"
      onClick={() => {
        history.push("/dashboard");
      }}
    >
      Go back to Dashboard
    </Button>
  );
};

const VerificationComponentStyles = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 24px;
  .container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    border: 1px solid #3333;
    box-sizing: border-box;
    padding: 42px;
    border-radius: 8px;

    p {
      margin: 0;
      font-size: 20px;
      line-height: 180%;
    }
    .btns {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
  }
`;
