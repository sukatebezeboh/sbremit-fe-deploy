import {
  Button,
  DatePicker,
  DatePickerProps,
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
import {
  DateFormat,
  convertToDateFormat,
  getFlagURL,
} from "../../utils/reuseableUtils";
import { userAppValues } from "../../utils/useAppValues";

import { FlexAndWrap } from "./VerificationsStyles";
import { useUpdateFormVerification } from "./verificationsHelper";
import { ErrorMessages } from "../../utils/ReusablePageContent";

interface FormVerificationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const FormVerification = ({ open, setOpen }: FormVerificationProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const countries = useSelector((state: any) => state.appValues.countries);
  const { PayinCountries } = userAppValues();
  const { location_country, day, year, month } = user?.profile;
  const [form] = Form.useForm();
  const [dob, setDob] = useState(`${day}-${month}-${year}`);
  const [enbledOtherGenderInput, setEnabledOtherGenderInput] = useState(false);

  const userCountryData = PayinCountries.find(
    (country: any) => country.countryCode === location_country
  );

  const initialValues: any = {
    address2: "",
    location_country: location_country,
    dob: dayjs(convertToDateFormat(`${day}-${month}-${year}`), DateFormat),
    gender: "male",
    username: user.username,
    address1: "",
    ...user?.profile,
  };

  const {
    mutate: updatePersonalDetailsMutate,
    isLoading,
    isError,
    error,
  } = useUpdateFormVerification(user.id, true, () => setOpen(false));

  const err: any = error;

  const handleCancel = () => {
    setOpen(false);
  };

  const onFormFinish = (values: any) => {
    //split date
    const [day, month, year] = dob.split("-");

    const formattedValues = {
      ...values,
      day: day,
      month: month,
      year: year,
      phoneCode: userCountryData?.dialCode,
      streetName: "",
    };
    // Delete the 'dob' and username property
    delete formattedValues.dob;
    delete formattedValues.username;

    updatePersonalDetailsMutate(formattedValues);
  };

  const onDatePickerChange: DatePickerProps["onChange"] = (
    date,
    dateString
  ) => {
    setDob(dateString);
  };

  const onChangeRadio = (e: RadioChangeEvent) => {
    //initialValues.currenciesValid = e.target.value;
    if (e.target.value === "others") {
      setEnabledOtherGenderInput(true);
    } else {
      setEnabledOtherGenderInput(false);
    }
  };

  return (
    <Modal
      title="My personal details"
      open={open}
      onCancel={handleCancel}
      width={800}
      onOk={() => {
        form.validateFields().then((values) => {
          onFormFinish(values);
        });
      }}
      confirmLoading={isLoading}
      okText="Submit"
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
              <Input disabled size="large" placeholder="First name" />
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
              <Input disabled size="large" placeholder="Last name" />
            </Form.Item>
          </FlexAndWrap>

          <FlexAndWrap>
            <Form.Item
              name="username"
              label="Email address"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input first name!",
                },
              ]}
            >
              <Input disabled size="large" placeholder="First name" />
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
              name="dob"
              label="Date of birth"
              className="child"
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
                onChange={onDatePickerChange}
                disabled
              />
            </Form.Item>
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
                addonBefore={userCountryData?.dialCode}
                size="large"
                placeholder="Mobile number"
                type="phone"
              />
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
                  message: "Please input your building name!",
                },
              ]}
            >
              <Input size="large" placeholder="Building name" />
            </Form.Item>
            <Form.Item
              name="address1"
              label="Address Line 1"
              className="child"
              rules={[
                {
                  required: true,
                  message: "Please input address Line 1!",
                },
              ]}
            >
              <Input size="large" placeholder="Address Line 1" />
            </Form.Item>
          </FlexAndWrap>

          <FlexAndWrap>
            <Form.Item
              name="address2"
              label="Address Line 2"
              className="child"
              rules={[
                {
                  required: false,
                  message: "Please input address Line 2!",
                },
              ]}
            >
              <Input size="large" placeholder="Address Line 2" />
            </Form.Item>
            <Form.Item
              name="city"
              label="City"
              className="child"
              rules={[
                {
                  required: true,
                  message: "Please input your City!",
                },
              ]}
            >
              <Input size="large" placeholder="City" />
            </Form.Item>
          </FlexAndWrap>

          <FlexAndWrap>
            {location_country === "CA" ? (
              <Form.Item
                name="province"
                label="Province"
                className="child"
                rules={[
                  {
                    required: false,
                    message: "Please input province!",
                  },
                ]}
              >
                <Input size="large" placeholder="Province" />
              </Form.Item>
            ) : (
              <Form.Item
                name="county"
                label="County"
                className="child"
                rules={[
                  {
                    required: false,
                    message: "Please input your County!",
                  },
                ]}
              >
                <Input size="large" placeholder="County" />
              </Form.Item>
            )}

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
          </FlexAndWrap>

          <Form.Item
            name="location_country"
            label="Location Country"
            className="child"
            rules={[
              {
                required: false,
                message: "Please input your Location Country!",
              },
            ]}
          >
            {/* <Input size="large"disabled placeholder="County" /> */}
            <Space>
              <img
                src={getFlagURL(location_country)}
                alt="Country_location"
                style={{
                  width: "24px",
                  height: "18px",
                  marginTop: "5px",
                }}
              />
              <span>{countries?.[location_country]}</span>
            </Space>
          </Form.Item>

          {isError && <ErrorMessages errorMessage={err?.message} />}

          <Divider style={{ marginTop: "12px" }} />
        </Form>
      </div>
    </Modal>
  );
};
