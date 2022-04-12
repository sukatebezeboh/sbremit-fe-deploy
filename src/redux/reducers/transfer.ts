import { IAction } from ".";
import { RESET_TRANSFER, TRANSFER } from "../actionTypes";

const initialTransferState: {} = {
    conversionRate: {},
    serviceFee: 0,
    service: {},
    toSend: {value: "", currency: 'GBP', image: "UK", total: "0", isSend: true},
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
    promo: undefined,
    allowOperatorFee: true
}

export const transfer = (state: any = initialTransferState, {type, payload}: IAction) => {

    switch (type) {
        case TRANSFER: {

          return {
              ...payload
          }
        }
        case RESET_TRANSFER: {
            return {
                ...state,
                toSend: {value: "", currency: 'GBP', image: "UK", total: "0", isSend: true},
                toReceive: {value: `${0}`, currency: 'XAF', image: "CM"},
                transferMethod: "",
                serviceFee: 0,
                promo: undefined
            }
        }
        default:
          return state;
      }
}
