import axios from "axios";
import config from "../env";

const http = axios.create({
    baseURL: config.API_HOST
})

http.interceptors.request.use((config) => {
    config.headers = {
        'X-SERVICE-PROVIDER'    : 'sbremit-web-uat',
        'Content-Type'          : 'application/json',
        'X-SERVICE-USER-NAME'   : 'ab32f404be92ff376eddb1f5d8ebcface604168e',
        'X-REQUEST-HASH'        : '80171c8508bf0d3e5685d105a71d1cf505488692'
    }
    return config
})

export default http;