import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Button } from "antd";
import _env from "env";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPaymentStatus } from "redux/actions/actions";
import { getTransactionsInfo } from "redux/actions/actionsTransfer";
import { paths } from "util/paths";
import { Title } from "../app-dashboard/DashboardSyles";
import { checkPaymentCodeWithPattern } from "./PaymentCompleteHelper";
import {
  ExtraInfo,
  IconStyles,
  PaymentCompleteConatinerStyles,
  PaymentCompleteWrapperStyles,
} from "./PaymentCompleteStyle";

const options: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
};

export default function PaymentComplete() {
  const history = useHistory();
  let { transferId } = useParams<any>();
  const [trasnferInfo, setTransferInfo] = useState<any>();
  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [isRequestError, setIsrequestError] = useState(false);

  useEffect(() => {
    getTransactionsInfo(setTransferInfo, transferId);
  }, [transferId]);

  useEffect(() => {
    if (trasnferInfo !== undefined) {
      getPaymentStatus(axcess_checkout_id, updatePaymentInfo, OnErrorRequest);
    }
  }, [trasnferInfo]);

  const updatePaymentInfo = (data: any) => {
    setPaymentInfo(data);
  };

  const OnErrorRequest = () => {
    setIsrequestError(true);
  };

  const { totalToPay, axcess_checkout_id, transactionId } =
    trasnferInfo?.meta || {};

  const currentTimestamp = Date.now();
  const date = new Date(currentTimestamp);
  const formattedDate: string = date.toLocaleString("en-US", options);

  const PaymentCategoryIndex =
    checkPaymentCodeWithPattern(paymentInfo?.code) ?? 1; //fallback inprogress

  const AvatarIcons = [
    <CheckOutlined rev={undefined} />,
    <ClockCircleOutlined rev={undefined} />,
    <CloseOutlined rev={undefined} />,
  ];

  const PaymentTitle = [
    "Payment Successful!",
    "Payment Inprogress!",
    "Payment Unsuccessful!",
  ];

  const PaymentDescriptions = [
    <p>
      The payment has been completed successfully.
      <br /> Thanks for being there with us.
    </p>,
    <p>
      Payment in progress, <br /> Please note, it may take up to 5 minutes for
      the status of your transaction to be updated.
    </p>,
    <p>The payment was not completed successfully!</p>,
  ];

  const AvatarColors = ["#87d068", "#4259cf", "#CF0921"];
  const PaymentDescriptionsColors = ["#007B5D", "#4259cf", "#CF0921"];

  return (
    <PaymentCompleteConatinerStyles>
      {!paymentInfo ? (
        isRequestError ? (
          OnErrorRequestAlert
        ) : (
          <>
            <LoadingOutlined rev={undefined} />
            <span>Fetching payment infomations....</span>
          </>
        )
      ) : (
        <PaymentCompleteWrapperStyles>
          <>
            <IconStyles $color={AvatarColors[PaymentCategoryIndex]}>
              <Avatar
                className="avatar"
                size={60}
                icon={AvatarIcons[PaymentCategoryIndex]}
              />
            </IconStyles>
            <h2>
              {totalToPay} {trasnferInfo?.originCurrency}
            </h2>
            <Title>{PaymentTitle[PaymentCategoryIndex]}</Title>
            <ExtraInfo $color={PaymentDescriptionsColors[PaymentCategoryIndex]}>
              {PaymentDescriptions[PaymentCategoryIndex]}
              {/* <span> ~{paymentInfo?.message}~</span> */}
            </ExtraInfo>
            <span className="id_and_date">
              Transaction ID: SBR{transactionId}, {formattedDate}{" "}
            </span>
            <Button
              type="default"
              onClick={() => {
                history.push(paths.DASHBOARD);
              }}
            >
              Go back to dashboard
            </Button>
          </>
        </PaymentCompleteWrapperStyles>
      )}
    </PaymentCompleteConatinerStyles>
  );
}

const OnErrorRequestAlert = (
  <Alert
    className="alert"
    type="error"
    banner
    description={
      <span>
        Oops! Something went wrong with your request. Please{" "}
        <i>
          <a href={`${_env.APP_HOST}${paths.CONTACT}`}>Contact Us</a>
        </i>{" "}
        for assistance. Thank you!
      </span>
    }
  />
);

//Successful, unsuccessful, Payment processing
