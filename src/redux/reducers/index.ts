import { combineReducers } from 'redux'
import auth from './auth'
import {
  submitting,
  toast,
  redirect,
  appValues,
  loading,
  notifications,
  createAccountSuccess,
  createAccountError,
  confirmDialog
} from './app'
import { recipients } from './recipients'
import { transfer } from './transfer'

export interface IAction {
  type: string
  payload: any
}

export default combineReducers({
  auth,
  submitting,
  createAccountSuccess,
  createAccountError,
  toast,
  redirect,
  appValues,
  recipients,
  loading,
  transfer,
  notifications,
  confirmDialog
})
