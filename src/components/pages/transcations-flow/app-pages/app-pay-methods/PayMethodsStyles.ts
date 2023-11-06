import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../../utils/stylesVariables";

export const PaymentMethodsContainerStyles = styled(
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

export const PaymentMethodsWrapperStyles = styled.div`
  display: flex;
  padding: 28px 24px;
  width: 550px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
  border-radius: 22px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};

  @media (max-width: ${Breakpoint.xl}) {
    width: 64vw;
    gap: 24px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 20px;
    border-radius: 18px;
  }
  .transfer_details {
    width: 100%;
  }
`;

export const PaymentMethodCardStyles = styled.div<{ $selected: boolean }>`
  display: flex;
  padding: 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  cursor: pointer;
  gap: 6px;
  border-radius: 8px;
  border: 1.8px solid
    ${(props) => (props.$selected ? Colors.sbGreen : Colors.borderColor2)};

  background: ${Colors.bgwhite};
  position: relative;

  transition: all 0.3s ease-in;

  .recomended {
    color: ${Colors.textColor};
    @media (max-width: ${Breakpoint.sm}) {
      position: absolute;
      top: 0;
      right: 0;
      margin-top: -10px;
    }
  }
  .img_and_method_name {
    display: flex;
    align-items: center;
    gap: 16px;
    @media (max-width: ${Breakpoint.sm}) {
      gap: 12px;
    }
    .imgWrapper {
      width: 45px;
      height: 45px;
      padding: 3px;
      box-sizing: border-box;
      border-radius: 8px;
      border: 1px solid ${Colors.borderColor2};

      display: flex;
      align-items: center;
      justify-content: center;

      img {
        width: 40px;
      }
    }
    .method_name {
      display: flex;
      flex-direction: column;
      gap: 3px;
      text-align: left;
      p {
        color: ${Colors.textColor};
        font-size: 18px;
        font-weight: 400;
        letter-spacing: -0.36px;
        margin: 0;
        @media (max-width: ${Breakpoint.sm}) {
          font-size: 16px;
        }
      }
      span {
        color: ${Colors.textColor}2;
        font-size: 12px;
        font-weight: 400;
        letter-spacing: -0.24px;
        margin: 0;
        @media (max-width: ${Breakpoint.sm}) {
          font-size: 12px;
        }
      }
    }
  }
  .select {
    width: 16px;
    height: 16px;

    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50px;

    border: 1px solid
      ${(props) => (props.$selected ? Colors.sbGreen : Colors.borderColor2)};

    &:hover {
      border: 1px solid ${Colors.sbGreen};
    }
    .dot {
      width: 10px;
      height: 10px;
      border-radius: 50px;
      background: ${(props) =>
        props.$selected ? Colors.sbGreen : Colors.bgwhite};
    }
  }

  &:hover {
    border: 1.8px solid ${Colors.sbGreen};
    opacity: 0.85;
  }
`;

export const PleaseNoteStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  p {
    color: ${Colors.textColor};
    font-size: 16px;
    font-weight: 500;
    line-height: auto;
    letter-spacing: -0.32px;
    margin: 0;
    @media (max-width: ${Breakpoint.sm}) {
      font-size: 14px;
    }
  }

  ol {
    list-style-type: disc;
    margin: 0;
    li {
      color: ${Colors.textColor};
      font-size: 14px;
      font-weight: 400;
      line-height: 160%;
      letter-spacing: -0.28px;
      margin: 0;
      @media (max-width: ${Breakpoint.sm}) {
        font-size: 12px;
      }
      .green_text {
        color: ${Colors.sbGreen};
      }
      .red_text {
        color: ${Colors.sbRed};
      }
    }
  }
`;
