import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions, Space, Tag } from "antd";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import {
  generateAlphabetColor,
  getFirstLetter,
} from "../../utils/reuseableUtils";
import { EditUserProfile } from "./EditUserProfile";
import {
  ActionsButtonStyles,
  ProfileContainerStyles,
  TransactionIdStyles,
  UsernameAndTransactIDContiner,
  UsernameStyles,
} from "./ProfileStyles";

const headerPadding = {
  padding: "14px 0",
};

const profileColumnSize = { xs: 1, sm: 2, md: 2, lg: 2, xl: 2, xxl: 2 };

const identifyEmptyRequiredProfileInfo = (
  fieldName: string,
  fieldValue: string
) => {
  const requiredFields = ["address1", "city", "zip", "mobile"];

  if (requiredFields.includes(fieldName) && fieldValue === "") {
    return {
      color: "##CF0921",
    };
  } else {
    return {};
  }
};

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
  const [editProfileModal, setEditProfileModal] = useState(false);

  return (
    <ProfileContainerStyles>
      <EditUserProfile open={editProfileModal} setOpen={setEditProfileModal} />
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
            {/* <Button icon={<LockOutlined rev={undefined} key="setting" />}>
              Change password
            </Button> */}

            <Button
              icon={<EditOutlined rev={undefined} key="edit" />}
              onClick={() => setEditProfileModal(true)}
            >
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
          <Descriptions.Item
            label="Mobile"
            contentStyle={identifyEmptyRequiredProfileInfo("mobile", mobile)}
          >
            {mobile || "required!"}
          </Descriptions.Item>
          <Descriptions.Item label="Phone Code">{phoneCode}</Descriptions.Item>
          <Descriptions.Item label="DOB">
            {`${day}-${month}-${year}` || dob}
          </Descriptions.Item>
          <Descriptions.Item
            label="Address 1"
            contentStyle={identifyEmptyRequiredProfileInfo(
              "address1",
              address1
            )}
          >
            {address1 || "required!"}
          </Descriptions.Item>
          <Descriptions.Item label="Address 2">
            {address2 || "-"}
          </Descriptions.Item>
          <Descriptions.Item
            label="City / Town"
            contentStyle={identifyEmptyRequiredProfileInfo("city", city)}
          >
            {city || "required!"}
          </Descriptions.Item>
          <Descriptions.Item label="Building Name">
            {streetName || "-"}
          </Descriptions.Item>
          <Descriptions.Item
            label="Postal / Zip Code"
            contentStyle={identifyEmptyRequiredProfileInfo("zip", zip)}
          >
            {zip || "required!"}
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            {countries[location_country?.toUpperCase()] || "-"}
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </ProfileContainerStyles>
  );
}
