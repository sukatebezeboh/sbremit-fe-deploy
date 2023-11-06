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
} from "../app-transactions/TransactionDetail";
import {
  PaymentMethodCardStyles,
  PaymentMethodsContainerStyles,
  PaymentMethodsWrapperStyles,
  PleaseNoteStyles,
} from "./PayMethodsStyles";
import { generateCheckoutId } from "redux/actions/actions";
import { paths } from "util/paths";

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
    if (paymentMethod === "interac") {
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
    // this exp make api request to the server to generate checkout ID
    const handleCheckoutID = (checkoutID: string) => {
      if (checkoutID !== null) {
        history.push(paths.AXCESS_MERCHANT, {
          transaferId: transferInfo.id,
          checkoutId: checkoutID,
        });
      }
    };

    generateCheckoutId(transferInfo.id, handleCheckoutID);
  };

  const onPayClick = () => {
    setConfimModalData((confirmModalData) => ({
      ...confirmModalData,
      message: `Are you sure you want to procced?`,
      open: true,
    }));
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Transfer details",
      children: (
        <>
          <RecipientDetails
            transaction={transferInfo}
            noBorder={true}
            title="Recipient’s details"
          />
          <TransactionDetails
            transaction={transferInfo}
            noBorder={true}
            title="Transfer details"
          />
        </>
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
        onCancel={() => {
          setConfimModalData((confirmModalData) => ({
            ...confirmModalData,
            open: false,
          }));
        }}
      />
      <PaymentMethodsContainerStyles>
        <TransactionsSteps step="pay" />
        <PageTitileAndDescription
          title="Select payment method"
          description="How would u like to pay?💳"
        />
        <PaymentMethodsWrapperStyles>
          <Collapse size="large" className="transfer_details" items={items} />
          {PAYMENT_GATEWAYS.map((method, index) => (
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

export const PAYMENT_GATEWAYS = [
  {
    slug: "axcess-payment",
    method: "Pay with card",
    provider: "Axcess Merchant",
    label: (transaction: any) =>
      transaction?.meta?.destinationCountryCode === "CM"
        ? `0.00 ${transaction?.originCurrency}`
        : `0.99 ${transaction?.originCurrency}`,
    isRecommended: true,
  },
  {
    slug: "truelayer",
    method: "Instant bank transfer",
    provider: "True Layer",
    label: (transaction: any) => `0.00 ${transaction?.originCurrency}`,
    isRecommended: false,
  },
];

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

{
  /* <ConfirmModal
  message="Are you sure you want to cancel this transfer?"
  onSave={{
    label: "Yes, cancel",
    fn: () => handleCancel(),
  }}
  onCancel={{
    label: "No, don't cancel",
    fn: () => setOpenConfirmModal(null),
  }}
/>; */
}

// const proceedToPayment = () => {
//   if(!allowSkipVerification && !checkUserVerification()){
//     checkUserVerification()
//     return
//   }
//   if (!selected) {
//     setShowSelected(true);
//     return;
//   }
//   // TODO: Simplyfy checkTransactionBeforePayment and take out of redux
//   SBReduxActions.checkTransactionBeforePayment((transactions: any) => {
//     const thisTransaction = transactions.find(
//       (tranz: any) => tranz.id === transaction?.id,
//     );

//     if (!thisTransaction) {
//       return;
//     }
//     if (
//       thisTransaction.status?.toUpperCase() !==
//       constants.TRANSFER_STATUS_PENDING
//     ) {
//       return setTransactionPaidFor(true);
//     }
//     dispatch({
//       type: 'TRANSFER',
//       payload: {...transfer, paymentMethod: selected},
//     });

//     if (selected === 'interac') {
//       SBReduxActions.initiateInteracTransferPayment(transferId, toWebPayment);
//     }
//     if (selected === 'truelayer') {
//       SBReduxActions.fetchTruelayerProviders((providers: any) => {
//         setTruelayerProviders(providers);
//         setShowTruelayerOptions(true);
//       });
//     }
//     if (selected === 'trust-payment') {
//       const baseUrl = Config?.WEB_APP_URL + '/trustPayment-for-mobile';

//       const trustPaymentUrl = `${baseUrl}?currency=${
//         transaction?.originCurrency
//       }&amount=${getTotalToPay()}&transactionId=${
//         transaction?.meta?.transactionId
//       }&transferId=${transferId}`;

//       toWebPayment(trustPaymentUrl);
//     }
//   });
// };
