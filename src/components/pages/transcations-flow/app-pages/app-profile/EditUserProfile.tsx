import {
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import { useSelector } from "react-redux";
import { editProfileAction } from "redux/actions/actions";
import { DateFormat, getFlagURL } from "../../utils/reuseableUtils";
import { FlexAndWrap } from "../app-verifications/VerificationsStyles";

interface EditUserProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  //submit: Function;
}

export const EditUserProfile = ({ open, setOpen }: EditUserProfileProps) => {
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
    location_country
  };

  const onFormFinish = (values: any) => {
    const formattedValues = {
      ...initialValues,
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
      src={getFlagURL(location_country?.toUpperCase())}
      alt={location_country}
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
                  required: true,
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
                  required: true,
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
              label="Building Name"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input street name!",
                },
              ]}
            >
              <Input size="large" placeholder="Building Name" />
            </Form.Item>
            <Form.Item
              name="city"
              label="City / Town"
              className="child"
              rules={[
                {
                  required: true,
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
                required: true,
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
