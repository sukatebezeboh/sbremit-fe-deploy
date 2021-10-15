import { IAction } from ".";
import { AppService } from "../../services/AppService";
import { SUBMITTING, TOAST, REDIRECT, APP_VALUES, LOADING, NOTIFICATIONS } from "../actionTypes";

const initialSubmittingState = "";
const initialToastState = {
}
const initialRedirectState = {
  to: "/sign-in"
};
const initialAppValues = {
  values: {},
  countries: {},
  services: {},
  payInCountries: {},
  payOutCountries: {}
}
const initialLoadingState = false;

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

export const appValues = (state: any = initialAppValues, {type, payload}: IAction) => {
  switch (type) {
      case APP_VALUES: {
        return payload
      }
      default:
        return state;
    }
}

export const loading = (state: any = initialLoadingState, {type, payload}: IAction) => {
  switch (type) {
      case LOADING: {
        return payload
      }
      default:
        return state;
    }
}

export const notifications = (state: any = [], {type, payload}: IAction) => {
  switch (type) {
    case NOTIFICATIONS: {
      return payload
    }
    default:
      return state;
  }
}