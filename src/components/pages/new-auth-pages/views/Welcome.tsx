import styled from "styled-components";
import googleIcon from "/assets/icons/google.svg";
import facebookIcon from "/assets/icons/facebook.svg";
import { Link, useHistory } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthButton from "../components/AuthButton";
import AuthLayout, {
  ChildContainerSyles,
  ParentContainerSyles,
} from "./AuthLayout";
import { paths } from "util/paths";

const Welcome = () => {
  const history = useHistory();

  return (
    <AuthLayout>
      <ParentContainerSyles>
        <ChildContainerSyles>
          <Header>
            <AuthHeader heading="SB Remit - Send Money, No Palaver." />
          </Header>

          <Content>
            <AuthButton
              title="Sign up with email"
              onClick={() => history.push(paths.SIGN_UP)}
            />

            <OrContainer>
              <span />
              <p>or</p>
              <span />
            </OrContainer>

            <ButtonsContainer>
              <AuthButton
                title="Sign up with Google"
                icon={<img src={googleIcon} alt="google-icon" />}
              />
              <AuthButton
                title="Sign up with Facebook"
                icon={<Icon src={facebookIcon} />}
              />
            </ButtonsContainer>

            <LinkContainer>
              Already have an account? <Link to={paths.SIGN_IN}>Sign in</Link>
            </LinkContainer>
          </Content>
        </ChildContainerSyles>
      </ParentContainerSyles>
    </AuthLayout>
  );
};

export default Welcome;

const Header = styled.div`
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

const Content = styled.div`
  margin-top: 40px;

  @media (max-width: 768px) {
    margin-top: 22px;
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

const LinkContainer = styled.p`
  font-weight: 300;
  text-align: center;
  margin-top: 12px;

  a {
    color: ${({ theme }) => theme.color.primary};
    font-weight: 500;
    text-decoration: none;
  }
`;

const Icon = styled.img`
  width: 24px;
  height: 24px;
`;
