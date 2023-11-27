import {
  CheckOutlined,
  CloseOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Space } from "antd";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getPaymentStatus } from "redux/actions/actions";
import { getTransactionsInfo } from "redux/actions/actionsTransfer";
import { paths } from "util/paths";
import LargeButton from "../../utils/ReusablePageContent";
import { Title } from "../app-dashboard/DashboardSyles";
import {
  ExtraInfo,
  IconStyles,
  PaymentCompleteConatinerStyles,
  PaymentCompleteWrapperStyles,
} from "./PaymentCompleteStyle";
import _env from "env";

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

  const isPaymentSuccessfull = paymentInfo && paymentInfo.status !== "error";

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
          <IconStyles $type={isPaymentSuccessfull}>
            <Avatar
              className="avatar"
              size={60}
              icon={
                isPaymentSuccessfull ? (
                  <CheckOutlined rev={undefined} />
                ) : (
                  <CloseOutlined rev={undefined} />
                )
              }
            />
          </IconStyles>
          <h2>
            {totalToPay} {trasnferInfo?.originCurrency}
          </h2>
          <Title>
            {isPaymentSuccessfull ? "Payment completed!" : "Payment Failed!"}
          </Title>
          <ExtraInfo $type={isPaymentSuccessfull}>
            {isPaymentSuccessfull ? (
              <p>
                The payment has been completed sucessfully.
                <br /> Thanks for being there with us
              </p>
            ) : (
              <p>Hey, seems like there was some trouble!</p>
            )}
            <span> ~{paymentInfo?.message}~</span>
          </ExtraInfo>
          <span className="id_and_date">
            Transaction ID: SBR{transactionId}, {formattedDate}{" "}
          </span>
          <LargeButton
            text="Dashboard"
            onClick={() => {
              history.push(paths.DASHBOARD);
            }}
            hideBackBtn={true}
          />
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
