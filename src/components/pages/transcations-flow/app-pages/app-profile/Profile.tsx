import { EditOutlined, LockOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Descriptions,
  DescriptionsProps,
  Space,
  Tag,
} from "antd";
import {
  ProfileContainerStyles,
  TransactionIdStyles,
  UsernameAndTransactIDContiner,
  UsernameStyles,
  ActionsButtonStyles,
} from "./ProfileStyles";
import { useSelector } from "react-redux";
import {
  generateAlphabetColor,
  getFirstLetter,
} from "../../utils/reuseableUtils";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";

const headerPadding = {
  padding: "14px 0",
};

const profileColumnSize = { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 };

export default function Profile() {
  const user = useSelector((state: any) => state.auth.user);
  const countries: any = useSelector((state: any) => state.appValues.countries);
  const { status, username } = user;
  const {
    address1,
    address2,
    buildingNumber,
    city,
    day,
    firstName,
    gender,
    lastName,
    location_country,
    mobile,
    month,
    phoneCode,
    streetName,
    year,
    zip,
    dob,
  } = user.profile;
  const { code } = user.referral;
  return (
    <ProfileContainerStyles>
      <PageTitileAndDescription
        title="My Profile Details"
        description="View my personal and account information"
      />
      <Card
        title={
          <Space style={headerPadding}>
            <Avatar
              style={{
                background: generateAlphabetColor(
                  String(getFirstLetter(firstName))
                ),
              }}
            >
              {getFirstLetter(firstName)}
              {getFirstLetter(lastName)}
            </Avatar>
            <UsernameAndTransactIDContiner>
              <UsernameStyles>
                {firstName} {lastName}
              </UsernameStyles>
              <TransactionIdStyles>Membership ID: {code}</TransactionIdStyles>
            </UsernameAndTransactIDContiner>
          </Space>
        }
        extra={<Tag color="green">{status}</Tag>}
        actions={[
          <ActionsButtonStyles>
            <Button icon={<LockOutlined rev={undefined} key="setting" />}>
              Change password
            </Button>

            <Button icon={<EditOutlined rev={undefined} key="edit" />}>
              Edit profile
            </Button>
          </ActionsButtonStyles>,
        ]}
      >
        <Descriptions column={profileColumnSize} bordered>
          <Descriptions.Item label="First Name">{firstName}</Descriptions.Item>
          <Descriptions.Item label="Last Name">{lastName}</Descriptions.Item>
          <Descriptions.Item label="Email">{username}</Descriptions.Item>
          <Descriptions.Item label="Gender">{gender}</Descriptions.Item>
          <Descriptions.Item label="Mobile">{mobile}</Descriptions.Item>
          <Descriptions.Item label="Phone Code">{phoneCode}</Descriptions.Item>
          <Descriptions.Item label="DOB">
            {`${day}-${month}-${year}` || dob}
          </Descriptions.Item>
          <Descriptions.Item label="Address 1">
            {address1 || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Address 2">
            {address2 || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="City / Town">
            {city || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="State">
            {streetName || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Postal / Zip Code">
            {zip || "-"}
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            {countries[location_country] || "-"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </ProfileContainerStyles>
  );
}
