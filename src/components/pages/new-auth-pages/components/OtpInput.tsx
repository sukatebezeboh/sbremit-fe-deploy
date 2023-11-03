import React from "react";
import OTPInput from "react-otp-input";
import styled from "styled-components";
import { theme } from "../theme";

interface IProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<IProps["value"]>>;
  numberOfInputs?: number;
  width?: number;
  height?: number;
  gap?: number;
}

const OtpInputCustom: React.FC<IProps> = ({
  value,
  setValue,
  numberOfInputs = 4,
  height,
  width,
  gap,
}) => {
  return (
    <OTPInput
      value={value}
      onChange={setValue}
      numInputs={numberOfInputs}
      inputStyle={{
        backgroundColor: "transparent",
        width: width || (numberOfInputs === 4 ? 65 : 50),
        height: height || (numberOfInputs === 4 ? 65 : 50),
        borderRadius: 8,
        borderWidth: 1,
        borderColor: theme.color.gray,
        fontSize: 24,
      }}
      containerStyle={{
        display: "flex",
        alignItems: "center",
        gap: gap || 12,
        justifyContent: "space-between",
      }}
      shouldAutoFocus
    />
  );
};

export default OtpInputCustom;

const Input = styled.input`
  outline: ${({ theme }) => `1px solid ${theme.color.gray}`};
  font-size: ${({ theme }) => theme.font.size.xl};
  &:focus {
    outline: ${({ theme }) => `2px solid ${theme.color.primary}`};
  }
`;
