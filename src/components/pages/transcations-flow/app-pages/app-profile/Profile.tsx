import { EditOutlined, LockOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Tag,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import {
  DateFormat,
  generateAlphabetColor,
  getFirstLetter,
  getFlagURL,
} from "../../utils/reuseableUtils";
import { FlexAndWrap } from "../app-verifications/VerificationsStyles";
import {
  ActionsButtonStyles,
  ProfileContainerStyles,
  TransactionIdStyles,
  UsernameAndTransactIDContiner,
  UsernameStyles,
} from "./ProfileStyles";
import { editProfileAction } from "redux/actions/actions";

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

interface EditUserProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  //submit: Function;
}
const EditUserProfile = ({ open, setOpen }: EditUserProfileProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const [enbledOtherGenderInput, setEnabledOtherGenderInput] = useState(false);
  const [form] = Form.useForm();
  const {
    location_country,
    address1,
    address2,
    city,
    day,
    month,
    year,
    firstName,
    lastName,
    gender,
    mobile,
    streetName,
    zip,
  } = user?.profile || {};

  const handleCancel = () => {
    setOpen(false);
  };

  const initialValues: any = {
    address1,
    address2,
    city,
    dob: dayjs(`${day}-${month}-${year}`, DateFormat),
    firstName,
    gender,
    lastName,
    mobile,
    streetName,
    zip,
  };

  const onFormFinish = (values: any) => {
    const formattedValues = {
      ...values,
      day: day,
      month: month,
      year: year,
    };
    // Delete the 'dob' property
    delete formattedValues.dob;

    //console.log(formattedValues);
    editProfileAction(formattedValues, () => handleCancel());
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    //initialValues.currenciesValid = e.target.value;
    if (e.target.value === "others") {
      setEnabledOtherGenderInput(true);
    } else {
      setEnabledOtherGenderInput(false);
    }
  };

  const locationCountry = (
    <img
      src={getFlagURL(location_country)}
      alt="Country_location"
      style={{
        width: "24px",
        height: "18px",
        marginTop: "5px",
      }}
    />
  );

  return (
    <Modal
      title="Update your profile details"
      open={open}
      onCancel={handleCancel}
      width={800}
      okText="Update"
      onOk={() => {
        form.validateFields().then((values) => {
          onFormFinish(values);
        });
      }}
    >
      <Divider style={{ marginTop: "12px" }} />
      <div style={{ marginTop: "32px", width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          name="verification_form"
          onFinish={onFormFinish}
          initialValues={initialValues}
        >
          {" "}
          <FlexAndWrap>
            <Form.Item
              name="firstName"
              label="First name"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input first name!",
                },
              ]}
            >
              <Input size="large" placeholder="First name" />
            </Form.Item>
            <Form.Item
              name="lastName"
              label="Last name"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input your last name!",
                },
              ]}
            >
              <Input size="large" placeholder="Last name" />
            </Form.Item>
          </FlexAndWrap>
          <FlexAndWrap>
            <Form.Item
              name="mobile"
              label="Mobile Number"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input mobile number!",
                },
              ]}
            >
              <Input
                addonBefore={locationCountry}
                size="large"
                placeholder="Mobile number"
                type="phone"
              />
            </Form.Item>
            <Form.Item
              name="dob"
              label="Date of birth"
              className="child"
              extra="Date of Birth (DOB) cannot be changed"
              rules={[
                {
                  required: false,
                  message: "Please input your date of birth!",
                },
              ]}
            >
              <DatePicker
                size="large"
                format={DateFormat}
                // defaultValue={dayjs(`${day}-${month}-${year}`, "DD-MM-YYYY")}
                style={{ width: "100%" }}
                disabled
              />
            </Form.Item>
          </FlexAndWrap>
          <FlexAndWrap>
            <Form.Item
              name="gender"
              label="Gender"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please Select your gender!",
                },
              ]}
            >
              <Radio.Group onChange={onChangeRadio} defaultValue="male">
                <Space direction="horizontal">
                  <Radio value="male">Male </Radio>
                  <Radio value="female">Female</Radio>
                  <Radio value="others">Others</Radio>
                </Space>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              name="gender"
              label="Specify other gender"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please specify others gender!",
                },
              ]}
            >
              <Input
                disabled={!enbledOtherGenderInput}
                size="large"
                placeholder="specify others"
                type="phone"
              />
            </Form.Item>
          </FlexAndWrap>
          <FlexAndWrap>
            <Form.Item
              name="address1"
              label="Address line 1"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input Address line 1!",
                },
              ]}
            >
              <Input size="large" placeholder="Address line 1" />
            </Form.Item>
            <Form.Item
              name="address2"
              label="Address line 2"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input your Address line 2!",
                },
              ]}
            >
              <Input size="large" placeholder="Address line 2" />
            </Form.Item>
          </FlexAndWrap>
          <FlexAndWrap>
            <Form.Item
              name="streetName"
              label="Street Name"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input street name!",
                },
              ]}
            >
              <Input size="large" placeholder="Street name" />
            </Form.Item>
            <Form.Item
              name="city"
              label="City / Town"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input your City / Town!",
                },
              ]}
            >
              <Input size="large" placeholder="City / Town" />
            </Form.Item>
          </FlexAndWrap>
          <Form.Item
            name="zip"
            label="Postal / zip code"
            className="child"
            rules={[
              {
                required: false,
                message: "Please input your Postal / zip code!",
              },
            ]}
          >
            <Input size="large" placeholder="Postal / zip code" />
          </Form.Item>
        </Form>
      </div>
      <Divider style={{ marginTop: "12px" }} />
    </Modal>
  );
};
