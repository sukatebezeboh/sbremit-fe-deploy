import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { Field, Form } from "formik";
import {
  constants,
  days,
  months,
} from "../../../util/constants";
import TransferDetailsBox from "../../modules/transfer-details-box/TransferDetailsBox";


const VerificationForm = ({ errors, touched, values, selectedCountry, setSelectedCountry }: any) => {
    const history = useHistory();
    const countries: any = useSelector(
        (state: any) => state.appValues.countries,
    );

    // console.log("countries", countries)
    // const userCountry = values?.location_country;
  return (
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
                <div
                    className={
                    touched.mobile && errors.mobile
                        ? "form-error"
                        : ""
                    }>
                    <div className="">Mobile<i>*</i></div>
                    <div className="phone-box">
                        {/* <Field
                        className="green-txt phone-code-adjust"
                        as="select"
                        name="phoneCode"
                        id="">
                        {Object.keys(constants.SIGNUP_COUNTRIES).map(
                            (countryCode) => {
                            const countryInfo = constants.COUNTRIES_PHONE_CODES.find(country => country.countryCode === countryCode)
                            return(
                                <option
                                value={countryInfo?.phoneCode}>
                                {countryInfo?.name}
                                </option>
                            )},
                        )}
                        </Field> */}
                        <img
                            src={`https://flagcdn.com/h24/${selectedCountry?.toLowerCase()}.png`}
                            alt={selectedCountry + 'flag'}
                        />
                        <p className="green-txt">{values.phoneCode}</p>
                        <Field
                            className="green-txt"
                            type="text"
                            name="mobile"
                        />
                        {touched.mobile &&
                        errors.mobile && (
                            <div className="form-error-message form-error-message-adjust-up">
                            {errors.mobile}
                            </div>
                        )}

                    </div>
                </div>

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
                    disabled={true}
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
  );
};

export default VerificationForm;
