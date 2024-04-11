import { Link, useLocation } from "react-router-dom";
import { ReactNode, useEffect } from "react";
import styled from "styled-components";
import Provider from "../Provider";
import { paths } from "util/paths";
import { useDispatch, useSelector } from "react-redux";
import { APP_VALUES } from "redux/actionTypes";

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const appValues = useSelector((state: any) => state.appValues);
  const location = useLocation();

  const routesToShowImg: string[] = [paths.SIGN_IN];
  const showBgImage = routesToShowImg.includes(location.pathname);

  //mark teritory to manage nav and footer
  useEffect(() => {
    dispatch({
      type: APP_VALUES,
      payload: { ...appValues, isAuthPages: true },
    });
  }, []);

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
  /* min-height: 100vh;
  height: fit-content; */
  height: 100vh;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100vw;

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
  align-items: flex-end;
  //padding: 1.5rem;
  width: 100%;

  @media (max-width: 768px) {
    padding: 0 1.25rem 1.5rem;
    align-items: center;
    margin-top: ${({ display_on_mobile }) =>
      display_on_mobile ? "0" : "46px"};
  }
`;

const Container = styled.div`
  /* max-width: 754px;
  width: 100%; */
  flex: 1;
  width: 100%;
  min-height: fit-content;
  padding-inline: 2px;
  overflow-y: auto;
  padding: 1.5rem 80px;

  @media (max-width: 768px) {
    padding: 1.5rem 24px;
  }
`;

export const ParentContainerSyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  display: flex;
  align-items: flex-end;
  @media (max-width: 768px) {
    align-items: center;
  }
`;

export const ChildContainerSyles = styled.div`
  width: 80%;
  margin: 100px 0px;
  @media (max-width: 768px) {
    width: 100%;
    margin: 24px 0px;
  }
`;
