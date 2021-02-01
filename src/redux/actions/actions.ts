import { SIGN_UP } from "../actionTypes";
import config from '../../env';
import axios from 'axios';
import endpoints from "../../util/endpoints";

export const recieveSignUpAction = (data: any) => ({
    type: SIGN_UP,
    payload: {
        data
    }
})

export const signUpAction = (data: any) => {
    axios.post(config.API_HOST + endpoints.SIGN_UP, {...data})
    .then()
    .then()
    .catch()
}