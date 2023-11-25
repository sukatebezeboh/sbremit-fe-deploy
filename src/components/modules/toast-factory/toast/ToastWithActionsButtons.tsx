import React from "react";
import { Button, ConfigProvider, notification, Space } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { TOAST } from "redux/actionTypes";
import { AntdConfigSettings } from "components/pages/transcations-flow/utils/stylesVariables";

export const ToastWithActionsButtons = ({ config }: any) => {
  const [api, contextHolder] = notification.useNotification();
  const toastConfig = useSelector((state: any) => state.toast.toast);
  const dispatch = useDispatch();

  const close = () => {
    dispatch({
      type: TOAST,
      payload: {},
    });
  };

  const openNotification = () => {
    const key = `open${Date.now()}`;
    const btn = (
      <Space>
        <Button type="text" onClick={close}>
          Close
        </Button>
        <Button type="primary" onClick={config.extraBtnHandler}>
          {config.extraBtnText}
        </Button>
      </Space>
    );
    api.open({
      message: config.title,
      description: config?.message,
      type: config.type,
      btn,
      key,
      //onClose: close,
      duration: 0.5,
    });
  };

  return (
    <ConfigProvider theme={AntdConfigSettings}>
      {contextHolder}
      {config.show && openNotification()}
    </ConfigProvider>
  );
};
