import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H1,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";

const heroBgImg = "/assets/images/about_page_hero_bg.png";

const Hero = () => {
  return (
    <HeroStyles>
      <HeroContentStyles>
        <Paragraph>ABOUT US</Paragraph>
        <H1>
          Diaspora Empowering Individuals and Home Businesses Through Cross
          Border Payments
        </H1>
        <Paragraph>
          We are a payment and credit facilitator company trading under Sukate &
          Bezeboh Ltd.
        </Paragraph>
      </HeroContentStyles>
    </HeroStyles>
  );
};

export default Hero;

const HeroStyles = styled.section`
  width: 100%;
  height: 712px;
  flex-shrink: 0;

  background-image: ${`url(${heroBgImg})`};
  background-size: cover;
  background-repeat: no-repeat;

  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.6);

    width: 100%;
    height: 100%;
    z-index: 0;
  }
  @media (max-width: ${Breakpoint.xl}) {
    height: auto;
    padding: 80px 0px;
  }

  @media (max-width: ${Breakpoint.md}) {
    padding: 60px 0px;
  }
`;

const HeroContentStyles = styled(PageResponsiveWidth)`
  z-index: 1;

  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: ${Breakpoint.md}) {
    gap: 16px;
  }

  h1 {
    width: 80%;
    background: linear-gradient(98deg, #007b5d 22.72%, #ffe62e 78.19%);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    @media (max-width: ${Breakpoint.xl}) {
      width: 100%;
    }
  }
  color: #fff;
`;
