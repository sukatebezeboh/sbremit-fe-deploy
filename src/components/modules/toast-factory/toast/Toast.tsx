import React, { MouseEventHandler } from "react";
import themes, { themeNames } from "../themes";
import { Button, ConfigProvider, Space, notification } from "antd";
import { useEffect } from "react";
import { AntdConfigSettings } from "components/pages/transcations-flow/utils/stylesVariables";
import { TOAST } from "redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";

type ToastType = "success" | "info" | "warning" | "error";

interface ToastProps {
  config: {
    show: boolean;
    title: string;
    message: string;
    type: ToastType;
    extraBtnHandler: Function;
    extraBtnText: string;
    duration: number;
  };
}

export default function Toast(props: ToastProps) {
  const { config } = props;
  const dispatch = useDispatch();
  const toastConfig = useSelector((state: any) => state.toast.toast);

  const close = () => {
    dispatch({
      type: TOAST,
      payload: {
        ...toastConfig,
        show: false,
        duration: 1,
      },
    });
  };

  const btn = (
    <ConfigProvider theme={AntdConfigSettings}>
      {config.extraBtnHandler ? (
        <Space>
          {/* <Button type="text" onClick={close}>
            Close
          </Button> */}
          <Button
            type="primary"
            onClick={() => {
              close();
              config.extraBtnHandler();
            }}
          >
            {config.extraBtnText}
          </Button>
        </Space>
      ) : (
        <></>
      )}
    </ConfigProvider>
  );

  useEffect(() => {
    if (config.show) {
      return notification[config.type]({
        message: config.title ? config.title : config.type?.toLocaleUpperCase(),
        description: config.message,
        placement: "topRight",
        duration: config.duration === 0 ? config.duration : 5,
        btn,
        onClose: () => close(),
      });
    }
  }, [config?.show]);

  return null;
}
