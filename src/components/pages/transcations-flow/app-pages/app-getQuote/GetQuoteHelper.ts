//const {exchangeRate, payinCurrency, payoutCurrency, } = transferState

import { useQuery } from "react-query";
import { LOADING, TRANSFER } from "redux/actionTypes";
import { toastAction } from "redux/actions/actions";
import store from "redux/store";
import endpoints from "util/endpoints";
import http, { getRequest } from "util/http";
import env from "../../../../../env";
import { parseEndpointParameters } from "../../../../../util/util";
import { userAppValues } from "../../utils/useAppValues";

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
        store.dispatch({ type: LOADING, payload: false });
        return callback(res.data.data);
      } else {
        store.dispatch({ type: LOADING, payload: false });
        onErrorCallback();
        toastAction({
          show: true,
          type: "error",
          timeout: 15000,
          message:
            res.data.error.message || "An error occurred. Please try again.",
        });
      }
    });
  } catch (error: any) {
    store.dispatch({ type: LOADING, payload: false });
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
    allowOperatorFee,
  } = transfer;

  if (payinActualValue === 0) {
    return "";
  }
  if (payinActualValue < 5) {
    return `You can't send less than 5 ${payinCurrency}`;
  }
  if (
    (transferMethod === "mobile_money" &&
      payoutActualValue >= 500000 &&
      allowOperatorFee) ||
    (transferMethod === "mobile_money" && payoutActualValue > 500000)
  ) {
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

export const useExchangeRate = (
  base: string,
  target: string,
  enabled: boolean
) => {
  const transfer = store.getState().transfer;
  const endpoint = `/exchange/${base}/${target}`;
  return useQuery(
    endpoint,
    () => getRequest(endpoint, "Failed to fetch exchange rate"),
    {
      enabled,
      onSuccess: (data) => {
        store.dispatch({
          type: TRANSFER,
          payload: {
            ...transfer,
            conversionRate: data,
          },
        });
      },
    }
  );
};

export const getPromos = async (endpoint: string, payinCurrency: string) => {
  try {
    const result = await http.get(endpoint, {
      headers: { "X-SERVICE-PROVIDER": env.X_SERVICE_PROVIDER },
    });

    if (result?.data?.status === 200 || result?.data?.status === "200") {
      return result?.data?.data;
    } else {
      throw new Error(
        result?.data?.error?.message ||
          `Something went wrong. Please try again.`
      );
    }
  } catch (error: any) {
    // console.log(error);
    throw error; // Throw the error to be caught by React Query
  }
};

export const useGetPromo = (
  code: string,
  payinCurrency: string,
  enabled: boolean,
  onSuccess: Function
) => {
  const endpoint = parseEndpointParameters(endpoints.PROMO, code);
  return useQuery(endpoint, () => getPromos(endpoint, payinCurrency), {
    enabled,
    retry: false,
    onSuccess: (data) => {
      const baseCurrency = data?.settings?.baseCurrency;
      const promoRate = data?.settings?.rate || "";
      const minimumSpend = data?.settings?.minimumSpend;
      const maximumSpend = data?.settings?.maximumSpend;
      if (baseCurrency !== undefined) {
        const message = `1 ${payinCurrency} = ${promoRate} ${payinCurrency}`;
        onSuccess(message);
      } else {
        const message = `Spend from: "${minimumSpend} ${payinCurrency} & ${maximumSpend} ${payinCurrency}" to activate code.`;
        onSuccess(message);
      }
    },
  });
};
