import axios from 'axios'

import {
    ADD_TO_STACKED_TOASTS,
  APP_VALUES,
  AUTH,
  CONFIRM,
  CREATE_ACCOUNT_ERROR,
  CREATE_ACCOUNT_SUCCESS,
  LOADING,
  NOTIFICATIONS,
  RECIPIENT,
  RECIPIENTS,
  REDIRECT,
  REMOVE_FROM_STACKED_TOASTS,
  SIGN_IN,
  SIGN_UP,
  SUBMITTING,
  TOAST,
  TRANSFER,
} from '../actionTypes'
import config from '../../env'
import endpoints from '../../util/endpoints'
import store from './../store'
import { CookieService } from '../../services/CookieService'
import env from '../../env'
import { AppService } from '../../services/AppService'
import { paths } from '../../util/paths'
import {
  formatCurrency,
  genPaginationHashTable,
  getQueryParam,
  parseEndpointParameters,
  sortObjectByProperties,
} from '../../util/util'
import http from '../../util/http'
import { themeNames } from '../../components/modules/toast-factory/themes'
import { constants } from '../../util/constants'

const user = store.getState().auth.user;
const serviceProvider =  env.X_SERVICE_PROVIDER;

export const checkAuth = () => {
  const session = CookieService.get(env.SESSION_KEY)
  const user = CookieService.get('user')
  const sessionId = CookieService.get(env.SESSION_ID)
  const serviceProvider = env.X_SERVICE_PROVIDER

  if (session && user) {
    store.dispatch({
      type: AUTH,
      payload: { isAuthenticated: true, user: JSON.parse(user) },
    })
    return {
      isAuthenticated: true,
      user: JSON.parse(user),
      authToken: session,
      sessionId,
      serviceProvider,
    }
  } else {
    store.dispatch({
      type: AUTH,
      payload: { isAuthenticated: false, user: undefined },
    })
    return { isAuthenticated: false, user: undefined }
  }
}

export const signUpAction = (data: any) => {
  const serviceProvider = env.X_SERVICE_PROVIDER
  store.dispatch({ type: SUBMITTING, payload: SIGN_UP })
  axios
    .post(
      config.API_HOST + endpoints.SIGN_UP,
      { ...data },
      {
        headers: { 'X-SERVICE-PROVIDER': serviceProvider },
      },
    )
    .then((res: any) => {
      if (res.data.status == '200') {
        return store.dispatch({
          type: CREATE_ACCOUNT_SUCCESS,
          payload: res.data.data,
        })
      } else {
        return store.dispatch({
          type: CREATE_ACCOUNT_ERROR,
          payload: res.data.error,
        })
      }
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: SUBMITTING, payload: '' })
    })
}

export const signInAction = (data: any) => {
  store.dispatch({ type: SUBMITTING, payload: SIGN_IN })
  axios
    .post(
      config.API_HOST + endpoints.SESSION,
      { ...data },
      {
        headers: { 'X-SERVICE-PROVIDER': serviceProvider },
      },
    )
    .then((res: any) => {
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 5000,
          message: `Welcome, ${res.data.data.profile.firstName}`,
        })

        CookieService.put(env.SESSION_KEY, res.headers['x-auth-token'])
        CookieService.put(env.SESSION_ID, res.headers['x-service-user-name'])
        CookieService.put(
          'X-SERVICE_PROVIDER',
          res.headers['x-service-provider'],
          30,
        )
        axios
          .get(
            config.API_HOST +
              parseEndpointParameters(endpoints.USER, res.data.data.id),
          )
          .then((response) => {
            CookieService.put('user', JSON.stringify(response.data.data))
            store.dispatch({
              type: AUTH,
              payload: { isAuthenticated: true, user: response.data.data },
            })
          })
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: `${res.data.error.message}`,
        })
      }
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: SUBMITTING, payload: '' })
    })
}

export const confirmUserPassword = (password: string, callback: Function) => {
  store.dispatch({ type: LOADING, payload: true })
  const user = store.getState().auth.user
  const username = user.username;
  axios
    .post(
      config.API_HOST + endpoints.SESSION,
      { username, password, skipSession: true },
      {
        headers: { 'X-SERVICE-PROVIDER': serviceProvider },
      },
    )
    .then((res: any) => {
      if (res.data.status === '200') {
        callback();
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: `${res.data.error.message}`,
        })
      }
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const refreshUserDetails = (callback?: Function) => {
  const user = store.getState().auth.user
  if (!user) {
    return
  }
  axios
    .get(config.API_HOST + parseEndpointParameters(endpoints.USER, user.id))
    .then((response) => {
      CookieService.put('user', JSON.stringify(response.data.data))
      store.dispatch({
        type: AUTH,
        payload: { ...store.getState().auth, user: response.data.data },
      })
      callback?.(response.data.data)
    })
}

export const signOutAction = (ignoreRequest = false) => {
  if (!ignoreRequest) {
    store.dispatch({ type: LOADING, payload: true })
    http.delete(endpoints.SESSION).then((res) => {
      CookieService.remove(env.SESSION_KEY)
      CookieService.remove(env.SESSION_ID)
      CookieService.remove('user')
      store.dispatch({
        type: AUTH,
        payload: { isAuthenticated: false, user: undefined },
      })
      store.dispatch({ type: LOADING, payload: false })
    })
  } else {
    CookieService.remove(env.SESSION_KEY)
    CookieService.remove(env.SESSION_ID)
    CookieService.remove('user')
    store.dispatch({
      type: AUTH,
      payload: { isAuthenticated: false, user: undefined },
    })
    store.dispatch({ type: LOADING, payload: false })
  }
}

const runningTimeouts: any[] = []
export const toastAction = (toastConfig: any) => {
  runningTimeouts.forEach((t) => {
    return clearTimeout(t)
  })
  toastConfig.close = closeToasts
  store.dispatch({ type: TOAST, payload: { ...toastConfig } })
  if (!toastConfig.timeout) {
      return;
  }
  const t_id_1 = setTimeout(
    () => {
      store.dispatch({
        type: TOAST,
        payload: { ...toastConfig, show: true, readyToClose: true },
      })
    },
    toastConfig?.timeout ? toastConfig?.timeout - 2000 : 8000,
  )

  const t_id_2 = setTimeout(() => {
    store.dispatch({
      type: TOAST,
      payload: { ...toastConfig, show: false, readyToClose: false },
    })
  }, toastConfig?.timeout || 10000)

  runningTimeouts.push(t_id_1)
  runningTimeouts.push(t_id_2)
}

export const closeToasts = () => {
    runningTimeouts.forEach(t=>{
        return clearTimeout(t);
    })

    const t_id_1 = setTimeout(()=>{
        store.dispatch({type: TOAST, payload: { show: true, readyToClose: true}})
    }, (80))

   const t_id_2 = setTimeout(()=>{
        store.dispatch({type: TOAST, payload: { show: false, readyToClose: false}})
    }, 100)

    runningTimeouts.push(t_id_1)
    runningTimeouts.push(t_id_2)
}

export const stackNewToast = (toastConfig: any) => {
    if (!toastConfig.name) {
        throw new Error("Stacked toast must have a name");
    }

    if (!toastConfig.close) {
          toastConfig.close = () => unstackNewToast(toastConfig)
    }
    store.dispatch({ type: ADD_TO_STACKED_TOASTS, payload: toastConfig })
}

export const unstackNewToast = (toastConfig: any) => {
    if (!toastConfig.name) {
        throw new Error("Stacked toast name is required in config");
    }
    store.dispatch({ type: REMOVE_FROM_STACKED_TOASTS, payload: toastConfig })
}



export const appValuesAction = async () => {
  const allValues = await AppService.getValues()
  const countries = await AppService.getValueById(2)
  const payInCountries = await AppService.getValueById(8)
  const payOutCountries = await AppService.getValueById(9)
  const services = await AppService.getServices()
  const values: any = {}

  values.values = allValues
  values.countries = sortObjectByProperties(countries.data)
  values.services = services
  values.payInCountries = payInCountries?.data
  values.payOutCountries = payOutCountries?.data

  store.dispatch({ type: APP_VALUES, payload: values })
  getServiceRate()
}

export const editUserProfile = <T extends { profile: any }>(data: T) => {
  store.dispatch({ type: SUBMITTING, payload: paths.CHANGE_PASSWORD })
  http
    .put(parseEndpointParameters(endpoints.USER, user.id), { ...data })
    .then((res) => {
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 15000,
          message: `Profile updated`,
        })
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 25000,
          message: res.data.error.message,
        })
      }
    })
}

export const changePasswordAction = (values: any) => {
  store.dispatch({ type: SUBMITTING, payload: paths.CHANGE_PASSWORD })
  const { oldPassword, password, confirmation } = values

  http
    .post(endpoints.PASSWORD_CHANGE, {
      oldPassword,
      password,
      confirmation,
    })
    .then((res) => {
      store.dispatch({ type: SUBMITTING, payload: '' })
      if (res.data.status == '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 20000,
          title: `Password changed!`,
          message: `You have successfully changed your password`,
        })
      } else {
        toastAction({
          show: true,
          type: 'warning',
          timeout: 10000,
          message: res.data?.error?.message,
        })
      }
    })
    .catch((err) => {
      console.error(err)
    })
    .then(() => {
      store.dispatch({ type: SUBMITTING, payload: '' })
    })
}

export const resetPasswordAction = (values: any, stage = 'email') => {
  store.dispatch({ type: SUBMITTING, payload: paths.RESET_PASSWORD })

  if (stage === 'email') {
    axios
      .post(
        config.API_HOST + endpoints.PASSWORD_REQUEST,
        { username: values.username },
        { headers: { 'X-SERVICE-PROVIDER': config.X_SERVICE_PROVIDER } },
      )
      .then((res) => {
        if (res.status === 200) {
          toastAction({
            show: true,
            type: 'info',
            timeout: 60000,
            title: `Now, check your mail`,
            message: `The password reset link has been sent to you at ${values.username}`,
          })
          store.dispatch({ type: SUBMITTING, payload: '' })
        } else {
          toastAction({
            show: true,
            type: 'warning',
            timeout: 20000,
            message: `Could not send mail to ${values.username}`,
          })
          store.dispatch({ type: SUBMITTING, payload: '' })
        }
      })
  } else {
    axios
      .post(
        config.API_HOST + endpoints.PASSWORD_RESET,
        {
          password: values.password,
          confirmation: values.confirmation,
          token: getQueryParam('token'),
        },
        {
          headers: { 'X-SERVICE-PROVIDER': serviceProvider },
        },
      )
      .then((res: any) => {
        if (res.data.status === '200') {
          toastAction({
            show: true,
            type: 'success',
            timeout: 15000,
            message: `Password changed`,
          })
          store.dispatch({ type: SUBMITTING, payload: '' })
        } else {
          toastAction({
            show: true,
            type: 'error',
            timeout: 10000,
            message: `Could not change password`,
          })
          store.dispatch({ type: SUBMITTING, payload: '' })
        }
      })
  }
}

export const getRecipients = () => {
  store.dispatch({ type: LOADING, payload: true })
  const user = store.getState().auth.user

  http
    .get(parseEndpointParameters(endpoints.RECIPIENTS, user?.id))
    .then((res: any) => {
      if (res.data.status === '200') {
        store.dispatch({ type: RECIPIENTS, payload: res.data.data })
        store.dispatch({ type: LOADING, payload: false })
      } else {
      }
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const getRecipient = (id: string) => {
  store.dispatch({ type: LOADING, payload: true })
  const user = store.getState().auth.user

  http
    .get(parseEndpointParameters(endpoints.RECIPIENT, user.id, id))
    .then((res: any) => {
      if (res.data.status === '200') {
        store.dispatch({ type: RECIPIENT, payload: res.data.data })
        store.dispatch({ type: LOADING, payload: false })
      } else {
      }
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const createRecipient = (recipientData: any, callback?: any) => {
  const transferMethod = store.getState().transfer.transferMethod
  recipientData = {
    firstName: recipientData.firstName,
    lastName: recipientData.lastName,
    profile: {
      ...recipientData,
      transferMethod,
    },
  }
  store.dispatch({ type: SUBMITTING, payload: paths.RECIPIENT })
  const user = store.getState().auth.user
  http
    .post(parseEndpointParameters(endpoints.CREATE_RECIPIENT, user.id), {
      ...recipientData,
    })
    .then((res: any) => {
      if (res.data.status === '200') {
        getRecipients()
        toastAction({
          show: true,
          type: 'success',
          timeout: 10000,
          message: 'New recipient added',
        })
        callback?.openModal?.(false)
        callback?.selectRecipient?.(res.data.data)
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 15000,
          title: 'Add recipient failed',
          message: res.data.error.message,
        })
      }
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: SUBMITTING, payload: '' })
    })
}

export const confirmTransfer = (
  recipient: any,
  transfer: any,
  callback: Function,
) => {
  store.dispatch({ type: LOADING, payload: true })
  const payload = {
    transferMethod: transfer.transferMethod,
    recipientId: recipient.id,
    originCurrency: transfer.toSend?.currency,
    originAmount: Number(transfer.toSend?.value),
    destinationCurrency: transfer.toReceive?.currency,
    destinationAmount: Number(transfer.toReceive?.total),
    paymentMethod: {},
    promo: transfer.promo?.code,
    referralDiscount: transfer?.referralDiscount,
    meta: {
      serviceFee: transfer.serviceFee,
      exchangeBase: transfer.conversionRate?.base,
      exchangeRate: formatCurrency(transfer.conversionRate?.rate),
      exchangeTarget: transfer.conversionRate?.target,
      totalToPay: formatCurrency(`${Number(transfer.toSend.total)}`),
    },
  }
  const user = store.getState().auth.user
  http
    .post(parseEndpointParameters(endpoints.CREATE_TRANSFER, user.id), {
      ...payload,
    })
    .then((res) => {
      if (res.data.status === '200') {
        callback(res.data.data.id)
        CookieService.put('transfer', JSON.stringify(res.data.data.id))
        getTransactionDetails(callback)
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 15000,
          title: 'Transfer failed',
          message: res.data.error.message,
        })
      }
      store.dispatch({ type: LOADING, payload: false })
    })
    .catch((err) => {
      store.dispatch({ type: LOADING, payload: false })
    })
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const getTransactionDetails = (callback?: Function, id?: any) => {
  const transferId = id ?? (getQueryParam('t') || CookieService.get('transfer'))
  if (!transferId) {
    callback?.()
    return toastAction({
      show: true,
      type: 'info',
      timeout: 15000,
      message: `No transfer initiated yet`,
    })
  }

  store.dispatch({ type: LOADING, payload: true })
  const user = store.getState().auth.user
  const transfer = store.getState().transfer
  http
    .get(parseEndpointParameters(endpoints.GET_TRANSFER, user.id, transferId))
    .then((res) => {
      store.dispatch({
        type: TRANSFER,
        payload: { ...transfer, transactionDetails: { ...res.data.data } },
      })
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const getUserTransactions = () => {
  const user = store.getState().auth.user
  const transfer = store.getState().transfer

    store.dispatch({type: LOADING, payload: true})
    http.get(parseEndpointParameters(endpoints.GET_TRANSFERS, user.id))
    .then(res=>{
        let transactions: any[] = res.data.data?.sort((a: any, b: any)=>{
            if (a.dateCreated < b.dateCreated) {
                return 1
            }
            if (a.dateCreated > b.dateCreated) {
                return -1
            }
            return 0
        })
        const paginatedTransactions = genPaginationHashTable(transactions, 10);
        const paginatedCancelledTransactions = genPaginationHashTable(transactions.filter(t=>t.status?.toLowerCase()=== constants.TRANSFER_STATUS_CANCELLED.toLowerCase()), 10)
        const paginatedCompletedTransactions = genPaginationHashTable(transactions.filter(t=>t.status?.toLowerCase()=== constants.TRANSFER_STATUS_COMPLETE.toLowerCase()), 10)
        const paginatedPendingTransactions = genPaginationHashTable(transactions.filter(t=>t.status?.toLowerCase()=== constants.TRANSFER_STATUS_PENDING.toLowerCase()), 10)
        store.dispatch({type: TRANSFER, payload: {...transfer, transactions, paginatedTransactions, paginatedCompletedTransactions, paginatedCancelledTransactions, paginatedPendingTransactions} })
    })
    .catch((err) => {})
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const cancelTransfer = (callback: Function, id = null) => {
  const transferId = id || CookieService.get('transfer')
  if (!transferId) {
    callback?.()
    return toastAction({
      show: true,
      type: 'info',
      timeout: 15000,
      message: `No transfer initiated yet`,
    })
  }

  store.dispatch({ type: LOADING, payload: true })
  const transfer = store.getState().transfer
  const user = store.getState().auth.user

  http
    .delete(
      parseEndpointParameters(endpoints.GET_TRANSFER, user.id, transferId),
    )
    .then((res) => {
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'info',
          timeout: 10000,
          message: 'Transfer has been cancelled',
        })
        store.dispatch({
          type: TRANSFER,
          payload: { ...transfer, transactionDetails: undefined },
        })
        store.dispatch({ type: LOADING, payload: false })
        callback()
      } else {
        store.dispatch({ type: LOADING, payload: false })
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: res.data.error.message,
        })
      }
    })
}

export const setNewQuoteWithoutAuth = (
  base: string,
  target: string,
  callback?: any,
) => {
  store.dispatch({ type: LOADING, payload: true })
  const payload: { base: string; target: string; meta?: any } = {
    base,
    target,
  }
  const userId = store.getState().auth.user?.id
  if (userId) payload.meta = { userId }
  axios
    .post(config.API_HOST + '/quote', payload)
    .then((res) => {
      if (res.data.status === '200') {
        CookieService.put('QUOTE', res.data.data.id)
        CookieService.put('SKIP_QUOTE', 'true')
        store.dispatch({ type: LOADING, payload: false })
        callback()
      } else {
        toastAction({
          show: true,
          type: 'warning',
          timeout: 10000,
          message: res.data.error.message,
        })
      }
    })
    .catch((error) => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const setNewQuote = (base: string, target: string) => {
  const payload: { base: string; target: string; meta?: any } = {
    base,
    target,
  }
  const userId = store.getState().auth.user?.id
  if (userId) payload.meta = { userId }
  http
    .post('/quote', payload)
    .then((res) => {
      if (res.data.status === '200') {
        CookieService.put('QUOTE', res.data.data.id)
      } else {
        toastAction({
          show: true,
          type: 'warning',
          timeout: 10000,
          message: res.data.error.message,
        })
      }
    })
    .catch((error) => {})
}

export const checkSkip = (callback: Function) => {
  const skip = CookieService.get('SKIP_QUOTE')
  if (skip) {
    callback()
    CookieService.remove('SKIP_QUOTE')
  }
}

export const getQuoteService = ($_1: string, $_2: string) => {
  store.dispatch({ type: LOADING, payload: true })
  const quoteId = CookieService.get('QUOTE')

  if (quoteId) {
    http
      .get(parseEndpointParameters(endpoints.GET_QUOTE, quoteId))
      .then((res) => {
        const transfer = store.getState().transfer
        if (res.data.status === '200') {
          store.dispatch({
            type: TRANSFER,
            payload: {
              ...transfer,
              conversionRate: {
                ...res.data.data,
                rate: res.data.data.rate?.rate,
              },
            },
          })
          store.dispatch({ type: LOADING, payload: false })
        } else {
          getNewQuote($_1, $_2)
        }
      })
      .catch(() => {
        getNewQuote($_1, $_2)
      })
      .then(() => {
        store.dispatch({ type: LOADING, payload: false })
      })
  } else {
    getNewQuote($_1, $_2)
  }
}

export const getNewQuote = ($_1?: string, $_2?: string) => {
    store.dispatch({type: LOADING, payload: true})
    const transfer = store.getState().transfer
    $_1 = $_1 ?? transfer.toSend.currency;
    $_2 = $_2 ?? transfer.toReceive.currency;
    axios.get(config.API_HOST + parseEndpointParameters(endpoints.QUOTE_SERVICE, $_1, $_2 ))
    .then(res => {
        if(res.data.status === "200"){
            const data = res.data.data;
            if (data?.base?.toUpperCase() === "EUR") {
                data.rate = 655.96;
            }
            store.dispatch({type: TRANSFER, payload: {...transfer, conversionRate: {...data}}})
            store.dispatch({type: LOADING, payload: false})
        }
    }).catch(()=>{
        store.dispatch({type: LOADING, payload: false})
    })
    .catch(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}

export const getServiceRate = (
  transferMethod = '',
  getRecipientsValue = false,
) => {
  const transfer = store.getState().transfer
  if (!transfer.allowOperatorFee) {
    store.dispatch({ type: TRANSFER, payload: { ...transfer, serviceFee: 0 } })
    return 0
  }
  const transferMethodsIds: any = {
    mobile_money: '1',
    bank_transfer: '2',
    cash_pickup: '3',
  }
  const services = store.getState().appValues.services
  const service =
    services?.data?.filter(
      (s: any) =>
        s.id === transferMethodsIds[transferMethod || transfer.transferMethod],
    )[0] || services?.data?.[0]
  const fees =
    service?.fees?.filter(
      (f: any) =>
        Number(f.lowerLimit) <= Number(transfer.toReceive.value) &&
        Number(f.upperLimit) >= Number(transfer.toReceive.value),
    )[0] || service?.fees?.[0]

  const equiFee =
    fees?.type === 'PERCENTAGE'
      ? (Number(fees?.fee) * transfer.toReceive?.value) / 100
      : Number(fees?.fee)

  const mobileMoneyTax = Number((0.2 * (transfer.toReceive?.value || 0)) / 100)

  const serviceFee =
    (!transferMethod && transfer.transferMethod === 'mobile_money') ||
    (transferMethod && transferMethod === 'mobile_money')
      ? Number(
          (
            (Number(equiFee) + Number(mobileMoneyTax)) /
            transfer.conversionRate?.rate
          ).toFixed(2),
        )
      : Number(equiFee)

  store.dispatch({
    type: TRANSFER,
    payload: { ...transfer, serviceFee: Number(serviceFee) },
  })
  return Number(serviceFee) || 0
}

export const getServiceRateValue = (
  toReceiveValue: string | number,
  transferMethod: string,
  getRecipientsValue = false,
) => {
  const transfer = store.getState().transfer
  if (!transfer.allowOperatorFee) return 0

  const transferMethodsIds: any = {
    mobile_money: '1',
    bank_transfer: '2',
    cash_pickup: '3',
  }
  const services = store.getState().appValues.services
  const service =
    services?.data?.filter(
      (s: any) => s.id === transferMethodsIds[transferMethod],
    )[0] || services?.data?.[0]
  const fees =
    service?.fees?.filter(
      (f: any) =>
        Number(f.lowerLimit) <= Number(toReceiveValue) &&
        Number(f.upperLimit) >= Number(toReceiveValue),
    )[0] || service?.fees?.[0]

  const equiFee =
    fees?.type === 'PERCENTAGE'
      ? (Number(fees?.fee) * Number(toReceiveValue)) / 100
      : Number(fees?.fee)

  const mobileMoneyTax = Number((0.2 * Number(toReceiveValue)) / 100)

  if (getRecipientsValue) {
    if (transferMethod && transferMethod === 'mobile_money') {
      return Number(equiFee + mobileMoneyTax)
    } else {
      return Number((equiFee * transfer.conversionRate?.rate).toFixed(2))
    }
  }

  const serviceFee =
    transferMethod && transferMethod === 'mobile_money'
      ? (
          (Number(equiFee) + Number(mobileMoneyTax)) /
          transfer.conversionRate?.rate
        ).toFixed(2)
      : equiFee
  return Number(serviceFee) || 0
}

export const initiatePayment = (callback?: Function, meta = {}, data = {}) => {
    store.dispatch({type: LOADING, payload: true})

    const transfer = store.getState().transfer
    const userId = store.getState().auth.user.id;

    const payload = {
        transferId: transfer.transactionDetails.id,
        method: transfer.paymentMethod,
        amount: transfer.transactionDetails.originAmount,
        reference: `${transfer.transactionDetails.originAmount}`,
        status: constants.TRANSFER_STATUS_PENDING,
        dateCreated: Math.round(Date.now() / 1000),
        lastUpdated: null,
        meta,
        data
    }

    http.post(parseEndpointParameters(endpoints.INITIATE_PAYMENT, userId), payload)
    .then(res => {
        if (res.data.id) {
            callback?.()
            store.dispatch({type: LOADING, payload: false})
        }
        else {
            toastAction({
                show: true,
                type: 'error',
                timeout: 10000,
                message: res.data.error.message
            })
            store.dispatch({type: LOADING, payload: false})
        }
    }).catch()
    .then(()=>{
        store.dispatch({type: LOADING, payload: false})
    })
}


export const confirmDialog = (data: {message: string, isPositive?: boolean, open: boolean, callback: Function, field?:any}) => {
  store.dispatch({type: CONFIRM, payload: {
      message: data.message,
      isPositive: data.isPositive ?? false,
      open: data.open,
      field: data.field,
      callback: data.callback
  }})
}

export const editProfileAction = (values: any, callback?: Function) => {
  // store.dispatch({ type: LOADING, payload: true })
  const userId = store.getState().auth.user?.id
  confirmDialog({
      message: `Please, input your account password to make this change`,
      isPositive: undefined,
      open: true,
      field: {
          title: 'Password:',
          placeholder: 'Your account password here...',
          required: true
      },
      callback: (fieldValue: string) => confirmUserPassword(fieldValue, executeProfileEdit)
  })

  const executeProfileEdit = () => {
    http
    .put(parseEndpointParameters(endpoints.USER, userId), {
      profile: { ...values },
    })
    .then((res) => {
      store.dispatch({ type: LOADING, payload: false })
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 10000,
          message: 'Profile updated',
        })
        CookieService.put('user', JSON.stringify(res.data.data))
        store.dispatch({
          type: AUTH,
          payload: { ...store.getState().auth, user: res.data.data },
        })
        callback?.()
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: 'Could not update profile',
        })
      }
    })
  }

}

export const editUserSettingsAction = (values: any, callback?: Function) => {
  const userId = store.getState().auth.user?.id
  confirmDialog({
      message: `Please, input your account password to make this change`,
      isPositive: undefined,
      open: true,
      field: {
          title: 'Password:',
          placeholder: 'Your account password here...',
          required: true
      },
      callback: (fieldValue: string) => confirmUserPassword(fieldValue, executeSettingsEdit)
  })

  const executeSettingsEdit = () => {
    http
    .put(parseEndpointParameters(endpoints.USER_SETTINGS, userId), {
      settings: { ...values },
    })
    .then((res) => {
      store.dispatch({ type: LOADING, payload: false })
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 10000,
          message: 'Profile updated',
        })
        CookieService.put('user', JSON.stringify(res.data.data))
        store.dispatch({
          type: AUTH,
          payload: { ...store.getState().auth, user: res.data.data },
        })
        callback?.()
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: 'Could not update profile',
        })
      }
    })
  }

}

export const userVerificationAction = (values: any, callback: Function, skipVerification = false) => {
    store.dispatch({type: LOADING, payload: true})
    const userId = store.getState().auth.user?.id;
    http.post(parseEndpointParameters(endpoints.VERIFICATION, userId), {
        ...values,
        address1: values.buildingNumber + ", " + values.streetName,
        skipVerification
    })
    .then(res => {
        if (res.data.status === "200") {
            store.dispatch({type: LOADING, payload: false})
            // CookieService.put('user', JSON.stringify(res.data.data));
            // store.dispatch({type: AUTH, payload: { ...store.getState().auth, user: res.data.data}})
            callback?.()
        }
        else {
            toastAction({
                show: true,
                type: 'error',
                timeout: 10000,
                message: res.data.error.message
            })
            store.dispatch({type: LOADING, payload: false})
        }

    }).catch(()=> {
        store.dispatch({type: LOADING, payload: false})
    })
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
  // callback()
}

export const pollServerForVerificationStatus = (seconds: number) => {
    const poll = setInterval(() => {
        refreshUserDetails((user: any) => {
            if (user?.meta?.verified == 1) {
                clearInterval(poll);
                stackNewToast({
                    name: "verification-success",
                    show: true,
                    type: 'success',
                    // timeout: 15000,
                    defaultThemeName: themeNames.CLEAR_MAMBA,
                    title: "Verification was successful",
                    message: "Your ID verification has been completed successfully",
                    close: () => {
                        unstackNewToast({name: "verification-success"})
                        http.put(parseEndpointParameters(endpoints.TOAST_NOTIF), {
                          displayVerificationToast: false
                        })
                        .then((response: any) => {
                          if (response?.data?.data) {
                              CookieService.put('user', JSON.stringify(response.data.data))
                              store.dispatch({
                                type: AUTH,
                                payload: { ...store.getState().auth, user: response.data.data },
                              })
                          }
                        })
                        .catch()
                    },
                    closeBtnText: "Dismiss"
                })
            } else if (user?.meta?.verified?.toLowerCase() == "retry") {
                clearInterval(poll);
            } else if (!user?.meta?.verified) {
                clearInterval(poll);
            }
        })
    }, seconds * 1000 );
}

export const checkForVerificationStatusToast = (user: any, history: any) => {
    if (user?.meta?.verified?.toLowerCase() == "retry") {
        stackNewToast({
            name: "verification-failed",
            show: true,
            type: 'error',
            // timeout: 15000,
            defaultThemeName: themeNames.CLEAR_MAMBA,
            title: "We were unable to verify your account",
            message: "<div style='color: grey;'>Something went wrong with your account verification. Please, try verifying your account using another method <br> <br> Payment <b>will not</b> be sent to your recipient until your account is verified</div>",
            extraBtnText: "Verify now",
            extraBtnHandler: () => history.push(paths.VERIFICATION),
            extraBtnClass: 'verif-toast-failed-extra-btn-class'
        })
    } else if (user?.meta?.verified == 1 && user?.settings?.displayVerificationToast) {
        stackNewToast({
          name: "verification-success",
          show: true,
          type: 'success',
          // timeout: 15000,
          defaultThemeName: themeNames.CLEAR_MAMBA,
          title: "Verification was successful",
          message: "Your ID verification has been completed successfully",
          close: () => {
              unstackNewToast({name: "verification-success"})
              http.put(parseEndpointParameters(endpoints.TOAST_NOTIF), {
                displayVerificationToast: false
              })
              .then((response: any) => {
                if (response?.data?.data) {
                    CookieService.put('user', JSON.stringify(response.data.data))
                    store.dispatch({
                      type: AUTH,
                      payload: { ...store.getState().auth, user: response.data.data },
                    })
                }
              })
              .catch()
          },
          closeBtnText: "Dismiss"
      })

    }
}
export const confirmAccountEmail = (callback: Function) => {
  store.dispatch({ type: LOADING, payload: true })
  const token = getQueryParam('token')
  if (!token) {
    toastAction({
      show: true,
      type: 'error',
      timeout: 10000,
      message: `No token provided`,
    })
    store.dispatch({ type: LOADING, payload: false })
    // callback()
    return
  }
  axios
    .post(
      config.API_HOST + endpoints.CONFIRM_ACCOUNT,
      {
        token,
      },
      {
        headers: { 'X-SERVICE-PROVIDER': serviceProvider },
      },
    )
    .then((res: any) => {
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 15000,
          message: `${res.data.data?.message}`,
        })
        store.dispatch({ type: LOADING, payload: false })
        callback()
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: `Invalid token`,
        })
        store.dispatch({ type: LOADING, payload: false })
      }
    })
}

export const subscribe = (data: { email: string }) => {
  axios
    .post(endpoints.SUBSCRIBE, data, {
      headers: { 'X-SERVICE-PROVIDER': serviceProvider },
    })
    .then((res) => {
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 15000,
          title: 'Subscribed',
          message: 'Your email has been subscribed to our newsletters',
        })
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: res.data.error.message,
        })
      }
    })
}

export const fetchUserNotifications = () => {
  const userId = store.getState().auth.user?.id

  http
    .get(parseEndpointParameters(endpoints.NOTIFICATIONS, userId))
    .then((res) => {
      if (res.data.status === '200') {
        store.dispatch({ type: NOTIFICATIONS, payload: [...res.data.data] })
      }
    })
}

export const getPromo = async (code: string) => {
  const res = await axios.get(
    parseEndpointParameters(config.API_HOST + endpoints.PROMO, code),
    {
      headers: { 'X-SERVICE-PROVIDER': serviceProvider },
    },
  )

  if (res.data.status == 200) {
    return res.data.data
  } else {
    return undefined
  }
}

export const saveTruliooTransactionId = (payload: any) => {

    http.post(endpoints.SAVE_TRULIOO_DOCUMENT_VERIFICATION, payload)
    .then(res => {
        if (res.data.status === "200") {
            toastAction({
                show: true,
                type: 'success',
                timeout: 15000,
                message: "Your verification process has kickstarted and should be done in a few minutes."
            })
        } else {
            toastAction({
                show: true,
                type: 'error',
                timeout: 10000,
                message: res.data.error.message
            })
        }
    })
}

export const updateTransferRecipient = (
  callback: Function,
  transferId: any,
) => {
  store.dispatch({ type: LOADING, payload: true })
  const userId = store.getState().auth.user?.id
  const recipient = store.getState().recipients.recipient

  http
    .put(parseEndpointParameters(endpoints.UPDATE_TRANSFER, transferId), {
      recipient: recipient.id,
    })
    .then((res) => {
      store.dispatch({ type: LOADING, payload: false })
      if (res.data.status === '200') {
        toastAction({
          show: true,
          type: 'success',
          timeout: 10000,
          message: 'Transfer updated',
        })
        callback?.()
      } else {
        toastAction({
          show: true,
          type: 'error',
          timeout: 10000,
          message: 'Could not update transfer',
        })
      }
    })
}

export const fetchTruelayerProviders = (callback: Function) => {
    store.dispatch({type: LOADING, payload: "Fetching available bank providers"})
    http.get(parseEndpointParameters(endpoints.TRUELAYER_INITIATE_PAYMENT))
        .then((res) => {
            callback(res.data?.results);
            // store.dispatch({type: LOADING, payload: false})
        })
        .catch()
        .then(() => {
            store.dispatch({type: LOADING, payload: false})
        });
}

export const initiateTruelayerPayment = (
  selected: any,
  transferId: string | number,
) => {
  store.dispatch({
    type: LOADING,
    payload:
      'Establishing secure connection with Truelayer. This may take up to a minute...',
  })

  http
    .post(parseEndpointParameters(endpoints.TRUELAYER_INITIATE_PAYMENT), {
      providerId: selected.provider_id,
      schemeId: selected.single_immediate_payment_schemes[0]?.scheme_id,
      transferId: transferId,
    })
    .then((res) => {
        const result = res?.data?.result
        if ( result ) {
            window.location.replace(result?.auth_flow?.uri);
        }
    })
    .catch()
    .then(() => {
      store.dispatch({ type: LOADING, payload: false })
    })
}
