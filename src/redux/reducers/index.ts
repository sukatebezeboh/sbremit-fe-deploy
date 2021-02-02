import { combineReducers } from "redux";
import auth from "./auth";
import {submitting} from './app';

export default combineReducers({ auth, submitting });
