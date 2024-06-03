import { Button } from "antd";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H2,
  H3,
  H4,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import { useEffect, useState } from "react";
import { IoRocket } from "react-icons/io5";
import { useHistory } from "react-router";
import styled, { css } from "styled-components";
import { paths } from "util/paths";
import { getAllUniqueCurrencies } from "./hero/HeroHelper";

const SBMobileApp = "/assets/images/app_default_image.png";
const TwinklingStars = "/assets/images/twinkling_stars.png";
const BannerSvg = "/assets/images/promotions_bg_svg.svg";

interface PromotionsCountryData {
  ctaText: string;
  p1Text: string;
  p2Text: string;
  tandc: string;
  currency: string;
}

const Promotions = () => {
  return (
    <PromotionsStyles>
      <H2 className="_mobile_device_header">Special deals for our customers</H2>
      <LeftContent />
      <RightContent />
    </PromotionsStyles>
  );
};

export default Promotions;

const LeftContent = () => {
  return (
    <LeftContentStyles $bgImage={BannerSvg}>
      <img src={SBMobileApp} alt="screenshots of sbremit mobile app" />
      <H2>Special deals for our special customers.</H2>
    </LeftContentStyles>
  );
};

const RightContent = () => {
  const history = useHistory();
  const { PayinCountries } = userAppValues();
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [arrayOfPointPromotions, setArrayOfPointPromotions] = useState<
    PromotionsCountryData[]
  >([]);

  const countries = getAllUniqueCurrencies(PayinCountries);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveIndex((prev) => (prev < countries.length - 1 ? prev + 1 : 0));
    }, 4000);

    return () => clearInterval(intervalId);
  }, []);

  // const symbolBeforeCurrencies = new Set(["€", "$", "£"]);

  useEffect(() => {
    const arr: PromotionsCountryData[] = countries.map((country) => {
      return {
        ctaText: `GET ${country.currency} 5`,
        p1Text: `${country.currency} 5 = 500pts off your next transfer`,
        p2Text: "Points are accumulated for every successful transfer.",
        tandc: `MIN. SPEND ${country.currency} 250. T & C’s APPLY`,
        currency: country.currency,
      };
    });

    setArrayOfPointPromotions(arr);
  }, []);

  return (
    <RightContentStyles
      $bgImage={TwinklingStars}
      $bgImageSMdevice={BannerSvg}
      $activeIndex={activeIndex}
    >
      <div className="_background">
        <div className="_content_1">
          <H3>TRANSFER. EARN POINTS.</H3>

          <Button type="primary" onClick={() => history.push(paths.SIGN_IN)}>
            <Paragraph>
              {arrayOfPointPromotions[activeIndex]?.ctaText}
            </Paragraph>
          </Button>
          <br />
          <Paragraph>{arrayOfPointPromotions[activeIndex]?.p1Text}</Paragraph>
          <Paragraph>{arrayOfPointPromotions[activeIndex]?.p2Text}</Paragraph>
          <H4 className="_italic" $small>
            {arrayOfPointPromotions[activeIndex]?.tandc}
          </H4>
        </div>
      </div>
      <div className="_background bg_content_2">
        <div className="_content_2">
          <div className="_enjoy">
            <Paragraph $small>ENJOY</Paragraph>
            <Paragraph className="_freebies">ZERO TRANSACTION FEES</Paragraph>
            <Paragraph className="_freebies">
              EXCELLENT EXCHANGE RATES
            </Paragraph>
            <Paragraph className="_freebies">& NO HIDDEN COSTS</Paragraph>
          </div>

          <div className="_rocket">
            {/* <img src={RocketPng} alt="Rocket icon " /> */}
            <IoRocket className="_icon" />
            <Paragraph>
              Choose between <span>mobile money</span>,{" "}
              <span>bank transfer</span>, or <span>cash pickup</span> for
              flexible delivery.
            </Paragraph>
          </div>
          {/* <H3>
            5 {arrayOfPointPromotions[activeIndex]?.currency} OFF FOR EVERY FIVE
            TRANSFERS YOU DO{" "}
          </H3>
          <H4>
            When you spend over {arrayOfPointPromotions[activeIndex]?.currency}{" "}
            250 for the 5 Transfers
          </H4>
          {/* <H4 className="_tanku5">
            Use code <b>TANKU5</b> when you login
          </H4> 
          <Button type="primary" onClick={() => history.push(paths.SIGN_IN)}>
            <Paragraph>Start transfer</Paragraph>
          </Button> */}
        </div>
      </div>
    </RightContentStyles>
  );
};

const PromotionsStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  display: flex;
  justify-content: space-between;
  gap: 32px;

  height: 1040px;
  overflow: hidden;
  @media (max-width: ${Breakpoint.xl}) {
    height: 650px;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: ${Breakpoint.md}) {
    height: auto;
  }
  ._mobile_device_header {
    text-align: center;
    margin: 24px 0px;

    color: ${Colors.textColor3};
    display: none;
    @media (max-width: ${Breakpoint.xl}) {
      display: flex;
    }
    @media (max-width: ${Breakpoint.md}) {
      width: 400px;
      margin: 8px;
    }

    @media (max-width: ${Breakpoint.sm}) {
      width: 250px;
    }
  }
`;
const LeftContentStyles = styled.div<{ $bgImage: string }>`
  width: 50%;
  height: 100%;

  border-radius: 16px;
  background: #fafafa;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 70px;

  background-image: ${(props) => `url(${props.$bgImage})`};
  background-size: 100%;
  /* background-position: top; */
  background-position: center bottom 120% !important;
  background-repeat: no-repeat;

  @media (max-width: ${Breakpoint.xl}) {
    display: none;
  }

  img {
    width: auto;
    height: auto;
  }

  h2 {
    text-align: center;
    width: 80%;
  }
`;
const RightContentStyles = styled.div<{
  $bgImage: string;
  $bgImageSMdevice: string;
  $activeIndex: number;
}>`
  height: 100%;
  width: 50%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  gap: 28px;

  @media (max-width: ${Breakpoint.xl}) {
    width: 100%;
    gap: 24px;
    flex-direction: row;
  }

  @media (max-width: ${Breakpoint.md}) {
    flex-direction: column;
    width: 100%;
    box-sizing: border-box;
  }

  ._background{
    width: 100%;
    height: 49%;
    flex-shrink: 0;

    @media (max-width: ${Breakpoint.xl}) {
      width: 48%;
      height: 100%;
      padding: 32px 42px;
    }

    @media (max-width: ${Breakpoint.md}) {
      width: 100%;
      gap: 0px;
      height: 420px;
    }

    border-radius: 16px;
    overflow: hidden;
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 8px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background: linear-gradient(180deg, #f0d76d 13.76%, #d3d589 100%);

      width: 100%;
      height: 100%;

      /* @media (max-width: ${Breakpoint.xl}) {
        background: #fafafa;
      } */
    }

    &::after {
      content: "";
      background-image: ${(props) => `url(${props.$bgImage})`};
      ${(props) =>
        css`
          transform: rotate(${props.$activeIndex * 30}deg)
            scale(calc(0.8 + (${props.$activeIndex} / 9)));
        `};

      background-size: cover;
      background-position: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 0;

      @media (max-width: ${Breakpoint.xl}) {
        background-image: ${(props) => `url(${props.$bgImageSMdevice})`};
        background-size: 150%;
        transform: rotate(0deg) scale(1);
      }
    }

    ._content_1,
    ._content_2 {
      z-index: 1;
      color: ${Colors.textColor3};
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;

      Button {
        width: 250px;
        height: 65px;
        margin-top: 20px;

        background: ${Colors.sbGreen};

        @media (max-width: ${Breakpoint.xl}) {
          height: 56px;
        }

        &:hover {
          background: ${Colors.sbGreen};
          opacity: 0.85;
        }

        /* @media (max-width: ${Breakpoint.md}) {
          height: 44px;
        } */
      }
      h3 {
        margin-top: 12px;
        font-weight: 500;
      }
      ._bold {
        font-weight: 600;
      }
      ._italic {
        font-weight: 500;
        font-style: italic;
      }
      ._TandC {
        margin-top: 34px;
        width: 200px;
      }

      .swiss-franc {
        position: relative;
      }

      .swiss-franc::before {
        content: "_";
        position: absolute;
        bottom: 0;
        margin-bottom: 4px !important;
        margin-left: -1px;
        transform: rotate(0deg);
        @media (max-width: ${Breakpoint.xl}) {
          margin-bottom: 2px !important;
        }
      }
      .xl::before {
        content: "_";
        position: absolute;
        bottom: 0;
        margin-bottom: 12px !important;
        margin-left: -1px;
        transform: rotate(0deg);

        @media (max-width: ${Breakpoint.xl}) {
          margin-bottom: 7px !important;
        }
      }

      h2 {
      }
    }
    ._content_2 {
      gap: 16px;
      flex-direction: row;
      align-items: center;
      padding: 20px;

      @media (max-width: ${Breakpoint.xl}) {
        flex-direction: column-reverse;
        gap: 28px;
        padding: 0px;
      }

      ._enjoy {
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        flex: 1;
        gap: 8px;

        p {
          font-weight: 600;
        }

        ._freebies {
          background: #fafafa;
          padding: 8px;
          border-radius: 12px;
          text-align: left;
        }
      }

      ._rocket {
        flex: 1;
        display: flex;
        align-items: center;
        flex-direction: column;
        gap: 8px;

        ._icon {
          font-size: clamp(48px, 8vw, 120px);
          color: #fff;
          /* transform: rotate(40deg); */
        }

        p {
          font-weight: 500;

          span {
            color: ${Colors.sbGreen};
          }
        }
      }
    }
  }

  .bg_content_2 {
    &::after {
      content: "";
      background-image: none;
    }
  }
`;
