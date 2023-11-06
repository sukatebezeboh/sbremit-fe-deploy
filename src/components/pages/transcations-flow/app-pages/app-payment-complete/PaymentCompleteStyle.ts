import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../../utils/stylesVariables";

export const PaymentCompleteConatinerStyles = styled(
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

export const PaymentCompleteWrapperStyles = styled.div`
  width: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 24px;
  gap: 32px;
  border-radius: 14px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  box-sizing: border-box;
  position: relative;

  h2 {
    margin: 0;
  }
  .id_and_date {
    font-size: 14px;
    color: ${Colors.textColor2};
    text-align: center;
    line-height: 150%;
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 55vw;
    padding: 40px 24px;
    flex-direction: column;
    gap: 24px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 60px 24px;
    border-radius: 10px;
    margin-top: 40px;
  }
`;

export const IconStyles = styled.div<{ $type: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  margin-top: 0px;
  transform: translate(-50%, -50%);
  .avatar {
    background: ${(props) => (props.$type ? "#87d068" : Colors.sbRed)};
  }
`;

export const ExtraInfo = styled.div<{ $type: boolean }>`
  width: 400px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 8px;
  @media (max-width: ${Breakpoint.xl}) {
    width: 100%;
    gap: 12px;
  }
  p {
    margin: 0;
    line-height: 150%;
  }
  span {
    color: ${(props) => (props.$type ? Colors.sbGreen : Colors.sbRed)};
    font-size: 16px;
    line-height: 150%;
  }
`;
