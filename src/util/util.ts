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
    value = (Math.ceil((getMoneyValue(value)) * 100) / 100).toString()
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

export const getValueFromArray = <T>(id: string|number, targetId: string|number, array: any[], keyToReturn?: any): T => {
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
