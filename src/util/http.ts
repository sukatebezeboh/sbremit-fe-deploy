import axios from "axios";
import sha1 from "sha1";

import { default as config, default as env } from "../env";
import { checkAuth, signOutSuperAction } from "../redux/actions/actions";


const http = axios.create({
    baseURL: config.API_HOST
})

http.interceptors.request.use((config: any) => {
    const authData = checkAuth();
    if(!authData?.isAuthenticated) return config;
    
    config.transformRequest = [
        (data: any, headers: any) => {
            const url = env.API_PROXY ? env.API_PROXY + config.url : env.API_HOST + config.url;
            const payload = JSON.stringify(data);
            const authToken = authData.authToken

            const requestHash = payload ? sha1(url + payload + authToken) : sha1(url + authToken);

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

http.interceptors.response.use((response: any) => {
    if (response.data.status === 500 && response.data?.error?.message?.toLowerCase()?.includes('hash')) {
        signOutSuperAction(true);
    }
    return response;
});

export default http;