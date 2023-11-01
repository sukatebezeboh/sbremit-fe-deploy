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

// INVALID VALID PENDING FAILED

export const VerificationComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [displayComplyCubeVerification, setDisplayComplyCubeVerification] =
    useState(false);
  const history = useHistory();

  const [method, setMethod] = useState("");
  const user = useSelector((state: any) => state.auth.user);

  const transferId = new URLSearchParams(window.location.search).get("t");
  console.log("transferId", transferId);

  const initialValues: any = {
    // phoneCode: "+01",
    address2: "",
    location_country: user?.profile?.location_country,
    ...user?.profile,
  };

  useEffect(() => {
    refreshUserDetails();
  }, []);

  useEffect(() => {
    setSelectedCountry(initialValues.location_country);
  }, [initialValues.location_country]);

  const isFormVerified = user?.meta?.verified !== "1" ? false : true;

  const verifyUser = async (values: any) => {
    try {
      await userVerificationAction(values, () => {});
      setDisplayComplyCubeVerification(true);
    } catch (error) {}
  };

  return (
    <div style={{ padding: "10px", minHeight: "100vh" }}>
      {!isFormVerified ? (
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
                  {...{
                    errors,
                    touched,
                    values,
                    selectedCountry,
                    setSelectedCountry,
                  }}
                />
              )}
            </Formik>
          </div>
        </Body>
      ) : (
        <p>✅ Verification form completed</p>
      )}
      <ComplyCubeVerification />
      {(displayComplyCubeVerification ||
        isFormVerified) && <ComplyCubeVerification />}
    </div>
  );
};
