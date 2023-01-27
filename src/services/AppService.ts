import axios from "axios";
import config from "../env";
import endpoints from "../util/endpoints";

export class AppService {

    static getExpiryTimestamp(days = 1) {
        const d = new Date();
        const expiry = d.setDate(d.getDate() + days);

        return expiry;
    }

    static checkExpiry() {
        const expiry = localStorage.getItem('EXPIRY') || "";

        if (Boolean(expiry) &&  Number(expiry) <= Date.now()) {
            localStorage.clear();
        }
    }

    static async getValues () {
        AppService.checkExpiry()
        const values = localStorage.getItem('VALUES');

        if(values){
            return JSON.parse(values)
        }
        else{
            const res = await axios.get(config.API_HOST + endpoints.VALUES)
            localStorage.setItem('VALUES', JSON.stringify(res.data))
            // localStorage.setItem('EXPIRY', AppService.getExpiryTimestamp().toString())

            return res.data
        }
    }

    static async getServices () {
        AppService.checkExpiry()
        const values = localStorage.getItem('SERVICES');


        if(values){
            return JSON.parse(values)
        }
        else{
            const services = await axios.get(config.API_HOST + endpoints.GET_SERVICES)
            localStorage.setItem('SERVICES', JSON.stringify(services.data))
            localStorage.setItem('EXPIRY', AppService.getExpiryTimestamp().toString())

            return services.data
        }
    }

    static async getValueById(id: number) {
        const values = localStorage.getItem('VALUES');
        if(values){
            const parsedValues = JSON.parse(values);
            const countries = parsedValues.data.filter((d: any)=>Number(d.id) === id)[0];
            return countries;
        }
        else{
            const res = await axios.get(config.API_HOST + endpoints.VALUE + '/' + id);
            return res.data.data
        }
    }
}

