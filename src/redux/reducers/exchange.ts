import { EXCHANGES, EXCHANGE_SPREADS,  } from "redux/actionTypes"
import { IAction } from "."

const initialExchangeValues = {
    exchanges: [],
    exchangeRateSpreads: []
  }
  
export const exchange = (state: any = initialExchangeValues, {type, payload}: IAction) => {
  
    switch (type) {
        case EXCHANGES: {
          
          return { ...state, exchanges: [...payload] }
        }
        case EXCHANGE_SPREADS: {
          
          return { ...state, exchangeRateSpreads: [...payload] }
        }
        default:
          return state;
    }
  }