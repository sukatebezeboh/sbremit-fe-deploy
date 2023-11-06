import React from "react";
import themes, { themeNames } from "../themes";
import { notification } from "antd";
import { useEffect } from "react";

// export default function Toast(props: any) {
//   const { config } = props;

//   const ToastTheme =
//     config.theme || themes[config.defaultThemeName || themeNames.SLIM_PEAKER];
//   return <ToastTheme {...props} />;
// }

type ToastType = "success" | "info" | "warning" | "error";

interface ToastProps {
  config: {
    show: boolean;
    title: string;
    message: string;
    type: ToastType;
  };
}

export default function Toast(props: ToastProps) {
  const { config } = props;

  useEffect(() => {
    if (config.show) {
      notification[config.type]({
        message: config.title,
        description: config.message,
        placement: "topRight",
      });
    }
  }, [config.show, config.type, config.title, config.message]);

  return null;
}
