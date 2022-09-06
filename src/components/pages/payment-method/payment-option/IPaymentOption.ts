export interface IPaymentOption {
    paymentMethod: any
    isSelected: boolean
    selectPaymentMethod: Function
    label?: string
}