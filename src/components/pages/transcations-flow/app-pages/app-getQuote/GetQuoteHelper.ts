//const {exchangeRate, payinCurrency, payoutCurrency, } = transferState

import { useQuery } from "react-query";
import { LOADING, TRANSFER } from "redux/actionTypes";
import { toastAction } from "redux/actions/actions";
import store from "redux/store";
import endpoints from "util/endpoints";
import http, { getRequest } from "util/http";
import env from "../../../../../env";
import { parseEndpointParameters } from "../../../../../util/util";
import {
  formatAmount,
  getAppValueDataByName,
  transferMethodsInWords,
} from "../../utils/reuseableUtils";
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
      refined: "Invalid promo code.",
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
            exchangeRate: handleValueIsNaN(data?.rate),
            conversionRate: data,
          },
        });
      },
    }
  );
};

export const getPromos = async (endpoint: string, payinCurrency: string) => {
  const { payinActualValue } = store.getState().transfer;

  try {
    const result = await http.get(endpoint, {
      headers: { "X-SERVICE-PROVIDER": env.X_SERVICE_PROVIDER },
    });

    if (result?.data?.status === 200 || result?.data?.status === "200") {
      const promo = result?.data?.data;
      return promo;

      // const isBelowSpendLimit =
      //   Number(payinActualValue) < Number(promo?.settings?.minimumSpend);
      // const isAboveSpendLimit =
      //   Number(payinActualValue) > Number(promo?.settings?.maximumSpend);

      // if (isBelowSpendLimit || isAboveSpendLimit) {
      //   throw new Error(
      //     `Transfer between ${promo?.settings?.minimumSpend} ${payinCurrency} and  ${promo?.settings?.maximumSpend} ${payinCurrency} to use this promo.`
      //   );
      // } else if (
      //   Boolean(promo?.settings?.currenciesValid) &&
      //   promo?.settings?.currenciesValid !== "ALL" &&
      //   promo?.settings?.currenciesValid !== payinCurrency
      // ) {
      //   throw new Error(
      //     `${promo?.settings?.discountAmount} ${payinCurrency} Discount, valid for ${promo?.settings?.currenciesValid} currencies`
      //   );
      // } else {
      //   return promo;
      // }
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
  payinActualValue: number,
  enabled: boolean,
  onSuccess: Function
) => {
  const endpoint = parseEndpointParameters(endpoints.PROMO, code);
  return useQuery(endpoint, () => getPromos(endpoint, payinCurrency), {
    enabled,
    retry: false,
    onSuccess: (data) => {
      onSuccess({ data });
    },
  });
};

export const getPromoMessages = (promo: any) => {
  const { payinActualValue, payinCurrency } = store.getState().transfer;

  let successMessage = "";
  let errMessage = "";

  const {
    percentage,
    discountAmount,
    currenciesValid,
    baseCurrency,
    targetCurrency,
    minimumSpend,
    maximumSpend,
  } = promo?.settings || {};

  const isBelowSpendLimit = Number(payinActualValue) < Number(minimumSpend);
  const isAboveSpendLimit = Number(payinActualValue) > Number(maximumSpend);

  if (isBelowSpendLimit || isAboveSpendLimit) {
    errMessage = `Transfer between ${minimumSpend} ${payinCurrency} and  ${maximumSpend} ${payinCurrency} to use this promo.`;
  } else if (
    Boolean(currenciesValid) &&
    currenciesValid !== "ALL" &&
    currenciesValid !== payinCurrency
  ) {
    errMessage = `${discountAmount} ${payinCurrency} Discount, valid for ${currenciesValid} currencies`;
  } else {
    switch (promo?.type) {
      case "PERCENTAGE":
        successMessage = `${percentage}% Discount, valid for ${currenciesValid} currencies`;
        break;
      case "FIXED_AMOUNT":
        successMessage = `${discountAmount} ${payinCurrency} Discount, valid for ${currenciesValid} currencies`;
        break;
      case "FIXED_RATE":
        successMessage = `Fixed Exchange Rate, valid for ${baseCurrency} to ${targetCurrency}`;
        break;
      case "FREE_OPERATOR_FEE":
        successMessage = "Free Operator Fee";
        break;
      default:
        successMessage = "";
        break;
    }
  }

  return { successMessage, errMessage };
};

type TPromotype =
  | "FIXED_RATE"
  | "FIXED_AMOUNT"
  | "PERCENTAGE"
  | "FREE_OPERATOR_FEE";

export const promoCalculator = (promo: any) => {
  const transfer = store.getState().transfer;
  const {
    payinActualValue: payinInput,
    exchangeRate: derivedRate,
    payinCurrency,
    payoutCurrency,
    payoutActualValue,
  } = store.getState().transfer;
  // const derivedRate = exchangeRateData?.find((rate: any)=> rate.base === payinCurrency && rate.target === payoutCurrency)?.rate

  const { type } = promo || {};
  const {
    maximumSpend,
    minimumSpend,
    discountAmount: value,
    baseCurrency,
    targetCurrency,
    rate: promoRate,
    currenciesValid,
    percentage,
  } = promo?.settings || {};

  let exchangeRate = derivedRate ? Number(derivedRate) : 0;
  let discountAmount = 0;
  let percentMultiplyer = 1;
  let freeOperatorFee = false;
  let promoType: TPromotype = "FIXED_AMOUNT";

  //TODO: include implementation for other promo types
  const isInPromoAmountRange =
    promo &&
    Number(payinInput) >= Number(minimumSpend) &&
    Number(payinInput) <= Number(maximumSpend);
  if (isInPromoAmountRange && type === "FIXED_RATE") {
    exchangeRate = Number(value);
    promoType = "FIXED_RATE";
    // if payinCurrency === settings.baseCurrency && payoutCurrency === settings.targetCurrency
    // dispatch promoDiscountValue to be equivalent payinDiffrence in old and new rate

    if (payinCurrency === baseCurrency && payoutCurrency === targetCurrency) {
      const payinDiffrence =
        payoutActualValue / Number(derivedRate) -
        payoutActualValue / handleValueIsNaN(promoRate);
      const equivalentDiscount = Math.abs(payinDiffrence); // Take the absolute value to remove the sign

      store.dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          promoDiscountValue: equivalentDiscount.toFixed(2),
          promoType: promoType,
          promoRate: handleValueIsNaN(promoRate).toFixed(2),
        },
      });
    }
  }
  if (isInPromoAmountRange && type === "FIXED_AMOUNT") {
    discountAmount =
      currenciesValid === "ALL"
        ? Number(value)
        : currenciesValid === payinCurrency
        ? Number(value)
        : 0;
    promoType = "FIXED_AMOUNT";
    //Dispatch discount amount

    store.dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        promoDiscountValue: discountAmount?.toFixed(2),
        promoType: promoType,
      },
    });
  }
  if (isInPromoAmountRange && type === "PERCENTAGE") {
    // settings.percentage
    percentMultiplyer = (100 - Number(percentage)) / 100;
    discountAmount = payinInput * (1 - percentMultiplyer);
    promoType = "PERCENTAGE";

    store.dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        promoDiscountValue: discountAmount?.toFixed(2),
        promoType: promoType,
      },
    });
  }
  if (isInPromoAmountRange && type === "FREE_OPERATOR_FEE") {
    freeOperatorFee = true;
    promoType = "FREE_OPERATOR_FEE";

    store.dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        promoFreeOperatorFee: freeOperatorFee,
        promoType: promoType,
      },
    });
  }
};

// Function to handle NaN, defaulting to 0 if invalid
export const handleValueIsNaN = (value?: number) =>
  isNaN(Number(value)) ? 0 : Number(value);

export const checkAmountValidation = (
  serviceRate: any,
  isPayinInputActive: boolean
) => {
  const transfer = store.getState().transfer;
  const {
    allowOperatorFee,
    payinCurrency,
    payoutCurrency,
    payinActualValue,
    payoutActualValue,
    transferMethod,
  } = transfer || {};

  const {
    operatorFee = 0,
    transferLimitMax = 0,
    isInOriginCurrency = false,
  } = serviceRate || {};

  const formattedTransferLimitMax = handleValueIsNaN(transferLimitMax);
  const IsBelowMinPayinValue =
    Number(payinActualValue) > 0 && Number(payinActualValue) < 5;

  // Function to generate an error message based on transferMethod and others
  const getErrorMessage = (
    limit: number,
    currency: string,
    includeFee: boolean
  ) => {
    if (transferMethodsInWords[transferMethod] === "mobile_money") {
      return (
        `The maximum transferrable amount ${
          includeFee ? "inclusive of Operator Fees" : ""
        } for ${transferMethodsInWords[transferMethod].replace(
          "_",
          " "
        )} is ${formatAmount(String(limit))} ${currency}.` || ""
      );
    } else {
      return (
        `The maximum transferrable amount for  ${transferMethodsInWords[
          transferMethod
        ].replace("_", " ")} is ${formatAmount(String(limit))} ${currency}.` ||
        ""
      );
    }
  };

  // Check and return the validation state
  const inclusiveOfFee = allowOperatorFee;
  const errorMessage = IsBelowMinPayinValue
    ? `You can't send less than 5 ${payinCurrency}`
    : getErrorMessage(
        formattedTransferLimitMax,
        isInOriginCurrency ? payinCurrency : payoutCurrency,
        inclusiveOfFee
      );
  const isPayin = IsBelowMinPayinValue ? true : isInOriginCurrency;
  const payinValue = Number(payinActualValue);
  const payoutValue = Number(payoutActualValue);
  const fee = handleValueIsNaN(operatorFee);
  const isError = IsBelowMinPayinValue
    ? true
    : isInOriginCurrency
    ? payinValue + (inclusiveOfFee ? fee : 0) > formattedTransferLimitMax
    : payoutValue + (inclusiveOfFee ? fee : 0) > formattedTransferLimitMax;

  const operatorFeeCallout = calculateQuoteFees(
    fee,
    isPayinInputActive
  ).operatorFeeCallout;

  return {
    fee,
    errorMessage,
    isPayin,
    isError,
    operatorFeeCallout,
  };
};

interface CalculationResult {
  operatorFeeCallout: string;
}

export function calculatePayAmount(
  amount: number,
  exchangeRate: number,
  isPayin: boolean //convert back to base/pain amount
): string {
  let result = isPayin
    ? amount / exchangeRate // Divide by the exchange rate for PayIn
    : amount * exchangeRate; // Multiply by the exchange rate for PayOut

  // Format the result to two decimal places
  return result.toFixed(2);
}

//TODO: refactor this logic for simplicity
export function calculateQuoteFees(
  serviceFee: number,
  isPayin: boolean
): CalculationResult {
  const transfer = store.getState().transfer;
  const user = store.getState().auth.user;
  const {
    allowOperatorFee,
    payinActualValue,
    payoutActualValue,
    transferMethod,
    exchangeRate,
    promoFreeOperatorFee,
    promoType,
    promoDiscountValue,
    promoRate,
  } = transfer || {};

  // Ensure payIn and payOut are treated as numbers
  let payIn = Number(payinActualValue);
  let payOut = Number(payoutActualValue);
  let totalPayOut = Number(payoutActualValue);
  let operatorFeeCallout = "";

  //apply promo discount rate if applicable
  const rate = promoType === "FIXED_RATE" ? promoRate : exchangeRate;
  //apply free operator fee if applicable
  const operatorFee =
    promoType === "FREE_OPERATOR_FEE" && promoFreeOperatorFee
      ? 0
      : Number(serviceFee.toFixed(2));
  const isMobileMoney =
    transferMethodsInWords[transferMethod] === "mobile_money";

  //get promo discount value for FIXED_AMOUNT, PERCENTAGE
  const getPromoDiscountValue = () =>
    promoType === "FIXED_AMOUNT" || promoType === "PERCENTAGE"
      ? promoDiscountValue
      : 0;

  //get loyalty or refferal discount
  const getLoyaltyOrRefferalDiscount = () =>
    getRewardsValues(user).active ? getRewardsValues(user).bonus : 0;

  // Scenario A: User types in PayIn input
  if (isPayin) {
    // Scenario A(i): operator fee is on
    if (allowOperatorFee) {
      operatorFeeCallout = `+${operatorFee}`;
      // Calculate payOut based on payIn without fee deduction
      totalPayOut = Number(calculatePayAmount(payIn, rate, false));
      payOut = Number(calculatePayAmount(payIn, exchangeRate, false)); // does not apply promo rate
      // Dispatch updated state with correct payOut and totalToPay
      store.dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          totalToPay:
            payIn +
            operatorFee -
            getPromoDiscountValue() -
            getLoyaltyOrRefferalDiscount(),
          payoutActualValue: payOut,
          totalToSend: totalPayOut,
        },
      });
    }
    // Scenario A(ii): operator fee is off
    else {
      operatorFeeCallout = `-${operatorFee}`;
      // Calculate payOut based on payIn after fee deduction
      payOut = Number(
        calculatePayAmount(
          payIn - (isMobileMoney ? 0 : operatorFee), //if is mobile money, do not deduct fee
          exchangeRate,
          false
        )
      );

      totalPayOut = Number(
        calculatePayAmount(
          payIn - (isMobileMoney ? 0 : operatorFee), //if is mobile money, do not deduct fee
          rate,
          false
        )
      );
      // Dispatch updated state with correct payOut and totalToPay
      store.dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          totalToPay:
            payIn - getPromoDiscountValue() - getLoyaltyOrRefferalDiscount(),
          payoutActualValue: payOut,
          totalToSend: totalPayOut,
        },
      });
    }
  }
  // Scenario B: User types in PayOut input
  else {
    // Scenario B(i): operator fee is on (Same as A(i))
    if (allowOperatorFee) {
      operatorFeeCallout = `+${operatorFee}`;
      // Calculate payIn based on payOut without fee addition
      payIn = Number(calculatePayAmount(payOut, rate, true));
      // Dispatch updated state with correct payIn and totalToPay
      store.dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          totalToPay:
            payIn +
            operatorFee -
            getPromoDiscountValue() -
            getLoyaltyOrRefferalDiscount(),
          payinActualValue: payIn,
        },
      });
    }
    // Scenario B(ii): operator fee is off
    else {
      operatorFeeCallout = `-${operatorFee}`;
      // Calculate payIn based on payOut after fee addition
      // If is mobile_money do not add a fee
      payIn = Number(
        (payOut / rate + (isMobileMoney ? 0 : operatorFee)).toFixed(2)
      );
      // Dispatch updated state with correct payIn and totalToPay
      store.dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          totalToPay:
            payIn - getPromoDiscountValue() - getLoyaltyOrRefferalDiscount(),
          payinActualValue: payIn,
        },
      });
    }
  }

  const defaultOperatorFeeCallout = ``;

  //if isMobileMoney and user turned off allowOperatorFee, then we hide the callout
  //meaning the user agree that he wants to send without including partner payout charges
  return {
    operatorFeeCallout:
      isMobileMoney && !allowOperatorFee
        ? defaultOperatorFeeCallout
        : operatorFeeCallout,
  };
}

export const getRewardsValues = (user: any) => {
  const { Referral, Referrals } = user.referral || {};
  const { Voucher, Vouchers } = user.meta || {};
  const { values } = store.getState().appValues;

  const referralConstants = getAppValueDataByName(values.data, "settings");
  const loyaltyConstants = getAppValueDataByName(values.data, "loyaltyscheme");

  const rawUplineReferralBonus = referralConstants?.referredUserDiscountValue;
  const rawDownlineReferralBonus = referralConstants?.referrerDiscountValue;

  const uplineReferralBonus = isNaN(rawUplineReferralBonus)
    ? 0
    : Number(rawUplineReferralBonus);
  const downlineReferralBonus = isNaN(rawDownlineReferralBonus)
    ? 0
    : Number(rawDownlineReferralBonus);

  const isVoucherActive = user && Voucher === "ACTIVE";
  const isNewBonusStateActive = user && Referral === "ACTIVE";

  const referralsArray = Referrals && JSON.parse(Referrals);

  const rawVoucherBonus = loyaltyConstants?.voucherBonus;
  const voucherBonus = isNaN(rawVoucherBonus) ? 0 : Number(rawVoucherBonus);

  const isReferralHasUplineBonusAndIsActive =
    isNewBonusStateActive &&
    referralsArray?.some(
      (referral: any) =>
        Number(referral.Bonus) === uplineReferralBonus &&
        referral.ReferralBonus === "ACTIVE"
    );

  const bonusToUse = isNewBonusStateActive
    ? isReferralHasUplineBonusAndIsActive
      ? uplineReferralBonus
      : downlineReferralBonus
    : voucherBonus || 0;

  return {
    active: isNewBonusStateActive || isVoucherActive || false,
    bonus: bonusToUse,
    type: isNewBonusStateActive ? "Referral" : "Loyalty",
  };
};
