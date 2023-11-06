import React from "react";
import { asset } from "../../../util/util";
import styled from "styled-components";

const Div = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #1a191967;
  position: absolute;
  z-index: 30;
  top: 0px;
  left: 0px;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 18px;

  img {
    display: block;
    //margin: 45vh auto;
    width: 50px;
    height: 50px;
  }
  .text {
    display: block;
    font-size: 18px;
    text-align: center;
    line-height: 150%;
    color: #eae6e6;
    //margin-top: -10%;
    font-weight: 800;
  }
`;

const AppLoader = (props: any) => {
  const { show } = props;
  return show ? (
    <Div>
      <img src={asset("icons", "rolling-loader.svg")} alt="page-loader" />

      <div className="text">{show}</div>
    </Div>
  ) : (
    <></>
  );
};

export default AppLoader;
