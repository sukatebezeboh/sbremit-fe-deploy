import {
  Alert,
  Button,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Space,
  Switch,
} from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  changePasswordAction,
  editUserSettingsAction,
} from "redux/actions/actions";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import {
  SettingsContainerStyle,
  SettingsContentContainer,
} from "./SettingsStyles";

export default function Settings() {
  const user = useSelector((state: any) => state.auth.user);
  const [toogleChangePasswordModal, setToogleChangePasswordModal] =
    useState(false);

  const [marketingPermissionsStatus, setMarketingPermissionsStatus] = useState(
    Boolean(user?.settings?.marketingPermissions)
  );
  const onSwicthChnaged = (checked: boolean) => {
    const values = {
      marketingPermissions: checked,
    };
    editUserSettingsAction(values, (userData: any) => {
      setMarketingPermissionsStatus(userData.settings.marketingPermissions);
    });
  };

  const turnOffAllNotifications = () => {
    const values = {
      marketingPermissions: false,
    };
    editUserSettingsAction(values, (userData: any) => {
      setMarketingPermissionsStatus(userData.settings.marketingPermissions);
    });
  };

  return (
    <SettingsContainerStyle>
      <ChnagePasswordModal
        open={toogleChangePasswordModal}
        setOpen={setToogleChangePasswordModal}
      />
      <PageTitileAndDescription
        title="Settings"
        description="Customize your account options and preferences 🛠️"
      />
      <SettingsContentContainer>
        <List
          className="list"
          size="large"
          //   header={<div>User settings</div>}
          footer={
            <div className="footer">
              <Button type="primary" onClick={turnOffAllNotifications}>
                Turn it all off
              </Button>
            </div>
          }
          //   bordered
          dataSource={userSettingsInfo}
          renderItem={(item, index) => (
            <List.Item>
              <div className="child">
                <Space direction="vertical">
                  <p>{item.title}</p>
                  <span>{item.description}</span>
                </Space>
                {index === 0 ? (
                  <Button onClick={() => setToogleChangePasswordModal(true)}>
                    Change
                  </Button>
                ) : (
                  <Switch
                    checked={index === 2 ? true : marketingPermissionsStatus}
                    disabled={index === 2}
                    onChange={onSwicthChnaged}
                  />
                )}
              </div>
            </List.Item>
          )}
        />
      </SettingsContentContainer>
    </SettingsContainerStyle>
  );
}

const userSettingsInfo = [
  {
    title: "Change Password",
    description: "Update your password from your old one",
  },
  {
    title: "Marketing permissions",
    description:
      "By ticking this box, you wish to be contacted for marketing information purposes or for any special offer",
  },
  { title: "Transaction & Account updates", description: "Always on" },
];

interface ChnagePasswordProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const ChnagePasswordModal = ({ open, setOpen }: ChnagePasswordProps) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFormFinish = (values: any) => {
    changePasswordAction(values, () => handleCancel());
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const onFormFinishFailed = () => {};

  return (
    <Modal
      title="Chnage passowrd"
      open={open}
      onCancel={handleCancel}
      //onOk={handleOk}
      onOk={() => {
        form.validateFields().then((values) => {
          onFormFinish(values);
        });
      }}
    >
      <Divider style={{ marginTop: "12px" }} />

      <Alert
        message=" To protect your account the password must contain at least:"
        description={changePasswordGuide}
        type="info"
        closable
      />
      <div style={{ marginTop: "32px", width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          name="chnage_password"
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishFailed}
        >
          <Form.Item
            name="oldPassword"
            label="Old Password"
            rules={[
              {
                required: true,
                // min: 9,
                message: "Please input old password!",
              },
            ]}
          >
            <Input.Password size="large" placeholder="Old password" />
          </Form.Item>
          <Form.Item
            name="password"
            label="New password"
            rules={[
              {
                required: true,
                message: "Please input new password!",
              },
              { min: 8, message: "Min password length is 8" },
              { max: 20, message: "Max password length is 20" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="New password"
              onPaste={handlePaste}
              onCopy={handleCopy}
            />
          </Form.Item>
          <Form.Item
            name="confirmation"
            label="Confirm New Password"
            rules={[
              {
                required: true,
                validator: (_, value) => {
                  if (value !== form.getFieldValue("password")) {
                    return Promise.reject(
                      "Password do not match, please update"
                    );
                  } else {
                    return Promise.resolve();
                  }
                },
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Confirm new password"
              onPaste={handlePaste}
              onCopy={handleCopy}
            />
          </Form.Item>
        </Form>
      </div>
      <Divider style={{ marginTop: "12px" }} />
    </Modal>
  );
};

const changePasswordGuide = (
  <ul style={{ fontSize: 13 }}>
    <li>1 uppercase letter (A-Z)</li>
    <li>1 lowercase letter (a-z)</li>
    <li>1 number (0-9)</li>
    <li>8 characters</li>
  </ul>
);
