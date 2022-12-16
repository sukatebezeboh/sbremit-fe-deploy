import FormButton from 'components/modules/form-button/FormButton'
import { Formik, useFormik } from 'formik'
import React, { FC } from 'react'
import { createRecipient } from 'redux/actions/actions'
import { replaceUnderscores } from '../../../../util/util'
import styled from 'styled-components'

const Div = styled.div`
    
    button {
        background: #FCD20F;
        border-radius: 4px;
        width: 200px;
        height: 48px;
        text-align: center;
        font: normal normal normal 16px/19px Montserrat;
        color: #424242;
        border: none;
        outline: none;
        margin: 30px auto;
    }
`
interface IAzaRecipientForm {
    fields: any,
    paymentMethodType: string,
    successCallbacks?: {openModal: Function, selectRecipient: Function}
}
const AzaRecipientForm: FC<IAzaRecipientForm> = ({ fields, paymentMethodType, successCallbacks }) => {

    const formHandler = useFormik({
        initialValues: {
           ...Object.keys(fields).reduce((cumm: any, curr: any) => {
            cumm[fields[curr].internal_name] =  '';
            return cumm;
           }, {})
        },
        onSubmit: (values) => {
            values.paymentMethodType = paymentMethodType;
            createRecipient(values, successCallbacks)
        }
    })

    return (
        <Div className="form form-container">
            <form onSubmit={formHandler.handleSubmit}>
                {
                    Object.entries(fields).map(([key, field]: any) => {
                        return (
                            <div key={field.internal_name} className="form-group">
                                <label className="form-group-item">
                                    <h4 className='capitalize'>{ replaceUnderscores(key) }</h4>
                                    {
                                        field.type === 'select' ? 
                                        <select name={field.internal_name} onChange={formHandler.handleChange} className="capitalize">
                                            {
                                                Object.entries(field.options).map(([key, value]: any) => (
                                                    <option key={key} value={value} className="capitalize">{key}</option>
                                                ))
                                            }
                                        </select> : 
                                        <input type={field.type} name={field.internal_name} onChange={formHandler.handleChange} />
                                    }
                                </label>
                            </div>
                        )
                    })
                }

                <FormButton style={{backgroundColor: "#007b5d", "color": "white"}} label='Create recipient' formName="AzaRecipientForm"/>
            </form>
        </Div>
    )
}

export default AzaRecipientForm