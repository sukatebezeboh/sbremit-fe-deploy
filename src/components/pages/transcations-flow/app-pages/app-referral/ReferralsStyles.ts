import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../../utils/stylesVariables";

// export const ReferralContainerStyles = styled.div`
//   box-sizing: border-box;
//   margin: 32px 0;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   gap: 32px;
//   @media (max-width: ${Breakpoint.xl}) {
//     margin: 24px 0;
//     gap: 20;
//   }
//   @media (max-width: ${Breakpoint.sm}) {
//     gap: 16px;
//   }
// `;

export const ReferralContainerStyles = styled(
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

export const ReferralContentStyles = styled.div`
  display: flex;
  width: 800px;
  padding: 24px 24px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 16px;
  border-radius: 14px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  box-sizing: border-box;

  @media (max-width: ${Breakpoint.xl}) {
    width: 64vw;
    padding: 20px;
    flex-direction: column;
    gap: 14px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 24px;
    border-radius: 10px;
  }
`;

export const HeaderStyles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 8px;

  ._referral_code {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
    span {
      font-size: 12px;
      color: ${Colors.textColor2};
    }

    p {
      margin: 0;
      font-weight: 600;
      font-size: 24px;
      color: ${Colors.sbGreen};
    }

    span:last-child {
      font-size: 14px;
    }
    p:last-child {
      font-size: 14px;
      font-weight: 400;
      margin-top: 8px;
      color: ${Colors.textColor};
    }
  }
`;

export const LinkContainerStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const LinkStyles = styled.a`
  color: ${Colors.sbGreen};
  text-decoration: underline;
  font-size: 14px;
  margin: 0;
  text-align: center;
  cursor: pointer;
`;

export const InsightStyles = styled(ReferralContentStyles)`
  display: flex;
  justify-content: flex-start;
  gap: 24px;
  align-items: center;
  ._tab {
    width: 100%;
    ._insights {
      width: 100%;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      gap: 16px;
      @media (max-width: ${Breakpoint.md}) {
        gap: 16px;
      }
      @media (max-width: ${Breakpoint.sm}) {
        flex-direction: column;
      }
      .child {
        flex: 1;
      }
    }
  }
`;

export const UsageStyles = styled(ReferralContentStyles)`
  gap: 24px;
  ._uasge,
  ._history {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 20px;
    max-height: 800px;
    overflow: auto;
    @media (max-width: ${Breakpoint.sm}) {
      justify-content: flex-start;
      flex-direction: column;
      flex-wrap: nowrap;
      max-height: 1200px;
      width: 100%;
      gap: 24px;
    }
    ._card,
    ._voucher {
      width: 320px;

      @media (max-width: ${Breakpoint.xl}) {
        width: 280px;
      }
      @media (max-width: ${Breakpoint.sm}) {
        width: 100%;
      }
    }
  }
  ._history {
    ._voucher {
      height: 220px;
      border-radius: 8px;
      background: #fff;
      border: 1px solid rgba(0, 0, 0, 0.08);
      /* border-left: none; */
      overflow: hidden;
      display: flex;
      align-items: center;
      max-height: 230px;

      ._content_label {
        /* padding: 24px 16px; */

        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        flex-shrink: 0;
        width: 100%;
        height: 100%;
        gap: 10px;
        background: #0d8d70;
        //background-color: red;
        /* width: max-content; */
        ._top {
          padding: 24px 16px;
          width: 100%;
          height: 65%;

          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          h1 {
            color: #fff;
            font-size: 42px;
            font-weight: 700;
            text-transform: uppercase;
            margin: 0;
          }
          ._date {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            color: #fff; // icon color

            ._start_date,
            ._end_date {
              display: flex;
              flex-direction: column;
              gap: 4px;
              text-align: left;
              span {
                color: #fff;
                font-size: 12px;
                font-weight: 400;
                text-transform: capitalize;
              }
              span:last-child {
                color: #fff;
                font-size: 14px;
                font-weight: 500;
              }
            }
          }
        }
        ._pt_status {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 35%;
          border-top: 1px solid rgba(0, 0, 0, 0.08);
          padding: 20px 16px;
          background: #fff;
          ._pt {
            display: flex;
            gap: 6px;
            align-items: center;
            justify-content: center;

            color: rgba(218, 127, 20, 1);
            font-size: 22px;
            p {
              color: rgba(0, 0, 0, 0.88);
              font-size: 20px;
              font-weight: 600;
              text-transform: uppercase;
              margin: 0;
            }
          }
          p {
            margin: 0;
            color: #007b5d;
            font-size: 16px;
            font-weight: 600;
            text-transform: capitalize;
          }
        }
      }
    }
  }
`;

export const PromoUserNameStyles = styled.span`
  width: 250px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: white;
  font-size: 16px;
  font-weight: 600;
  color: "white";
  text-transform: capitalize;
  @media (max-width: ${Breakpoint.sm}) {
   // width: 200px;
  }
`;

export const VoucherExpiryDateStyles = styled.span`
  font-size: 12px;
  color: ${Colors.sbRed};
`;
export const RefferalStatusAndExpiryDateStyles = styled.div`
  display: flex;
  //flex-direction: column;
  justify-content: space-between;
  gap: 8px;
  flex-direction: column;
  ._content {
    display: flex;
    gap: 20px;
    width: 100%;
    justify-content: space-between;
    span {
      color: #6a6a6a;
      font-size: 14px;
      font-weight: 400;
    }
    span:last-child {
      //color: #1e1e1e;
      font-size: 14px;
      font-weight: 500;
      text-align: right;
    }
  }
`;
