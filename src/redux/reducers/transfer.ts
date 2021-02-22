import { IAction } from ".";
import { TRANSFER } from "../actionTypes";

const initialTransferState: {} = {
    conversionRate: {},
    serviceFee: 0.95,
    toSend: {value: "1", currency: 'gbp', image: "UK", isSend: true},
    toReceive: {value: `${752.81}`, currency: 'xaf', image: "CM"},
    paymentMethod: "",
    transactionDetails: undefined,
    transferMethod: ""
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
