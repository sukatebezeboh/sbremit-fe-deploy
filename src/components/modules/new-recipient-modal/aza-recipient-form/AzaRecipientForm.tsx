import FormButton from 'components/modules/form-button/FormButton'
import { Formik, useFormik } from 'formik'
import React, { FC } from 'react'
import { createRecipient } from 'redux/actions/actions'
import { replaceUnderscores } from '../../../../util/util'

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
        <div className="form form-container">
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

                <FormButton label='Create recipient' formName="AzaRecipientForm"/>
            </form>
        </div>
    )
}

export default AzaRecipientForm