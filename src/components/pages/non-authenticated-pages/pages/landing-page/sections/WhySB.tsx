import { Avatar } from "antd";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H3,
  H4,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import React from "react";
import styled from "styled-components";

const LadderPng = "/assets/images/ladder_png.png";
const NofeeIcon = "/assets/icons/fluent_money-off.svg";
const RateIcon = "/assets/icons/vaadin_exchange.svg";
const HandIcon = "/assets/icons/solar_hand-money-linear.svg";
const NoCostIcon = "/assets/icons/tdesign_money.svg";
const FriendlyIcon = "/assets/icons/ant-design_customer-service-outlined.svg";

const whyChooseUsOptions = [
  {
    icon: NofeeIcon,
    label: "No Fee",
    descriptions:
      "Zero transaction fees for all your transfers - meaning more money gets to your recipient.",
  },
  {
    icon: RateIcon,
    label: "Excellent Exchange Rate",
    descriptions:
      "Our exchange rates are the best in the market.  We give better rates than our competitors.",
  },
  {
    icon: HandIcon,
    label: "Multiple Delivery Options",
    descriptions:
      "We offer several delivery options amongst them are Mobile money, bank transfer, and cash pickup. ",
  },
  {
    icon: NoCostIcon,
    label: "No Hidden Cost",
    descriptions:
      "We take pride in being the most transparent money remittance company with no surprise costs.",
  },
  {
    icon: FriendlyIcon,
    label: "Customer Friendly",
    descriptions:
      "Customer-friendly experience that is completely transparent at every stage of the money transfer process.",
  },
];

const WhySB = () => {
  return (
    <WhySBStyles>
      <Options />
      <img src={LadderPng} alt="ladder" />
    </WhySBStyles>
  );
};

const Options = () => {
  return (
    <OptionsStyles>
      <H3>Why Choose SB Remit</H3>
      <div className="_options">
        {whyChooseUsOptions.map((option, index) => (
          <div className="_option" key={option.label + index}>
            <div className="_header">
              <div className="_icon">
                <img
                  src={option.icon}
                  className="_svg_icon"
                  alt={option.label}
                />
              </div>
              <H4 $small>{option.label}</H4>
            </div>
            <Paragraph>{option.descriptions}</Paragraph>
          </div>
        ))}
      </div>
    </OptionsStyles>
  );
};

export default WhySB;

const WhySBStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0px;
  height: 930px;

  img {
    height: inherit;
    width: 40%;

    @media (max-width: 1440px) {
      width: 35%;
    }

    @media (max-width: ${Breakpoint.xl}) {
      display: none;
    }
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: inherit;
    height: auto;
  }
`;

const OptionsStyles = styled.div`
  background: #fafafa;
  height: 100%;
  flex: 1;

  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column;
  padding-left: 8%;
  gap: 40px;

  @media (max-width: 1440px) {
    padding-left: 5%;
  }

  @media (max-width: ${Breakpoint.xl}) {
    padding: 60px 5%;
    align-items: center;
  }

  h3,
  h4 {
    color: ${Colors.sbGreen};
  }
  h4 {
    font-weight: 600;
  }

  ._options {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;

    @media (max-width: ${Breakpoint.xl}) {
      align-items: center;
      justify-content: center;
    }

    @media (max-width: ${Breakpoint.sm}) {
      gap: 12px;
    }
    ._option {
      width: 380px;

      display: flex;
      flex-direction: column;
      gap: 12px;

      @media (max-width: ${Breakpoint.md}) {
        width: 300px;
      }

      @media (max-width: ${Breakpoint.sm}) {
        width: auto;
        height: auto;
        border-radius: 8px;
        background: #fff;
        padding: 14px;
        gap: 8px;
      }

      p {
        color: ${Colors.textColor3};
      }

      ._header {
        display: flex;
        align-items: center;
        gap: 12px;

        ._icon {
          width: 40px;
          height: 40px;
          border-radius: 100px;

          @media (max-width: ${Breakpoint.md}) {
            width: 32px;
            height: 32px;
          }

          display: flex;
          align-items: center;
          justify-content: center;
          background: ${Colors.sbGreen};
          flex-shrink: 0;

          ._svg_icon {
            width: 24px;
            height: 24px;
            flex-shrink: 0;
            display: flex !important;

            @media (max-width: ${Breakpoint.md}) {
              width: 18px;
              height: 18px;
            }
          }
        }
      }
      //border: 1px solid red;
    }
  }
`;
