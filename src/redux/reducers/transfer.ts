import { IAction } from ".";
import { TRANSFER } from "../actionTypes";

const initialTransferState: {} = {
    conversionRate: {},
    serviceFee: 0,
    service: {},
    toSend: {value: "100", currency: 'GBP', image: "UK", isSend: true},
    toReceive: {value: `${0}`, currency: 'XAF', image: "CM"},
    paymentMethod: "",
    transactionDetails: undefined,
    transferMethod: "",
    transactions: [],
    paginatedTransactions: {},
    paginatedCompletedTransactions: {},
    paginatedCancelledTransactions: {},
    paginatedPendingTransactions: {},
    currentTransactionsPage: 1,
    transferMax: 800
}

export const transfer = (state: any = initialTransferState, {type, payload}: IAction) => {
    switch (type) {
        case TRANSFER: {
          return {
              ...payload
          }
        }
        default:
          return state;
      }
}
