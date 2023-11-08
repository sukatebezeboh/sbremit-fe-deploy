import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../../utils/stylesVariables";

export const VerificationsContainerStyles = styled(
  ResponsiveMarginTopForPagesWithSteps
)`
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
    gap: 20px;
  }
`;

export const VerificationsBodyStyles = styled.div`
  width: 860px;

  @media (max-width: ${Breakpoint.xl}) {
    width: 64vw;
  }
  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
  }

  /* .list {
    background: ${Colors.bgwhite};
  } */
  .header {
    width: 100%;
    padding: 8px 0px;

    @media (max-width: ${Breakpoint.md}) {
      padding: 6px 0px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      flex-direction: column;
    }
  }
  .list {
    background: rgba(192, 255, 226, 0.2);
    border-radius: 14px 14px 0px 0px;
    overflow: hidden;
    @media (max-width: ${Breakpoint.sm}) {
      border-radius: 10px 10px 0px 0px;
    }
    .footer {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

export const VerificationStyle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0px;
  gap: 12px;
  width: 100%;
  box-sizing: border-box;
  .content {
    display: flex;
    align-items: center;
    gap: 16px;
    @media (max-width: ${Breakpoint.sm}) {
      gap: 10px;
    }
    .info {
      p {
        color: #000;
        font-size: 18px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        letter-spacing: -0.36px;
        margin: 0;
        @media (max-width: ${Breakpoint.sm}) {
          font-size: 16px;
        }
      }
      span {
        color: #808080;
        font-size: 12px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
        letter-spacing: -0.24px;
        margin: 0;
      }
    }
    .avatar {
      background: #fff;

      border: 1px solid #007b5d;
      color: #007b5d;
      box-sizing: border-box;
      flex-shrink: 0;
    }
  }
`;

export const FlexAndWrap = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 18px;
  flex-wrap: wrap;
  justify-content: space-between;
  .child {
    flex: 1;
  }
  @media (max-width: ${Breakpoint.sm}) {
    flex-direction: column;
    gap: 12px;
  }
`;

export const SubmitButtonStyles = styled.div`
  width: inherit;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  //padding: 4px 0px;
  //box-sizing: border-box;
  gap: 12px;
  @media (max-width: ${Breakpoint.sm}) {
    width: 100%;
    justify-content: flex-start;
  }
`;
