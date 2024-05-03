import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps, RadioChangeEvent } from "antd";
import { Collapse, Divider, Modal, Radio, Space, Tag } from "antd";
import StoredCardSubmission from "components/modules/Trust-payments/TokenisedPayment";
import { queryClient } from "index";
import { MouseEventHandler, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import {
  initiateInteracTransferPayment,
  resetTransferData,
  updateTransferWithPaymentGatewayCharge,
} from "redux/actions/actions";
import { constants } from "util/constants";
import endpoints from "util/endpoints";
import {
  getMoneyValue,
  parseEndpointParameters,
} from "../../../../../util/util";
import { useGetTransfer } from "../../app-layout/appLayoutHelper";
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
  TrustPaymentOptionWrapper,
} from "./PayMethodsStyles";
import { PaymentGateWays } from "./paymentGateway";
import {
  generateCheckoutIDforAxcssPayment,
  generateCheckoutInfoForTrulayerPayment,
} from "./paymentHelper";
import PaymentRedirect from "components/modules/Trust-payments/PaymentRedirect";
import TokenisedPayment from "components/modules/Trust-payments/TokenisedPayment";
import { paths } from "util/paths";

interface LocationState {
  transfer: any;
}

interface TrustPaymentOptionsProps {
  type: "one-time" | "store-for-future" | "use-stored";
  enabled: boolean;
  transactionreference: string;
}

export default function Pay() {
  const location = useLocation();
  const history = useHistory();
  const user = useSelector((state: any) => state.auth.user);
  const transfer = useSelector((state: any) => state.transfer);
  const auth = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();
  const { clientIp } = transfer || {};
  const { verification } = auth || {};
  const [selectedMethod, setSelecetdMethod] = useState("axcess-payment");
  const [isTrustPayment, setIsTrustPayment] = useState(false);
  const [trustPaymentOptions, setTrustPaymentOptions] =
    useState<TrustPaymentOptionsProps>({
      type: "one-time",
      enabled: false,
      transactionreference: "",
    });

  let prevTransferInfo = (location.state as LocationState)?.transfer;
  const { data: freshTrasnferInfo, isLoading: isLoadingTransferInfo } =
    useGetTransfer(prevTransferInfo?.id);
  const transferInfo = freshTrasnferInfo || prevTransferInfo;

  const [loader, setLoader] = useState(false);

  const transferQueryKey = parseEndpointParameters(
    endpoints.GET_TRANSFER,
    user?.id,
    freshTrasnferInfo?.id
  );

  useEffect(() => {
    if (prevTransferInfo === undefined) {
      history.push(paths.DASHBOARD);
    }
    updateCurrentTransferBeforeRedirectToVericationsPage();
  }, [transferInfo, prevTransferInfo]);

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
    const initiatePayment = () => {
      queryClient.invalidateQueries(transferQueryKey);

      if (paymentMethod === "interac") {
        initiateInteracTransferPayment(+transferInfo.id);
      }
      if (paymentMethod === "truelayer") {
        //set up an action that get: payment_id, resource_token and return_uri from the server
        generateCheckoutInfoForTrulayerPayment(transferInfo.id, history);
      }
      if (paymentMethod === "axcess-payment") {
        generateCheckoutIDforAxcssPayment(transferInfo.id, history);
      }
      if (paymentMethod === "trust-payment") {
        setIsTrustPayment(true);
      }

      // clear redux store #transactions
      resetTransferData();
      setLoader(false);

      return;
    };

    updateTransferWithPaymentGatewayCharge(
      transferInfo.id,
      paymentMethod,
      clientIp,
      () => {
        initiatePayment(); //callback onSucc
      },
      () => {
        setLoader(false);
      }
    );
  };

  const onPayClick = () => {
    setLoader(true);
    handleProceed(selectedMethod);
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

  const getTotalToPay = () => {
    return (
      getMoneyValue(`${transferInfo?.meta?.totalToPay}`) +
      +transferInfo?.meta?.paymentGatewayCharge
    );
  };

  return (
    <>
      <PaymentMethodsContainerStyles>
        {isTrustPayment &&
          transferInfo?.meta?.paymentGatewayCharge !== undefined && (
            <TrustPaymentConfirmationModal
              transactionInfo={transferInfo}
              paymentMethod={selectedMethod}
              clientIp={clientIp}
              setTrustPaymentOptions={setTrustPaymentOptions}
              open={isTrustPayment}
              setOpen={() => setIsTrustPayment(false)}
            />
          )}

        {/* Initiate Trust Paymnet one-time or store for future use paymanet */}
        {((trustPaymentOptions.enabled &&
          trustPaymentOptions.type === "one-time") ||
          trustPaymentOptions.type === "store-for-future") && (
          <PaymentRedirect
            mainamount={getTotalToPay()}
            currencyiso3a={transferInfo?.originCurrency}
            transactionId={transferInfo?.meta?.transactionId}
            transferId={transferInfo?.id}
            enabled={trustPaymentOptions.enabled}
            setEnabled={() => setIsTrustPayment(false)} //close modal
            credentialsonfile={
              trustPaymentOptions.type === "one-time" ? "0" : "1"
            }
          />
        )}

        {/* Initiate Trust Paymnet use-stored card (Tokenised Payment) */}
        {trustPaymentOptions.enabled &&
          trustPaymentOptions.type === "use-stored" && (
            <TokenisedPayment
              currencyiso3a={transferInfo?.originCurrency}
              transferId={transferInfo?.id}
              transactionId={transferInfo?.meta?.transactionId}
              transactionreference={trustPaymentOptions.transactionreference} //"55-9-3627172"
              mainamount={getTotalToPay()}
              setEnabled={setTrustPaymentOptions}
            />
          )}

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
          disabled={isLoadingTransferInfo}
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

interface TrustPaymentConfirmationModalProps {
  open: boolean;
  setOpen: Function;
  transactionInfo: any;
  setTrustPaymentOptions: React.Dispatch<
    React.SetStateAction<TrustPaymentOptionsProps>
  >;
  paymentMethod: string;
  clientIp: string;
}

const TrustPaymentConfirmationModal = ({
  open,
  setOpen,
  transactionInfo,
  setTrustPaymentOptions,
  paymentMethod,
  clientIp,
}: TrustPaymentConfirmationModalProps) => {
  const user = useSelector((state: any) => state.auth.user);
  const { trustCards } = user?.meta || {};
  const trustCardsArray: any[] = trustCards && JSON.parse(trustCards);
  const isTrustCardsArrayEmpty = trustCardsArray.length === 0;

  const [newCardRadioValue, setNewCardRadioValue] = useState(
    isTrustCardsArrayEmpty ? 1 : 0
  );
  const [storedCardRadioValue, setStoredCardRadioValue] = useState("");

  const onRadioChange = (radioType: any) => (e: RadioChangeEvent) => {
    if (radioType === "stored-cards") {
      setStoredCardRadioValue(e.target.value);
      setNewCardRadioValue(0); //deselect state for new-cards
    } else {
      setNewCardRadioValue(e.target.value);
      setStoredCardRadioValue(""); //deselect state for new-cards
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const trustOptionsArray = [
    {
      title: "Use New Card (Save for Future Use)",
      description:
        "Pay with a new card and securely save its details for future payments.",
      value: 1,
    },
    {
      title: "Use New Card (One-time Use)",
      description:
        "Pay with a new card for this transaction only. No card details will be saved.",
      value: 2,
    },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Select a card you've previously stored",
      children: (
        <Radio.Group
          onChange={(e) => onRadioChange("stored-cards")(e)}
          style={{ margin: "12px 0px" }}
          value={storedCardRadioValue}
        >
          <Space direction="vertical" size={16}>
            {trustCardsArray.map((item, index) => (
              <TrustPaymentOptionWrapper
                value={item?.reference}
                key={item?.title + index}
              >
                <p>{item?.cardType}</p>
                <span>#### #### #### {item?.cardNumber}</span>
                {/* item.reference */}
              </TrustPaymentOptionWrapper>
            ))}
          </Space>
        </Radio.Group>
      ),
    },
    {
      key: "2",
      label: "Select a New Card",
      children: (
        <Radio.Group
          onChange={(e) => onRadioChange("new-cards")(e)}
          value={newCardRadioValue}
          style={{ margin: "12px 0px" }}
        >
          <Space direction="vertical" size={16}>
            {trustOptionsArray.map((item, index) => (
              <TrustPaymentOptionWrapper
                value={item.value}
                key={item.title + index}
              >
                <p>{item.title}</p>
                <span>{item.description}</span>
              </TrustPaymentOptionWrapper>
            ))}
          </Space>
        </Radio.Group>
      ),
    },
  ];

  const onContinue = () => {
    //storeNewCard || oneTimeUse || usePreviousStoredCard
    const isStoredNewCardSelected = newCardRadioValue === 1;
    const isOneTimeCardSelected = newCardRadioValue === 2;

    const isUsePreviousStoredCard = storedCardRadioValue !== ""; // storedCardRadioValue not deselected

    if (isUsePreviousStoredCard) {
      setTrustPaymentOptions((options) => ({
        ...options,
        type: "use-stored",
        enabled: true,
        transactionreference: storedCardRadioValue,
      }));
    } else if (isStoredNewCardSelected) {
      updateTransferWithPaymentGatewayCharge(
        transactionInfo?.id,
        paymentMethod,
        clientIp,
        () => {
          setTrustPaymentOptions((options) => ({
            ...options,
            type: "store-for-future",
            enabled: true,
          }));
        },
        () => {
          setOpen(false);
        }, //close confirmation modal onError
        true //pass a flag to server to store this card
      );
    } else if (isOneTimeCardSelected) {
      setTrustPaymentOptions((options) => ({
        ...options,
        type: "one-time",
        enabled: true,
      }));
    }
    handleCancel();
  };

  return (
    <Modal
      title="Trust Payment Options"
      open={open}
      width={600}
      onCancel={handleCancel}
      okText="Continue"
      onOk={onContinue}
      okButtonProps={{
        disabled: !(storedCardRadioValue !== "" || newCardRadioValue !== 0),
      }}
    >
      <Divider style={{ marginTop: "12px" }} />

      <Collapse
        accordion
        expandIconPosition="right"
        items={items}
        defaultActiveKey={isTrustCardsArrayEmpty ? ["2"] : ["1"]}
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rev={undefined} rotate={isActive ? 90 : 0} />
        )}
      />

      <Divider style={{ marginTop: "20px", marginBottom: "16px" }} />
    </Modal>
  );
};
