import { Alert, ConfigProvider, Divider, Form, Input, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CONFIRM } from "../../../redux/actionTypes";
import { AntdConfigSettings } from "components/pages/transcations-flow/utils/stylesVariables";

export const ConfirmDialog = () => {
  const confirmState = useSelector((state: any) => state.confirmDialog);
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const closeDialog = () => {
    dispatch({ type: CONFIRM, payload: { ...confirmState, open: false } });
  };

  const confirmInput = () => {
    confirmState.field
      ? confirmState.callback(form.getFieldValue(confirmState.field.title))
      : confirmState.callback();
    closeDialog();
    form.resetFields();
  };

  const onOkClick = () => {
    confirmState.callback();
    closeDialog();
  };

  return (
    <ConfigProvider theme={AntdConfigSettings}>
      <Modal
        open={confirmState.open}
        title={confirmState.title || "Confirmation Required!"}
        onCancel={() => {
          form.resetFields();
          closeDialog();
        }}
        onOk={onOkClick}
        cancelText="No, not yet"
        okText="Yes, proceed"
        style={{ top: "25%" }}
      >
        <Divider style={{ marginTop: "12px" }} />
        <div style={{ marginTop: "32px" }}>
          <Alert
            message="Warning"
            description={confirmState.message}
            type="warning"
            showIcon
          />

          {confirmState.field && (
            <>
              <Divider />
              <Form
                form={form}
                layout="vertical"
                name="form_in_modal"
                initialValues={{ modifier: "public" }}
                onChange={confirmInput}
              >
                <Form.Item
                  name={confirmState.field.title}
                  label={confirmState.field.title}
                  rules={[
                    {
                      required: true,
                      message: `Please input your ${confirmState.field.title}!`,
                    },
                  ]}
                >
                  {confirmState.field.title === "Password:" ? (
                    <Input.Password
                      size="large"
                      style={{ width: "100%" }}
                      placeholder={confirmState.field.placeholder}
                    />
                  ) : (
                    <Input
                      size="large"
                      style={{ width: "100%" }}
                      placeholder={confirmState.field.placeholder}
                    />
                  )}
                </Form.Item>
              </Form>
            </>
          )}
        </div>
        <Divider />
      </Modal>
    </ConfigProvider>
  );
};
