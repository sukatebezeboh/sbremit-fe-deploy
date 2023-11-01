import AuthHeader from "../components/AuthHeader";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useHistory } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout from "./AuthLayout";
import { paths } from "util/paths";

const schema = yup.object().shape({
  email: yup.string().email().required().label("Email"),
});

const ForgotPassword = () => {
  const { push } = useHistory();

  const onSubmit = (values: object) => {
    console.log(values);
    push(paths.RESET_PASSWORD);
  };

  return (
    <AuthLayout>
      <AuthHeader
        backLink
        heading="Forgot Password"
        subHeading="We'll send a link to your email to reset your password"
      />

      <Formik
        initialValues={{ email: "" }}
        validationSchema={schema}
        onSubmit={onSubmit}
      >
        {({ errors, values, handleChange }) => (
          <Form>
            <Content>
              <div className="form">
                <AuthInput
                  label="Email Address"
                  placeholder="Enter your email address"
                  type="email"
                  name="email"
                  value={values.email}
                  error={errors.email}
                  onChange={handleChange("email")}
                />
              </div>

              <AuthButton type="submit" title="Send link" />
            </Content>
          </Form>
        )}
      </Formik>
    </AuthLayout>
  );
};

export default ForgotPassword;

const Content = styled.div`
  margin-top: 40px;

  .form {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
    gap: 28px;

    a {
      margin-top: 8px;
      color: ${({ theme }) => theme.color.primary};
      font-size: ${({ theme }) => theme.font.size.xl};
      display: block;
      text-decoration: none;
      margin-left: auto;
      width: fit-content;
    }
  }
`;
