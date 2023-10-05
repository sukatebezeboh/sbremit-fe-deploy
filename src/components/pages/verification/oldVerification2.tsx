import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  pollServerForVerificationStatus,
  refreshUserDetails,
  saveTruliooTransactionId,
  userVerificationAction,
} from "../../../redux/actions/actions";
import {
  constants,
  days,
  months,
} from "../../../util/constants";
import { userVerificationValidator } from "../../../util/form-validators";
import { paths } from "../../../util/paths";
import NavBar from "../../modules/navbar/NavBar";
import PageHeading from "../../modules/page-heading/PageHeading";
import TransferDetailsBox from "../../modules/transfer-details-box/TransferDetailsBox";
import ProgressBar from "../../modules/progress-bar/ProgressBar";
import VerificationMethod from "../../modules/verification-method/VerificationMethod";

import Body from './Verification.css';
import VerificationForm from "./VerificationForm";
import { getQueryParam } from "util/util";
import { ComplyCubeVerification } from "./ComplyCubeVerification";


// INVALID VALID PENDING FAILED

const Verification = () => {
  const history = useHistory();
  const [showContinueButton, setShowContinueButton] =
    useState(false);
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
    if (method !== constants.VERIFICATION_TYPE_DOCUMENT)
      return;
    const newWindow: any = window;
    const TruliooClient: any = newWindow.TruliooClient;

    const handleResponse = (truliooResponse: any) => {
      saveTruliooTransactionId({
        experienceTransactionId:
          truliooResponse.experienceTransactionId,
      });
      pollServerForVerificationStatus(10);
      setShowContinueButton(true);
    };

    new TruliooClient({
      publicKey:
        process.env.REACT_APP_TRULIOO_EMBED_ID_PUBLIC_KEY,
      accessTokenURL:
        process.env.REACT_APP_TRULIOO_ACCESS_TOKEN_URL,
      handleResponse,
    });
  }, [method]);

    useEffect(() => {
      setSelectedCountry(initialValues.location_country)
    }, [initialValues.location_country])

    // const handleIDVerificationServerResponse = (isPrecursor = false) => {
    //     if (isPrecursor) return setMethod(constants.VERIFICATION_TYPE_DOCUMENT)
    //     pollServerForVerificationStatus(2)
    //     history.push(paths.RECIPIENT);
    // }
    const handleIDVerificationServerResponse = (isPrecursor = false) => {
    }

    const subheading = method === constants.VERIFICATION_TYPE_IDENTITY
    ? 'Enter information to verify your identity'
    : method === constants.VERIFICATION_TYPE_DOCUMENT
    ? 'Follow the prompts to verify your documents'
    : 'Enter information to verify your identity'

  const isFormVerified = Boolean(user?.meta?.verified) && user?.meta?.verified !== "retry"

  return (
    <Body>
      <NavBar />
      <ProgressBar point={3} />
      <div className="page-content">
        <PageHeading
          heading="Verification"
          subheading={subheading}
          back={paths.GET_QUOTE}
          callBack={() => history.push(paths.GET_QUOTE)}
        />
        {!isFormVerified ? (
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={userVerificationValidator}
            onSubmit={(values) => {
              userVerificationAction(values, () => handleIDVerificationServerResponse(method === constants.VERIFICATION_TYPE_DOCUMENT_WITH_IDENTITY_PRECURSOR),
                method === constants.VERIFICATION_TYPE_DOCUMENT_WITH_IDENTITY_PRECURSOR
              )
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

export default Verification;
