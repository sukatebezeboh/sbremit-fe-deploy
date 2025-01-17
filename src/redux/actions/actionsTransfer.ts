import { LOADING, TRANSACTIONS, TRANSFER } from "redux/actionTypes";
import store from "redux/store";
import http from "../../util/http";
import { toastAction } from "./actions";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import endpoints from "util/endpoints";
import { parseEndpointParameters } from "util/util";

export const getTransactions = () => {
  store.dispatch({ type: LOADING, payload: true });

  const user = store.getState().auth.user;
  const transactions = store.getState().transactions;

  const { limit, days, search, offset } = transactions;

  const formatSearchValue = encodeURIComponent(search);

  const endpoint = `/user/${user.id}/transfers`;

  const queryParams = `?days=${days}&limit=${limit}&offset=${offset}&transactionId=${formatSearchValue}`;
  http
    .get(`${endpoint + queryParams}`)
    .then((res) => {
      if (res.data.status === "200") {
        store.dispatch({
          type: TRANSACTIONS,
          payload: {
            ...transactions,
            transactionsArray: res.data.data.collections,
            total: res.data.data.total,
          },
        });
      }
    })
    .catch((err: Error) => {
      handleRequestError(err);
    })
    .finally(() => {
      store.dispatch({ type: LOADING, payload: false });
    });
};

const handleRequestError = (error: Error) => {
  toastAction({
    show: true,
    type: "error",
    timeout: 25000,
    message: error.message || "An error occurred during the request.",
  });
  console.error(error);
};

export const getTotalTransactions = () => {};

export const getUserCurrencyInfo = () => {
  const user = store.getState().auth?.user || {};
  const transfer = store.getState().transfer;
  const { PayinCountries } = userAppValues();
  const userCountryCode = user.profile.location_country;
  const userCountryInfo = PayinCountries.find(
    (country) =>
      country.countryCode?.toLowerCase() === userCountryCode?.toLowerCase()
  );

  if (userCountryInfo?.currency !== transfer.payinCurrency) {
    return store.dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        payinCurrency: userCountryInfo?.currency || "EUR",
      },
    });
  }
};

export const updateCorrespondingExchangeRate = async (
  payinCurrency: string,
  payoutCurrency: string,
  isLanding?: boolean
) => {
  store.dispatch({
    type: LOADING,
    payload: isLanding ? "" : "Fetching exchange rate...",
  });
  const transfer = store.getState().transfer;
  //https://api-uat.sbremit.co.uk/exchange/GBP/XAF
  http
    .get(`/exchange/${payinCurrency}/${payoutCurrency}`)
    .then((res) => {
      if (res.data.status === "200") {
        store.dispatch({ type: LOADING, payload: false });
        return store.dispatch({
          type: TRANSFER,
          payload: {
            ...transfer,
            exchangeRate: Number(res.data.data.rate),
          },
        });
      } else {
        store.dispatch({ type: LOADING, payload: false });
        //reset rate on error
        store.dispatch({
          type: TRANSFER,
          payload: {
            ...transfer,
            exchangeRate: 0,
          },
        });
        return toastAction({
          show: true,
          type: "error",
          timeout: 25000,
          message:
            res.data.error?.message || "An error occurred, Please try again.",
        });
      }
    })
    .catch((error) => {
      //console.log(error);
      store.dispatch({ type: LOADING, payload: false });
      return toastAction({
        show: true,
        type: "error",
        timeout: 25000,
        message: error.message || "An error occurred, Please try again.",
      });
    });
};

// https://api-uat.sbremit.co.uk/user/346/transfer

export const updateRecipient = (
  transferQuoteId: string,
  recipientId: string,
  callback: Function,
  callbackOnError: Function
) => {
  const user = store.getState().auth.user;
  http
    .post(`/user/${user.id}/transfer`, {
      recipientId: recipientId,
      transferQuoteId: transferQuoteId,
    })
    .then((res) => {
      if (res.data.status == "200") {
        callback(res.data.data.id);
      } else {
        callbackOnError();
        toastAction({
          show: true,
          type: "error",
          title: "Error",
          timeout: 25000,
          message:
            res.data.error.message || "An error occurred during the request.",
        });
      }
    })
    .catch((error) => {
      callbackOnError();
      //console.log(error);
    });
};

export const getTransactionsInfo = (
  callback: Function,
  transferId?: string
) => {
  const user = store.getState().auth.user;

  http
    .get(`/user/${user.id}/transfer/${transferId}`)
    .then((res) => {
      if (res.data.status === "200") {
        callback(res.data.data);
      }
    })
    .catch((error) => {
      toastAction({
        show: true,
        type: "error",
        title: "Error",
        timeout: 25000,
        message: error.message || "An error occurred, Please try again.",
      });
    });
};
