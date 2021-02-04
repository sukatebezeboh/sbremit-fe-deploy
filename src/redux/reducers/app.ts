import { IAction } from ".";
import { SUBMITTING, TOAST, REDIRECT } from "../actionTypes";

const initialSubmittingState = "";
const initialToastState = {
}
const initialRedirectState = {
  to: "/sign-in"
};

export const submitting = (state: any = initialSubmittingState, {type, payload}: IAction) => {
    switch (type) {
        case SUBMITTING: {
          return payload
        }
        default:
          return state;
      }
}

export const toast = (state: any = initialToastState, {type, payload}: IAction) => {

  switch (type) {
      case TOAST: {
        return  {...payload}
      }
      default:
        return state;
    }
}

export const redirect = (state: any = initialRedirectState, {type, payload}: IAction) => {
  switch (type) {
      case REDIRECT: {
        return payload
      }
      default:
        return state;
    }
}
