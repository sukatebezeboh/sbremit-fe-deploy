import styled from "styled-components";
import * as yup from "yup";
import { Form, Formik } from "formik";
import AuthHeader from "../components/AuthHeader";
import { Link, Redirect, useHistory } from "react-router-dom";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";
import AuthLayout, {
  ChildContainerSyles,
  ParentContainerSyles,
} from "./AuthLayout";
import { paths } from "util/paths";
import { useDispatch, useSelector } from "react-redux";
import { signInAction } from "redux/actions/actions";
import { Tabs } from "antd";

const schema = yup.object({
  username: yup.string().required().label("Email/Phone"),
  password: yup.string().min(6).max(255).required().label("Password"),
});

const Login = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();
  const history = useHistory();
  const submitting = useSelector((state: any) => state.submitting);
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  if (isAuthenticated) return <Redirect to={paths.DASHBOARD} />;

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          <AuthHeader
            heading="Welcome back!"
            subHeading="New to SBRemit?"
            link={{ path: paths.SIGN_UP, text: "Create an account" }}
          />

          <Formik
            initialValues={{ password: "", username: "" }}
            validationSchema={schema}
            onSubmit={(values) => {
              dispatch(signInAction(values, history));
            }}
          >
            {({ errors, touched, values, handleChange }) => (
              <Form>
                <ContentStyles>
                  <div className="form">
                    <AuthInput
                      label="Email Address/Phone number"
                      placeholder="Enter your email address or phone number"
                      // type="email"
                      name="username"
                      value={values.username}
                      errors={errors}
                      touched={touched}
                      onChange={handleChange("username")}
                    />
                    <div>
                      <AuthInput
                        label="Password"
                        placeholder="Minimum of 8 characters"
                        type="password"
                        name="password"
                        value={values.password}
                        errors={errors}
                        touched={touched}
                        onChange={handleChange("password")}
                      />
                      <Link to={paths.FORGET_PASSWORD}>Forgot Password?</Link>
                    </div>
                  </div>

                  <AuthButton
                    type="submit"
                    title="Sign in"
                    disabled={submitting}
                    isLoading={submitting}
                  />

                  <OrContainer>
                    <span />
                    <p>or</p>
                    <span />
                  </OrContainer>

                  <ButtonsContainer>
                    <AuthButton
                      title="Sign up with Email"
                      icon={
                        <Icon
                          src="/assets/icons/email-black.svg"
                          alt="emailIcon"
                        />
                      }
                      onClick={() => push(paths.SIGN_UP)}
                    />
                    {/* <AuthButton
                  title="Sign up with Google"
                  icon={
                    <Icon src="/assets/icons/google.svg" alt="googleIcon" />
                  }
                />
                <AuthButton
                  title="Sign up with Facebook"
                  icon={
                    <Icon
                      src="/assets/icons/facebook-blue2.svg"
                      alt="facebookIcon"
                    />
                  }
                /> */}
                  </ButtonsContainer>
                </ContentStyles>
              </Form>
            )}
          </Formik>
        </ChildContainerSyles>
      </ParentContainerSyles>
    </AuthLayout>
  );
};

export default Login;

export const ContentStyles = styled.div`
  margin-top: 40px;
  width: 100%;
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

  @media (max-width: 768px) {
    .form {
      gap: 20px;

      a {
        font-size: ${({ theme }) => theme.font.size.base};
      }
    }
  }
`;

const OrContainer = styled.div`
  display: flex;
  gap: 32px;
  align-items: center;
  margin: 20px 16px;

  p {
    color: #000;
    font-style: italic;
    font-weight: 300;
  }

  span {
    flex: 1;
    height: 1px;
    background-color: ${({ theme }) => theme.color.gray};
  }
`;

const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    gap: 12px;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
