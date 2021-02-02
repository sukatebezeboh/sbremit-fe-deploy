import { SIGN_UP, SUBMITTING } from "../actionTypes";
import config from '../../env';
import axios from 'axios';
import endpoints from "../../util/endpoints";
import store from './../store';

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
        console.log(res);
        if (res.data.status === "200"){
            
            
        } else {
            // alert(res.data.error?.message)
            console.log();
            
        }
        
    })
    .catch(err=>{
        console.log(err);
        
    })
    .then(()=>{
        store.dispatch({type: SUBMITTING, payload: ""})
    })
}