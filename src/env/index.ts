import staging from "./staging";
import dev from './dev';
import production from './production'
import common from './common';

let _env: any = dev;
const env = (config: any) => {
    _env = {...config, ...common}
}
const currentHost = window.location.hostname;
currentHost.includes('localhost') ? env(dev) : currentHost.includes('netlify') ? env(staging) : env(production);

export default _env;