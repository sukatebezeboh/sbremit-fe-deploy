import { CaretRightOutlined } from "@ant-design/icons";
import type { CollapseProps, RadioChangeEvent } from "antd";
import { Collapse, Divider, Empty, Modal, Radio, Space, Tag } from "antd";
import PaymentRedirect from "components/modules/Trust-payments/PaymentRedirect";
import TokenisedPayment from "components/modules/Trust-payments/TokenisedPayment";
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
import endpoints from "util/endpoints";
import { paths } from "util/paths";
import {
  getMoneyValue,
  parseEndpointParameters,
} from "../../../../../util/util";
import { useGetTransfer, useUserData } from "../../app-layout/appLayoutHelper";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import { formatAmount } from "../../utils/reuseableUtils";
import { TransactionsInfomations } from "../app-transactions/TransactionDetail";
import {
  CollapseWrapper,
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

  const isRecommendedGateWayPayment = PaymentGateWays(transferInfo)?.find(
    (paymentGateWay: any) => paymentGateWay?.isRecommended === true
  )?.slug;

  const [selectedMethod, setSelecetdMethod] = useState(
    isRecommendedGateWayPayment || ""
  );
  const [isTrustPayment, setIsTrustPayment] = useState(false);
  const [trustPaymentOptions, setTrustPaymentOptions] =
    useState<TrustPaymentOptionsProps>({
      type: "one-time",
      enabled: false,
      transactionreference: "",
    });

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
  const { data: userData } = useUserData(user.id);
  const { trustCards } = userData?.meta || {};
  const trustCardsArray: any[] = trustCards && JSON.parse(trustCards);
  const isTrustCardsArrayEmpty =
    trustCardsArray?.length === 0 || trustCardsArray === undefined;

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
      title: "Yes",
      value: 1,
    },
    {
      title: "No",
      value: 2,
    },
  ];

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Select a saved card",
      children: isTrustCardsArrayEmpty ? (
        <Empty />
      ) : (
        <Radio.Group
          onChange={(e) => onRadioChange("stored-cards")(e)}
          style={{ margin: "12px 0px" }}
          value={storedCardRadioValue}
        >
          <Space direction="vertical" size={16}>
            {trustCardsArray?.map((item, index) => (
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
      label: "Add new card",
      children: (
        <Radio.Group
          onChange={(e) => onRadioChange("new-cards")(e)}
          value={newCardRadioValue}
          style={{ margin: "12px 0px" }}
        >
          <Space direction="vertical" size={20}>
            <span style={{ color: "#333", fontSize: 16 }}>
              Do you want to save card for future use?
            </span>
            <Space direction="vertical" size={16}>
              {trustOptionsArray.map((item, index) => (
                <Radio value={item.value} key={item.title + index}>
                  {item.title}
                </Radio>
              ))}
            </Space>
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
      title="Debit card payment options"
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

      <CollapseWrapper
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
