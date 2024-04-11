import { EditOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Descriptions, Space, Tag } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import {
  generateAlphabetColor,
  getFirstLetter,
  getFlagURL,
} from "../../utils/reuseableUtils";
import { checkToShowVerificationForm } from "../app-verifications/verificationsHelper";
import { EditUserProfile } from "./EditUserProfile";
import {
  ActionsButtonStyles,
  ProfileContainerStyles,
  TransactionIdStyles,
  UsernameAndIDContainer,
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

  if (
    requiredFields.includes(fieldName) &&
    (fieldValue === undefined || fieldValue.trim() === "")
  ) {
    return {
      color: "#CF0921",
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

  const isMobile = useSelector((state: any) => state.isMobileView);

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
            <UsernameAndIDContainer>
              <UsernameStyles>
                {firstName} {lastName}
              </UsernameStyles>
              <TransactionIdStyles>
                {isMobile ? "ID:" : "Membership ID:"} {code}
              </TransactionIdStyles>
            </UsernameAndIDContainer>
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
              disabled={!checkToShowVerificationForm(user)}
            >
              Edit profile
            </Button>
          </ActionsButtonStyles>,
        ]}
      >
        <Descriptions
          column={profileColumnSize}
          bordered
          layout={isMobile ? "vertical" : "horizontal"}
        >
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
          <Descriptions.Item label="Phone Code">
            {phoneCode || "N/A"}
          </Descriptions.Item>
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
            {address2 || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item
            label="City / Town"
            contentStyle={identifyEmptyRequiredProfileInfo("city", city)}
          >
            {city || "required!"}
          </Descriptions.Item>
          <Descriptions.Item label="Building Name">
            {streetName || "N/A"}
          </Descriptions.Item>
          <Descriptions.Item
            label="Postal / Zip Code"
            contentStyle={identifyEmptyRequiredProfileInfo("zip", zip)}
          >
            {zip || "required!"}
          </Descriptions.Item>
          <Descriptions.Item label="Country">
            <Space align="center">
              <img
                src={getFlagURL(location_country?.toUpperCase())}
                alt={location_country}
                style={{
                  width: "24px",
                  height: "18px",
                  marginTop: "5px",
                }}
              />
              {countries[location_country?.toUpperCase()] ||
                location_country?.toUpperCase() ||
                "N/A"}
            </Space>
          </Descriptions.Item>
        </Descriptions>
      </Card>
    </ProfileContainerStyles>
  );
}
