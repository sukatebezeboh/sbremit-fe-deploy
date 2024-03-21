import { ArrowUpOutlined } from "@ant-design/icons";
import { ConfigProvider, FloatButton } from "antd";
import {
  AntdConfigSettings,
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { setIsMobileView } from "redux/actions/actions";
import { CookieService } from "services/CookieService";
import styled from "styled-components";
import { paths } from "util/paths";
import CookieNotice from "./components/CookieNotice";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";

interface NonAuthLayoutProps {
  children: React.ReactNode;
}

const NonAuthLayout: React.FC<NonAuthLayoutProps> = ({ children }) => {
  const { activeCountryColor } = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const location = useLocation();
  const [showCookieNotice, setShowCookieNotice] = useState(
    () => !CookieService.get("cookie-notice")
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    dispatch(setIsMobileView(mediaQuery.matches));

    const handleMediaQueryChange = (event: any) => {
      dispatch(setIsMobileView(event.matches));
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  const isLoginOrSignUpPage =
    location.pathname.includes(paths.SIGN_IN) ||
    location.pathname.includes(paths.SIGN_UP);

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
  margin-top: ${(props) => (props.$hideMarginTop ? "0px" : "118px")};
  margin-bottom: 120px;

  @media (max-width: ${Breakpoint.xl}) {
    margin-top: ${(props) => (props.$hideMarginTop ? "0px" : "105px")};
    margin-bottom: 90px;
  }

  @media (max-width: ${Breakpoint.md}) {
    margin-top: ${(props) => (props.$hideMarginTop ? "0px" : "86px")};
    margin-bottom: 60px;
  }

  /* @media (max-width: ${Breakpoint.sm}) {
      margin-top: ${(props) => (props.$hideMarginTop ? "0px" : "86px")};
    } */
`;
