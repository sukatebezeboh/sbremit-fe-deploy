interface IRadioCardSelectedConfig {
    className: string
}

export default interface IRadioCardWrapper {
    name: string, 
    children: any, 
    id: string, 
    isChecked: boolean, 
    value: string|number, 
    isRecommended?: boolean, 
    clickHandler: Function,
    selectedConfig?: IRadioCardSelectedConfig
}