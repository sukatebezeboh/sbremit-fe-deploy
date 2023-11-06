import { Breakpoint } from "./../../../utils/stylesVariables";
import { Colors } from "components/pages/transcations-flow/utils/stylesVariables";
import styled from "styled-components";

export const AsideNavContainerStyles = styled.div`
  width: 346px;
  height: 100vh;
  padding: 32px 42px;
  flex-shrink: 0;
  border-right: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .logo_and_menu {
    display: flex;
    flex-direction: column;
    gap: 50px;
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 320px;
    padding: 28px 32px;
  }

  .menu {
    width: 100%;
  }
`;

export const SBRLogo = styled.img`
  width: 126px;
  height: 40px;
  @media (max-width: ${Breakpoint.md}) {
    width: 96px;
    height: 30px;
  }
`;

export const BannerPromotionStyle = styled.div`
  border-radius: 14px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};
  padding: 16px;
  box-shadow: 0px 4.16441px 5.32008px 0px rgba(0, 0, 0, 0.08),
    0px 11.44983px 17.86905px 0px rgba(0, 0, 0, 0.08);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;

  width: 100%;
  height: auto;
  flex-shrink: 0;
  position: relative;

  .svg {
    position: absolute;
    right: 0;
    top: 0;

    img {
      width: 178.735px;
      height: 199px;

      @media (max-width: ${Breakpoint.xl}) {
        width: 145.88px;
      }
    }
  }

  img {
    width: 72px;
    height: 72px;
    flex-shrink: 0;
  }
  p {
    color: ${Colors.textColor};
    font-size: 21px;
    font-weight: 500;
    line-height: 29px;
    margin: 0;
    z-index: 1;
  }
  span {
    color: ${Colors.textColor2};
    font-size: 16px;
    font-weight: 400;
    line-height: 140%;
  }
  .CTA {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: ${Colors.bgwhite};
    gap: 8px;

    .button {
      span {
        color: ${Colors.bgwhite};
      }
      width: 100%;
    }

    span {
      color: ${Colors.textColor};
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
    }
  }
`;
