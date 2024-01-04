import styled from "styled-components";
import { Breakpoint, Colors } from "../../utils/stylesVariables";

export const DashboardContainerStyle = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 12px;
  padding: 48px 0px;
  //overflow-x: hidden;
  position: relative;

  @media (max-width: ${Breakpoint.xl}) {
    gap: 8px;
  }

  @media (max-width: ${Breakpoint.md}) {
    padding: 32px 0px;
    gap: 4px;
  }
`;

export const DashboardAnalyticsStyle = styled.section`
  display: flex;
  flex-direction: column;
  gap: 14px;

  @media (max-width: ${Breakpoint.xl}) {
    max-width: fit-content;
    overflow: auto;
  }

  .anlytics_cards {
    display: flex;
    gap: 24px;
    @media (max-width: ${Breakpoint.xl}) {
      gap: 16px;
    }
    @media (max-width: ${Breakpoint.md}) {
      gap: 14px;
      padding-bottom: 8px;
      width: 750px;
      overflow: auto;
    }
  }
`;

export const DashboardTransactionsStyle = styled.section``;

export const Title = styled.p`
  color: ${Colors.textColor};
  font-size: 20px;
  font-weight: 500;
  line-height: 125%;
  margin: 0;

  @media (max-width: ${Breakpoint.md}) {
    font-size: 16px;
  }
`;

export const AnalyticCard = styled.div<{ $iconBgColor: string }>`
  flex: 1;
  height: 150px;
  flex-shrink: 0;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 14px;
  border: 1px solid ${Colors.borderColor};
  overflow: hidden;

  /* box-shadow: 0px 4.16441px 5.32008px 0px rgba(0, 0, 0, 0.08),
    0px 11.44983px 17.86905px 0px rgba(0, 0, 0, 0.08); */

  .body {
    padding: 16px;
    flex: 1;
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    background: ${Colors.bgwhite};

    .count_and_status {
      p {
        color: ${Colors.textColor};
        font-size: 26px;
        font-weight: 500;
        line-height: 138%;
        margin: 0;
        @media (max-width: ${Breakpoint.md}) {
          font-size: 20px;
        }
      }
      span {
        color: ${Colors.textColor2};
        font-size: 21px;
        font-weight: 400;
        line-height: 138%;

        @media (max-width: ${Breakpoint.md}) {
          font-size: 18px;
        }
      }
    }
    .icon {
      width: 32px;
      height: 32px;
      color: ${Colors.bgwhite};

      display: flex;
      align-items: center;
      justify-content: center;

      flex-shrink: 0;
      border-radius: 6px;
      background: ${(props) => props.$iconBgColor};
      /* box-shadow: 0px -1.6278px 10.01724px 0px rgba(0, 0, 0, 0.03),
        0px -13px 80px 0px rgba(0, 0, 0, 0.07); */
    }
  }
  .footer {
    width: 100%;
    flex-shrink: 0;
    height: 50px;
    box-sizing: border-box;
    border-radius: 0px 0px 14px 14px;
    border-top: 1px solid ${Colors.borderColor2};
    background: #f6f6f6;
    padding: 15px 15px;

    display: flex;
    align-items: center;
    justify-content: flex-start;

    p {
      color: ${Colors.textColor};
      font-size: 16px;
      font-weight: 500;
      margin: 0;
      @media (max-width: ${Breakpoint.md}) {
        font-size: 14px;
        width: 200px;
        height: 100px;
        line-height: 100px;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
`;

export const AddNewTransfer = styled.button`
  display: flex;
  min-width: 180px;
  height: 150px;
  padding: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${Colors.sbGreen};
  gap: 16px;
  border-radius: 14px;
  /* 
  box-shadow: 0px 4.16441px 5.32008px 0px rgba(0, 0, 0, 0.08),
    0px 11.44983px 17.86905px 0px rgba(0, 0, 0, 0.08); */

  border: none;
  outline: none;
  cursor: pointer;
  color: ${Colors.bgwhite};

  animation: all 0.5s ease-in;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.99;
    scale: 0.95;
  }

  p {
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    margin: 0;
  }

  @media (max-width: ${Breakpoint.xl}) {
    display: none;
  }
`;

export const FabAddNewTransferStyles = styled.div`
  display: none;
  width: 100%;
  justify-content: flex-end;

  Button {
    height: 48px;
    border: 1.5px solid white;

    border-radius: 14px;
    box-shadow: 0px 4.164px 5.32px 0px rgba(0, 0, 0, 0.08),
      0px 11.45px 17.869px 0px rgba(0, 0, 0, 0.08);
  }
  @media (max-width: ${Breakpoint.xl}) {
    position: absolute;
    margin-top: 180px;
    display: flex;
    z-index: 10;
  }
`;

export const ForUnverifiedUserMsgStyles = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  flex-shrink: 0;
  .alert {
    width: 100%;
    @media (max-width: ${Breakpoint.md}) {
      width: 100%;
    }
  }
  @media (max-width: ${Breakpoint.md}) {
    margin-bottom: 14px;
  }
`;
