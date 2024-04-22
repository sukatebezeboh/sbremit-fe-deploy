import { Button } from "antd";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  H1,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { useHistory } from "react-router";
import styled from "styled-components";
import { paths } from "util/paths";

const MobileAppImages = "/assets/images/mobile_app_grouped_images.png";

const Hero = () => {
  const history = useHistory();
  return (
    <HeroStyles>
      <div className="_left_content">
        <Paragraph>HOW IT WORKS</Paragraph>
        <H1>How to send money with SB Remit</H1>

        <div className="_info">
          <Paragraph>
            Sending money with SB Remit is a breeze. Discover the simplest,
            safest, and most convenient way to transfer funds internationally.
            Learn how to get started and ensure your money reaches its
            destination securely and swiftly.
          </Paragraph>

          <Button
            type="primary"
            size="large"
            onClick={() => history.push(paths.SIGN_UP)}
          >
            Get Started
          </Button>
        </div>
      </div>
      <div className="_right_content">
        <img src={MobileAppImages} alt="Sbremit mobile app screenshots" />
      </div>
    </HeroStyles>
  );
};

export default Hero;

const HeroStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 62px;
  margin-top: 52px;

  @media (max-width: ${Breakpoint.xl}) {
    align-items: center;
    justify-content: center;
    margin-top: 24px;
    text-align: center;

    gap: 48px;
  }

  @media (max-width: ${Breakpoint.md}) {
    margin-top: 12px;
  }

  ._left_content {
    width: 50%;
    display: flex;
    flex-direction: column;
    gap: 40px;

    color: ${Colors.textColor3};

    @media (max-width: 1440px) {
      width: 48%;
    }

    @media (max-width: ${Breakpoint.xl}) {
      align-items: center;
      width: 75%;
      gap: 24px;
    }

    @media (max-width: ${Breakpoint.md}) {
      gap: 14px;
      width: 100%;
    }

    h1 {
      width: 700px;
      background: linear-gradient(98deg, #007b5d 22.72%, #ffe62e 78.19%);
      background-clip: text;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;

      @media (max-width: 1440px) {
        width: auto;
      }

      @media (max-width: ${Breakpoint.md}) {
        width: 100%;
      }
    }

    ._info {
      Button {
        margin-top: 20px;
        height: 62px;
        width: 216px;

        @media (max-width: ${Breakpoint.sm}) {
          height: 54px;
          width: 180px;
        }
      }
    }
  }

  ._right_content {
    width: 44%;
    @media (max-width: ${Breakpoint.xl}) {
      display: none;
    }
    img {
      width: 100%;
    }
  }
`;
