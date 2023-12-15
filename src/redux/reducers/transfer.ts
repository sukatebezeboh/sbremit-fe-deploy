import { IAction } from ".";
import { RESET_TRANSFER, TRANSFER, TRANSFER_QUOTE } from "../actionTypes";

const initialTransferState: {} = {
  conversionRate: {},
  serviceFee: 0,
  service: {},
  toSend: {
    value: "",
    currency: "GBP",
    image: "GB",
    countryCode: "GB",
    total: "0",
    isSend: true,
  },
  toReceive: { value: `${0}`, currency: "XAF", image: "CM", countryCode: "CM" },
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
  payinCurrency: "",
  payoutCurrency: "XAF",
  clientIp: "",
  currentTransferBeforeRedirectVericationsPage: undefined,
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
        exchangeRate: 0,
        payinCurrency: "",
        payoutCurrency: "XAF",

        transferMethod: "mobile_money",
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
