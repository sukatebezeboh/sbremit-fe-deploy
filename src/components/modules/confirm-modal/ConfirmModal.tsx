import { Alert, Divider, Modal } from "antd";
import React, { useState } from "react";

interface ConfirmModalProps {
  title: string;
  message: string;
  onSave: Function;
  onCancel: Function;
  type?: "info" | "warning" | "error" | "success";
  hideIcon?: boolean;
  open: boolean;
}

export const ConfirmModal = ({
  title,
  message,
  onSave,
  onCancel,
  type,
  hideIcon,
  open,
}: ConfirmModalProps) => {
  const onOkClick = () => {
    onSave();
  };

  const onCancelClick = () => {
    onCancel();
  };
  return (
    <Modal
      open={open}
      title={title}
      onOk={onOkClick}
      onCancel={onCancelClick}
      cancelText="No, not yet"
      okText="Yes, proceed"
    >
      <Divider style={{ margin: 0 }} />
      <div style={{ marginTop: 12, marginBottom: 5 }}>
        <Alert message={message} type={type || "info"} showIcon={!hideIcon} />
      </div>
    </Modal>
  );
};
