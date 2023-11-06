import styled from "styled-components";
import { Breakpoint, Colors } from "../../utils/stylesVariables";

export const TransferMethodContainerStyles = styled.div`
  height: 100%;
  width: 100%;
  margin: 120px 0px;
  gap: 42px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Breakpoint.xl}) {
    margin: 40px 0px;
    gap: 36px;
  }
  @media (max-width: ${Breakpoint.sm}) {
    margin: 40px 0px;
    gap: 28px;
  }
`;

export const TransferMethodsStyles = styled.div`
  border-radius: 20px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-direction: column;
  padding: 32px;
  box-sizing: border-box;

  @media (max-width: ${Breakpoint.sm}) {
    padding: 24px;
    border-radius: 16px;
  }

  .methods {
    display: flex;
    .radio_group {
      display: flex;
      align-items: center;
      width: 800px;
      @media (max-width: ${Breakpoint.xl}) {
        flex-direction: column;
        width: 380px;
      }
      @media (max-width: ${Breakpoint.md}) {
        width: 70vw;
      }
      .radio {
        width: 100%;
        height: 250px;
        display: flex;
        align-items: center;
        justify-content: center;
        @media (max-width: ${Breakpoint.xl}) {
          height: 150px;
          padding: 20px 24px;
          justify-content: flex-start;
        }
        .radio_content {
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          gap: 18px;
          @media (max-width: ${Breakpoint.xl}) {
            flex-direction: row;
            font-size: 40px;
          }
          @media (max-width: ${Breakpoint.xs}) {
            gap: 12px;
          }
          //---icon
          font-size: 80px;
          .method_name_description {
            max-width: 209px;
            display: flex;
            flex-direction: column;
            text-align: center;
            @media (max-width: ${Breakpoint.xl}) {
              text-align: left;
            }
            p {
              font-size: 18px;
              font-weight: 500;
              line-height: 22px;
              margin: 0;
            }
            span {
              font-size: 12px;
              font-weight: 400;
              line-height: 22px;
            }
          }
        }
      }
    }
  }
`;

export const SbchrgesStyles = styled.p`
  color: ${Colors.textColor2};
  text-align: center;
  font-size: 12px;
  font-weight: 400;
  line-height: 22px;
  letter-spacing: -0.24px;
  margin: 0;
  span {
    color: ${Colors.sbGreen};
    font-size: 12px;
    font-weight: 500;
    line-height: 22px;
    letter-spacing: -0.24px;
  }
`;
