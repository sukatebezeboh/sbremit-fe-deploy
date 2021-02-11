import { combineReducers } from "redux";
import auth from "./auth";
import {submitting, toast, redirect, appValues} from './app';


export interface IAction {
    type: string,
    payload: any
}

export default combineReducers({ auth, submitting, toast, redirect, appValues });
