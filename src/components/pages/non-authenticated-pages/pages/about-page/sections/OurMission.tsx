import {
  H3,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import React from "react";
import styled from "styled-components";

const BgImage = "/assets/images/2D_img_of_world.png";
const TargetIcon = "/assets/icons/mingcute_target-line.svg";

const missionAndVissionArray = [
  {
    title: "Our Mission",
    message:
      "To build a digital finance ecosystem that will handle end to end payments and use machine learning & AI to advance financial inclusiveness in Africa.",
  },
  {
    title: "Our Vision",
    message:
      "Provide a platform for communities to alleviate poverty in their home countries by facilitating the provision of micro loans to operators of the informal sector.",
  },
];

const OurMission = () => {
  return (
    <OurMissionStyles>
      <div className="_left_content">
        <img src={BgImage} alt="" />
      </div>
      <div className="_right_content">
        {missionAndVissionArray.map((item, index) => (
          <MissionStyles key={index + item.title}>
            <div className="_header">
              <img src={TargetIcon} alt="Target icon" />
              <H3>{item.title}</H3>
            </div>
            <Paragraph>{item.message}</Paragraph>
          </MissionStyles>
        ))}
      </div>
    </OurMissionStyles>
  );
};

export default OurMission;

const OurMissionStyles = styled.section`
  display: flex;
  align-items: center;
  height: 1100px;
  width: 100%;
  background: #fafafa;

  justify-content: space-between;

  @media (max-width: ${Breakpoint.xl}) {
    height: auto;
  }

  ._left_content {
    width: 854px;
    height: 100%;

    @media (max-width: 1440px) {
      width: 654px;
    }

    @media (max-width: ${Breakpoint.xl}) {
      display: none;
    }
    img {
      width: inherit;
      height: inherit;
    }
  }

  ._right_content {
    display: flex;
    padding: 81px 8%;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;

    width: 100%;
    height: 100%;

    @media (max-width: 1440px) {
      padding-left: 5%;
    }
    @media (max-width: ${Breakpoint.xl}) {
      padding: 80px 8%;
    }
    @media (max-width: ${Breakpoint.md}) {
      padding: 60px 8%;
      gap: 28px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      padding: 40px 8%;
      gap: 18px;
    }
  }
`;

const MissionStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: flex-start;

  @media (max-width: ${Breakpoint.sm}) {
    gap: 14px;
  }

  ._header {
    display: flex;
    gap: 20px;
    align-items: center;

    @media (max-width: ${Breakpoint.md}) {
      gap: 14px;

      img {
        width: 38px;
      }
    }

    h3 {
      color: ${Colors.sbGreen};
    }
  }

  p {
    color: ${Colors.textColor3};
  }
`;
