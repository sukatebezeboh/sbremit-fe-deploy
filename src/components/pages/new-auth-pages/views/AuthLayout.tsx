import { Link, useLocation } from "react-router-dom";
import { ReactNode } from "react";
import styled from "styled-components";
import Provider from "../Provider";
import { paths } from "util/paths";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const location = useLocation();

  const routesToShowImg: string[] = [paths.SIGN_IN];
  const showBgImage = routesToShowImg.includes(location.pathname);

  return (
    <Provider>
      <Wrapper>
        <ImageContainer
          style={{ backgroundImage: "url(/assets/bg/new-auth-bg.svg)" }}
          display_on_mobile={showBgImage ? "true" : ""}
        >
          <Link to={paths.LANDING}>
            <img src="/assets/main-logo.svg" alt="logo" />
          </Link>
        </ImageContainer>

        <Content display_on_mobile={showBgImage ? "true" : ""}>
          <Container>{children}</Container>
        </Content>
      </Wrapper>
    </Provider>
  );
};

export default AuthLayout;

const Wrapper = styled.div`
  min-height: 100vh;
  height: fit-content;
  display: flex;

  @media (max-width: 768px) {
    height: auto;
    flex-direction: column;
  }
`;

const ImageContainer = styled.div<{ display_on_mobile: string }>`
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  width: 35%;

  img {
    display: block;
    margin-inline: auto;
    width: 205px;
    height: 40px;
    margin-top: 70px;
  }

  @media (max-width: 768px) {
    display: ${({ display_on_mobile }) =>
      display_on_mobile ? "block" : "none"};
    width: 100%;
    height: 300px;
    margin-bottom: 20px;
  }
`;

const Content = styled.div<{ display_on_mobile: string }>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;

  @media (max-width: 768px) {
    padding: 0 1.25rem 1.5rem;
    margin-top: ${({ display_on_mobile }) =>
      display_on_mobile ? "0" : "46px"};
  }
`;

const Container = styled.div`
  max-width: 754px;
  width: 100%;
  min-height: fit-content;
  padding-inline: 2px;
  overflow-y: auto;
`;
