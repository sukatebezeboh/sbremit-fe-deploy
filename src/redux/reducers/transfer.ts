import { IAction } from ".";
import { TRANSFER } from "../actionTypes";

const initialTransferState: {} = {
    conversionRate: {},
    serviceFee: 0,
    service: {},
    toSend: {value: "0.00", currency: 'GBP', image: "UK", isSend: true},
    toReceive: {value: `${0.00}`, currency: 'XAF', image: "CM"},
    paymentMethod: "",
    transactionDetails: undefined,
    transferMethod: "",
    transactions: [],
    paginatedTransactions: {},
    paginatedCompletedTransactions: {},
    paginatedCancelledTransactions: {},
    paginatedPendingTransactions: {},
    currentTransactionsPage: 1
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
