import ButtonLoader from "components/modules/button-loader/ButtonLoader";
import { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  title: string;
  icon?: JSX.Element;
  isLoading?: boolean;
}

const AuthButton = ({ title, icon, isLoading, ...otherProps }: Props) => {
  return (
    <Container is_auth_button={icon ? "true" : ""} {...otherProps}>
      {icon}
      <span>{isLoading ? <ButtonLoader /> : title}</span>
    </Container>
  );
};

export default AuthButton;

const Container = styled.button<{ is_auth_button: string }>`
  width: 100%;
  /* padding: 24px; */
  height: 70px;
  background-color: ${({ theme, is_auth_button: isAuthButton }) =>
    isAuthButton ? "transparent" : theme.color.primary};
  color: ${({ is_auth_button: isAuthButton, theme }) =>
    isAuthButton ? theme.color.black : "#fff"};
  border-radius: 8px;
  font-size: ${({ theme }) => theme.font.size.lg};
  cursor: pointer;
  border: ${({ is_auth_button, theme }) =>
    is_auth_button ? `1px solid ${theme.color.gray}` : "0px"};

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  transition: all 300ms ease;

  &:hover {
    opacity: ${({ is_auth_button }) => (is_auth_button ? 1 : 0.6)};
    border-color: ${({ is_auth_button, theme }) =>
      is_auth_button ? "#888" : theme.color.gray};
  }

  &:disabled {
    background-color: ${({ theme }) => theme.color.gray};
    color: ${({ theme }) => theme.color.dark};
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    font-size: ${({ theme }) => theme.font.size.base};
    /* padding: 20px; */
    height: 59px;
  }
`;
