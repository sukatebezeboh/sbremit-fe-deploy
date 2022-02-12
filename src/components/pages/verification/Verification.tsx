import { useEffect, useState } from "react";
import { Field, Form, Formik } from "formik";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
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
import TransferDetailsBox from "../../modules/parts/TransferDetailsBox";
import ProgressBar from "../../modules/progress-bar/ProgressBar";
import VerificationMethod from "../../modules/verification-method/VerificationMethod";

const Body = styled.div`
  .page-content {
    margin-top: 0px;
    .box-container {
      display: grid;
      grid-template-columns: 2fr 1.3fr;
      grid-gap: 2%;
      padding-top: 50px;
    }
    hr {
      border: 1px solid #f8f7f8;
      margin-bottom: 30px;
    }

    .form {
    }
    .part {
      background: #ffffff;
      box-shadow: 0px 10px 12px #cccccc80;
      border-radius: 15px;
      width: 100%;
      padding: 50px;
      margin: 0px auto;
      .heading {
        display: grid;
        grid-template-columns: 1fr 1fr;
        .title {
          font: normal normal normal 20px/24px Montserrat;
          color: #a3a3a3;
        }
        .update {
          text-align: right;
          font: normal normal normal 16px/19px Montserrat;
          color: #007b5d;
        }
      }
      .inputs {
        margin-top: 50px;
        margin: 30px auto;
        width: 100%;
        .radio-span {
          input[type="radio"] {
            width: 19px;
            :before {
              width: 19px;
              height: 19px;
              border-radius: 15px;
              top: 30%;
              left: -5%;
              position: relative;
              background-color: white;
              content: "";
              display: inline-block;
              visibility: visible;
              border: 1px solid #fcd20f;
              pointer-events: none;
              @media only screen and (max-width: 900px) {
                top: 15%;
              }
            }
            :checked {
              :after {
                width: 11px;
                height: 11px;
                border-radius: 15px;
                top: -8px;
                left: 15%;
                position: relative;
                background-color: #fcd20f;
                content: "";
                display: inline-block;
                visibility: visible;
                border: 1px double #fcd20f;
                z-index: 1;
                pointer-events: none;
                @media only screen and (max-width: 900px) {
                  top: -57%;
                }
              }
            }
          }
          .radio-txt {
            padding: 17px 5px;
          }
        }
        input,
        select {
          margin-bottom: 5px;
          width: 100%;
          height: 48px;
          border: 1px solid #7fbcad;
          border-radius: 4px;
          background: #ffffff;
          outline: none;
          font: normal normal normal 14px Montserrat;
          color: #a3a3a3;
          padding: 19px;
          ::placeholder {
            color: #a3a3a3;
          }
        }
        select {
          -webkit-appearance: none;
          -moz-appearance: none;
          background: transparent;
          background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(127, 188, 173)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
          background-repeat: no-repeat;
          background-position-x: 20%;
          background-position-y: 10px;
          padding: 0px;
          padding-left: 75px;
        }
        input.phone-no {
          position: relative;
          top: 51px;
          width: 70%;
          height: 44px;
          margin-left: 28%;
          border: 2px solid transparent;
          background: #fff;
        }
        div.mobile-head {
          margin-bottom: -44px;
        }
        .dob {
          margin-top: 6px;
          input {
            padding: 9px;
          }
        }
        .street-name {
        }
        .building-number {
          width: 200px;
        }
        select + img,
        select + .phone-code-value {
          position: relative;
          top: -35px;
          left: 20px;
          width: 25px;
          height: 19px;
          box-shadow: 0px 3px 6px #00000029;
          border-radius: 1px;
          pointer-events: none;
        }

        select + .phone-code-value {
          left: 15px;
          top: -38px;
          box-shadow: none;
        }
        > div:nth-child(3) {
          margin-top: 0px;
        }
        > div {
          margin-top: 20px;
          font: normal normal normal 15px/19px Montserrat;
          color: #a3a3a3;
          i {
            color: #fcd20f;
          }
          .show-hide {
            width: 16px;
            height: 16px;
            position: relative;
            top: -33px;
            left: 90%;
          }
          > div {
            font: normal normal normal 15px/19px Montserrat;
            line-height: 19px;
          }
        }
        > div:first-child {
          box-sizing: border-box;
          display: grid;
          grid-template-columns: 5fr 1fr 5fr;
        }
      }
    }

    .day-select {
      padding-left: 10px !important;
      background-position-x: 100% !important;
    }
    .month-select {
      padding-left: 3px !important;
      background-position-x: 100% !important;
    }

    .btns {
      text-align: right;
      margin: 65px 0px;
      z-index: 5;
      span {
        display: inline-block;
        margin-right: 50px;
        font: normal normal normal 25px/30px Montserrat;
        color: #424242;
        cursor: default;
      }
      button {
        background: #fcd20f 0% 0% no-repeat padding-box;
        border-radius: 8px;
        width: 300px;
        height: 80px;
        text-align: center;
        font: normal normal normal 25px/30px Montserrat;
        color: #424242;
        border: none;
        outline: none;
        cursor: pointer;
      }
    }
  }
  #trulioo-embedid {
    max-height: 750px;
  }
  #trulioo-embedid:empty {
    background: url("/assets/icons/rolling-loader-black.svg");
    width: 100%;
    min-height: 50vh;
    background-repeat: no-repeat;
    background-position: center;
  }
  @media only screen and (max-width: 900px) {
    .page-content {
      background: #fff;
      width: 100%;
      /* height: 130vh; */
      margin-top: -10px;
      padding-top: 10px;
      margin-bottom: 0px;
      padding-bottom: 20px;
      .page-heading {
        margin-top: 10px;
        .heading {
          z-index: 1;
        }
        .subheading {
          margin-bottom: -16px;
        }
      }
      .box-container {
        grid-template-columns: 1fr;
        padding-top: 0px;
        margin-top: 10px;
        .part {
          padding: 20px;
          box-shadow: none;
          .inputs {
            margin-top: -10px;
            > div {
              grid-template-columns: 1fr;
            }
            input {
              padding: 10px 20px;
            }
            input,
            select {
              height: 30px !important;
              font: normal normal normal 14px/18px
                Montserrat;
            }
            input.phone-no {
              top: 32px;
              height: 25px !important;
              margin-left: 25%;
              width: 74%;
              padding-left: 5px;
            }
            select {
              /* padding: 10px 50%; */
              background-position-y: 3px;
              background-position-x: 10%;
            }

            .mobile-head {
              margin-bottom: -31px;
            }
            select + img {
              top: -29px;
              left: 10px;
            }
            > div {
              margin-top: 15px;
              > div {
                font: normal normal normal 10px/13px
                  Montserrat;
                line-height: 19px;
              }
              .show-hide {
                top: -25px;
                left: 90%;
              }
            }
            div.email {
              margin-bottom: 20px;
            }
            > button {
              margin-top: 25px;
              height: 40px;
              font: normal normal normal 13px/16px
                Montserrat;
            }
            .radio-txt {
              padding: 10px 5px;
              font: normal normal normal 14px/19px
                Montserrat;
            }
          }
        }
      }
      .btns {
        margin-top: -30px;
        padding: 0px 5%;
        button {
          width: 100%;
          height: 40px;
          font: normal normal normal 13px/16px Montserrat;
        }
        span {
          font: normal normal normal 13px/16px Montserrat;
          text-align: center;
          display: block;
          margin-right: 0px;
          position: relative;
          top: 70px;
        }
      }

      .m-grid-col-1-1-1 {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
      }
      .m-grid-col-span-1-4 {
        grid-column: 1/4;
      }
    }
  }
`;

const Verification = () => {
  const history = useHistory();
  const countries: any = useSelector(
    (state: any) => state.appValues.countries,
  );
  const [showContinueButton, setShowContinueButton] =
    useState(false);
  const [selectedCountry, setSelectedCountry] =
    useState("");

  const [method, setMethod] = useState("");
  const user = useSelector((state: any) => state.auth.user);

  const initialValues: any = {
    phoneCode: "+01",
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
      <ProgressBar point={1} />
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
              <Form>
                <div className="box-container">
                  <div className="form part">
                    <div className="heading mobile-hide">
                      <div className="title">
                        My personal details
                      </div>
                    </div>
                    <hr className="mobile-hide" />

                    <div className="inputs">
                      <div className="names">
                        <div
                          className={
                            touched.firstName &&
                            errors.firstName
                              ? "form-error"
                              : ""
                          }>
                          <div>
                            First Name<i>*</i>
                          </div>
                          <Field
                            className="green-txt"
                            type="text"
                            name="firstName"
                            placeholder="John"
                          />
                          {touched.firstName &&
                            errors.firstName && (
                              <div className="form-error-message">
                                {errors.firstName}
                              </div>
                            )}
                        </div>
                        <div></div>
                        <div
                          className={
                            touched.lastName &&
                            errors.lastName
                              ? "form-error"
                              : ""
                          }>
                          <div>
                            Last Name<i>*</i>
                          </div>
                          <Field
                            className="green-txt"
                            type="text"
                            name="lastName"
                            placeholder="Doe"
                          />
                          {touched.lastName &&
                            errors.lastName && (
                              <div className="form-error-message">
                                {errors.lastName}
                              </div>
                            )}
                        </div>
                      </div>
                      <div className="grid-col-1-1 grid-gap-3">
                        <div
                          className={
                            touched.mobile && errors.mobile
                              ? "form-error"
                              : ""
                          }>
                          <div className="mobile-head">
                            Mobile<i>*</i>
                          </div>
                          <Field
                            className="green-txt phone-no"
                            type="text"
                            name="mobile"
                            placeholder="e.g 07967885952"
                          />
                          <Field
                            className="green-txt"
                            as="select"
                            name="phoneCode"
                            id="">
                            {constants.COUNTRIES_PHONE_CODES.map(
                              (country) => (
                                <option
                                  value={country.code}>
                                  {country.code} -{" "}
                                  {country.name}
                                </option>
                              ),
                            )}
                          </Field>
                          {/* <img src="./assets/flags/UK.png" alt="uk"/> */}
                          <b className="green-txt phone-code-value">
                            {" "}
                            {values.phoneCode}{" "}
                          </b>
                          {touched.mobile &&
                            errors.mobile && (
                              <div className="form-error-message form-error-message-adjust-up">
                                {errors.mobile}
                              </div>
                            )}
                        </div>
                        <div>
                          <div
                            className={
                              (touched.day && errors.day) ||
                              (touched.month &&
                                errors.month) ||
                              (touched.year && errors.year)
                                ? "form-error"
                                : ""
                            }>
                            <div>
                              Date of birth<i>*</i>
                            </div>
                            <div className="grid-col-1-2-1 grid-gap-1 dob">
                              <div>
                                <Field
                                  className="day-select green-txt"
                                  as="select"
                                  name="day"
                                  placeholder="day"
                                  value={
                                    days[Number(values.day)]
                                  }>
                                  {days.map((day: any) => (
                                    <option
                                      key={days[day]}
                                      value={day + 1}>
                                      {day + 1}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                              <div>
                                <Field
                                  className="month-select green-txt"
                                  as="select"
                                  name="month"
                                  placeholder="month"
                                  value={
                                    Object.values(months)[
                                      Number(values.month) -
                                        1
                                    ]
                                  }>
                                  {Object.entries(
                                    months,
                                  ).map((month: any) => (
                                    <option
                                      value={Number(
                                        month[1],
                                      )}>
                                      {month[0]}
                                    </option>
                                  ))}
                                </Field>
                              </div>
                              <div>
                                <Field
                                  name="year"
                                  className="green-txt"
                                  type="text"
                                  placeholder="Year"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className={
                          touched.gender && errors.gender
                            ? "form-error"
                            : ""
                        }>
                        <div>
                          Gender<i>*</i>
                        </div>
                        <div className="grid-col-1-1-1-2 m-grid-col-1-1-1">
                          <span className="grid-col-0-1 radio-span">
                            <Field
                              className="green-txt"
                              type="radio"
                              name="gender"
                              value="male"
                            />
                            <span className="radio-txt">
                              Male
                            </span>
                          </span>
                          <span className="grid-col-0-1 radio-span">
                            <Field
                              className="green-txt"
                              type="radio"
                              name="gender"
                              value="female"
                            />
                            <span className="radio-txt">
                              Female
                            </span>
                          </span>
                          <span className="grid-col-0-1 radio-span">
                            <Field
                              className="green-txt"
                              type="radio"
                              name="gender"
                              value={
                                values.gender !== "male" &&
                                values.gender !== "female"
                                  ? values.gender
                                  : ""
                              }
                            />
                            <span className="radio-txt">
                              Other
                            </span>
                          </span>
                          <span className="m-grid-col-span-1-4">
                            {" "}
                            <Field
                              className="green-txt specify"
                              name="gender"
                              placeholder="Please specify"
                            />{" "}
                          </span>
                        </div>
                        {touched.gender &&
                          errors.gender && (
                            <div className="form-error-message form-error-message-adjust-up">
                              {errors.gender}
                            </div>
                          )}
                      </div>
                      <div
                        className={
                          touched.buildingNumber &&
                          errors.buildingNumber
                            ? "form-error"
                            : ""
                        }>
                        <div>
                          House/Building Number<i>*</i>
                        </div>

                        <Field
                          className="green-txt building-number"
                          name="buildingNumber"
                          type="number"
                          min="0"
                          placeholder="Building No"
                        />
                        {touched.buildingNumber &&
                          errors.buildingNumber && (
                            <div className="form-error-message">
                              {errors.buildingNumber}
                            </div>
                          )}
                      </div>
                      <div className="building-name">
                        <div>Building Name</div>
                        <Field
                          className="green-txt street-name"
                          name="buildingName"
                          type="text"
                          placeholder="Building name"
                        />
                      </div>
                      <div
                        className={
                          (touched.buildingNumber &&
                            errors.buildingNumber) ||
                          (touched.streetName &&
                            errors.streetName)
                            ? "form-error"
                            : ""
                        }>
                        <div>
                          Street Name<i>*</i>
                        </div>
                        <Field
                          className="green-txt street-name"
                          name="streetName"
                          type="text"
                          placeholder="Street name"
                        />
                        {touched.streetName &&
                          errors.streetName && (
                            <div className="form-error-message">
                              {errors.streetName}
                            </div>
                          )}
                      </div>
                      <div
                        className={`city-town-div ${
                          touched.city && errors.city
                            ? "form-error"
                            : ""
                        }`}>
                        <div>City / Town</div>
                        <Field
                          className="green-txt"
                          name="city"
                          type="text"
                        />
                        {touched.city && errors.city && (
                          <div className="form-error-message form-error-message-adjust-up">
                            {errors.city}
                          </div>
                        )}
                      </div>
                      {selectedCountry === "CA" && (
                        <div
                          className={`city-town-div ${
                            touched.province &&
                            errors.province
                              ? "form-error"
                              : ""
                          }`}>
                          <div>
                            Province<i>*</i>
                          </div>
                          <Field
                            className="green-txt"
                            name="province"
                            type="text"
                            placeholder="Province"
                          />
                          {touched.province &&
                            errors.province && (
                              <div className="form-error-message form-error-message-adjust-up">
                                {errors.province}
                              </div>
                            )}
                        </div>
                      )}
                      {selectedCountry !== "CA" && (
                        <div
                          className={`city-town-div ${
                            touched.county && errors.county
                              ? "form-error"
                              : ""
                          }`}>
                          <div>County</div>
                          <Field
                            className="green-txt"
                            name="county"
                            type="text"
                            placeholder="county"
                          />
                          {touched.county &&
                            errors.county && (
                              <div className="form-error-message form-error-message-adjust-up">
                                {errors.county}
                              </div>
                            )}
                        </div>
                      )}
                      <div
                        className={`state-input-div ${
                          touched.location_country &&
                          errors.location_country
                            ? "form-error"
                            : ""
                        }`}>
                        <div>Location Country</div>
                        <Field
                          className="green-txt"
                          name="location_country"
                          as="select"
                          type="text"
                          onClick={(e: any) => {
                            setSelectedCountry(
                              e.target.value,
                            );
                          }}>
                          <option value=""></option>
                          {Object.keys(countries).map(
                            (key) => (
                              <option value={key}>
                                {countries[key]}
                              </option>
                            ),
                          )}
                        </Field>
                        <img
                          src={`./assets/flags/${values.location_country}.png`}
                          alt="uk"
                        />
                        {touched.location_country &&
                          errors.location_country && (
                            <div className="form-error-message form-error-message-adjust-up">
                              {errors.location_country}
                            </div>
                          )}
                      </div>
                      <div
                        className={
                          touched.zip && errors.zip
                            ? "form-error"
                            : ""
                        }>
                        <div>Postal / zip code</div>
                        <Field
                          className="green-txt"
                          name="zip"
                          type="text"
                        />
                        {touched.zip && errors.zip && (
                          <div className="form-error-message form-error-message-adjust-up">
                            {errors.zip}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mobile-hide">
                    <TransferDetailsBox />
                  </div>
                </div>
                <div className="btns">
                  <span
                    onClick={() =>
                      history.push("/get-quote")
                    }>
                    Back
                  </span>{" "}
                  <button type="submit">Continue</button>{" "}
                </div>
              </Form>
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
