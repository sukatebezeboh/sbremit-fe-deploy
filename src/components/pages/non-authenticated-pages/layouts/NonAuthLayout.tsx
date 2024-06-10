import { ArrowUpOutlined } from "@ant-design/icons";
import { ConfigProvider, FloatButton } from "antd";
import {
  AntdConfigSettings,
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Redirect, Switch } from "react-router-dom";
import { CookieService } from "services/CookieService";
import styled, { css } from "styled-components";
import { paths } from "util/paths";
import CookieNotice from "./components/CookieNotice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

interface NonAuthLayoutProps {
  children: React.ReactNode;
}

const NonAuthLayout: React.FC<NonAuthLayoutProps> = ({ children }) => {
  const { activeCountryColor } = useSelector((state: any) => state.transfer);
  const appValues = useSelector((state: any) => state.appValues);
  const { isAuthPages } = appValues || {};
  // const [isLoginOrSignUpPage, setIsLoginOrSignUpPage] = useState(false);
  const location = useLocation();
  const [showCookieNotice, setShowCookieNotice] = useState(
    () => !CookieService.get("cookie-notice")
  );

  const isLoginOrSignUpPage =
    location.pathname.includes(paths.SIGN_IN) ||
    location.pathname.includes(paths.SIGN_UP) ||
    location.pathname.includes(paths.EMAIL_REGISTRATION) ||
    location.pathname.includes(paths.FORGET_PASSWORD) ||
    location.pathname.includes(paths.RESET_PASSWORD) ||
    location.pathname.includes(paths.VERIFY_PASSWORD_RESET) ||
    location.pathname.includes(paths.VERIFY_PASSWORD_RESET) ||
    location.pathname.includes(paths.PASSWORD_RESET_EMAIL) ||
    location.pathname.includes(paths.CONFIRM_ACCOUNT_EMAIL);

  return (
    <ConfigProvider theme={AntdConfigSettings}>
      <NonAuthLayoutStyles>
        {!isLoginOrSignUpPage && <Navbar />}

        <ChildrenPageStyles $hideMarginTop={isLoginOrSignUpPage}>
          {children}
        </ChildrenPageStyles>

        {!isLoginOrSignUpPage && <Footer />}

        {/* cookie notice */}
        {showCookieNotice && (
          <CookieNotice close={() => setShowCookieNotice(false)} />
        )}

        {!isLoginOrSignUpPage && (
          <FloatButton.BackTop
            type="primary"
            icon={<ArrowUpOutlined rev={undefined} />}
          />
        )}

        {/*301 Redirects: Old paths redirecting to new paths */}
        <Switch>
          <Redirect from={paths.CONTACT} to={paths.HELP} exact />
          <Redirect from={paths.SUPPORT} to={paths.HELP} exact />
          <Redirect from={paths.LEGAL} to={paths.TERMS} />
          <Redirect from={paths.TUTORIALS} to={paths.HOW_IT_WORKS} />
          <Redirect from={paths.CAMEROON} to={paths.HOW_IT_WORKS} />
          <Redirect from={paths.KENYA} to={paths.HOW_IT_WORKS} />
          <Redirect from={paths.UGANDA} to={paths.HOW_IT_WORKS} />
          <Redirect from={paths.TANZANIA} to={paths.HOW_IT_WORKS} />
        </Switch>
      </NonAuthLayoutStyles>
    </ConfigProvider>
  );
};

export default NonAuthLayout;

const NonAuthLayoutStyles = styled.div`
  display: flex;
  flex-direction: column;
  /* gap: 24px; */
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;
  overflow-x: hidden;

  background: ${Colors.bgwhite};
`;

const ChildrenPageStyles = styled.main<{ $hideMarginTop: boolean }>`
  ${(props) =>
    !props.$hideMarginTop &&
    css`
      margin-top: 118px;
      margin-bottom: 120px;
    `}

  @media (max-width: ${Breakpoint.xl}) {
    ${(props) =>
      !props.$hideMarginTop &&
      css`
        margin-top: 105px;
        margin-bottom: 90px;
      `}
  }

  @media (max-width: ${Breakpoint.md}) {
    ${(props) =>
      !props.$hideMarginTop &&
      css`
        margin-top: 86px;
        margin-bottom: 60px;
      `}
  }
`;
