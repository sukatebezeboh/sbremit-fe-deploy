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
import { CookieService } from "services/CookieService";
import styled, { css } from "styled-components";
import { paths } from "util/paths";
import CookieNotice from "./components/CookieNotice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import SiteMaintenance from "../pages/site-maintenance/SiteMaintenance";
import { useMaintenanceData } from "./nonAuthLayoutHelper";

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

  const { data: maintenanaceData } = useMaintenanceData();

  const isWebMaintenance =
    Boolean(Number(maintenanaceData?.meta?.webMaintenance)) || false;

  return (
    <ConfigProvider theme={AntdConfigSettings}>
      <NonAuthLayoutStyles>
        {isWebMaintenance ? (
          <SiteMaintenance data={maintenanaceData?.meta} />
        ) : (
          <>
            {!isLoginOrSignUpPage && <Navbar />}
            <ChildrenPageStyles $hideMarginTop={isLoginOrSignUpPage}>
              {children}
            </ChildrenPageStyles>
            {!isLoginOrSignUpPage && <Footer />}
            {showCookieNotice && (
              <CookieNotice close={() => setShowCookieNotice(false)} />
            )}
            {!isLoginOrSignUpPage && (
              <FloatButton.BackTop
                type="primary"
                icon={<ArrowUpOutlined rev={undefined} />}
              />
            )}{" "}
          </>
        )}
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
