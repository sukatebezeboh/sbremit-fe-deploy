import { settings } from "./settings";

export const asset = (folder: string, name: string) => {
    return `/assets/${folder}/${name}`;
}

export const getQueryParam = (key: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(key);
    return searchParam || "";
}

export const parseEndpointParameters = (
    endpoint: string,
    $_1: string = "", 
    $_2: string = "", 
    $_3: string = "", 
    $_4: string = ""
    ) => 
{
    return endpoint
    .replace('$_1', $_1)
    .replace('$_2', $_2)
    .replace('$_3', $_3)
    .replace('$_4', $_4)
}

export const formatCurrency = (value: string, currency: string = ""): string => {
    value = value || "0"
    value = (((getMoneyValue(value)) * 100) / 100).toString()
    value = getMoneyValue(value).toFixed(2);
    return currency + value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const formatCurrencyWithoutFloats = (value: any, currency: string = ""): string => {
    value = value || "0"
    value = getMoneyValue(value);
    return currency + value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const getMoneyValue = (formattedAmount: string): number => {
    formattedAmount = formattedAmount.toString()
    return Number(formattedAmount.replace(/,/g, ''))
}

export const convertDateString = (value: any) => {
    value  = parseInt(value) * 1000
    const d = new Date(value)
    return d.toDateString()
}

export const getValueFromArray = <T>(id: string|number, targetId: string|number, array: any[], keyToReturn?: any): any => {
    // eslint-disable-next-line eqeqeq
    const value = array.filter(a=>a[targetId] == id)[0];    
    return value?.[keyToReturn] || value;
}

export const genPaginationHashTable = (array: any[], noPerPage: number) => {
    const hashTable: any = {}
    // const paginationList = Math.ceil(array.length / noPerPage)
    array.forEach((val: any, i: number)=>{
        const temp = Math.floor(i/noPerPage) + 1
        if (hashTable[temp]) {
            hashTable[temp].push(val)
        }
        else{
            hashTable[temp] = [val]
        }
    })

    const pages = Object.keys(hashTable);
    
    return {paginated: hashTable, pages }
}

export const downloadPDF = (id: string) => {
    const element = document.getElementById(id)
}

export const isObjectNotEmpty = (object: any) => Boolean(Object.keys(object).length)


export const replaceUnderscores = (method: string) => {
    return method?.replace('_', ' ');
}

export const parseWithUnderscores = (method: string) => {
    return method?.replace(' ', '_')?.toLowerCase();
}

export const compareDatesXLessThanY = (x: string, y: string) => {
    const xDate = new Date(x);
    const yDate = new Date(y); 
    return xDate < yDate;
}

export const getInclusiveText = (transferMethod: string) => {
    const texts: any =  {
        "mobile_money" : "(inclusive of cash out fee)",
        "bank_transfer" : "(inclusive of payout partner fee)",
        "cash_pickup" : "(inclusive of pick-up partner fee)",
        "default": "(operator fee inclusive)"
    }

    return texts[transferMethod || "default"];

}


export const sortObjectByProperties = (object: any) => {
    const values: string[] = Object.values(object);
    const keys: string[] = Object.keys(object)
    values.sort((a: any, b: any) => a > b ? 1 : -1);
    const reverseObject: any = {}
    keys.forEach(key => {
        reverseObject[object[key]] = key
    })

    const sortedObject: any = {};
    values.forEach((value: string) => {
        sortedObject[reverseObject[value]] = value
    })
    return sortedObject;
}

export const getMax = (transferMethod: string) => {
    return settings[ (transferMethod + '_MAX').toUpperCase() ]
}

export const secondsToHms = (value : any) => {
    const sec = parseInt(value, 10); 
    let hours: string|number = Math.floor(sec / 3600); 
    let minutes: string|number = Math.floor((sec - hours * 3600) / 60); 
    let seconds: string|number = sec - hours * 3600 - minutes * 60;
    if (hours < 10) {      hours = '0' + hours;    }
    if (minutes < 10) {      minutes = '0' + minutes;    }
    if (seconds < 10) {      seconds = '0' + seconds;    }
    if (hours == 0) {
      return +minutes + ':' + seconds; // Return in MM:SS format
    } else {
      return hours + ':' + minutes + ':' + seconds; // Return in HH:MM:SS format
    }
}

export const convertToJSTimestamp = (timestamp: number = 0) => {
    return timestamp*1000
}

export const convertFromJSTimestamp = (timestamp: number = 0) => {
    return Math.floor(timestamp/1000)
}

export const getDateTimeNowInYYYY_MM_DD__HH_MM_SS = () => {

    const date = new Date();
    const aaaa = date.getUTCFullYear();
    let gg: any = date.getUTCDate();
    let mm: any = (date.getUTCMonth() + 1);

    if (gg < 10)
        gg = "0" + gg;

    if (mm < 10)
        mm = "0" + mm;

    const cur_day = aaaa + "-" + mm + "-" + gg;

    let hours: any = date.getUTCHours()
    let minutes: any = date.getUTCMinutes()
    let seconds: any = date.getUTCSeconds();

    if (hours < 10)
        hours = "0" + hours;

    if (minutes < 10)
        minutes = "0" + minutes;

    if (seconds < 10)
        seconds = "0" + seconds;

    return cur_day + " " + hours + ":" + minutes + ":" + seconds;

}