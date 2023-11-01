import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { useAuthContext } from "../AuthProvider";
import AuthButton from "./AuthButton";
import { BiCheckCircle } from "react-icons/bi";
import { theme } from "../theme";
import { paths } from "util/paths";

const SignupSuccess = () => {
  const { push } = useHistory();
  const { setShowSuccess } = useAuthContext();

  return (
    <Container>
      <BiCheckCircle color={theme.color.primary} size={120} />
      <h2>Account successfully created!</h2>
      <p>Your account is verified. Proceed to login with your new details</p>
      <AuthButton
        title="Continue"
        onClick={() => {
          push(paths.SIGN_IN);
          setShowSuccess(false);
        }}
      />
    </Container>
  );
};

export default SignupSuccess;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: ${({ theme }) => theme.color.dark};
    text-align: center;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    margin-top: 10px;
  }

  p {
    text-align: center;
    font-size: ${({ theme }) => theme.font.size["2xl"]};
    font-weight: 300;
    max-width: 520px;
    margin-bottom: 40px;
    margin-top: 8px;
  }

  @media (max-width: 768px) {
    height: 100dvh;

    h2 {
      font-size: ${({ theme }) => theme.font.size["xl"]};
      margin-top: 24px;
    }

    p {
      font-size: ${({ theme }) => theme.font.size["base"]};
      margin-bottom: 20px;
    }
  }
`;
