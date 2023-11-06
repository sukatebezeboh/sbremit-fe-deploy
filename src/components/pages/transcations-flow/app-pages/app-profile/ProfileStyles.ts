import styled from "styled-components";
import { Breakpoint, Colors } from "../../utils/stylesVariables";

export const ProfileContainerStyles = styled.div`
  box-sizing: border-box;
  margin: 32px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  @media (max-width: ${Breakpoint.xl}) {
    margin: 24px 0;
    gap: 20;
  }
  @media (max-width: ${Breakpoint.sm}) {
    gap: 16px;
  }
`;

export const UsernameStyles = styled.p`
  margin: 0;
  width: 40vw;
  color: ${Colors.textColor};
  font-size: 14px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const TransactionIdStyles = styled.span`
  width: 40vw;
  margin: 0;
  color: ${Colors.textColor2};
  font-size: 12px;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UsernameAndTransactIDContiner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

export const ActionsButtonStyles = styled.div`
  width: 100%;
  padding: 0px 24px;
  display: flex;
  justify-content: space-between;
  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    gap: 14px;
  }
`;
