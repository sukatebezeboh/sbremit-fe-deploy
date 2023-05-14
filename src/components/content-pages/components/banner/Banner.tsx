import React from "react";
import style from "./Banner.css";
import { asset } from "../../../../util/util";
import { Link } from 'react-router-dom';
import { paths } from "util/paths";

const Body = style;

const Banner = () => {
  return (
    <Body>
      <div className="register_interest">
        <div>
          <img
            className="banner"
            src={asset("icons", "banner-register_your_interest.svg")}
            alt="money-decision"
          />
        </div>
        <div className="content">
          <span>Want to start sending money to Africa?</span>
          <span>
            Let’s have a short description here.... that is completely
            transparent at every stage of the money transfer process.
          </span>
        </div>

        <div className="btn">
        <Link to={paths.SIGN_UP}>
          Create an account
          </Link>
          </div>
      </div>
    </Body>
  );
};

export default Banner;
