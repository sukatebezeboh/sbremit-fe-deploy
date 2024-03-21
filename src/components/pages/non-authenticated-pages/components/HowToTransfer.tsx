import { AppLinks } from "components/pages/non-authenticated-pages/components/AppLinks";
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
import { useEffect, useState } from "react";
import styled from "styled-components";

const steps = [
  {
    title: "Sign up or Sign in",
    description:
      "Unlock a world of possibilities – Sign up now and start experiencing the future today!",
    img: "/assets/images/mobile_signup_page.png",
  },
  {
    title: "Input transaction details",
    description:
      "Enter an amount, add a recipient to send money and enhance your app experience!",
    img: "/assets/images/mobile_getqoute_page.png",
  },
  {
    title: "Review transaction",
    description:
      "Stay in control of your finances – Review transactions and confirm the details.",
    img: "/assets/images/mobile_review_page.png",
  },
  {
    title: "Send money",
    description:
      "Send money hassle-free – No palaver, just swift and secure transactions in one tap.",
    img: "/assets/images/mobile_success_page.png",
  },
];

const HowToTransfer = ({ isStepsTypeTwo }: { isStepsTypeTwo?: boolean }) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setActiveStep((prev) => (prev < 3 ? prev + 1 : 0));
    }, 2500);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <HowToTransferStyles>
      <HowToTransferContentStyles>
        {isStepsTypeTwo ? (
          <StepsTypeTwo activeStep={activeStep} />
        ) : (
          <StepsTypeOne activeStep={activeStep} />
        )}

        <div className="_images">
          <img
            src={steps[activeStep].img}
            alt="SBremit mobile app screenshots"
          />
        </div>
      </HowToTransferContentStyles>
    </HowToTransferStyles>
  );
};

export default HowToTransfer;

const StepsTypeOne = ({ activeStep }: { activeStep: number }) => {
  return (
    <StepsTypeOneStyles>
      <H3 $large>How to make a transfer</H3>
      <div className="_steps">
        {steps.map((step, index) => (
          <StepOneStyles
            key={step.title + index}
            className="_step"
            $activeStep={activeStep === index}
          >
            <H4 $small>{step.title}</H4>
            <Paragraph $small>{step.description}</Paragraph>
          </StepOneStyles>
        ))}
      </div>
      <AppLinks isDark />
    </StepsTypeOneStyles>
  );
};

const StepsTypeTwo = ({ activeStep }: { activeStep: number }) => {
  return (
    <StepsTypeTwoStyles>
      {steps.map((step, index) => (
        <StepTwoStyles
          $activeStep={activeStep === index}
          key={step.title + "_type2_" + index}
        >
          <Paragraph>{step.title}</Paragraph>
          <Paragraph $small>{step.description}</Paragraph>
        </StepTwoStyles>
      ))}
    </StepsTypeTwoStyles>
  );
};

const HowToTransferStyles = styled.section`
  background: #fafafa;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 100px 0px;

  @media (max-width: ${Breakpoint.xl}) {
    padding: 60px 0px;
  }
`;

const HowToTransferContentStyles = styled(PageResponsiveWidth)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 42px;

  @media (max-width: ${Breakpoint.xl}) {
    justify-content: center;
  }

  ._images {
    border-radius: 771px;
    /* opacity: 0.05; */
    background: linear-gradient(
      98deg,
      rgba(0, 123, 93, 0.05) 22.72%,
      rgba(255, 230, 46, 0.05) 78.19%
    );

    @media (max-width: ${Breakpoint.xl}) {
      display: none;
    }
    /*     
    width: 100%;
    height: 100%; */

    min-width: 771px;
    min-height: 771px;

    @media (max-width: 1440px) {
      min-width: 567px;
      min-height: 567px;
    }

    flex-shrink: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 300px;
      height: 600px;

      @media (max-width: 1440px) {
        min-width: 250px;
        min-height: 550px;
      }

      flex-shrink: 0;
    }
  }
`;

const StepOneStyles = styled.div<{ $activeStep: boolean }>`
  ${(props) =>
    props.$activeStep
      ? `border-left: 4px solid #007b5d; opacity: 1;`
      : `border-left: 4px solid #e5e5e5; opacity: .4;`}

  width: 520px;
  padding: 8px 42px;

  @media (max-width: ${Breakpoint.xl}) {
    width: 100%;
  }

  h4 {
    font-weight: 600;
  }

  color: ${Colors.textColor3};

  p {
  }
`;

const StepsTypeOneStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 52px;

  @media (max-width: ${Breakpoint.xl}) {
    align-items: center;
  }
  @media (max-width: ${Breakpoint.sm}) {
    gap: 32px;
    h3 {
      width: 280px;
      text-align: center;
    }
  }
`;

const StepsTypeTwoStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;

  @media (max-width: ${Breakpoint.xl}) {
    align-items: center;
    justify-content: center;
  }

  @media (max-width: ${Breakpoint.sm}) {
    gap: 14px;
    width: 100%;
    align-items: flex-start;
  }
`;

const StepTwoStyles = styled.div<{ $activeStep: boolean }>`
  display: flex;
  width: 340px;
  height: 302px;
  padding: 72px 32px;
  flex-direction: column;
  align-items: flex;
  gap: 20px;
  flex-shrink: 0;
  border-radius: 8px;
  background: #fff;

  @media (max-width: 1440px) {
    width: 320px;
    height: 320px;
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 340px;
    height: 260px;
    padding: 32px;
    justify-content: center;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 320px;
    height: 260px;
    gap: 16px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 100%;
    height: auto;
    gap: 10px;
    padding: 24px 14px;
  }

  ${(props) =>
    props.$activeStep
      ? `border: 2px solid #007b5d; color: #007b5d`
      : `border: 2px solid #FFF; color: #1E1E1E`};

  p {
    font-weight: 600;
  }

  p:last-child {
    font-weight: 300;
  }
`;
