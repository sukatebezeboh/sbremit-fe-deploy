import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import { Route, Switch, useLocation } from "react-router-dom";
import styled from "styled-components";
import { paths } from "util/paths";
import {
  PageResponsiveWidth,
  PageWrapperStyles,
} from "../../global-styles/styles";
import { H3, Paragraph } from "../../global-styles/typogarphy";
import { privacyPolicyData } from "./data/PrivacyPolicyData";
import { termAndConditionsData } from "./data/TernsAndConditionData";
import { ContentItems } from "./pages/ContentItems";
import { cookiePolicyData } from "./data/CookiePolicyData";

interface HeaderDataProps {
  title: string;
  subHeading: string;
}
const getHeaderData = (pathname: string): HeaderDataProps | any => {
  if (pathname.includes(paths.PRIVACY_POLICY)) {
    return {
      title: "Privacy Policy",
      subHeading:
        "Statements disclosing how SB Remit gathers, uses, discloses and manages your data.",
    };
  } else if (pathname.includes(paths.TERMS)) {
    return {
      title: "Terms and Conditions",
      subHeading: "The legal agreements between you and SBremit",
    };
  } else if (pathname.includes(paths.COOKIE_POLICY)) {
    return {
      title: "Cookie Policy",
      subHeading:
        "Statement disclosing how SBremit gathers, uses, discloses, and manages your cookies",
    };
  }

  return;
};

const LegalsLayout = () => {
  const location = useLocation();

  return (
    <PageWrapperStyles $hideMarginTop>
      <LegalsLayoutHeaderStyles>
        <HeaderContentStyles>
          <H3>{getHeaderData(location.pathname)?.title}</H3>
          <Paragraph>{getHeaderData(location.pathname)?.subHeading}</Paragraph>
        </HeaderContentStyles>
      </LegalsLayoutHeaderStyles>

      <LegalsLayoutContentStyles>
        <Switch>
          <Route
            path={paths.PRIVACY_POLICY}
            render={() => <ContentItems data={privacyPolicyData} />}
            exact={true}
          />
          <Route
            path={paths.TERMS}
            render={() => <ContentItems data={termAndConditionsData} />}
            exact
          />
          <Route
            path={paths.COOKIE_POLICY}
            render={() => <ContentItems data={cookiePolicyData} />}
            exact
          />
        </Switch>
      </LegalsLayoutContentStyles>
    </PageWrapperStyles>
  );
};

export default LegalsLayout;

const LegalsLayoutHeaderStyles = styled.div`
  background: #fafafa;
  width: inherit;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderContentStyles = styled(PageResponsiveWidth)`
  padding: 63px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 16px;

  @media (max-width: ${Breakpoint.sm}) {
    padding: 43px 0px;
    gap: 14px;
  }

  h3 {
    background: linear-gradient(98deg, #007b5d 22.72%, #ffe62e 78.19%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  p {
    color: #1e1e1e;
    width: 686px;
    @media (max-width: ${Breakpoint.md}) {
      width: 100%;
    }
  }
`;

const LegalsLayoutContentStyles = styled(PageResponsiveWidth)`
  margin-top: -20px;
`;
