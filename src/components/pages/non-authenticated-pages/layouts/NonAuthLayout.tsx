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
  const location = useLocation();
  const [showCookieNotice, setShowCookieNotice] = useState(
    () => !CookieService.get("cookie-notice")
  );

  const isLoginOrSignUpPage = isAuthPages;

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
