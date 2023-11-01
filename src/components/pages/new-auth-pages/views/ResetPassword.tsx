import AuthHeader from "../components/AuthHeader";
import styled from "styled-components";
import * as yup from "yup";
import { Form, Formik } from "formik";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout from "./AuthLayout";
import { paths } from "util/paths";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  password: yup.string().min(6).max(255).required().label("Password"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .label("Confirm Password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const ResetPasssword = () => {
  const { push } = useHistory();
  const onSubmit = (data: object) => {
    console.log(data);
    push(paths.PASSWORD_EMAIL_RESET);
  };

  return (
    <AuthLayout>
      <AuthHeader
        backLink
        heading="Reset Password"
        subHeading="We'll send a link to your email to reset your password"
      />

      <Formik
        initialValues={{ password: "", confirmPassword: "" }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <Content>
              <div className="form">
                <AuthInput
                  label="Password"
                  placeholder="Choose a new password"
                  type="password"
                  name="password"
                  value={values.password}
                  error={errors.password}
                  onChange={handleChange("password")}
                />
                <AuthInput
                  label="Confirm Password"
                  placeholder="Confirm password"
                  type="password"
                  name="confirmPassword"
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                  onChange={handleChange("confirmPassword")}
                />
              </div>
              <AuthButton type="submit" title="Save password" />
            </Content>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ResetPasssword;

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
