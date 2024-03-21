import { Breakpoint } from "components/pages/transcations-flow/utils/stylesVariables";
import styled, { keyframes } from "styled-components";

export const PageResponsiveWidth = styled.div`
  width: clamp(320px, 90vw, 1630px);
`;

export const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(250px);
  }
  to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const PageWrapperStyles = styled.div<{ $hideMarginTop?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 120px;
  width: 100vw;

  ${(props) => (props.$hideMarginTop ? "" : "margin-top: 38px;")};

  @media (max-width: ${Breakpoint.xl}) {
    gap: 80px;
    ${(props) => (props.$hideMarginTop ? "" : "margin-top: 24px;")};
  }

  @media (max-width: ${Breakpoint.md}) {
    gap: 60px;
    ${(props) => (props.$hideMarginTop ? "" : "margin-top: 38px;")}
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
