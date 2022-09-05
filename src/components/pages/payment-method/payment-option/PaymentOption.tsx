import React from 'react'
import { asset } from '../../../../util/util'
import { IPaymentOption } from './IPaymentOption'
import Label from './PaymentOption.css'

const PaymentOption = ({ paymentMethod, isSelected, selectPaymentMethod }: IPaymentOption) => {

  return (
    <Label htmlFor={paymentMethod.method}>
        <div className={`payment-options-card ${ isSelected && "selected-pm-green"} ${ paymentMethod.isRecommended && "is-recommended-pm" }`} onClick={() => selectPaymentMethod(paymentMethod.slug)}>
            <div className="inp-container">
                <input type="radio" name="payment-option" id={paymentMethod.method} checked={isSelected} value={paymentMethod.method} />
                <span className="checkmark"></span>
            </div>
            <div className="method-container">
                <div className="title">
                    {paymentMethod.method}
                </div>
                <div className="provider">
                    Powered by <span>{paymentMethod.provider}</span>
                </div>
                <div className="label">
                    <span>{paymentMethod.label}</span>
                    <span>
                        <img src={asset('logos', `${paymentMethod.slug}.png`)} alt="" />
                    </span>
                </div>
            </div>
        </div>
    </Label>
  )
}

export default PaymentOption