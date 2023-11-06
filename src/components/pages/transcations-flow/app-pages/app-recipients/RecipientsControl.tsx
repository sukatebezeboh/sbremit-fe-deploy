import { Button, Divider, Form, Input, Modal } from "antd";
import { SubmitButtonStyles } from "../app-verifications/VerificationsStyles";
import { useSelector } from "react-redux";
import { Title } from "../app-dashboard/DashboardSyles";
import { replaceUnderScore } from "../../utils/reuseableUtils";

interface NewRecipientProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  //callback: Function;
}
export const NewRecipient = ({ open, setOpen }: NewRecipientProps) => {
  const transfer = useSelector((state: any) => state.transfer);
  const { transferMethod, destinationCurrency } = transfer || {};
  const [form] = Form.useForm();
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };
  const handleOk = () => {};
  const onFormFinishFailed = () => {};
  const onFormFinish = (values: any) => {};

  return (
    <Modal
      title={`Add a new recipient`}
      open={open}
      onCancel={handleCancel}
      onOk={handleOk}
      footer={null}
    >
      <Divider style={{ marginTop: "12px" }} />
      <p>
        Payment method ({replaceUnderScore(transferMethod).toLocaleUpperCase()})
      </p>
      <div style={{ marginTop: "32px", width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          name="new_recipient_form"
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishFailed}
          //initialValues={initialValues}
        >
          <Form.Item
            name="firstName"
            label="First name"
            rules={[
              {
                required: true,
                message: "Please input first name!",
              },
            ]}
          >
            <Input size="large" placeholder="First name" />
          </Form.Item>

          <Form.Item
            name="lastName"
            label="Last name"
            rules={[
              {
                required: true,
                message: "Please input last name!",
              },
            ]}
          >
            <Input size="large" placeholder="Last name" />
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Phone number"
            rules={[
              {
                required: transferMethod === "mobile_money",
                message: "Please input phone number!",
              },
            ]}
          >
            <Input size="large" placeholder="First name" />
          </Form.Item>
          {transferMethod === "mobile_money" && (
            <Form.Item
              name="confirm_mobile"
              label="Confirm phone number"
              rules={[
                {
                  required: true,
                  message: "Please confirm phone number!",
                },
              ]}
            >
              <Input size="large" placeholder="Phone number" />
            </Form.Item>
          )}

          {transferMethod === "cash_pickup" && (
            <>
              <Form.Item
                name="email"
                label="Recipient’s email address"
                rules={[
                  {
                    required: false,
                    message: "Please input recipient email address!",
                  },
                ]}
              >
                <Input size="large" placeholder="Email address" />
              </Form.Item>

              <Form.Item
                name="state"
                label="City/State"
                rules={[
                  {
                    required: false,
                    message: "Please input recipient City/State!",
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder="Enter recipient City or State"
                />
              </Form.Item>
            </>
          )}

          {transferMethod === "bank_transfer" && <></>}

          <Form.Item
            name="reason"
            label="Reason"
            rules={[
              {
                required: false,
                message: "Please select areason!",
              },
            ]}
          >
            <Input size="large" placeholder="Reason" />
          </Form.Item>

          <Divider />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <SubmitButtonStyles>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </SubmitButtonStyles>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};
