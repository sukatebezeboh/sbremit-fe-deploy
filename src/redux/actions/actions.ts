import axios from 'axios';

import { APP_VALUES, AUTH, SIGN_IN, SIGN_UP, SUBMITTING, TOAST } from "../actionTypes";
import config from '../../env';
import endpoints from "../../util/endpoints";
import store from './../store';
import { CookieService } from '../../services/CookieService';
import env from '../../env'
import { AppService } from '../../services/AppService';

export const recieveSignUpAction = (data: any) => ({
    type: SIGN_UP,
    payload: {
        data
    }
})

export const signUpAction = (data: any) => {       
    store.dispatch({type: SUBMITTING, payload: SIGN_UP})
    axios.post(config.API_HOST + endpoints.SIGN_UP, {...data})
    .then((res: any)=> {
        if (res.data.status === "200"){
            toastAction({
                show: true, 
                type: 'success',
                timeout: 60000,
                title: "You're signed up!",
                message: `We have sent a verification mail to ${res.data.data.username}.`
            })
        } else {
            toastAction({
                show: true, 
                type: 'error',
                timeout: 20000,
                message: `${res.data.error.message}`
            })
        }
    })
    .catch(err=>{
        console.log(err);
    })
    .then(()=>{
        store.dispatch({type: SUBMITTING, payload: ""})
    })
}

export const signInAction = (data: any) => {       
    store.dispatch({type: SUBMITTING, payload: SIGN_IN})
    axios.post(config.API_HOST + endpoints.SIGN_IN, {...data}, {
        headers: {'X-SERVICE-PROVIDER': 'sbremit-web-uat'}
    })
    .then((res: any)=> {
        if (res.data.status === "200"){
            if(res.data.data.verified) {
                toastAction({
                    show: true, 
                    type: 'success',
                    timeout: 5000,
                    message: `Welcome, ${res.data.data.profile.firstName}`
                })
                CookieService.put(env.SESSION_KEY, res.data.data.seed);
                store.dispatch({type: AUTH, payload: {isAuthenticated: true}})
            } else {
                toastAction({
                    show: true, 
                    type: 'error',
                    timeout: 20000,
                    title: "Account not verified",
                    message: `A verification link has been sent to ${res.data.data.username}`
                })
            }
        } else {
            toastAction({
                show: true, 
                type: 'error',
                timeout: 10000,
                message: `${res.data.error.message}`
            })
        }
    })
    .catch(err=>{
        console.log('sign in request error:', err);
    })
    .then(()=>{
        store.dispatch({type: SUBMITTING, payload: ""})
    })
}

const runningTimeouts: any[] = [];
export const toastAction = (toastConfig: any) => {
    runningTimeouts.forEach(t=>{
        return clearTimeout(t);
    })
    store.dispatch({type: TOAST, payload: {...toastConfig}})
   const t_id_1 = setTimeout(()=>{
        store.dispatch({type: TOAST, payload: { ...toastConfig, show: true, readyToClose: true}})
    }, (toastConfig?.timeout ? toastConfig?.timeout-2000 : 8000))

   const t_id_2 = setTimeout(()=>{
        store.dispatch({type: TOAST, payload: { ...toastConfig, show: false, readyToClose: false}})
    }, toastConfig?.timeout || 10000)

    runningTimeouts.push(t_id_1)
    runningTimeouts.push(t_id_2)
}


export const appValuesAction = async() => {
    const allValues = await AppService.getValues();
    const countries = await AppService.getValueById(2);
    const values: any = {}
    values.values = allValues;
    values.countries = countries.data;
    store.dispatch({type: APP_VALUES, payload: values})
    console.log(store.getState());
}