import { useState } from "react";
import { useSelector } from "react-redux";
import { DateFormat, getFlagURL } from "../../utils/reuseableUtils";
import {
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
import { FlexAndWrap } from "./VerificationsStyles";
import dayjs from "dayjs";

interface FormVerificationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  submit: Function;
}

export const FormVerification = ({
  open,
  setOpen,
  submit,
}: FormVerificationProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const countries = useSelector((state: any) => state.appValues.countries);
  const { location_country, day, year, month } = user?.profile;
  const [form] = Form.useForm();
  const [dob, setDob] = useState(`${day}-${month}-${year}`);
  const [enbledOtherGenderInput, setEnabledOtherGenderInput] = useState(false);

  const initialValues: any = {
    // phoneCode: "+01",
    address2: "",
    location_country: location_country,
    dob: dayjs(`${day}-${month}-${year}`, DateFormat),
    gender: "male",
    ...user?.profile,
  };

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
      address2: "",
      address1: values.buildingNumber + ", " + values.streetName,
    };
    // Delete the 'dob' property
    delete formattedValues.dob;

    submit(formattedValues);
    setOpen(false);
  };

  const onFormFinishFailed = (errorInfo: any) => {
    //console.log("Failed:", errorInfo);
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
      okText="Submit"
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
          onFinishFailed={onFormFinishFailed}
          initialValues={initialValues}
        >
          <FlexAndWrap>
            <Form.Item
              name="firstName"
              label="First name"
              className="child"
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
              className="child"
              rules={[
                {
                  required: true,
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
              <Input size="large" placeholder="Mobile number" type="phone" />
            </Form.Item>
            <Form.Item
              name="dob"
              label="Date of birth"
              className="child"
              rules={[
                {
                  required: true,
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
                  required: true,
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
              name="buildingNumber"
              label="House/Building Number"
              className="child"
              rules={[
                {
                  required: true,
                  message: "Please input building no!",
                },
              ]}
            >
              <Input size="large" placeholder="Building No" />
            </Form.Item>
            <Form.Item
              name="buildingName"
              label="Building Name"
              className="child"
              rules={[
                {
                  required: true,
                  message: "Please input your building name!",
                },
              ]}
            >
              <Input size="large" placeholder="Building name" />
            </Form.Item>
          </FlexAndWrap>

          <FlexAndWrap>
            <Form.Item
              name="streetName"
              label="Street Name"
              className="child"
              rules={[
                {
                  required: true,
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
                  required: true,
                  message: "Please input your City / Town!",
                },
              ]}
            >
              <Input size="large" placeholder="City / Town" />
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
                    required: true,
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
                    required: true,
                    message: "Please input your County!",
                  },
                ]}
              >
                <Input size="large" placeholder="County" />
              </Form.Item>
            )}
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

          <Divider style={{ marginTop: "12px" }} />
        </Form>
      </div>
    </Modal>
  );
};
