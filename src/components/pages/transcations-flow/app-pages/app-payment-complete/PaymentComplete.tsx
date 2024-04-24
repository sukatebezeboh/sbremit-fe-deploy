import {
  CheckOutlined,
  ClockCircleOutlined,
  CloseOutlined,
  GiftOutlined,
} from "@ant-design/icons";
import { Alert, Avatar, Button } from "antd";
import _env from "env";
import { queryClient } from "index";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { getPaymentStatus } from "redux/actions/actions";
import { constants } from "util/constants";
import { paths } from "util/paths";
import { useGetTransfer } from "../../app-layout/appLayoutHelper";
import { CustomError, CustomLoader } from "../../utils/ReusablePageContent";
import { Title } from "../app-dashboard/DashboardSyles";
import {
  AvatarColors,
  PaymentDescriptionsColors,
  PaymentTitle,
  checkPaymentCodeWithPattern,
  getEquivalentVoucherPoints,
} from "./PaymentCompleteHelper";
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
  const location = useLocation();
  let { transferId } = useParams<any>();
  const [paymentInfo, setPaymentInfo] = useState<any>();
  const [isRequestError, setIsrequestError] = useState(false);
  const transactions = useSelector((state: any) => state.transactions);

  const {
    data: trasnferInfo,
    isLoading,
    isError,
    error,
  } = useGetTransfer(transferId);

  //clean pathname if it's truelayer and has multiple '?'' symabols
  useEffect(() => {
    if (location.search.includes("payment_type=truelayer")) {
      //remove everything after the first '?' if any.
      const cleanedUrl =
        location.pathname + location.search.replace(/(\?.*?)\?.*/, "$1");

      history.replace(cleanedUrl);
    }
  }, [location.search, location.pathname, history]);

  const searchParams = new URLSearchParams(location.search);
  const isTrulayerPayment = searchParams.get("payment_type") === "truelayer";

  useEffect(() => {
    if (
      trasnferInfo !== undefined &&
      trasnferInfo?.status === constants.TRANSFER_STATUS_PENDING
    ) {
      if (isTrulayerPayment) {
        getPaymentStatus(
          transferId,
          updatePaymentInfo,
          onErrorRequest,
          "truelayer"
        );
      } else {
        getPaymentStatus(
          axcess_checkout_id,
          updatePaymentInfo,
          onErrorRequest,
          "axcessms"
        );
      }
    }
  }, [trasnferInfo]);

  const updatePaymentInfo = (data: any) => {
    setPaymentInfo(data);
    queryClient.invalidateQueries(transactions.queryKey);
  };

  const onErrorRequest = () => {
    setIsrequestError(true);
  };

  const { totalToPay, axcess_checkout_id, transactionId } =
    trasnferInfo?.meta || {};

  const currentTimestamp = Date.now();
  const date = new Date(currentTimestamp);
  const formattedDate: string = date.toLocaleString("en-US", options);

  const statusOrCodeRes = isTrulayerPayment
    ? paymentInfo?.status
    : paymentInfo?.code;

  const PaymentCategoryIndex = statusOrCodeRes
    ? checkPaymentCodeWithPattern(isTrulayerPayment, statusOrCodeRes)
    : 1; //fallback inprogress

  const AvatarIcons = [
    <CheckOutlined rev={undefined} />,
    <ClockCircleOutlined rev={undefined} />,
    <CloseOutlined rev={undefined} />,
  ];

  const PaymentDescriptions = [
    <p>Your transfer with ID: {transactionId} is being processed.</p>,
    <p>Your transfer with ID: {transactionId} is being processed.</p>,
    <p>Your transfer with ID: {transactionId} was not completed.</p>,
  ];

  if (isLoading) {
    return (
      <PaymentCompleteConatinerStyles>
        <CustomLoader prompt="Fetching transaction details..." />
      </PaymentCompleteConatinerStyles>
    );
  }
  if (isError) {
    const err: any = error;
    const errMessage = err?.message;
    return (
      <PaymentCompleteConatinerStyles>
        <CustomError message={errMessage} />
      </PaymentCompleteConatinerStyles>
    );
  }

  if (isRequestError) {
    return (
      <PaymentCompleteConatinerStyles>
        {onErrorRequestAlert}
      </PaymentCompleteConatinerStyles>
    );
  }

  return (
    <PaymentCompleteConatinerStyles>
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
          </ExtraInfo>

          <Button
            type="primary"
            size="large"
            onClick={() => {
              history.push(paths.DASHBOARD);
            }}
          >
            Go back to dashboard
          </Button>

          {PaymentCategoryIndex !== 2 && (
            <PromotionsAlert
              tranferAmount={trasnferInfo?.originAmount}
              originCurrency={trasnferInfo?.originCurrency}
            />
          )}
        </>
      </PaymentCompleteWrapperStyles>
    </PaymentCompleteConatinerStyles>
  );
}

const onErrorRequestAlert = (
  <Alert
    className="alert"
    type="error"
    banner
    description={
      <span>
        Oops! Something went wrong with your request. Please{" "}
        <u>
          <i>
            <a href={`${_env.APP_HOST}${paths.CONTACT}`}>Contact Us</a>
          </i>
        </u>{" "}
        for assistance. Thank you!
      </span>
    }
  />
);

const PromotionsAlert = ({
  tranferAmount,
  originCurrency,
}: {
  tranferAmount: string;
  originCurrency: string;
}) => {
  const user = useSelector((state: any) => state.auth.user);
  return (
    <Alert
      type="info"
      showIcon
      icon={<GiftOutlined rev={undefined} />}
      description={
        <span>
          This transfer has earned you{" "}
          <strong>
            {getEquivalentVoucherPoints(Number(tranferAmount), originCurrency)}
            pts.
          </strong>{" "}
          Total points earned so far{" "}
          <strong>{user?.meta?.VoucherPoints}pts.</strong> 500pts = GBP 5
        </span>
      }
    />
  );
};
