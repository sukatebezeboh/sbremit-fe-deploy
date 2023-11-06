import { UnlockOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  DatePicker,
  DatePickerProps,
  Divider,
  Form,
  Input,
  List,
  Modal,
  Radio,
  RadioChangeEvent,
  Space,
  Tag
} from "antd";
import { ComplyCubeVerification } from "components/pages/verification/ComplyCubeVerification";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { refreshUserDetails, userVerificationAction } from "redux/actions/actions";
import { paths } from "util/paths";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import { getFlagURL } from "../../utils/reuseableUtils";
import { Title } from "../app-dashboard/DashboardSyles";
import {
  FlexAndWrap,
  SubmitButtonStyles,
  VerificationStyle,
  VerificationsBodyStyles,
  VerificationsContainerStyles,
} from "./VerificationsStyles";

interface VerificationMethod {
  type: string;
  status: string;
}

function checkIdVerificationStatus(user: any): boolean {
  let verificationList: VerificationMethod[] = [];

  if (user?.verifications) {
    for (const key in user.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }

  const idVerification = verificationList.find(
    (method) => method.type === "IDENTITY"
  );

  const idAttempted = idVerification && idVerification.status !== "PENDING";

  return idAttempted || false;
}

export default function Verifications() {
  const user = useSelector((state: any) => state.auth.user);
  const history = useHistory();
  const [openFormModal, setOpenFormModal] = useState(false);
  const [isFormVerified, setFormVerified] = useState(false);
  const [displayComplyCubeVerification, setDisplayComplyCubeVerification] =
    useState(false);

  useEffect(() => {
    // refreshUserDetails();
    setFormVerified(Boolean(user?.meta?.verified));
  }, [user]);

  //const isFormVerified = Boolean(user?.meta?.verified);
  const idAttempted = checkIdVerificationStatus(user);

  const onSubmitFormClicked = async (values: any) => {
    const StartComplyCubeVerification = () => {
      setFormVerified(true);

      //For cases where user has attempted idverification before form verification
      if (idAttempted) {
        refreshUserDetails(() => history.push(paths.DASHBOARD));
      }
    };
    //console.log(values);
    await userVerificationAction(values, StartComplyCubeVerification);
  };

  return (
    <VerificationsContainerStyles>
      <PageTitileAndDescription
        title="Verify your identity"
        description="Lets get you started with SBremit 🚀"
      />
      <VerificationsBodyStyles>
        <List
          size="small"
          className="list"
          header={<Header />}
          footer={
            <div className="footer">
              <Tag color="#007B5D">
                {isFormVerified && idAttempted
                  ? "100%"
                  : isFormVerified
                  ? "50%"
                  : "0%"}{" "}
                completed ✅
              </Tag>
            </div>
          }
          bordered
          dataSource={data}
          renderItem={(item, index) => (
            <List.Item>
              <VerificationStyle>
                <div className="content">
                  <Avatar className="avatar">0{index + 1}</Avatar>
                  <div className="info">
                    <p>{item.title}</p>
                    <span>{item.description}</span>
                  </div>
                </div>
                {/* display a start button when form is not verified */}
                {!isFormVerified && (
                  <Button
                    type="primary"
                    disabled={index > 0} // disabled rest of the form
                    onClick={() => setOpenFormModal(true)}
                  >
                    Start
                  </Button>
                )}
                {/* display a start button at index 1 when id is is not attempted */}
                {isFormVerified && !idAttempted && (
                  <Button
                    type="primary"
                    disabled={index === 1 ? false : true} // disabled rest of the form
                    onClick={() => setDisplayComplyCubeVerification(true)}
                  >
                    {index >= 1 ? "Start" : "Completed"}
                  </Button>
                )}
                {/* display a start button at index 1 when id is is not attempted */}
                {isFormVerified && idAttempted && (
                  <Button
                    type="primary"
                    disabled={true} // disabled rest of the form
                    //onClick={() => setOpenFormModal(true)}
                  >
                    Completed
                  </Button>
                )}
              </VerificationStyle>
            </List.Item>
          )}
        />
      </VerificationsBodyStyles>

      {/* Verification modals */}
      <FormVerification
        open={openFormModal}
        setOpen={setOpenFormModal}
        submit={onSubmitFormClicked}
      />
      <ComplyCubeVerification
        open={displayComplyCubeVerification}
        setOpen={setDisplayComplyCubeVerification}
      />
    </VerificationsContainerStyles>
  );
}

const data = [
  {
    title: "Proof of address",
    description: "Please tell us a little about yourself",
  },
  {
    title: "Identity Verification",
    description: "Please verify your Identity",
  },
  {
    title: "Document Verification",
    description: "Please verify your Documnets",
  },
];

const Header = () => {
  return (
    <div className="header">
      <Space size={12}>
        <Avatar
          size={36}
          icon={<UnlockOutlined rev={undefined} />}
          style={{ backgroundColor: "#007B5D" }}
        />
        <Title>Unlock Your Transactions</Title>
      </Space>
    </div>
  );
};

interface FormVerificationProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  submit: Function;
}

const FormVerification = ({ open, setOpen, submit }: FormVerificationProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const countries = useSelector((state: any) => state.appValues.countries);
  const { location_country, day, year, month } = user?.profile;
  const [form] = Form.useForm();
  const [dob, setDob] = useState(`${day}-${month}-${year}`);
  const [enbledOtherGenderInput, setEnabledOtherGenderInput] = useState(false);

  const dateFormat = "DD-MM-YYYY";

  const initialValues: any = {
    // phoneCode: "+01",
    address2: "",
    location_country: location_country,
    dob: dayjs(`${day}-${month}-${year}`, dateFormat),
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
      footer={null}
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
                format={dateFormat}
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
