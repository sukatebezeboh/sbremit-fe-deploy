import staging from "./staging";
import dev from './dev';
import production from './production'
import common from './common';
require('dotenv').config()
let _env: any = dev;
const env = (config: any) => {
    _env = {...config, ...common}
}
const currentHost = window.location.hostname;
currentHost.includes('localhost') ? env(dev) : currentHost.includes('netlify') ? env(staging) : env(production);
// console.log(process.env.ENVIRONMENT, "[[[[[[[[[[[[[");

// env(process.env.ENVIRONMENT);
export default _env;