import { IAction } from ".";
import { SIGN_UP, AUTH } from "../actionTypes";

const initialState = {
  isAuthenticated: false,
};


const auth = (state: any = initialState, action: IAction) => {
  switch (action.type) {
    case SIGN_UP: {
      break;
    }
    case AUTH: {
      return {...action.payload}
    }
    default:
      return state;
  }
}

export default auth;
