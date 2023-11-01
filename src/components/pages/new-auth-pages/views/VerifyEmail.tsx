import styled from "styled-components";
import AuthHeader from "../components/AuthHeader";
import { useState } from "react";
import useWindowDimensions from "../hooks/useWindowDimensions";
import OtpInputCustom from "../components/OtpInput";
import { useAuthContext } from "../AuthProvider";
import AuthButton from "../components/AuthButton";
import AuthLayout from "./AuthLayout";

const VerifyEmail = () => {
  const { width } = useWindowDimensions();
  const { setShowSuccess } = useAuthContext();
  const [otp, setOtp] = useState("");
  const numberOfInputs = 5;

  return (
    <AuthLayout>
      <AuthHeader
        heading="Verify your email"
        subHeading="We have sent a 5 digit code to john***@doedoe.com. Input the code to verify and access your account."
      />

      <Content>
        <form>
          <EnterCode>Enter Code</EnterCode>

          <OtpInputCustom
            value={otp}
            setValue={setOtp}
            numberOfInputs={numberOfInputs}
            width={width > 1024 ? 120 : width > 768 ? 70 : 50}
            height={width > 1024 ? 105 : width > 768 ? 70 : 50}
            gap={width > 1024 ? 35 : width > 768 ? 24 : 12}
          />

          <ResendCode>Resend code</ResendCode>
        </form>

        <AuthButton
          title="Verify account"
          disabled={otp.length < numberOfInputs}
          onClick={() => setShowSuccess(true)}
        />
      </Content>
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

const ResendCode = styled.span`
  color: ${({ theme }) => theme.color.primary};
  font-size: ${({ theme }) => theme.font.size["xl"]};
  margin-top: 20px;
  cursor: pointer;
`;
