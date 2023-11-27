import { SwapOutlined } from "@ant-design/icons";

import {
  Alert,
  Badge,
  Button,
  Descriptions,
  Divider,
  Modal,
  Space,
  Steps,
  Tabs,
  TabsProps,
} from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { constants } from "util/constants";
import {
  formatAmount,
  getPaymentEstimatedTime,
  possibleIssues,
  replaceUnderScore,
  transferMethodsInWords,
} from "../../utils/reuseableUtils";
import {
  ModalMarginTop,
  TransactionDetailModalStyles,
  columnSizes,
} from "../../utils/stylesVariables";
import {
  convertDateAndTimeString,
  formatTransactionStatus,
  thisRecipient,
} from "./TransactionHelper";
import {
  ExchnageStyles,
  FlexContainerWithSpaceBtw,
  FraudReaonsStyles,
  TransactionDetailContentStyle,
  TransactionDetailStyle,
  TransactionIdStyles,
} from "./TranscationStyles";
import { paths } from "util/paths";
import { useHistory } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import { TrnsferDetailsActionButtons } from "../../utils/ReusablePageContent";

interface TransactionDetailProps {
  open: boolean;
  setOpen: Function;
  transaction: any;
}

export const TransactionDetail = ({
  open,
  setOpen,
  transaction,
}: TransactionDetailProps) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const recipients = useSelector((state: any) => state.recipients.recipients);
  const recipient = thisRecipient(recipients, transaction.recipientId);
  const {
    transferMethod,
    originAmount,
    originCurrency,
    destinationAmount,
    destinationCurrency,
    status,
    dateCreated,
  } = transaction || {};

  const { decline_reason } = transaction?.meta || {};

  const resendTransfer = () => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        payinActualValue: originAmount,
        payoutActualValue: destinationAmount,
        payoutCurrency: destinationCurrency,
        transferMethod,
      },
    });
    //then naviagate to get quoute
    history.push(paths.GET_QUOTE);
  };

  return (
    <Modal
      title="Transfer Details"
      open={open}
      onCancel={() => setOpen(false)}
      width={680}
      styles={TransactionDetailModalStyles}
      style={ModalMarginTop}
      footer={null}
      className="transcationDetailModal"
    >
      <TransactionDetailStyle>
        {/* section 1 */}
        <TransactionDetailContentStyle>
          <Space
            size="middle"
            direction="vertical"
            className="section_wrapper"
            split={<Divider style={{ margin: 0 }} />}
          >
            <FlexContainerWithSpaceBtw>
              <Space direction="vertical" size={0}>
                <strong>
                  {recipient?.firstName} {recipient?.lastName}
                </strong>
                <TransactionIdStyles>
                  {convertDateAndTimeString(dateCreated)}
                </TransactionIdStyles>
              </Space>
              <ExchnageStyles>
                <span>
                  {originCurrency || "-"} {formatAmount(originAmount) || "-"}
                </span>
                <SwapOutlined className="icon" rev={undefined} />
                <span>
                  {destinationCurrency || "-"}{" "}
                  {formatAmount(destinationAmount) || "-"}
                </span>
              </ExchnageStyles>
            </FlexContainerWithSpaceBtw>
            <FlexContainerWithSpaceBtw>
              <Badge
                color={
                  formatTransactionStatus(status).color == "error"
                    ? "red"
                    : formatTransactionStatus(status).color
                }
                text={formatTransactionStatus(status).text}
              />
              <TrnsferDetailsActionButtons
                status={status}
                transaction
                resendTransfer={resendTransfer}
                history
              />
            </FlexContainerWithSpaceBtw>
            {status === constants.TRANSFER_STATUS_PAYMENT_DECLINED && (
              <Alert
                message="Reason:"
                description={decline_reason}
                type="info"
                showIcon
              />
            )}
            {transaction?.status === constants.TRANSFER_PAYMENT_FRAUD && (
              <Alert
                message="Possible Reason:"
                description={<FraudReaons />}
                type="warning"
                showIcon
              />
            )}
          </Space>
        </TransactionDetailContentStyle>
        {/* section 2 */}
        <TransactionDetailContentStyle $bgColor="#007B5D">
          <TransactionsDetailsSteps transaction={transaction} />
          <TransactionIdStyles $Color="#FFF">
            Expected delivery time: {getPaymentEstimatedTime(transferMethod)}
          </TransactionIdStyles>
        </TransactionDetailContentStyle>
        {/* section 3 */}
        <TransactionDetailContentStyle>
          <TransactionsInfomations transaction={transaction} />
        </TransactionDetailContentStyle>
      </TransactionDetailStyle>
    </Modal>
  );
};

const FraudReaons = () => {
  return (
    <FraudReaonsStyles>
      {/* <p></p> */}
      {possibleIssues.map((issues, index) => (
        <div className="reason">
          <div className="dot" />
          <TransactionIdStyles>{issues}</TransactionIdStyles>
        </div>
      ))}
    </FraudReaonsStyles>
  );
};

const TransactionsDetailsSteps = ({ transaction }: { transaction: any }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const { status, approved, dateCreated, originCurrency, destinationCurrency } =
    transaction;

  const vendorStatus = approved;
  const paymentStatus = status === constants.TRANSFER_STATUS_PAYMENT_COMPLETED;
  const recipientStatus = status === constants.TRANSFER_STATUS_COMPLETE;

  const paymentRecieved = paymentStatus && !vendorStatus;
  const vendorProcessing = vendorStatus && paymentStatus;
  const recipientPaid: any = recipientStatus;

  useEffect(() => {
    if (paymentRecieved) {
      setCurrentStep(1);
    } else if (vendorProcessing) {
      setCurrentStep(2);
    } else if (recipientPaid) {
      setCurrentStep(3);
    } else {
      setCurrentStep(0);
    }
  }, [transaction]);

  return (
    <Steps
      current={currentStep}
      progressDot
      direction="vertical"
      size="small"
      items={[
        {
          title: "Transfer Created",
          description: `${convertDateAndTimeString(dateCreated)}`,
        },
        {
          title: `Received ${originCurrency} payment`,
        },
        {
          title: "Vendor processing transfer",
        },
        {
          title: `Recipient receives ${destinationCurrency}`,
        },
      ]}
    />
  );
};

export const TransactionsInfomations = ({
  transaction,
}: {
  transaction: any;
}) => {
  //console.log("Trans: ", transaction);
  const onChange = (key: string) => {
    //console.log(key);
  };
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Recipient’s Details",
      children: <RecipientDetails transaction={transaction} />,
    },
    {
      key: "2",
      label: "Transfer Details",
      children: <TransactionDetails transaction={transaction} />,
    },
  ];
  return <Tabs defaultActiveKey="1" items={items} onChange={onChange} />;
};

interface TransactionInfomationProps {
  transaction: any;
  noBorder?: boolean;
  title?: string;
  extra?: any;
}

export const RecipientDetails = ({
  transaction,
  noBorder,
  title,
}: TransactionInfomationProps) => {
  const recipients = useSelector((state: any) => state.recipients.recipients);
  const recipient = thisRecipient(recipients, transaction?.recipientId);
  const {
    transferMethod,
    mobileMoneyProvider,
    mobile,
    phoneCode,
    pickupPoint,
    bankName,
    accountNumber,
  } = recipient?.profile || {};
  return (
    <Descriptions
      title={title}
      column={columnSizes}
      bordered={noBorder ? false : true}
    >
      <Descriptions.Item label="Name">
        {recipient?.firstName || "--"} {recipient?.lastName || "--"}
      </Descriptions.Item>
      {/* Mobile Money */}
      {transferMethod === "mobile_money" && (
        <>
          <Descriptions.Item label="Network provider">
            {mobileMoneyProvider || "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile No">
            {phoneCode || "--"} {mobile || "--"}
          </Descriptions.Item>
        </>
      )}
      {/* Cash Pickup */}
      {transferMethod === "cash_pickup" && (
        <>
          <Descriptions.Item label="Pickup Point">
            {pickupPoint || "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Mobile No">
            {phoneCode || "--"} {mobile || "--"}
          </Descriptions.Item>
        </>
      )}
      {/* Bank Transfer */}
      {transferMethod === "bank_transfer" && (
        <>
          <Descriptions.Item label="Bank Name">
            {bankName || "--"}
          </Descriptions.Item>
          <Descriptions.Item label="Account No">
            {accountNumber || "--"}
          </Descriptions.Item>
        </>
      )}
    </Descriptions>
  );
};

export const TransactionDetails = ({
  transaction,
  noBorder,
  title,
}: TransactionInfomationProps) => {
  const {
    transferMethod,
    originAmount,
    originCurrency,
    destinationAmount,
    destinationCurrency,
  } = transaction || {};

  const {
    exchangeBase,
    exchangeRate,
    exchangeTarget,
    referralDiscount,
    serviceFee,
    transferCharge,
    promoDiscount,
    totalToPay,
  } = transaction?.meta || {};
  return (
    <Descriptions
      title={title}
      column={columnSizes}
      bordered={noBorder ? false : true}
    >
      <Descriptions.Item label="Transfer Method">
        {replaceUnderScore(
          transferMethodsInWords[transferMethod]
        )?.toUpperCase() || "--"}
      </Descriptions.Item>
      <Descriptions.Item label="You send">
        {formatAmount(originAmount)} {originCurrency}
      </Descriptions.Item>
      <Descriptions.Item label="Exchange rate">
        1 {exchangeBase} = {formatAmount(exchangeRate)} {exchangeTarget}
      </Descriptions.Item>
      <Descriptions.Item label="Referral Discount">
        {formatAmount(referralDiscount)} {exchangeBase}
      </Descriptions.Item>
      <Descriptions.Item label="Operator fee">
        + {formatAmount(serviceFee)} {exchangeBase}
      </Descriptions.Item>
      <Descriptions.Item label="SBRemit Transfer Charge">
        {formatAmount(transferCharge)} {exchangeBase}
      </Descriptions.Item>
      <Descriptions.Item label="Promo Discount">
        {formatAmount(promoDiscount)} {exchangeBase}
      </Descriptions.Item>
      <Descriptions.Item label="They Get">
        {formatAmount(destinationAmount)} {destinationCurrency}
      </Descriptions.Item>
      <Descriptions.Item label="Total To Pay">
        {formatAmount(totalToPay)} {exchangeBase}
      </Descriptions.Item>
    </Descriptions>
  );
};
