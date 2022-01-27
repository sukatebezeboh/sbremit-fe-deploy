import { IAction } from ".";
import { AppService } from "../../services/AppService";
import { SUBMITTING, TOAST, REDIRECT, APP_VALUES, LOADING, NOTIFICATIONS, CREATE_ACCOUNT_SUCCESS, CREATE_ACCOUNT_ERROR, ADD_TO_STACKED_TOASTS, REMOVE_FROM_STACKED_TOASTS } from "../actionTypes";

const initialSubmittingState = "";
const initialToastState = {
  toast: {},
  toasts: []
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

const initialCreatingAccountState = null

export const submitting = (state: any = initialSubmittingState, {type, payload}: IAction) => {
    switch (type) {
        case SUBMITTING: {
          return payload
        }
        default:
          return state;
      }
}

export const createAccountSuccess = (state: any = initialCreatingAccountState, {type, payload}: IAction) => {
  switch (type) {
      case CREATE_ACCOUNT_SUCCESS: {
        return payload
      }
      default:
        return state;
    }
}

export const createAccountError = (state: any = initialCreatingAccountState, {type, payload}: IAction) => {
  switch (type) {
      case CREATE_ACCOUNT_ERROR: {
        return payload
      }
      default:
        return state;
    }
}

export const toast = (state: any = initialToastState, {type, payload}: IAction) => {
  switch (type) {
      case TOAST: {
        return  { ...state, toast: payload}
      }
      case ADD_TO_STACKED_TOASTS: {
        return { ...state, toasts: [...state.toasts, payload] }
      }
      case REMOVE_FROM_STACKED_TOASTS: {
        const toasts = state.toasts;
        const newStack = toasts.filter((t: any) => t.name !== payload.name)
        return { ...state, toasts: newStack }
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