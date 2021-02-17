import axios from "axios";
import sha1 from "sha1";

import config from "../env";
import { checkAuth } from "../redux/actions/actions";
import env from '../env';


const http = axios.create({
    baseURL: config.API_HOST
})

http.interceptors.request.use((config: any) => {
    const authData = checkAuth();
    if(!authData.isAuthenticated) return false;
    
    config.transformRequest = [
        (data: any, headers: any) => {
            const url = env.API_HOST + config.url;
            const payload = JSON.stringify(data);
            const authToken = authData.authToken
            
            const requestHash = sha1(url + payload + authToken);

            headers = {
                'X-SERVICE-PROVIDER'    : authData.serviceProvider,
                'Content-Type'          : 'application/json',
                'X-SERVICE-USER-NAME'   : authData.sessionId,
                'X-REQUEST-HASH'        : requestHash
            }
            config.headers = headers;
            config.data = JSON.stringify(data)
            return JSON.stringify(data);
        }
    ];

    return config
})

export default http;