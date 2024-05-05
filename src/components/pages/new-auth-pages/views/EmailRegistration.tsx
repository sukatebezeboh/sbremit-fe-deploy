import { Form, Formik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "util/paths";
import * as yup from "yup";
import AuthButton from "../components/AuthButton";
import AuthHeader from "../components/AuthHeader";
import AuthInput from "../components/AuthInput";
import AuthLayout, {
  ChildContainerSyles,
  ParentContainerSyles,
} from "./AuthLayout";
import { ContentStyles } from "./Login";
import { useState } from "react";
import { updateEmailAddress } from "redux/actions/actions";
import styled from "styled-components";

const schema = yup.object({
  username: yup.string().required().label("Email"),
});

interface LocationState {
  data: any;
}

export default function EmailRegistration() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const user = (location.state as LocationState)?.data;
  const [submitting, setSubmitting] = useState(false);
  const { firstName, lastName, location_country } = user?.profile || {};

  const intitialValues = {
    username: "",
    userid: user?.id,
    firstName: firstName,
    lastName: lastName,
    location_country: location_country,
  };

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          <AuthHeader
            heading="Register Email Address"
            subHeading="Already registered your email?"
            link={{ path: paths.SIGN_IN, text: "Login" }}
          />

          <UpdateMessageStyles>
            <p>
              For enhanced security and convenience, we're updating our login
              method. You'll now log in using your email{" "}
              <strong>instead of</strong> your phone number. Please register your
              email address below to continue accessing your account.
            </p>
          </UpdateMessageStyles>

          <Formik
            initialValues={intitialValues}
            validationSchema={schema}
            onSubmit={(values) => {
              setSubmitting(true);
              dispatch(
                updateEmailAddress(values, history, () => setSubmitting(false))
              );
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <ContentStyles>
                  <div className="form">
                    <AuthInput
                      label="Email Address"
                      placeholder="Enter your email address"
                      type="email"
                      name="username"
                      value={values.username}
                      errors={errors}
                      touched={touched}
                      onChange={handleChange("username")}
                    />
                  </div>

                  <AuthButton
                    type="submit"
                    title="Submit"
                    disabled={submitting}
                    isLoading={submitting}
                  />
                </ContentStyles>
              </Form>
            )}
          </Formik>
        </ChildContainerSyles>
      </ParentContainerSyles>
    </AuthLayout>
  );
}

const UpdateMessageStyles = styled.div`
  p {
    line-height: 150%;
    color: ${({ theme }) => theme.color.dark};
    font-size: ${({ theme }) => theme.font.size["xl"]};
    font-weight: 300;
    margin: 0;

    @media (max-width: 768px) {
      font-size: ${({ theme }) => theme.font.size.base};
    }
  }
  margin-top: 28px;
  background: #33333314;
  padding: 12px;
`;
