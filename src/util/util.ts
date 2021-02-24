export const asset = (folder: string, name: string) => {
    return `./assets/${folder}/${name}`;
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
    value = getMoneyValue(value).toFixed(2);
    return currency + value.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export const getMoneyValue = (formattedAmount: string): number => {
    return Number(formattedAmount.replace(',', ''))
}

export const convertDateString = (value: any) => {
    const d = new Date(value)
    console.log(d, "///");
    return d.toDateString()
}
    
    

export const getValueFromArray = <T>(id: string|number, targetId: string|number, array: any[], keyToReturn: any): T => {
    const value = array.filter(a=>a[targetId] == id)[0];    
    return value[keyToReturn] || value;
}