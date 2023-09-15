import { useEffect, useState } from "react";
import { Formik } from "formik";
import { useSelector } from "react-redux";
import {
  refreshUserDetails,
  userVerificationAction,
} from "../../../redux/actions/actions";
import {
  constants,
} from "../../../util/constants";
import { userVerificationValidator } from "../../../util/form-validators";
import PageHeading from "../../modules/page-heading/PageHeading";

import Body from './Verification.css';
import VerificationForm from "./VerificationForm";
import { ComplyCubeVerification } from "./ComplyCubeVerification";


// INVALID VALID PENDING FAILED

export const VerificationComponent = () => {
  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [method, setMethod] = useState("");
  const user = useSelector((state: any) => state.auth.user);

  const transferId = new URLSearchParams(window.location.search).get('t');
  console.log("transferId", transferId)

  const initialValues: any = {
    // phoneCode: "+01",
    address2: "",
    location_country: user?.profile?.location_country,
    ...user?.profile,
  };

  useEffect(() => {
    refreshUserDetails()
  }, [])

    useEffect(() => {
      setSelectedCountry(initialValues.location_country)
    }, [initialValues.location_country])

    const subheading = method === constants.VERIFICATION_TYPE_IDENTITY
    ? 'Enter information to verify your identity'
    : method === constants.VERIFICATION_TYPE_DOCUMENT
    ? 'Follow the prompts to verify your documents'
    : 'Enter information to verify your identity'

  const isFormVerified = Boolean(user?.meta?.verified) && user?.meta?.verified !== "retry"

  return (
    <Body>
        <div className="page-content">
          <PageHeading
            heading="Verification"
            subheading={subheading}
          />
          {!isFormVerified ? (
            <Formik
              initialValues={{ ...initialValues }}
              validationSchema={userVerificationValidator}
              onSubmit={(values) => {
                userVerificationAction(values, () => {})
              }}
            >
              {({ errors, touched, values }: any) => (
              <VerificationForm {...{ errors, touched, values, selectedCountry, setSelectedCountry }}/>
              )}
            </Formik>
          ) : <p>Form verification Completed</p>}
          <ComplyCubeVerification />
        </div>
    </Body>
  );
};
