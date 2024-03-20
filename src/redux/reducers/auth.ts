import { IAction } from ".";
import { SIGN_UP, AUTH } from "../actionTypes";

const initialState = {
  isAuthenticated: undefined,
  user: undefined,
  verification: true,
  isRewardModalChecked: false,
};

const auth = (state: any = initialState, action: IAction) => {
  switch (action.type) {
    case SIGN_UP: {
      break;
    }
    case AUTH: {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};

export default auth;
