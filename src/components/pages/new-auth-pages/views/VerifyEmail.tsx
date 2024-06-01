import styled from "styled-components";
import AuthHeader from "../components/AuthHeader";
import { useEffect, useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import OtpInputCustom from "../components/OtpInput";
import AuthButton from "../components/AuthButton";
import AuthLayout, {
  ChildContainerSyles,
  ParentContainerSyles,
} from "./AuthLayout";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { paths } from "util/paths";
import { confirmAccountEmail, resendActivation } from "redux/actions/actions";
import SignupSuccess from "../components/SignupSuccess";

const VerifyEmail = () => {
  const numberOfInputs = 6;
  const { width } = useWindowDimensions();
  const [showSuccess, setShowSuccess] = useState(false);
  const history = useHistory();
  const location = useLocation();
  //https://fe-uat.sbremit.co.uk/email/confirm-account?token=AO97LB&username=thorsandy100@gmail.com

  const searchParams = new URLSearchParams(location?.search);
  const token = searchParams.get("token") || null;
  const emailFromParams = searchParams.get("username") || null;

  const [otp, setOtp] = useState(token || "");
  const isLoading = useSelector((state: any) => state.loading);

  const { username, isEmailRegistration }: any = history?.location?.state || {};

  const accountEmail = username || emailFromParams || null;

  useEffect(() => {
    if (token) {
      confirmAccountEmail(token, () => setShowSuccess(true));
    } else if (!accountEmail && !token) {
      history.replace(paths.SIGN_UP);
    } else {
      return;
    }
  }, [username, token]);

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          {showSuccess ? (
            <SignupSuccess
              setShowSuccess={setShowSuccess}
              isEmailRegistration={isEmailRegistration}
            />
          ) : (
            <>
              <AuthHeader
                heading="Verify your email"
                subHeading={`We have sent a 6 digit code to ${accountEmail}. Input the code to verify and access your account.`}
              />

              <Content>
                <form>
                  <EnterCode>Enter Code</EnterCode>

                  <OtpInputCustom
                    value={otp}
                    setValue={setOtp}
                    numberOfInputs={numberOfInputs}
                    width={width > 768 ? 80 : width > 375 ? 50 : 40}
                    height={width > 768 ? 70 : width > 375 ? 50 : 40}
                    gap={width > 1024 ? 24 : 12}
                  />

                  <ResendCode onClick={() => resendActivation(accountEmail)}>
                    Resend code
                  </ResendCode>
                </form>

                <AuthButton
                  title="Verify account"
                  onClick={() => {
                    confirmAccountEmail(otp, () => setShowSuccess(true));
                  }}
                  disabled={otp.length < numberOfInputs || isLoading}
                  isLoading={isLoading}
                />
              </Content>
            </>
          )}
        </ChildContainerSyles>
      </ParentContainerSyles>
    </AuthLayout>
  );
};

export default VerifyEmail;

const Content = styled.div`
  margin-top: 40px;

  form {
    margin-bottom: 40px;
    display: flex;
    flex-direction: column;
  }
`;

const EnterCode = styled.p`
  color: ${({ theme }) => theme.color.dark};
  font-size: ${({ theme }) => theme.font.size["xl"]};
  margin-bottom: 20px;
`;

const ResendCode = styled.p`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.font.size["xl"]};
  margin-top: 20px;
  cursor: pointer;
  align-self: flex-start;
`;
