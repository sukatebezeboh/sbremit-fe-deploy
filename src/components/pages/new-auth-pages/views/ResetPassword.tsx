import AuthHeader from "../components/AuthHeader";
import styled from "styled-components";
import * as yup from "yup";
import { Form, Formik } from "formik";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout, { ChildContainerSyles, ParentContainerSyles } from "./AuthLayout";
import { resetPasswordAction } from "redux/actions/actions";
import { useSelector } from "react-redux";
import { paths } from "util/paths";
import { useHistory } from "react-router-dom";

const schema = yup.object({
  password: yup.string().min(6).max(255).required().label("Password"),
  confirmation: yup
    .string()
    .required("Confirm password is required")
    .label("Confirm Password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

const ResetPasssword = () => {
  const isSubmitting = useSelector((state: any) => state.submitting);
  const { push } = useHistory();
  const handleSendLink = () => push({ pathname: paths.SIGN_IN });
  const onSubmit = (values: any) => {
    resetPasswordAction(values, "reset", handleSendLink);
  };

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          <AuthHeader
            backLink
            heading="Reset Password"
            subHeading="We'll send a link to your email to reset your password"
          />

          <Formik
            initialValues={{ password: "", confirmation: "" }}
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
                      name="confirmation"
                      value={values.confirmation}
                      error={errors.confirmation}
                      onChange={handleChange("confirmation")}
                    />
                  </div>
                  <AuthButton
                    type="submit"
                    title="Save password"
                    isLoading={isSubmitting}
                    disabled={isSubmitting}
                  />
                </Content>
              </Form>
            )}
          </Formik>
        </ChildContainerSyles>
      </ParentContainerSyles>
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
