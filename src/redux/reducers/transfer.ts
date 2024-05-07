import { IAction } from ".";
import {
  RESET_TRANSFER,
  TRANSFER,
  TRANSFER_QUOTE,
  TRANSACTIONS,
} from "../actionTypes";

const initialTransferState: {} = {
  conversionRate: {},
  serviceFee: 0,
  service: {},
  toSend: {
    value: 0,
    currency: "GBP",
    image: "GB",
    countryCode: "GB",
    total: "0",
    isSend: true,
  },
  toReceive: { value: 0, currency: "XAF", image: "CM", countryCode: "CM" },
  paymentMethod: "",
  transactionDetails: undefined,
  transferMethod: "mobile_money",
  remittanceHandler: "MANUAL",
  transactions: [],
  tatalTransactions: [],
  paginatedTransactions: {},
  paginatedCompletedTransactions: {},
  paginatedCancelledTransactions: {},
  paginatedPendingTransactions: {},
  currentTransactionsPage: 1,
  currentTransferQuote: {},

  total: 0,
  days: 7,
  limit: 10000,
  offset: 0,
  status: "ALL",
  search: "",

  recipientBankDeatails: {
    accountNumber: "",
    countryCode: "",
    bankCode: "",
    branchCode: "",
    key: "",
  },

  recipientId: "",
  promo: undefined,
  promoCode: "",
  allowOperatorFee: true,
  payinActualValue: 0,
  payoutActualValue: 0,
  exchangeRate: 0,
  payinCurrency: "GBP",
  payoutCurrency: "XAF",
  activeCountryColor: "#007B5D",
  clientIp: "",
  currentTransferBeforeRedirectVericationsPage: undefined,
};

const initialTransactionsState: {} = {
  transactionsArray: [],
  total: 0,
  days: 7,
  limit: 10,
  offset: 0,
  status: "ALL",
  search: "",
  queryKey: "",
};

export const transfer = (
  state: any = initialTransferState,
  { type, payload }: IAction
) => {
  switch (type) {
    case TRANSFER: {
      return {
        ...payload,
      };
    }
    case RESET_TRANSFER: {
      return {
        ...state,
        recipientId: "",
        promo: undefined,
        promoCode: "",
        allowOperatorFee: true,
        payinActualValue: 0,
        payoutActualValue: 0,
        // exchangeRate: 0,
        // payinCurrency: "CAD",
        // payoutCurrency: "XAF",
        //activeCountryColor: "#007B5D",

        //transferMethod: "mobile_money",
        serviceFee: 0,
        remittanceHandler: "MANUAL",
        currentTransferBeforeRedirectVericationsPage: undefined,

        total: 0,
        days: 7,
        limit: 10000,
        offset: 0,
        status: "ALL",
        search: "",
      };
    }
    case TRANSFER_QUOTE: {
      return {
        ...state,
        currentTransferQuote: {
          ...payload,
        },
      };
    }
    default:
      return state;
  }
};

export const transactions = (
  state: any = initialTransactionsState,
  { type, payload }: IAction
) => {
  switch (type) {
    case TRANSACTIONS: {
      return payload;
    }
    default:
      return state;
  }
};
