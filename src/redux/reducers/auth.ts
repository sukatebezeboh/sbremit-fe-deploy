import { IAction } from ".";
import { SIGN_UP } from "../actionTypes";

const initialState = {
  
};


const auth = (state: any = initialState, action: IAction) => {
  switch (action.type) {
    case SIGN_UP: {
      break;
    }
    default:
      return state;
  }
}

export default auth;
