import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import styled, { keyframes } from "styled-components";

export const PageResponsiveWidth = styled.div`
  width: clamp(320px, 90vw, 1630px);
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-350px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const PageWrapperStyles = styled.div<{ $hideMarginTop?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px;
  width: 100vw;

  ${(props) =>
    props.$hideMarginTop ? "margin-top: -8px" : "margin-top: 38px;"};

  @media (max-width: ${Breakpoint.xl}) {
    gap: 80px;
    ${(props) =>
      props.$hideMarginTop ? "margin-top: -12px" : "margin-top: 24px;"};
  }

  @media (max-width: ${Breakpoint.md}) {
    gap: 60px;
    ${(props) =>
      props.$hideMarginTop ? "margin-top: -15px" : "margin-top: 38px;"}
  }
`;

export const getCountryColor = (country: string): string => {
  if (country == "Cameroon" || country === "XAF") {
    return "#007B5D";
  } else if (country === "Kenya" || country === "KES") {
    return "#CF0921";
  } else if (country == "Tanzania" || country === "TZS") {
    return "#0093FF";
  } else {
    //Uganda
    return "#FFC305";
  }
};
