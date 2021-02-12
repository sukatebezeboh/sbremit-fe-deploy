import axios from 'axios';

import { APP_VALUES, AUTH, REDIRECT, SIGN_IN, SIGN_UP, SUBMITTING, TOAST } from "../actionTypes";
import config from '../../env';
import endpoints from "../../util/endpoints";
import store from './../store';
import { CookieService } from '../../services/CookieService';
import env from '../../env'
import { AppService } from '../../services/AppService';
import { paths } from '../../util/paths';
import { getQueryParam } from '../../util/util';

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
                toastAction({
                    show: true, 
                    type: 'success',
                    timeout: 5000,
                    message: `Welcome, ${res.data.data.profile.firstName}`
                })
                CookieService.put(env.SESSION_KEY, res.data.data.seed);
                axios.get(config.API_HOST + endpoints.USER + '/' + res.data.data.id)
                .then(response=>{
                    store.dispatch({type: AUTH, payload: {isAuthenticated: true, user: response.data.data}})
                })            
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

export const changePasswordAction = (values: any) => {
    store.dispatch({type: SUBMITTING, payload: paths.CHANGE_PASSWORD})
    const username = store.getState().auth.user.username;
    axios.post(config.API_HOST + endpoints.SIGN_IN, 
        {
            username,
            password: values.oldPassword
        }, {
        headers: {'X-SERVICE-PROVIDER': 'sbremit-web-uat'}
    })
    .then((res: any)=> {
        if (res.data.status === "200"){
                // axios.post(config.API_HOST + endpoints.PASSWORD_REQUEST,
                //     { username },
                //     { headers: {'X-SERVICE-PROVIDER': 'sbremit-web-uat'} })
                // .then(response=>{
                //     // ...
                // })            
        } else {
            toastAction({
                show: true,
                type: 'error',
                timeout: 10000,
                message: `Password is incorrect`
            })
            store.dispatch({type: SUBMITTING, payload: ""})
        }
    })
}

export const resetPasswordAction = (values: any, stage="email") => {
    store.dispatch({type: SUBMITTING, payload: paths.RESET_PASSWORD})

    if(stage === "email") {
        axios.post(config.API_HOST + endpoints.PASSWORD_REQUEST,
            { username: values.username },
            { headers: {'X-SERVICE-PROVIDER': 'sbremit-web-uat'} })
        .then(res=>{
            if(res.status === 200) {
                toastAction({
                    show: true,
                    type: 'info',
                    timeout: 60000,
                    title: `Now, check your mail`,
                    message: `The password reset link has been sent to you at ${values.username}`
                })
                store.dispatch({type: SUBMITTING, payload: ""})
                store.dispatch({type: REDIRECT, payload: {...store.getState().redirect, resetPassword: true}})
            } else {
                toastAction({
                    show: true,
                    type: 'warning',
                    timeout: 20000,
                    message: `Could not send mail to ${values.username}`
                })
                store.dispatch({type: SUBMITTING, payload: ""})
            }
        })   
    }

    else{
        axios.post(config.API_HOST + endpoints.PASSWORD_RESET, 
            {
                password: values.password,
                confirmation: values.confirmation,
                token: getQueryParam('t')
            }, {
            headers: {'X-SERVICE-PROVIDER': 'sbremit-web-uat'}
        })
        .then((res: any)=> {
            if (res.data.status === "200"){
                toastAction({
                    show: true,
                    type: 'success',
                    timeout: 15000,
                    message: `Password changed`
                })    
                store.dispatch({type: SUBMITTING, payload: ""})
            } else {
                toastAction({
                    show: true,
                    type: 'error',
                    timeout: 10000,
                    message: `Could not change password`
                })
                store.dispatch({type: SUBMITTING, payload: ""})
            }
        })
    }
}