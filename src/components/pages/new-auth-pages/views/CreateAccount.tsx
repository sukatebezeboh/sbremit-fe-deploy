import styled from "styled-components";
import * as yup from "yup";
import AuthHeader from "../components/AuthHeader";
import { useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { COUNTRIES } from "../utils/countries";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout from "./AuthLayout";
import { paths } from "util/paths";
import { signUpAction, toastAction } from "redux/actions/actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  firstName: yup.string().trim().required().label("First name"),
  lastName: yup.string().trim().required().label("Last name"),
  username: yup.string().email().required().label("Email"),
  password: yup.string().min(6).max(255).required().label("Password"),
  mobile: yup.string().min(9).max(11).required().label("Phone number"),
  dob: yup.date().required().label("Date of birth"),
  referral: yup.string().label("Referral code"),
});

const initialValues = {
  firstName: "",
  lastName: "",
  location_country: COUNTRIES[0].countryCode,
  username: "",
  dob: "",
  password: "",
  mobile: "",
  checked: false,
  referral: "",
};

const getEighteenYearsAgo = () => {
  let now = new Date();
  now.setFullYear(now.getFullYear() - 18);
  return now.toLocaleDateString().split("/").reverse().join("-");
};

const CreateAccount = () => {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();

  const submitting = useSelector((state: any) => state.submitting);
  const createAccountSuccess = useSelector(
    (state: any) => state.createAccountSuccess
  );
  const createAccountError = useSelector(
    (state: any) => state.createAccountError
  );

  const handleSubmit = (values: any) => {
    setEmail(values.username);
    const newValues = {
      ...values,
      location_country: country.countryCode,
      clientIp: window.localStorage.getItem("IP_Address"),
      dob: values.dob.split("-").reverse().join("-"),
      settings: {
        marketingPermission: !values.checked,
      },
    };
    dispatch(signUpAction(newValues));
  };

  useEffect(() => {
    if (createAccountSuccess !== null) {
      toastAction({
        show: true,
        type: "success",
        timeout: 10000,
        message: "Account created successfully. Verify your email",
      });
      history.push({
        pathname: paths.CONFIRM_ACCOUNT_EMAIL,
        state: { username: email },
      });
    }
  }, [createAccountSuccess]);

  useEffect(() => {
    if (createAccountError) {
      toastAction({
        show: true,
        type: "error",
        timeout: 10000,
        message:
          createAccountError?.message ||
          "There was error creating your account",
      });
    }
  }, [createAccountError]);

  return (
    <AuthLayout>
      <AuthHeader
        heading="Create an account. It's free!"
        subHeading="Already have an account?"
        link={{ path: paths.SIGN_IN, text: "Sign in" }}
      />

      <Formik
        initialValues={{ ...initialValues }}
        validationSchema={schema}
        onSubmit={handleSubmit}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <Content>
              <div className="form">
                <FlexRow>
                  <AuthInput
                    label="First Name"
                    placeholder="First Name"
                    required
                    name="firstName"
                    value={values.firstName}
                    error={errors.firstName}
                    onChange={handleChange("firstName")}
                  />
                  <AuthInput
                    label="Last Name"
                    placeholder="Last Name"
                    required
                    name="lastName"
                    value={values.lastName}
                    error={errors.lastName}
                    onChange={handleChange("lastName")}
                  />
                </FlexRow>
                <AuthInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  required
                  type="email"
                  name="username"
                  value={values.username}
                  error={errors.username}
                  onChange={handleChange("username")}
                />
                <AuthInput
                  label="Phone Number"
                  placeholder={country.dialCode}
                  required
                  type="tel"
                  name="mobile"
                  value={values.mobile}
                  error={errors.mobile}
                  onChange={handleChange("mobile")}
                  countryInfo={{ country, setCountry }}
                />
                <AuthInput
                  label="Password"
                  placeholder="Minimum of 8 characters"
                  required
                  type="password"
                  name="password"
                  value={values.password}
                  error={errors.password}
                  onChange={handleChange("password")}
                />
                <FlexRow className="wrap">
                  <AuthInput
                    label="Date Of Birth"
                    required
                    type="date"
                    name="dob"
                    value={values.dob}
                    error={errors.dob}
                    onChange={handleChange("dob")}
                    max={getEighteenYearsAgo()}
                  />
                  <AuthInput
                    label="Referral code(optional)"
                    placeholder="Enter referral code"
                    name="referral"
                    value={values.referral}
                    error={errors.referral}
                    onChange={handleChange("referral")}
                  />
                </FlexRow>
                <CheckboxContainer>
                  <input
                    id="cancelCheckContact"
                    onChange={handleChange("checked")}
                    checked={values.checked}
                    value={values.checked as any}
                    type="checkbox"
                    name="checked"
                  />
                  <label htmlFor="cancelCheckContact">
                    By ticking this box, you do not wish to be contacted for
                    marketing information purposes or any special offer.
                  </label>
                </CheckboxContainer>
              </div>

              <AuthButton
                type="submit"
                title="Create account"
                disabled={submitting}
                isLoading={submitting}
              />
            </Content>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default CreateAccount;

const Content = styled.div`
  margin-top: 40px;

  .form {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;
  }

  @media (max-width: 768px) {
    .form {
      gap: 20px;
    }
  }
`;

const FlexRow = styled.div`
  display: flex;
  gap: 20px;

  & > * {
    flex: 1;
  }

  &.wrap {
    @media (max-width: 768px) {
      flex-direction: column;
    }
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;

  input {
    accent-color: ${({ theme }) => theme.color.primary};
  }

  label {
    color: ${({ theme }) => theme.color.dark};
    font-size: ${({ theme }) => theme.font.size["xl"]};
    font-weight: 300;
  }

  @media (max-width: 768px) {
    label {
      font-size: ${({ theme }) => theme.font.size.base};
    }
  }
`;
