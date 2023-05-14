import React from "react";
import style from "./BlogPost.css";
import { asset } from "../../../../util/util";
const Body = style;

interface Props {
  title: string;
  info: string;
}

const BlogPost = (props: Props) => {
  return (
    <Body>
      <div className="card">
        <div className="img">
          <img
            src={asset("icons", "money-decision.svg")}
            alt="money-decision"
          />
        </div>
        <div className="card-info">
          <span>{props.title}</span>
          <span>{props.info}</span>
        </div>

        <div className="card-bottom">
          <div className="date">
            <span>poted on</span>
            <span>May 2, 2023</span>
          </div>
          <div className="btn">Fraud Alert</div>
        </div>
      </div>
    </Body>
  );
};

export default BlogPost;
