import { Breakpoint, Colors } from "./../../../utils/stylesVariables";
import styled from "styled-components";

export const NavBarContainerStyle = styled.div`
  height: 80px;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 0;
  padding: 20px 44px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

  border-bottom: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};

  img {
    display: none;
  }

  p {
    display: flex;
  }
  @media (max-width: ${Breakpoint.md}) {
    padding: 24px;
    img {
      display: flex;
    }
    p {
      display: none;
    }
  }
`;

export const UserInfoAndNotificationIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;

  @media (max-width: ${Breakpoint.md}) {
    gap: 14px;
  }
`;

export const NotificationIcon = styled.div`
  cursor: pointer;
  .avatar {
    background: ${Colors.bgBodyColor};
    color: ${Colors.textColor2};
  }

  &:hover {
    opacity: 0.8;
  }
  &:active {
    scale: 0.9;
  }
`;

export const UserInfo = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  @media (max-width: ${Breakpoint.md}) {
    gap: 4px;
  }
  .info {
    display: flex;
    flex-direction: column;
    @media (max-width: ${Breakpoint.md}) {
      display: none;
    }
    span {
      color: ${Colors.textColor};
      font-size: 15px;
      font-weight: 500;
      text-transform: capitalize;
    }
    span:last-child {
      color: ${Colors.textColor2};
      font-size: 13px;
      font-weight: 500;
      line-height: 18px;
    }
  }
  .chvron {
    display: none;
    @media (max-width: ${Breakpoint.md}) {
      display: flex;
      z-index: 6;
    }
  }
`;

export const MobileMenuStyles = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
  opacity: 0;
  height: auto;
  z-index: 5;

  display: flex;
  flex-direction: row-reverse;
  background: rgba(33, 33, 33, 0.25);

  /* Animation properties */
  animation-name: blendIn;
  animation-duration: 0.3s;
  animation-timing-function: ease;
  animation-fill-mode: forwards;

  @keyframes blendIn {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;
