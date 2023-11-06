import { Button, List, Space, Switch } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { editUserSettingsAction } from "redux/actions/actions";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import {
    SettingsContainerStyle,
    SettingsContentContainer,
} from "./SettingsStyles";

export default function Settings() {
  const user = useSelector((state: any) => state.auth.user);

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
                <Switch
                  checked={index === 1 ? true : marketingPermissionsStatus}
                  disabled={index === 1}
                  onChange={onSwicthChnaged}
                />
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
    title: "Marketing permissions",
    description:
      "By ticking this box, you wish to be contacted for marketing information purposes or for any special offer",
  },
  { title: "Transaction & Account updates", description: "Always on" },
];
