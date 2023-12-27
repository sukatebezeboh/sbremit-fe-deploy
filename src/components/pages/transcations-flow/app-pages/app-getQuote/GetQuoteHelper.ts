//const {exchangeRate, payinCurrency, payoutCurrency, } = transferState

import store from "redux/store";
import http from "util/http";
import { userAppValues } from "../../utils/useAppValues";
import { toastAction } from "redux/actions/actions";
import { LOADING } from "redux/actionTypes";

//trnafer method to index
const transferMethodIds: any = {
  mobile_money: "1",
  bank_transfer: "2",
  cash_pickup: "3",
};

export const getTransactionQuoteRequest = async (
  method: string,
  callback: Function,
  onErrorCallback: Function
) => {
  const userId = store.getState().auth.user?.id;
  const transfer = store.getState().transfer;
  const {
    payinCurrency,
    payoutCurrency,
    allowOperatorFee,
    payinActualValue,
    promoCode,
    payoutActualValue,
  } = transfer;
  const { PayoutCountries, PayinCountries } = userAppValues();

  const payload: { base: string; target: string; meta?: any } = {
    base: payinCurrency,
    target: payoutCurrency,
    meta: { userId },
  };
  try {
    const { data } = await http.post("/quote", payload);

    const destinationCountryCode = PayoutCountries?.find(
      (country) => country.currency === payoutCurrency
    )?.countryCode;
    const originCountryCode = PayinCountries.find(
      (country) => country.currency === payinCurrency
    )?.countryCode;
    const exchangeRateQuoteId = data?.data?.id;

    const payloadForFinalQoute = {
      transferMethodId: transferMethodIds[method || ""],
      originCurrency: payinCurrency,
      originAmount: String(payinActualValue),
      destinationCurrency: payoutCurrency,
      includeOperatorFee: allowOperatorFee,
      exchangeRateQuoteId: exchangeRateQuoteId,
      promoCode: promoCode,
      destinationCountryCode,
      originCountryCode,
      calculatorDestinationAmount: payoutActualValue,
    };

    await http.post("/transfer/quote", payloadForFinalQoute).then((res) => {
      store.dispatch({
        type: LOADING,
        payload: "IInitializing your transfer...",
      });
      if (res.data.status === "200") {
        return callback(res.data.data);
      } else {
        onErrorCallback();
        toastAction({
          show: true,
          type: "error",
          timeout: 15000,
          message:
            res.data.error.message || "An error occurred. Please try again.",
        });
      }
      store.dispatch({ type: LOADING, payload: false });
    });
  } catch (error: any) {
    onErrorCallback();
    toastAction({
      show: true,
      type: "error",
      timeout: 15000,
      message: "An error occurred. Please try again.",
    });
  }
};

export const isWithinPaymentLimit = (transfer: any) => {
  const {
    transferMethod,
    payinActualValue,
    payoutActualValue,
    payinCurrency,
    payoutCurrency,
  } = transfer;

  if (payinActualValue === 0) {
    return "";
  }
  if (payinActualValue < 5) {
    return `You can't send less than 5 ${payinCurrency}`;
  }
  if (transferMethod === "mobile_money" && payoutActualValue > 500000) {
    return `The maximum transferrable amount inclusive of Mobile Operator Transfer Fees for mobile money is 500,000 ${payoutCurrency}`;
  }

  if (
    (transferMethod === "bank_transfer" || transferMethod === "cash_pickup") &&
    payinActualValue > 20000
  ) {
    return `The maximum transferrable amount for ${transferMethod.replace(
      "_",
      " "
    )} is 20,000 ${payinCurrency}`;
  }

  return "";
};

export function refinePromoErrorMessage(message: any, code: string) {
  const errorMessages: any = [
    {
      value: "Promo not found. No resource found",
      refined: "Invalid Code.",
    },
    {
      value: "Promo not found. Invalid user",
      refined: `Voucher code "${code}" has already been redeemed`,
    },
  ];

  const refinedMessage = errorMessages.find(
    (msg: any) => msg.value === message
  );
  return refinedMessage ? refinedMessage.refined : message;
}

export const checkReferralRewards = (user: any) => {
  const { newBonusState } = user?.referral || {};
  const { Voucher, VoucherPoints } = user.meta || {};

  const isVoucherActive = Voucher === "ACTIVE";
  const isNewBonusStateActive = newBonusState === "ACTIVE";

  //newUserBonusActive 
  //

  const ToastMessage = (title: string, message: string) =>
    toastAction({
      name: "user-reward-notice",
      show: true,
      type: "success",
      title: title,
      message: message,
      extraBtnText: "Continue",
      extraBtnHandler: () => {},
    });

  if (isVoucherActive) {
    return ToastMessage(
      "Good News!",
      "Your voucher reward has been activated. It will be applied automatically on your next transfer."
    );
  } else if (isNewBonusStateActive) {
    return ToastMessage(
      "Good News!",
      "Your referral reward has been activated. It will be applied automatically on your next transfer."
    );
  } else {
    return;
  }
};
