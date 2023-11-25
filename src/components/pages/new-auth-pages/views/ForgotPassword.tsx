import AuthHeader from "../components/AuthHeader";
import styled from "styled-components";
import { Form, Formik } from "formik";
import * as yup from "yup";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout, {
  ChildContainerSyles,
  ParentContainerSyles,
} from "./AuthLayout";
import { paths } from "util/paths";
import { resetPasswordAction } from "redux/actions/actions";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const schema = yup.object().shape({
  username: yup.string().email().required().label("Email"),
});

const ForgotPassword = () => {
  const isSubmitting = useSelector((state: any) => state.submitting);
  const history = useHistory();

  const onSubmit = (values: any) => {
    const newValue = { ...values, type: "EMAIL" };
    resetPasswordAction(newValue, "email", () => {
      history.push({
        pathname: paths.VERIFY_PASSWORD_RESET,
        state: { username: values?.username },
      });
    });
  };

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          <AuthHeader
            backLink
            heading="Forgot Password"
            subHeading="We'll send a link to your email to reset your password"
          />

          <Formik
            initialValues={{ username: "" }}
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
                      name="username"
                      value={values.username}
                      error={errors.username}
                      onChange={handleChange("username")}
                    />
                  </div>

                  <AuthButton
                    type="submit"
                    title="Send link"
                    disabled={isSubmitting === paths.RESET_PASSWORD}
                    isLoading={isSubmitting === paths.RESET_PASSWORD}
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
