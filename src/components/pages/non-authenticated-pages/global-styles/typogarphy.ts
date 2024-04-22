import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";
// heroText
// h2
// h3
// subheding
// p
// span

export const HeroText = styled.h1`
  font-size: 105px;
  font-weight: 700;
  line-height: 104.5%;
  letter-spacing: -5.5px;
  margin: 0;

  @media (max-width: ${Breakpoint.xl}) {
    font-size: 76px;
    letter-spacing: -4.5px;
  }

  @media (max-width: ${Breakpoint.md}) {
    font-size: 62px;
    letter-spacing: -2.5px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    font-size: 28px;
    letter-spacing: -1.5px;
  }
`;

export const H1 = styled.h1`
  font-size: 80px;
  font-weight: 700;
  line-height: 115%;
  letter-spacing: -4px;
  margin: 0;

  @media (max-width: ${Breakpoint.xl}) {
    font-size: 62px;
    letter-spacing: -3px;
  }

  @media (max-width: ${Breakpoint.md}) {
    font-size: 38px;
    letter-spacing: -2px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    font-size: 32px;
    letter-spacing: -1px;
  }
`;

export const H2 = styled.h2`
  font-size: 64px;
  font-weight: 700;
  line-height: 120%;
  letter-spacing: -3.2px;
  margin: 0;

  @media (max-width: ${Breakpoint.xl}) {
    font-size: 46px;
    letter-spacing: -2.8px;
  }

  @media (max-width: ${Breakpoint.md}) {
    font-size: 38px;
    letter-spacing: -1.8px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    font-size: 28px;
    letter-spacing: -0.8px;
  }
`;

export const H3 = styled.h3<{ $large?: boolean }>`
  font-size: ${(props) => (props.$large ? "46px" : "40px")};
  font-weight: 600;
  line-height: auto;
  letter-spacing: -2px;
  margin: 0;

  @media (max-width: ${Breakpoint.xl}) {
    font-size: ${(props) => (props.$large ? "38px" : "32px")};
    letter-spacing: -1.3px;
  }

  @media (max-width: ${Breakpoint.md}) {
    font-size: ${(props) => (props.$large ? "32px" : "28px")};
    letter-spacing: -0.3px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    font-size: ${(props) => (props.$large ? "26px" : "24px")};
    letter-spacing: -0.3px;
  }
`;

export const H4 = styled.h4<{ $small?: boolean }>`
  font-size: ${(props) => (props.$small ? "28px" : "32px")};
  font-weight: 300;
  line-height: 150%; /* 150% */
  letter-spacing: -1px;
  margin: 0;

  @media (max-width: ${Breakpoint.xl}) {
    font-size: 28px;
    letter-spacing: -0.6px;
  }

  @media (max-width: ${Breakpoint.md}) {
    font-size: 20px;
    letter-spacing: -0.2px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    font-size: 18px;
    letter-spacing: 0px;
  }
`;

export const Paragraph = styled.p<{ $small?: boolean }>`
  font-size: ${(props) => (props.$small ? "20px" : "24px")};
  font-weight: 300;
  line-height: 150%; /* 150% */
  letter-spacing: -0.8px;
  margin: 0;

  @media (max-width: ${Breakpoint.xl}) {
    font-size: ${(props) => (props.$small ? "18px" : "20px")};
    letter-spacing: -0.6px;
  }

  @media (max-width: ${Breakpoint.md}) {
    font-size: ${(props) => (props.$small ? "16px" : "18px")};
    letter-spacing: 0;
  }

  @media (max-width: ${Breakpoint.sm}) {
    font-size: ${(props) => (props.$small ? "14px" : "16px")};
    letter-spacing: 0px;
  }
`;
