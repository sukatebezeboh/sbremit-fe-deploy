import React from "react";
import styled from "styled-components";
import { PageResponsiveWidth } from "../global-styles/styles";
import { AppLinks } from "./AppLinks";
import { H3 } from "../global-styles/typogarphy";
import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import { useSelector } from "react-redux";

const BannerBg = "/assets/images/end_cta_banner_bg.svg";
const MobileAppImg1 = "/assets/images/mobile_app_home_1.png";
const MobileAppImg2 = "/assets/images/mobile_app_home_2.png";

const EndBanner = () => {
  const isMobile = useSelector((state: any) => state.isMobileView);
  return (
    <div>
      <EndBannerStyles>
        <div className="_left_content">
          <H3 $large>Get Started with SB Remit</H3>
          <AppLinks isDark={isMobile} />
        </div>
        <div className="_right_content">
          <img src={MobileAppImg1} alt="SBremit mobile app screenshot" />
          <img src={MobileAppImg2} alt="SBremit mobile app screenshot" />
        </div>
      </EndBannerStyles>
    </div>
  );
};

export default EndBanner;

const EndBannerStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  background-image: ${`url(${BannerBg})`};
  background-size: cover;
  /* background-position: top; */
  background-position: center center;
  background-repeat: no-repeat;

  height: 516px;
  border-radius: 25px;
  padding: 0px 66px;

  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 66px;

  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: ${Breakpoint.xl}) {
    height: auto;
    padding: 66px;

    justify-content: center;
  }

  @media (max-width: ${Breakpoint.md}) {
    padding: 46px 20px;
  }

  @media (max-width: ${Breakpoint.xs}) {
    padding: 38px 10px;
    border-radius: 12px;
  }

  ._left_content {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: ${Breakpoint.md}) {
      width: 100%;
    }

    h3 {
      width: 294px;
      color: #fff;

      @media (max-width: ${Breakpoint.xl}) {
        text-align: center;
        align-self: center;
      }
      @media (max-width: ${Breakpoint.sm}) {
        width: 180px;
      }
    }
  }
  ._right_content {
    display: flex;
    gap: 20px;
    /* position: relative; */
    @media (max-width: ${Breakpoint.xl}) {
      display: none;
    }

    img {
      margin-top: 40px;
      margin-bottom: 0px;
      @media (max-width: 1440px) {
        width: 50%;

        margin-top: 100px;
        margin-bottom: 0px;
      }
    }
    img:last-child {
      margin-top: 0px;
      margin-bottom: 40px;

      @media (max-width: 1440px) {
        margin-top: 0px;
        margin-bottom: 100px;
      }
    }
  }
`;
