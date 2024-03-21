import { TRANSFER } from "redux/actionTypes";
import { toastAction } from "redux/actions/actions";
import store from "redux/store";
import http from "util/http";

export const getAllUniqueCurrencies = (PayinCountries: any) => {
  const uniqueCurrencyObjects: { [key: string]: any } = {};

  PayinCountries.forEach((country: any) => {
    const { currency } = country;
    if (!uniqueCurrencyObjects[currency]) {
      uniqueCurrencyObjects[currency] = country;
    }
  });

  const result = Object.values(uniqueCurrencyObjects);
  //   console.log(result);
  return result;
};

export const getAllCorrespondingExchangeRate = async () => {
  //https://api-uat.sbremit.co.uk/exchange/

  const transfer = store.getState().transfer;
  http
    .get(`/exchanges`)
    .then((res) => {
      if (res.data.status === "200") {
        return store.dispatch({
          type: TRANSFER,
          payload: {
            ...transfer,
            exchanges: res.data.data,
          },
        });
      }
    })
    .catch((error) => {
      return toastAction({
        show: true,
        type: "error",
        timeout: 25000,
        message: error.message || "An error occurred, Please try again.",
      });
    });
};
