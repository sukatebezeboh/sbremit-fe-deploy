import React, { MouseEventHandler, useState } from "react";
import themes, { themeNames } from "../themes";
import {
  Alert,
  Button,
  ConfigProvider,
  Modal,
  Space,
  Divider,
  notification,
} from "antd";
import { useEffect } from "react";
import { AntdConfigSettings } from "components/pages/transcations-flow/utils/stylesVariables";
import { TOAST } from "redux/actionTypes";
import { useDispatch, useSelector } from "react-redux";
import { consoleLogOnLocalHost } from "components/pages/transcations-flow/utils/reuseableUtils";

type ToastType = "success" | "info" | "warning" | "error";

interface ToastProps {
  config: {
    show: boolean;
    modal?: boolean;
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
  const [isActionModal, setIsActionModal] = useState(false);

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
      if (config.modal === true) return setIsActionModal(true);
      else {
        return api[config?.type]({
          message: config?.title
            ? config.title
            : config.type?.toLocaleUpperCase(),
          description: config.message,
          placement: "topRight",
          duration: config.extraBtnHandler ? 0 : 5,
          btn,
          onClose: close,
        });
      }
    }
  }, [config?.show]);

  if (isActionModal) {
    return <ToastModal props={config} />;
  } else {
    return <> {contextHolder}</>;
  }
}

const ToastModal = ({ props }: any) => {
  const [open, setOpen] = useState(true);
  const { extraBtnText, extraBtnHandler, title, message, type } = props || {};

  return (
    <ConfigProvider theme={AntdConfigSettings}>
      <Modal open={open} footer={null} closeIcon={null}>
        <Alert
          message={<b>{title}</b>}
          description={message}
          type={type}
          showIcon
        />
        <Divider style={{ margin: "12px 0px" }} />
        <Button
          style={{ width: "100%" }}
          size="large"
          onClick={() => {
            setOpen(false);
            extraBtnHandler();
          }}
          type="primary"
          danger={type === "error"}
        >
          {extraBtnText}
        </Button>
      </Modal>
    </ConfigProvider>
  );
};
