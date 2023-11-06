import styled from "styled-components";
import { Breakpoint, Colors } from "../../utils/stylesVariables";

export const TransactionsContainerStyles = styled.div`
  box-sizing: border-box;
  margin: 32px 0;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 32px;
  @media (max-width: ${Breakpoint.xl}) {
    margin: 24px 0;
  }
  @media (max-width: ${Breakpoint.sm}) {
    gap: 16px;
  }
`;
export const TransactionsContentStyles = styled.div`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  gap: 24px;
  background: ${Colors.bgwhite};
  border: 1px solid ${Colors.borderColor};
  padding: 24px 0px;

  box-shadow: 0px 4.16441px 5.32008px 0px rgba(0, 0, 0, 0.08),
    0px 11.44983px 17.86905px 0px rgba(0, 0, 0, 0.08);

  box-sizing: border-box;
  flex-shrink: 0;

  @media (max-width: ${Breakpoint.xl}) {
    padding: 20px 0px;
  }
`;

export const TranscationsTableHeader = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  gap: 24px;
  padding: 12px 24px;
  width: 100%;
  .date_selector {
    width: max-content;
    flex: 1;
  }
  @media (max-width: ${Breakpoint.md}) {
    padding: 0px 24px;
  }
`;

export const TransactionIdStyles = styled.span<{ $Color?: string }>`
  color: ${(props) => props.$Color || Colors.textColor2};
  font-size: 12px;
  font-weight: 500;
`;

export const TransactionDetailStyle = styled.div`
  background: #f5f7f7;
  padding: 20px 0px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const TransactionDetailContentStyle = styled.div<{ $bgColor?: string }>`
  background: ${(props) => props.$bgColor || Colors.bgwhite};
  width: 100%;
  padding: 16px 20px;
  .section_wrapper {
    width: 100%;
  }
`;

export const FlexContainerWithSpaceBtw = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  @media (max-width: ${Breakpoint.sm}) {
    flex-wrap: wrap;
    gap: 12px;
  }
`;

export const ExchnageStyles = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  .icon {
    color: ${Colors.sbGreen};
  }
  /* @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
  } */
`;

export const FraudReaonsStyles = styled.div`
  p {
    margin: 0;
    font-weight: 500;
    font-size: 16px;
    line-height: 32px;
    color: ${Colors.textColor};
  }
  .reason {
    display: flex;
    gap: 8px;
    align-items: center;
    .dot {
      width: 4px;
      height: 4px;
      border-radius: 40px;
      background: ${Colors.textColor2};
    }
  }
`;
