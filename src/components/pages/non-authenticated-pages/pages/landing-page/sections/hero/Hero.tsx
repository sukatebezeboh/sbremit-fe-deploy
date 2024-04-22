import { AppLinks } from "components/pages/non-authenticated-pages/components/AppLinks";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import {
  HeroText,
  Paragraph,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import HeroCalculator from "./HeroCalculator";
import { useParams } from "react-router-dom";

const Hero = () => {
  const { payoutCurrency, activeCountryColor } = useSelector(
    (state: any) => state.transfer
  );
  const { PayoutCountries } = userAppValues();
  const payoutCountry: any = PayoutCountries.find(
    (country) => country.currency === payoutCurrency
  );
  const [countryTyping, setCountryTyping] = useState<string>("");

  const { recipientCountry }: any = useParams();

  const countryName = payoutCountry?.name;

  // ---simulate typing effect
  useEffect(() => {
    let currentIndex = 0;
    setCountryTyping(""); //clear previous value

    const intervalId = setInterval(() => {
      if (currentIndex < countryName.length) {
        setCountryTyping((prevText) => prevText + countryName[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [countryName]);

  return (
    <HeroStyles>
      <HeroLeftSectionStyles $activeColor={activeCountryColor}>
        <HeroText>
          Send Money To <span>{countryTyping}</span>
        </HeroText>
        <Paragraph>
          Experience a transparent and cost-effective solution with{" "}
          <span>no fees</span>, the <span>best rates,</span> absolutely{" "}
          <span>no hidden</span> costs and{" "}
          <span>multiple delivery options.</span>
        </Paragraph>

        <AppLinks isDark />
      </HeroLeftSectionStyles>

      <HeroCalculator />
    </HeroStyles>
  );
};

export default Hero;

const HeroStyles = styled(PageResponsiveWidth).attrs({ as: "section" })`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  margin-top: 24px;

  @media (max-width: ${Breakpoint.md}) {
    flex-direction: column;
    align-items: center;
    gap: 38px;
    margin-top: 0px;
  }
`;

const HeroLeftSectionStyles = styled.div<{ $activeColor: string }>`
  width: 620px;

  @media (max-width: ${Breakpoint.xl}) {
    width: 48%;
  }
  @media (max-width: ${Breakpoint.md}) {
    width: 100%;
    text-align: center;
  }

  h1 {
    color: ${Colors.textColor3};
    span {
      color: ${(props) => props.$activeColor};
      text-transform: capitalize;
    }
  }

  p {
    margin-top: 8px;
    margin-bottom: 40px;
    color: ${Colors.textColor3};
    @media (max-width: ${Breakpoint.md}) {
      margin-bottom: 32px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      margin-bottom: 28px;
    }
    span {
      text-decoration: underline;
      color: ${(props) => props.$activeColor};
      font-weight: 600;
    }
  }
`;
