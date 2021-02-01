import { SIGN_UP } from "../actionTypes";

const initialState = {
  
};

interface IAction {
  type: string,
  payload: any
}

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
