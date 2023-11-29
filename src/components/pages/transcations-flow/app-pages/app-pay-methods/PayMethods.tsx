import type { CollapseProps } from "antd";
import { Collapse, Tag } from "antd";
import { ConfirmModal } from "components/modules/confirm-modal/ConfirmModal";
import { MouseEventHandler, useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { constants } from "util/constants";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import {
  RecipientDetails,
  TransactionDetails,
  TransactionsInfomations,
} from "../app-transactions/TransactionDetail";
import {
  PaymentMethodCardStyles,
  PaymentMethodsContainerStyles,
  PaymentMethodsWrapperStyles,
  PleaseNoteStyles,
} from "./PayMethodsStyles";
import {
  generateCheckoutId,
  initiateInteracTransferPayment,
} from "redux/actions/actions";
import { paths } from "util/paths";
import { PaymentGateWays } from "./paymentGateway";

interface LocationState {
  transfer: any;
}

export default function Pay() {
  const location = useLocation();
  const history = useHistory();
  const [selectedMethod, setSelecetdMethod] = useState("axcess-payment");
  const transferInfo = (location.state as LocationState)?.transfer;
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
  }, [transferInfo]);

  ///---Open paymenent method hosted pages
  const handleProceed = (paymentMethod: string) => {
    //close Confirmation modal
    closeConfirmationModal();

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
    setConfimModalData((confirmModalData) => ({
      ...confirmModalData,
      message: `Are you sure you want to procced?`,
      open: true,
    }));
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
      <ConfirmModal
        type="warning"
        open={confirmModalData.open}
        title={confirmModalData.title}
        message={confirmModalData.message}
        onSave={() => {
          handleProceed(selectedMethod);
        }}
        onCancel={closeConfirmationModal}
      />
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
          <PleaseNote />
        </PaymentMethodsWrapperStyles>
        <LargeButton text="Pay" onClick={onPayClick} hideBackBtn={true} />
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

const PleaseNote = () => {
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
          <span className="green_text">10.22 GBP</span> to complete your
          transfer
        </li>
      </ol>
    </PleaseNoteStyles>
  );
};
