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

    const handleIDVerificationServerResponse = (isPrecursor = false) => {
        if (isPrecursor) return setMethod(constants.VERIFICATION_TYPE_DOCUMENT)
        pollServerForVerificationStatus(2)
        history.push(paths.RECIPIENT);
    }

  return (
    <Body>
      <NavBar />
      <ProgressBar point={3} />
      <div className="page-content">
        <PageHeading
          heading="Verification"
          subheading={
            method === constants.VERIFICATION_TYPE_IDENTITY
              ? 'Enter information to verify your identity'
              : method === constants.VERIFICATION_TYPE_DOCUMENT
              ? 'Follow the prompts to verify your documents'
              : 'Enter information to verify your identity'
          }
          back={paths.GET_QUOTE}
          callBack={() => history.push(paths.GET_QUOTE)}
        />
        {method === constants.VERIFICATION_TYPE_IDENTITY || method === constants.VERIFICATION_TYPE_DOCUMENT_WITH_IDENTITY_PRECURSOR
         ? (
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
        ) : method ===
          constants.VERIFICATION_TYPE_DOCUMENT ? (
          <>
            <div id="trulioo-embedid"></div>
            {showContinueButton && (
              <div className="btns p-relative">
                <span
                  onClick={() =>
                    refreshUserDetails((user: any) =>
                      history.push(paths.GET_QUOTE),
                    )
                  }>
                  Back
                </span>{" "}
                <button
                  onClick={() =>
                    refreshUserDetails((user: any) =>
                      history.push(paths.RECIPIENT),
                    )
                  }>
                  Continue
                </button>{" "}
              </div>
            )}
          </>
        ) : (
          <VerificationMethod
            setMethod={setMethod}
            method={method}
          />
        )}
      </div>
    </Body>
  );
};

export default Verification;

// type = "WATCHLIST" "IDENTITY" "DOCUMENT"
const config1 = {
    "stages":[
    "intro",
    {
       "name":"intro",
       "options":{
          "heading":"SB Remit identity verification",
          "message":[
             "Only UK Government issues Document Accepted",
             "UK Passport, UK Drivers License, UK Biometrics resident permit (BRP)"
          ],
        //   "startButtonText":"Verify your UK identity":"Start Verification"
       }
    },
    "userConsentCapture",
    {
       "name":"faceCapture",
       "options":{
          "mode":"video"
       }
    },
    "completion"
 ]}

const config2 = {
    "stages":[
        "intro",
        {
           "name":"intro",
           "options":{
              "heading":"SB Remit identity verification",
              "message":[
                 "Only UK Government issues Document Accepted",
                 "UK Passport, UK Drivers License, UK Biometrics resident permit (BRP)"
              ],
            //   "startButtonText":"Verify your UK identity":"Start Verification"
           }
        },
        "userConsentCapture",
        "documentCapture",
        {
           "name":"documentCapture",
           "options":{
            //   :true,
              "documentTypes":{
                 "passport":true,
                 "driving_license":{"country":"GB"},
                //  :true,
                 "national_identity_card":{"country":"GB"},
                //  :true,
                 "residence_permit":{"country":"GB"}
              }
           }
        },
        "completion"
     ]
}