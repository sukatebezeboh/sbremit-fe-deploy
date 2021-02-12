export const asset = (folder: string, name: string) => {
    return `./assets/${folder}/${name}`;
}

export const getQueryParam = (key: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(key);
    return searchParam || "";
}