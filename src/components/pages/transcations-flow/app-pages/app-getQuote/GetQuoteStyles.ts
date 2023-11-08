import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../../utils/stylesVariables";

export const GetQuoteContainerStyle = styled(
  ResponsiveMarginTopForPagesWithSteps
)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 100%;
  height: fit-content;
  align-items: center;
  justify-content: center;
  @media (max-width: ${Breakpoint.sm}) {
    gap: 24px;
  }
`;

export const ExchangeCalculatorStyles = styled.div`
  display: flex;
  width: 510px;
  padding: 24px 32px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 20px;

  border-radius: 20px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  .tab-label {
    padding: 10px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 24px;
    .tab-label {
      padding: 0px;
    }
  }
`;

export const CalculatorTabStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0px;
  gap: 12px;
  width: 100%;
  .rate_and_icon {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  @media (max-width: ${Breakpoint.sm}) {
    gap: 14px;
    .rate_and_icon {
      span {
        font-size: 14px;
      }
    }
  }
`;

export const PayoutInclusiveStyles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 8px;
  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    align-items: start;
  }
  p {
    color: ${Colors.sbGreen};
    font-size: 14px;
    font-weight: 400;
    line-height: 24px;
    margin: 0;
  }
  .payout_inclusive {
    width: fit-content;
    display: flex;
    align-items: center;
    gap: 16px;

    @media (max-width: ${Breakpoint.sm}) {
      width: 100%;
    }

    border-radius: 8px;
    border: 1px solid ${Colors.borderColor2};
    background: #ecf4f2;
    padding: 8px 12px;
    justify-content: space-between;

    span {
      color: ${Colors.sbGreen};
      font-size: 12px;
      font-weight: 400;
      line-height: 24px;
    }
  }
`;

export const GetPromoStyles = styled.div<{ $validPromo?: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;

  span {
    color: ${Colors.textColor2};
    font-size: 14px;
    font-weight: 400;
    line-height: 22px;
  }
  .icon {
    color: ${(props) => (props.$validPromo ? Colors.sbGreen : Colors.sbRed)};
  }
  p {
    color: ${(props) => (props.$validPromo ? Colors.sbGreen : Colors.sbRed)};
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    margin: 0;
  }
`;

export const CalculatorInputStyles = styled.div<{ $error?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 3px;
  width: 100%;
  .label {
    font-size: 12px;
    color: ${Colors.textColor};
  }
  .error_message {
    display: ${(props) => (props.$error ? "flex" : "none")};
    font-size: 12px;
    line-height: 130%;
    color: ${Colors.sbRed};
  }
`;
