import styled from "styled-components";
import AuthHeader from "../components/AuthHeader";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import OtpInputCustom from "../components/OtpInput";
import AuthButton from "../components/AuthButton";
import AuthLayout, { ChildContainerSyles, ParentContainerSyles } from "./AuthLayout";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "util/paths";
import { confirmAccountEmail, resendActivation } from "redux/actions/actions";
import SignupSuccess from "../components/SignupSuccess";

const VerifyEmail = () => {
  const numberOfInputs = 6;
  const { width } = useWindowDimensions();
  const [showSuccess, setShowSuccess] = useState(false);
  const history = useHistory();
  const [otp, setOtp] = useState("");
  const isLoading = useSelector((state: any) => state.loading);

  const { username }: any = history?.location?.state || {};
  if (!username) {
    history.replace(paths.SIGN_UP);
    return <></>;
  }

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          {showSuccess ? (
            <SignupSuccess setShowSuccess={setShowSuccess} />
          ) : (
            <>
              <AuthHeader
                heading="Verify your email"
                subHeading={`We have sent a 6 digit code to ${username}. Input the code to verify and access your account.`}
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

                  <ResendCode onClick={() => resendActivation(username)}>
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
