import React, {
  Dispatch,
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  LegacyRef,
  SetStateAction,
  useState,
} from "react";
import styled from "styled-components";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import SelectCountry from "./SelectCountry";
import type { Country } from "../utils/countries";
import { theme } from "../theme";

type Props = {
  label: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  error?: string;
  name: string;

  countryInfo?: {
    country: Country;
    setCountry: Dispatch<SetStateAction<Country>>;
  };
} & InputHTMLAttributes<HTMLInputElement>;

const AuthInput = React.forwardRef(
  (props: Props, ref: LegacyRef<HTMLInputElement>) => {
    const {
      label,
      type,
      placeholder,
      required,
      error,
      countryInfo,
      name,
      ...otherProps
    } = props;
    const [showPassword, setShowPassword] = useState(false);

    return (
      <Container>
        <Label>
          {label}
          {required && <span>*</span>}{" "}
        </Label>
        <InputContainer>
          {type === "tel" && countryInfo && (
            <SelectCountry
              {...{
                country: countryInfo?.country,
                setCountry: countryInfo?.setCountry,
              }}
            />
          )}
          <Input
            {...otherProps}
            show_error={error}
            type={showPassword ? "text" : type}
            placeholder={placeholder}
            name={name}
          />
          <PasswordMask
            className="password-mask"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {type === "password" &&
              (!showPassword ? (
                <AiOutlineEyeInvisible size={24} color={theme.color.gray2} />
              ) : (
                <AiOutlineEye size={24} color={theme.color.gray2} />
              ))}
          </PasswordMask>
        </InputContainer>
        {error && <Error>{error}</Error>}
      </Container>
    );
  }
);

export default AuthInput;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: ${({ theme }) => theme.color.dark};
  font-size: ${({ theme }) => theme.font.size.xl};
  font-weight: 300;

  span {
    color: ${({ theme }) => theme.color.danger};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.base};
  }
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;

  .password-mask {
    position: absolute;
    right: 28px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

const Input = styled.input<{ show_error: string | undefined }>`
  border-radius: 8px;
  border: ${({ theme }) => `1px solid ${theme.color.gray}`};
  padding: 24px;
  font-size: ${({ theme }) => theme.font.size.xl};
  width: 100%;
  font-weight: 300;
  outline: ${({ theme, show_error }) =>
    show_error ? `1px solid ${theme.color.danger}` : "0"};

  &:focus {
    outline: ${({ theme }) => "1px solid " + theme.color.primary};
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.base};
    padding: 16px;
  }
`;

const PasswordMask = styled.span`
  cursor: pointer;
`;

const Error = styled.span`
  color: ${({ theme }) => theme.color.danger};

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.sm};
  }
`;
