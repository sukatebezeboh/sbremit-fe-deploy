import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../../utils/stylesVariables";

export const ReviewContainerStyle = styled(
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

export const RecipientAndTranferContainer = styled.div`
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

  .content {
    width: 100%;
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
