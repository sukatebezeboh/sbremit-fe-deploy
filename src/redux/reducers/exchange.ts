import { EXCHANGES, EXCHANGE_SPREADS,  } from "redux/actionTypes"
import { IAction } from "."

const initialExchangeValues = {
    exchanges: [],
    exchangeRateSpreads: []
  }
  
export const exchange = (state: any = initialExchangeValues, {type, payload}: IAction) => {
  console.log('IN STATE', state)
    switch (type) {
        case EXCHANGES: {
          console.log('EXCHANGE CHANGING', state, payload )
          return { ...state, exchanges: [...payload] }
        }
        case EXCHANGE_SPREADS: {
          console.log('SPREAD CHANGING', state, payload )
          return { ...state, exchangeRateSpreads: [...payload] }
        }
        default:
          return state;
    }
  }