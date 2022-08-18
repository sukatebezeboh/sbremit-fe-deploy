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

}

env(process.env.REACT_APP_ENV || 'development');

export default _env;