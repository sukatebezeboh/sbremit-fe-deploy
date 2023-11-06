import React from "react";
import Theme from "./SlimPeaker.css";
import { Alert } from "antd";

const SlimPeaker: React.FC<{}> = ({ config }: any) => {
  return (
    <Theme>
      <Alert
        message={config?.title || ""}
        description={config?.message || "Success"}
        type={config?.type}
        showIcon
        closable
        onClick={config.close}
        className={`${config?.show ? "animate-in" : ""} ${
          config?.show && config?.readyToClose ? "animate-out" : ""
        }`}
      />

      {/* <div
        className={`container container-${config?.type} ${
          config?.show ? "animate-in" : ""
        } ${config?.show && config?.readyToClose ? "animate-out" : ""}`}
      >
        <div className="icon"></div>
        <div className="content">
          <div className="head">{config?.title || ""}</div>
          <div
            className="body"
            dangerouslySetInnerHTML={{ __html: config?.message || "Success" }}
          ></div>
        </div>
        <div className="close" onClick={config.close}>
          <button>x</button>
        </div>
      </div> */}
    </Theme>
  );
};

export default SlimPeaker;
