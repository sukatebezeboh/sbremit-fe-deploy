import styled from "styled-components";
import * as yup from "yup";
import AuthHeader from "../components/AuthHeader";
import { useState } from "react";
import { Form, Formik } from "formik";
import { COUNTRIES } from "../utils/countries";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout from "./AuthLayout";
import { paths } from "util/paths";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  firstName: yup.string().trim().required().label("First name"),
  lastName: yup.string().trim().required().label("Last name"),
  email: yup.string().email().required().label("Email"),
  password: yup.string().min(6).max(255).required().label("Password"),
  phoneNumber: yup.string().min(9).max(11).required().label("Phone number"),
  dob: yup.date().required().label("Date of birth"),
  referralCode: yup.string().label("Referral code"),
});

const CreateAccount = () => {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const { push } = useHistory();

  const onSubmit = (data: object) => {
    console.log(data);
    push(paths.EMAIL_LINK_SENT);
  };

  return (
    <AuthLayout>
      <AuthHeader
        heading="Create an account. It's free!"
        subHeading="Already have an account?"
        link={{ path: paths.SIGN_IN, text: "Sign in" }}
      />

      <Formik
        initialValues={{
          password: "",
          firstName: "",
          lastName: "",
          dob: "",
          referralCode: "",
          email: "",
          phoneNumber: "",
        }}
        validationSchema={schema}
        onSubmit={onSubmit}
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
                  name="email"
                  value={values.email}
                  error={errors.email}
                  onChange={handleChange("email")}
                />
                <AuthInput
                  label="Phone Number"
                  placeholder={country.dialCode}
                  required
                  type="tel"
                  name="phoneNumber"
                  value={values.phoneNumber}
                  error={errors.phoneNumber}
                  onChange={handleChange("phoneNumber")}
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
                  />
                  <AuthInput
                    label="Referral code(optional)"
                    placeholder="Enter referral code"
                    name="referralCode"
                    value={values.referralCode}
                    error={errors.referralCode}
                    onChange={handleChange("referralCode")}
                  />
                </FlexRow>
                <CheckboxContainer>
                  <input type="checkbox" id="cancelCheckContact" />
                  <label htmlFor="cancelCheckContact">
                    By ticking this box, you do not wish to be contacted for
                    marketing information purposes or any special offer.
                  </label>
                </CheckboxContainer>
              </div>

              <AuthButton type="submit" title="Create account" />
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
