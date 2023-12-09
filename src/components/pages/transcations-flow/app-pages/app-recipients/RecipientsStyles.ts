import styled from "styled-components";
import {
  Breakpoint,
  ResponsiveMarginTopForPagesWithSteps,
  Colors,
} from "../../utils/stylesVariables";

export const RecipientsContainerStyle = styled(
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

export const RecipientTableStyles = styled.div`
  display: flex;
  width: 600px;
  height: 450px;
  padding: 24px 32px;
  flex-direction: column;
  //justify-content: center;
  align-items: center;
  gap: 16px;

  border-radius: 14px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  /* @media (max-width: ${Breakpoint.xl}) {
    width: 64vw;
    padding: 20px;
  } */

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 24px;
    border-radius: 10px;
  }

  .header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 32px;

    @media (max-width: ${Breakpoint.sm}) {
      gap: 14px;
    }

    .button {
      .textLg {
        display: flex;
      }
      .textSm {
        display: none;
      }
      @media (max-width: ${Breakpoint.sm}) {
        .textLg {
          display: none;
        }
        .textSm {
          display: flex;
        }
      }
    }
  }
`;

export const RecipientTableStyle = styled.div`
  width: 100%;
  height: 100%;
  overflow: auto;
  flex: 1;
  .radio_group {
    width: inherit;
    .radio {
      //background: red;
      //flex: 1;
      width: 100%;
      .list {
        display: flex;
        flex-direction: column;
        gap: 14px;
        width: inherit;
        //flex: 1;
        .info {
          display: flex;
          gap: 14px;
          align-items: center;
          .avatar {
            box-sizing: border-box;
            flex-shrink: 0;
          }
          .info_details {
            p {
              margin: 0;
              font-weight: 600;
            }
            span {
            }
          }
        }
      }
    }
  }
`;

export const FlexWithAlignCenter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  width: 480px;

  @media (max-width: ${Breakpoint.md}) {
    width: 70vw;
  }
`;

export const TransferCategoryConatinerStyles = styled.div``;
