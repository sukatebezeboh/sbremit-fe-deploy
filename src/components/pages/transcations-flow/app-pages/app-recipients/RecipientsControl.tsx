import {
  Alert,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Space,
  Tabs,
  TabsProps,
  Tooltip,
  Typography,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { createRecipient } from "redux/actions/actions";
import {
  getFlagURL,
  mobileMoneyProviderList,
  replaceUnderScore,
  transferMethodsInWords,
} from "../../utils/reuseableUtils";
import { userAppValues } from "../../utils/useAppValues";

const { Text, Link } = Typography;
const { Option } = Select;

interface NewRecipientProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  transferQuoteResponse: any;
}

const initialValues = {
  firstName: "",
  lastName: "",
  mobile: "",
  phoneCode: "",
  confirmMobile: "",
  confirmPhoneCode: "CM21",
  email: "",
  state: "",
  reason: "",
  bankName: "",
  accountNumber: "",
  pickupPoint: "",
  branchCode: "",
  bankCode: "",
  key: "",
  countryCode: "CM21",
  accountBranch: "",
  recipientAccountNumber: "",
  mobileMoneyProvider: "",
  transferMethod: "",
};

export const NewRecipient = ({
  open,
  setOpen,
  transferQuoteResponse,
}: NewRecipientProps) => {
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const { PayoutCountries, PayinCountries } = userAppValues();
  const [mobileMoneyProvider, setMobileMoneyProvider] = useState("");
  const { destinationCurrency } = transferQuoteResponse || {};
  const [isPhoneNumberMatched, setIsPhoneNumberMatched] = useState(false);

  const { recipientBankDeatails } = transfer || {};

  const transferMethod =
    transferMethodsInWords[transferQuoteResponse?.transferMethod];

  const recipientCountry = PayoutCountries.find(
    (country: any) => country.currency === destinationCurrency
  );
  const [form] = Form.useForm();

  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  const onFormFinishFailed = () => {};

  const handleOnSelcetMMPChange = (value: string) => {
    setMobileMoneyProvider(value);
  };

  const onFormFinish = (values: any) => {
    //console.log(values, recipientBankDeatails);
    delete values.recipientCountry;

    initialValues.phoneCode = recipientCountry?.dialCode || "";
    initialValues.confirmPhoneCode = recipientCountry?.dialCode || "";
    values.mobileMoneyProvider = mobileMoneyProvider || "";
    values.transferMethod = transferMethod;
    const combinedValues = {
      ...initialValues,
      ...values,
      ...recipientBankDeatails,
    };

    if (transferMethod === "mobile_money" || transferMethod === "cash_pickup") {
      createRecipient(combinedValues, setOpen(false));
    }

    // TODO: refactor this logic
    // check for other filed values Bank and mirofinace
    //if accountNumber(Bank field which is Tab 1) is empty extend check to mirofinace(Tab 2) field values and set validation if empty
    if (transferMethod === "bank_transfer") {
      //if tab 1 is not empty and tab 2 is empty
      if (
        recipientBankDeatails.accountNumber !== "" &&
        (combinedValues.recipientAccountNumber === "" ||
          combinedValues.accountBranch === "")
      ) {
        //create recipient for Tab 1
        createRecipient(combinedValues, setOpen(false));
      }
      // else if tab 2 is empty trigger validator for tab 2
      else if (
        combinedValues.recipientAccountNumber === "" ||
        combinedValues.accountBranch === ""
      ) {
        if (combinedValues.recipientAccountNumber === "") {
          form.setFields([
            {
              name: "recipientAccountNumber",
              errors: ["Recipient Account Number is Required!"],
            },
          ]);
          return; // Stop execution
        }

        if (combinedValues.accountBranch === "") {
          form.setFields([
            {
              name: "accountBranch",
              errors: ["Account Branch is Required!"],
            },
          ]);
          return; // Stop execution
        }
      } else {
        // create recipient for tab 1
        createRecipient(combinedValues, setOpen(false));
      }
    }

    //reset recipientBankDeatails on redux
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        recipientBankDeatails: {
          accountNumber: "",
          countryCode: "",
          bankCode: "",
          branchCode: "",
          key: "",
        },
      },
    });
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const handleCopy = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
  };

  const countryFlag = (
    <Tooltip title={`${recipientCountry?.name}`}>
      <Space align="center">
        <img
          src={getFlagURL(recipientCountry?.countryCode || "")}
          alt={recipientCountry?.name}
          style={{
            width: "24px",
            height: "18px",
            marginTop: "5px",
          }}
        />
      </Space>
    </Tooltip>
  );

  return (
    <Modal
      title={`Add a new recipient`}
      open={open}
      onCancel={handleCancel}
      //onOk={handleOk}
      width={600}
      onOk={() => {
        form.validateFields().then((values) => {
          onFormFinish(values);
        });
      }}
    >
      <Divider style={{ marginTop: "12px" }} />
      <p>
        Payment method ({replaceUnderScore(transferMethod)?.toLocaleUpperCase()}
        )
      </p>
      <Alert
        description={
          <span>
            It is your <b style={{ color: "red" }}>RESPONSIBILTY</b> to ensure
            the payment details are correct.
          </span>
        }
        type="info"
        showIcon
        closable
      />
      <div style={{ marginTop: "32px", width: "100%" }}>
        <Form
          form={form}
          layout="vertical"
          name="new_recipient_form"
          onFinish={onFormFinish}
          onFinishFailed={onFormFinishFailed}
          initialValues={initialValues}
        >
          <>
            <Form.Item
              name="firstName"
              label="First name"
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
              rules={[
                {
                  required: true,
                  message: "Please input last name!",
                },
              ]}
            >
              <Input size="large" placeholder="Last name" />
            </Form.Item>
          </>

          <Form.Item
            name="recipientCountry"
            label="Recipient Country"
            initialValue={recipientCountry?.countryCode}
            rules={[
              {
                required: true,
                message: "Please select recipient country",
              },
            ]}
          >
            <Select
              placeholder="Select recipient country"
              defaultValue={"CM"}
              size="large"
              allowClear
              //onChange={handleOnSelcetChange}
            >
              <Option value={recipientCountry?.countryCode}>
                {recipientCountry?.name}
              </Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="mobile"
            label="Phone number"
            validateDebounce={1500}
            rules={[
              {
                max: 9,
                min: 9,
                required: transferMethod === "mobile_money",
                message: "Phone number should be 9 digits!",
              },
            ]}
          >
            <Input
              addonBefore={countryFlag}
              size="large"
              type="numnber"
              placeholder="Phone number"
              onPaste={handlePaste}
              onCopy={handleCopy}
            />
          </Form.Item>

          {transferMethod === "mobile_money" && (
            <Form.Item
              name="confirmMobile"
              label="Confirm phone Number"
              validateDebounce={500}
              extra={
                isPhoneNumberMatched && (
                  <Text type="success">Numbers Matched!</Text>
                )
              }
              rules={[
                {
                  required: true,
                  validator: (_, value) => {
                    if (value !== form.getFieldValue("mobile")) {
                      setIsPhoneNumberMatched(false);
                      return Promise.reject(
                        "Numbers do not match, please update"
                      );
                    } else {
                      setIsPhoneNumberMatched(true);
                      return Promise.resolve();
                    }
                  },
                },
              ]}
            >
              <Input
                addonBefore={countryFlag}
                type="numnber"
                size="large"
                placeholder="Confirm phone number"
                onPaste={handlePaste}
                onCopy={handleCopy}
              />
            </Form.Item>
          )}

          {recipientCountry?.countryCode !== "CM" && (
            <Form.Item
              name="mobileMoneyProvider"
              label="Select Mobile Money Provider"
              initialValue={recipientCountry?.countryCode}
              rules={[
                {
                  required: true,
                  message: "Please Mobile Money Provider",
                },
              ]}
            >
              <Select
                placeholder="Select Mobile Money Provider"
                size="large"
                allowClear
                onChange={handleOnSelcetMMPChange}
              >
                {mobileMoneyProviderList[
                  recipientCountry?.countryCode || ""
                ].map((item: any, index: number) => (
                  <Option value={item.value} key={index + "CM"}>
                    {item.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          )}

          {transferMethod === "cash_pickup" && CashPickupMethod}

          {transferMethod === "bank_transfer" && (
            <Tabs defaultActiveKey="1" items={items} />
          )}

          <Divider />
        </Form>
      </div>
    </Modal>
  );
};

const CashPickupMethod = (
  <>
    <Form.Item
      name="pickupPoint"
      label="Pickup point"
      initialValue="SB Capital (Akwa)"
      rules={[
        {
          required: true,
          message: "Please select pickup point!",
        },
      ]}
    >
      <Select
        placeholder="Select a pickup location"
        defaultValue={"SB Capital (Akwa)"}
        size="large"
        allowClear
        //onChange={handleOnSelcetChange}
      >
        <Option value="SB Capital (Akwa)">SB Capital (Akwa)</Option>
      </Select>
    </Form.Item>
  </>
);

const MobileMoneyMethod = <></>;

const Microfinance = (
  <>
    <Form.Item
      name="bankName"
      label="Micro Finance Name"
      rules={[
        {
          required: true,
          message: "Please enter bank name!",
        },
      ]}
    >
      <Input size="large" placeholder="Bank name" />
    </Form.Item>
    <Form.Item
      name="recipientAccountNumber"
      label="Recipient Account Number"
      rules={[
        {
          required: false,
          message: "Please enter recipient account number!",
        },
      ]}
    >
      <Input type="numnber" size="large" placeholder="Account Number" />
    </Form.Item>
    <Form.Item
      name="accountBranch"
      label="Account Branch"
      rules={[
        {
          required: false,
          message: "Please enter account branch!",
        },
      ]}
    >
      <Input type="numnber" size="large" placeholder="Account Branch" />
    </Form.Item>
  </>
);

const AccountInputField = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const [bankCode, setBankCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [accountNo, setAccountNo] = useState("");
  const [key, setKey] = useState("");
  const [err, setErr] = useState(false);

  const countryCode = "CM21";

  useEffect(() => {
    const bankCodeRegex = /^\d{5}$/; // /^(\s)*[0-9]{5}(\s)*$/
    const branchCodeRegex = /^\d{5}$/;
    const accountNoRegex = /^\d{11}$/;
    const keyRegex = /^\d{2}$/;

    const isValidBankCode = bankCodeRegex.test(bankCode);
    const isValidBranchCode = branchCodeRegex.test(branchCode);
    const isValidAccountNo = accountNoRegex.test(accountNo);
    const isValidKey = keyRegex.test(key);

    if (
      isValidBankCode &&
      isValidBranchCode &&
      isValidAccountNo &&
      isValidKey
    ) {
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          recipientBankDeatails: {
            accountNumber: `${countryCode} ${bankCode} ${branchCode} ${accountNo} ${key}`,
            countryCode,
            bankCode,
            branchCode,
            key,
          },
        },
      });
      setErr(false);
    } else {
      setErr(true);
    }
  }, [bankCode, branchCode, accountNo, key]);

  return (
    <Space direction="vertical">
      <Space wrap>
        <Input size="large" value="CM21" disabled />
        <Input
          size="large"
          value={bankCode}
          placeholder="Bank Code"
          onChange={(e) => setBankCode(e.target.value)}
        />
        <Input
          size="large"
          value={branchCode}
          placeholder="Bank Branch"
          onChange={(e) => setBranchCode(e.target.value)}
        />
        <Input
          size="large"
          value={accountNo}
          placeholder="Account No"
          onChange={(e) => setAccountNo(e.target.value)}
        />
        <Input
          size="large"
          value={key}
          placeholder="Key"
          onChange={(e) => setKey(e.target.value)}
        />
      </Space>
      {err && (
        <Alert
          showIcon
          message="Use format CM21 10005 00001 01234567890 12"
          type="error"
        />
      )}
    </Space>
  );
};

const BankTransfer = (
  <>
    <Form.Item
      name="bankName"
      label="Beneficiary Bank Name"
      rules={[
        {
          required: true,
          message: "Please enter bank name!",
        },
      ]}
    >
      <Input size="large" placeholder="Bank Name" />
    </Form.Item>
    <AccountInputField />
  </>
);

const items: TabsProps["items"] = [
  {
    key: "1",
    label: "Bank",
    children: BankTransfer,
  },
  {
    key: "2",
    label: "Microfinance",
    children: Microfinance,
  },
];
