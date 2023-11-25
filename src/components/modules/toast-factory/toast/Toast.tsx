import React, { MouseEventHandler } from "react";
import themes, { themeNames } from "../themes";
import { Button, ConfigProvider, Space, notification } from "antd";
import { useEffect } from "react";
import { AntdConfigSettings } from "components/pages/transcations-flow/utils/stylesVariables";
import { TOAST } from "redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { consoleLogOnLocalHost } from "components/pages/transcations-flow/utils/reuseableUtils";

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
  const [api, contextHolder] = notification.useNotification();

  const close = () => {
    dispatch({
      type: TOAST,
      payload: {},
    });
  };

  const btn = (
    <ConfigProvider theme={AntdConfigSettings}>
      {config.extraBtnHandler ? (
        <Space>
          <Button type="text" onClick={close}>
            Close
          </Button>
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
    consoleLogOnLocalHost(`Toast: ${config.message}`);
    if (config.show === true) {
      return api[config.type]({
        message: config.title ? config.title : config.type?.toLocaleUpperCase(),
        description: config.message,
        placement: "topRight",
        duration: config.extraBtnHandler ? 0 : 5,
        btn,
        onClose: close,
      });
    }
  }, [config?.show]);

  return <> {contextHolder}</>;
}
