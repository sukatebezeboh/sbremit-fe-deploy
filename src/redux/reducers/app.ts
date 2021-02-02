import { SUBMITTING } from "../actionTypes";

const initialState = "";

interface IAction {
  type: string,
  payload: any
}

export const submitting = (state: any = initialState, {type, payload}: IAction) => {
    switch (type) {
        case SUBMITTING: {
          return payload
        }
        default:
          return state;
      }
//   return action.payload || state
}

