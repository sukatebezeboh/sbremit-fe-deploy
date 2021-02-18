import { IAction } from ".";
import { TRANSFER } from "../actionTypes";

const initialTransferState: {} = {
    conversionRate: 752.81,
    serviceFee: 0.95,
    toSend: {value: "1", currency: 'gbp', image: "UK", isSend: true},
    toReceive: {value: `${752.81}`, currency: 'xaf', image: "CM"},
    transferDetails: undefined
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
