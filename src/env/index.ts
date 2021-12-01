import staging from "./staging";
import development from './dev';
import production from './production'
import common from './common';
require('dotenv').config();

const envs: any = {
    development,
    staging,
    production,
}
let _env: any = development;
const env = (config: string) => {
    _env = { ...common, ...envs[config]}   
     console.log( 'env', config)

}
// const processEnv = process.env.NODE_ENV == 'production' && window.location.href.includes('netlify') ? 'staging' : process.env.NODE_ENV;

env(process.env.REACT_APP_ENV || 'development');

export default _env;