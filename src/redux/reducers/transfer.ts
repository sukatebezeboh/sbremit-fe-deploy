import { IAction } from ".";
import { RESET_TRANSFER, TRANSFER, TRANSFER_QUOTE } from "../actionTypes";

const initialTransferState: {} = {
    conversionRate: {},
    serviceFee: 0,
    service: {},
    toSend: {value: "", currency: 'GBP', image: "GB", countryCode: 'GB', total: "0", isSend: true},
    toReceive: {value: `${0}`, currency: 'XAF', image: "CM", countryCode: 'CM'},
    paymentMethod: "",
    transactionDetails: undefined,
    transferMethod: "mobile_money",
    transactions: [],
    paginatedTransactions: {},
    paginatedCompletedTransactions: {},
    paginatedCancelledTransactions: {},
    paginatedPendingTransactions: {},
    currentTransactionsPage: 1,
    promo: undefined,
    allowOperatorFee: true,
    currentTransferQuote: {}
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
                transferMethod: "mobile_money",
                serviceFee: 0,
                promo: undefined,
                currentTransferQuote: {}
            }
        }
        case TRANSFER_QUOTE: {
            return {
                ...state,
                currentTransferQuote: {
                    ...payload
                }
            }
        }
        default:
          return state;
      }
}
