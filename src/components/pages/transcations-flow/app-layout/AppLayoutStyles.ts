import styled from "styled-components";
import { Breakpoint } from "../utils/stylesVariables";

export const ApplayoutContainerStlye = styled.div`
  //width: clamp(320px, 95vw, 1440px);
  width: 100%;
  border: 1px solid #33333333;
  height: 100vh;
  display: flex;
  overflow-y: hidden;
  .body {
    width: 100%;
    overflow: hidden;
    .content {
      position: relative;
      width: 100%;
      height: 90%;
      overflow: auto;
      margin-bottom: 20px;
      box-sizing: border-box;
    }
    .navbar {
    }
  }
  .asidenav {
    display: block;
    @media (max-width: ${Breakpoint.md}) {
      display: none;
    }
  }
`;

export const ApplayoutStlye = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
`;

export const ApplayoutBodyStyle = styled.div`
  padding: 0px 48px;
  @media (max-width: ${Breakpoint.md}) {
    padding: 0px 32px;
  }
  @media (max-width: ${Breakpoint.sm}) {
    padding: 0px 18px;
  }
`;
