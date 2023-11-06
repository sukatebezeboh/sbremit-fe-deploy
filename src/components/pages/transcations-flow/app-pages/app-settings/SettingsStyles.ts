import styled from "styled-components";
import {
    Breakpoint,
    Colors
} from "../../utils/stylesVariables";

export const SettingsContainerStyle = styled.div`
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

export const SettingsContentContainer = styled.div`
  display: flex;
  width: 800px;
  padding: 24px 24px;
  justify-content: center;
  align-items: flex-start;
  gap: 32px;
  border-radius: 14px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  box-sizing: border-box;

  .list {
    width: 100%;
    .child {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      gap: 32px;
      p {
        margin: 0;
        font-weight: 600;
        font-size: 16px;
      }
    }
    .footer {
      margin-top: 10px;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 64vw;
    padding: 20px;
    flex-direction: column;
    gap: 24px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 24px;
    border-radius: 10px;
  }
`;
