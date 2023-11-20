import '@geoapify/geocoder-autocomplete/styles/minimal.css';
import { themeNames } from "components/modules/toast-factory/themes";
import { Field, Form, Formik, FormikProps } from "formik";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete';
import {
  editProfileAction,
  toastAction,
} from "../../../redux/actions/actions";
import {
  constants,
  days,
  months,
} from "../../../util/constants";
import {
  EditProfileValidator,
} from "../../../util/form-validators";
import { paths } from "../../../util/paths";
import FormButton from "../../modules/form-button/FormButton";
import NavBar from "../../modules/navbar/NavBar";
import PageHeading from "../../modules/page-heading/PageHeading";
import style from "./EditProfile.css";
import * as Yup from 'yup';
// import PhoneNumberInput from 'components/modules/parts/PhoneNumberInput';

const Body = style();

const EditProfile = () => {
  const formikRef = useRef<FormikProps<any>>(null);
  const countries: any = useSelector(
    (state: any) => state.appValues.countries,
  );

  const [addressOne, setAddressOne] = useState<any>("");
  const [addressTwo, setAddressTwo] = useState<any>("");

  useEffect(() => {
    setAddressOne(user?.profile?.address1)
    setAddressTwo(user?.profile?.address2)
    triggerFieldErrors();
  }, [])


  const triggerFieldErrors = () => {
    Object.keys(initialValues).forEach((fieldName) => {
      // Check if the field is empty in initialValues
      const fieldValue = initialValues[fieldName];
      const isFieldEmpty = !fieldValue && fieldValue === '';
  
      if (isFieldEmpty) {
        try {
          EditProfileValidator.validateSyncAt(fieldName, fieldValue, {
            abortEarly: false,
          });
        } catch (error) {
          if (error instanceof Yup.ValidationError) {
            // Set field error for required fields that are empty
            console.log(fieldName, error?.message)
            formikRef.current?.setFieldError(fieldName, error?.message);
          }
        }
      }
    });
  };
  


  const handleAddressChange = (address: any, setAddress: any, addressKey: any) => {
    setAddress(address, addressKey);
  };


  const handleDOBClick = () => {

    toastAction({
      show: true,
      type: "warning",
      timeout: 10000,
      title: "Action disallowed",
      defaultThemeName: themeNames.CLEAR_MAMBA,
      message:
        "You can not change your DOB. Please contact the Admin to make this change.",
    });
  };

  const user = useSelector((state: any) => state.auth.user);
  const history = useHistory();

  const initialValues: any = {
    location_country: "gb",
    ...user?.profile,
  };

  const userCountry = user?.profile?.location_country && "GB"

  // console.log("user?.profile", user?.profile)//user?.profile?.location_country:"GB"


/*
location_country
mobile
phoneCode
*/

  const postprocessHook = (feature: any) => {
    return feature.properties.address_line1;
  }

  const suggestionsFilter = (suggestions: any) => {
    const processedStreets: any = [];

    const filtered = suggestions.filter((value: any) => {
      if (!value.properties.address_line1 && processedStreets.indexOf(value.properties.address_line1) >= 0) {
        return false;
      } else {
        processedStreets.push(value.properties.address_line1);
        processedStreets.push(value.properties.address_line2);
        processedStreets.push(value.properties.street);
        return true;
      }
    })

    return filtered;
  }

  const preprocessHook = (value: any, setAddress: any, addressKey: string) => {
    handleAddressChange(value, setAddress, addressKey);
    return value;
  }

  const onSuggectionChange = (value: any) => {
    return value;
  }

  const onPlaceSelect = (value: any, setAddress: any, addressKey: string) => {
    !value ? handleAddressChange(null, setAddress, addressKey) : handleAddressChange(value.properties.address_line1, setAddress, addressKey);
    return value;
  }

  return (
    <Body>
      <NavBar />
      <div className="page-content">
        <PageHeading
          heading="Edit Profile"
          subheading="Update your profile details"
          back={paths.PROFILE}
          mobileHide="subheading"
        />
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={EditProfileValidator}
          innerRef={formikRef}
          onSubmit={(values) => {
            const { address1, ...valuesWithOutAddress1 } = values;

            let newValues = valuesWithOutAddress1;

            if (addressOne) {
              newValues = { ...newValues, address1: addressOne };
            }

            if (addressTwo) {
              newValues = { ...newValues, address2: addressTwo };
            }

            editProfileAction(newValues, () =>
              history.push(paths.PROFILE),
            );
          }}>
          {({ errors, touched, values }: any) => (
            <Form>
              <div className="box">
                <div>
                  <div className="content">
                    Edit your profile details below
                  </div>

                  <div className="form part">
                    <hr className="mobile-hide" />

                    <div className="inputs">
                      <div className="names">
                        <div
                          className={
                              errors.firstName
                              ? "form-error"
                              : ""
                          }>
                          <div>
                            First Name<i>*</i>
                          </div>
                          <Field
                            name="firstName"
                            type="text"
                            placeholder="John"
                          />
                          {touched.firstName &&
                            errors.firstName && (
                              <div className="form-error-message form-error-message-adjust-up">
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
                            name="lastName"
                            type="text"
                            placeholder="Doe"
                          />
                          {touched.lastName &&
                            errors.lastName && (
                              <div className="form-error-message form-error-message-adjust-up">
                                {errors.lastName}
                              </div>
                            )}
                        </div>
                      </div>

                        <div
                          className={
                            touched.mobile && errors.mobile
                              ? "form-error m-grid-span-1-3"
                              : "m-grid-span-1-3"
                          }>
                          <div className="mobile-head">
                            Mobile<i>*</i>
                          </div>


                          {/* <PhoneNumberInput
                            Input={Field}
                            Select={Field}
                            isControlledComp={false}
                            phoneCodeExternalProps={{
                              as: 'select',
                              required: true,
                            }}
                            phoneCodeName="phoneCode"
                            countries={constants.COUNTRIES_PHONE_CODES}
                            name="mobile"
                            placeholder="e.g 07967885952"
                            showBorder={true}
                            isNotCopy={true}
                            isNotPaste={true}
                          /> */}
                          <div className="phone-container">
                            <img
                              src={`https://flagcdn.com/h24/${userCountry?.toLowerCase()}.png`}
                              alt={userCountry + 'flag'}
                            />
                            <p>{user?.profile?.phoneCode}</p>
                            <Field
                              name="mobile"
                              type="text"
                              className="phone-no"
                              placeholder="e.g 07967885952"
                            />
                          </div>


                          {/* <Field
                            as="select"
                            className="phone-country-select"
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
                          </Field> */}
                          {/* <img src="./assets/flags/UK.png" alt="uk"/> */}
                          
                          {/* <img src="./assets/flags/UK.png" alt="uk"/> */}
                        </div>

                        <div
                          onClick={handleDOBClick}
                          className={
                            (touched.day && errors.day) &&
                              (touched.month &&
                                errors.month) &&
                              (touched.year && errors.year)
                              ? "form-error m-grid-span-1-3"
                              : "m-grid-span-1-3"
                          }>
                          <div>
                            Date of birth<i>*</i>
                          </div>
                          <div className="grid-col-1-2-1 grid-gap-1 dob">
                            <div>
                              <Field
                                onClick={handleDOBClick}
                                disabled
                                className="day-select"
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
                                onClick={handleDOBClick}
                                disabled
                                className="month-select"
                                as="select"
                                name="month"
                                placeholder="month"
                                value={
                                  Object.values(months)[
                                  Number(values.month) - 1
                                  ]
                                }>
                                {Object.entries(months).map(
                                  (month: any) => (
                                    <option
                                      value={Number(
                                        month[1],
                                      )}>
                                      {month[0]}
                                    </option>
                                  ),
                                )}
                              </Field>
                            </div>
                            <div>
                              <Field
                                onClick={handleDOBClick}
                                disabled
                                name="year"
                                type="text"
                                placeholder="Year"
                              />
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
                              type="radio"
                              name="gender"
                              value="Other"
                            />
                            <span className="radio-txt">
                              Other
                            </span>
                          </span>
                          <span className="m-grid-col-span-1-4">
                            {" "}
                            <Field
                              name="gender"
                              className="specify"
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
                            errors.address1
                            ? "form-error"
                            : ""
                        }>
                        <div>
                          Address line 1<i>*</i>
                        </div>
                        <GeoapifyContext apiKey={process.env.REACT_APP_GEOPIFY_API_KEY} name="address1">
                          <GeoapifyGeocoderAutocomplete
                            placeholder="Street name and no"
                            placeSelect={(value) => onPlaceSelect(value, setAddressOne, "address1")}
                            suggestionsChange={onSuggectionChange}
                            preprocessHook={(value) => preprocessHook(value, setAddressOne, "address1")}
                            postprocessHook={postprocessHook}
                            suggestionsFilter={suggestionsFilter}
                            value={addressOne}
                          />
                        </GeoapifyContext>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="form part second">
                    <hr className="mobile-hide" />

                    <div className="inputs">
                      <div
                        className={
                          touched.address2 &&
                            errors.address2
                            ? "form-error"
                            : ""
                        }>
                        <div>Address line 2</div>
                        <GeoapifyContext apiKey={process.env.REACT_APP_GEOPIFY_API_KEY} name="address2">
                          <GeoapifyGeocoderAutocomplete
                            placeholder="Apartment, suite, unit, building, floor"
                            placeSelect={(value) => onPlaceSelect(value, setAddressTwo, "address2")}
                            suggestionsChange={onSuggectionChange}
                            preprocessHook={(value) => preprocessHook(value, setAddressTwo, "address2")}
                            postprocessHook={postprocessHook}
                            suggestionsFilter={suggestionsFilter}
                            value={addressTwo}
                            skipDetails={true}
                          />
                        </GeoapifyContext>
                        {touched.address2 &&
                          errors.address2 && (
                            <div className="form-error-message form-error-message-adjust-up">
                              {errors.address2}
                            </div>
                          )}
                      </div>
                      <div
                        className={`city-town-div ${errors.city
                          ? "form-error"
                          : ""
                          }`}>
                        <div>City / Town</div>
                        <Field name="city" type="text" />
                        {errors.city && (
                          <div className="form-error-message form-error-message-adjust-up">
                            {errors.city}
                          </div>
                        )}
                      </div>
                      <div
                        className={`state-input-div ${ errors.streetName
                          ? "form-error"
                          : ""
                          }`}>
                        <div>State</div>
                        <Field name="streetName" type="text" />
                        {errors.streetName && (
                          <div className="form-error-message form-error-message-adjust-up">
                            {errors.streetName}
                          </div>
                        )}
                      </div>
                      {/* <div
                        className={`state-input-div ${touched.location_country &&
                          errors.location_country
                          ? "form-error"
                          : ""
                          }`}>
                        <div>Location Country</div>
                        <Field
                          name="location_country"
                          as="select"
                          type="text">
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
                      </div> */}
                      <div
                        className={errors.zip
                            ? "form-error"
                            : ""
                        }>
                        <div>Postal / zip code</div>
                        <Field name="zip" type="text" />
                        {errors.zip && (
                          <div className="form-error-message form-error-message-adjust-up">
                            {errors.zip}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="btn">
                    <span
                      className="is-clickable"
                      onClick={() =>
                        history.push(paths.PROFILE)
                      }>
                      Cancel
                    </span>
                    <FormButton
                      label="Save"
                      formName={paths.EDIT_PROFILE}
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Body>
  );
};

export default EditProfile;
