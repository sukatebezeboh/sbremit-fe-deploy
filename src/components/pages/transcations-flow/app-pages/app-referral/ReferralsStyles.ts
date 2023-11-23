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

  .section_1 {
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
  ._insights {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    gap: 24px;
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
`;

export const UsageStyles = styled(ReferralContentStyles)`
  gap: 24px;
  ._uasge {
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    display: flex;
    flex-direction: row;
    gap: 16px;
    @media (max-width: ${Breakpoint.sm}) {
      flex-direction: column;
      width: 100%;
      gap: 24;
    }
  }
`;

export const PromoUserNameStyles = styled.span`
  width: 120px;
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
  @media (max-width: ${Breakpoint.sm}) {
    width: 200px;
  }
`;
