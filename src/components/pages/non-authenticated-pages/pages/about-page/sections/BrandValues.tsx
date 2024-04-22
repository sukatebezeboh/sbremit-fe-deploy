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

//security_icon speed_icon headphone_icon expertise_icon

const SecurityIcon = "/assets/icons/security_icon.svg";
const SpeedIcon = "/assets/icons/speed_icon.svg";
const HeadphoneIcon = "/assets/icons/headphone_icon.svg";
const RealiabilityIcon = "/assets/icons/expertise_icon.svg";

const BrandValuesArray = [
  {
    title: "Expertise",
    description:
      "We have the knowledge, systems, management team & network to facilitate seamless transactions.",
    icon: SecurityIcon,
  },
  {
    title: "Convenience",
    description:
      "We provide our customers with a wide range of choice for payments & remittance.",
    icon: SpeedIcon,
  },
  {
    title: "Speed",
    description:
      "We are forward thinking and complete transactions in near real time.",
    icon: HeadphoneIcon,
  },
  {
    title: "Reliability",
    description: "Our platform is safe and secure.",
    icon: RealiabilityIcon,
  },
];

const BrandValues = () => {
  return (
    <BrandValuesStyles>
      <H3>Brand Values</H3>
      <div className="_barnd_values">
        {BrandValuesArray.map((item, index) => (
          <BrandValue key={item.title + index}>
            <div className="_header">
              <img src={item.icon} alt={item.title + "icon"} />
              <H4>{item.title}</H4>
            </div>

            <Paragraph>{item.description}</Paragraph>
          </BrandValue>
        ))}
      </div>
    </BrandValuesStyles>
  );
};

export default BrandValues;

const BrandValuesStyles = styled(PageResponsiveWidth)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;

  h3 {
    color: ${Colors.textColor3};
  }

  @media (max-width: ${Breakpoint.md}) {
    gap: 28px;
  }

  ._barnd_values {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;

    @media (max-width: ${Breakpoint.sm}) {
      gap: 16px;
    }
  }
`;

const BrandValue = styled.div`
  display: flex;
  padding: 82px 32px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;

  background: #fafafa;

  width: 367px;
  height: 369px;

  @media (max-width: 1440px) {
    width: 300px;
    gap: 14px;
    padding: 62px 28px;
  }

  @media (max-width: ${Breakpoint.md}) {
    height: 300px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 100%;
    height: 250px;
    justify-content: center;
  }

  ._header {
    display: flex;
    align-items: center;
    gap: 16px;

    color: ${Colors.textColor3};

    h4 {
      font-weight: 700;
    }
    @media (max-width: ${Breakpoint.sm}) {
      gap: 14px;
      img {
        width: 28px;
      }
    }
  }
`;
