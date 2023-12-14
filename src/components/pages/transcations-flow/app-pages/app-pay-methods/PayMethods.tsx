import type { CollapseProps } from "antd";
import { Collapse, Tag } from "antd";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import {
  generateCheckoutId,
  initiateInteracTransferPayment,
  resetTransferData,
  updateTransferWithPaymentGatewayCharge,
} from "redux/actions/actions";
import { constants } from "util/constants";
import { paths } from "util/paths";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import { formatAmount } from "../../utils/reuseableUtils";
import { TransactionsInfomations } from "../app-transactions/TransactionDetail";
import {
  PaymentMethodCardStyles,
  PaymentMethodsContainerStyles,
  PaymentMethodsWrapperStyles,
  PleaseNoteStyles,
} from "./PayMethodsStyles";
import { PaymentGateWays } from "./paymentGateway";

interface LocationState {
  transfer: any;
}

export default function Pay() {
  const location = useLocation();
  const history = useHistory();
  const transfer = useSelector((state: any) => state.transfer);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { clientIp } = transfer || {};
  const { verification } = auth || {};
  const [selectedMethod, setSelecetdMethod] = useState("axcess-payment");
  const transferInfo = (location.state as LocationState)?.transfer;
  const [loader, setLoader] = useState(false);
  const [confirmModalData, setConfimModalData] = useState({
    open: false,
    title: "Confirmation Required!",
    message: "",
  });

  useEffect(() => {
    if (
      transferInfo.status?.toUpperCase() !== constants.TRANSFER_STATUS_PENDING
    ) {
    }
    updateCurrentTransferBeforeRedirectToVericationsPage();
  }, [transferInfo]);

  //this ensure we have a transcation to be used once the user is done with verification process
  const updateCurrentTransferBeforeRedirectToVericationsPage = () => {
    if (!verification) {
      return dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          currentTransferBeforeRedirectVericationsPage: transferInfo,
        },
      });
    } else {
      return;
    }
  };

  ///---Open paymenent method hosted pages
  const handleProceed = (paymentMethod: string) => {
    updateTransferWithPaymentGatewayCharge(
      transferInfo.id,
      paymentMethod,
      clientIp
    );
    //close Confirmation modal
    //closeConfirmationModal();

    if (paymentMethod === "interac") {
      initiateInteracTransferPayment(+transferInfo.id);
    }
    if (paymentMethod === "truelayer") {
      history.push(paths.TRUELAYER_PROVIDERS, { transaferId: transferInfo.id });
    }
    if (paymentMethod === "axcess-payment") {
      generateCheckoutIDforAxcssPayment(transferInfo);
    }
    // clear redux store #transactions
    resetTransferData();
    setLoader(false);
  };

  const generateCheckoutIDforAxcssPayment = (transfer: any) => {
    const handleCheckoutID = (checkoutID: string) => {
      if (checkoutID !== null) {
        history.push(paths.AXCESS_MERCHANT, {
          transaferId: transferInfo.id,
          checkoutId: checkoutID,
        });
      }
    };

    // this exp make api request to the server to generate checkout ID
    generateCheckoutId(transferInfo.id, handleCheckoutID, history);
  };

  const onPayClick = () => {
    setLoader(true);
    handleProceed(selectedMethod);

    // setConfimModalData((confirmModalData) => ({
    //   ...confirmModalData,
    //   message: `Are you sure you want to procced?`,
    //   open: true,
    // }));
  };

  const closeConfirmationModal = () => {
    setConfimModalData((confirmModalData) => ({
      ...confirmModalData,
      open: false,
    }));
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Transfer details",
      children: (
        <TransactionsInfomations transaction={transferInfo} noBorder={true} />
      ),
    },
  ];

  return (
    <>
      {/* <ConfirmModal
        type="warning"
        open={confirmModalData.open}
        title={confirmModalData.title}
        message={confirmModalData.message}
        onSave={() => {
          handleProceed(selectedMethod);
        }}
        onCancel={closeConfirmationModal}
      /> */}
      <PaymentMethodsContainerStyles>
        <TransactionsSteps step="pay" />
        <PageTitileAndDescription
          title="Select payment method"
          description="How would u like to pay?💳"
        />
        <PaymentMethodsWrapperStyles>
          <Collapse size="large" className="transfer_details" items={items} />
          {PaymentGateWays(transferInfo)?.map((method, index) => (
            <PaymentMethodCard
              selected={selectedMethod == method.slug ? true : false}
              title={method.method}
              description={`Power by ${method.provider}`}
              recomended={method.isRecommended}
              imgUrl={`assets/logos/${method.slug}.png`}
              onClick={() => setSelecetdMethod(method.slug)}
              key={method.method + index}
            />
          ))}
          <PleaseNote
            totalToPay={`${formatAmount(transferInfo?.meta?.totalToPay)} ${
              transferInfo?.meta?.exchangeBase
            }`}
          />
        </PaymentMethodsWrapperStyles>
        <LargeButton
          text="Pay"
          onClick={onPayClick}
          hideBackBtn={true}
          loading={loader}
        />
      </PaymentMethodsContainerStyles>
    </>
  );
}

interface PaymentMethodCardProps {
  imgUrl: string;
  title: string;
  description: string;
  selected: boolean;
  recomended: boolean;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const PaymentMethodCard = ({
  imgUrl,
  selected,
  title,
  description,
  recomended,
  onClick,
}: PaymentMethodCardProps) => {
  return (
    <PaymentMethodCardStyles $selected={selected} onClick={onClick}>
      <div className="img_and_method_name">
        <div className="imgWrapper">
          <img src={imgUrl} alt={title} />
        </div>
        <div className="method_name">
          <p>{title}</p>
          <span>{description}</span>
        </div>
      </div>
      {recomended && (
        <Tag color="#FCD20F" className="recomended">
          Recomended
        </Tag>
      )}
      <div className="select">
        <div className="dot" />
      </div>
    </PaymentMethodCardStyles>
  );
};

const PleaseNote = ({ totalToPay }: any) => {
  return (
    <PleaseNoteStyles>
      <p>Please note:</p>
      <ol>
        <li>
          Please ensure the <span className="green_text">payment</span> details
          of your recipient are correct.{" "}
          <span className="red_text">
            Any error after this step cannot be corrected
          </span>
        </li>
        <li>
          If all details are correct, proceed to pay the sum of{" "}
          <span className="green_text">{totalToPay}</span> to complete your
          transfer
        </li>
      </ol>
    </PleaseNoteStyles>
  );
};
