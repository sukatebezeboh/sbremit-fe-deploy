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
                                  value={country.phoneCode}>
                                  {country.phoneCode} -
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
                              Date of birth<i>* &nbsp; &nbsp; &nbsp; { (
                              <span className="form-error-message form-error-message-adjust-up ">
                                {errors.day || errors.month || errors.year}
                              </span>
                            )} </i>
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
                                  <option value=""> -- </option>
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
                                  <option value="">  --- </option>
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
                          type="text"
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
