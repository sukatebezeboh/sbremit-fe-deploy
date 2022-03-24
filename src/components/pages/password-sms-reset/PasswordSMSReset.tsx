import React from 'react'
import {useHistory} from 'react-router-dom';
import { useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { resetPasswordAction } from '../../../redux/actions/actions';
import { ResetEmailValidator } from '../../../util/form-validators';
import ButtonLoader from '../../modules/button-loader/ButtonLoader'
import {NewAuthLayout, RememberPassword, FormWrapper} from '../../modules/new-auth-layout/NewAuthLayout'
import { paths } from 'util/paths';

const PasswordEmailReset = () => {
  const history = useHistory();
  const isSubmitting = useSelector((state: any) => state.submitting)
  const handleSendLink = (phone: string) => history.push(`${paths.SMS_CODE_SENT}?phone=${phone}`)
  const submitForm = (values: any) => {
    const newValue = {...values, type: 'sms'}
    resetPasswordAction(newValue, "email", handleSendLink)
  }
  return (
    <NewAuthLayout
      header='Enter phone number'
      image="phone"
      detail="Don’t worry, resetting your password is easy. Please enter the phone number you registered with, you will be sent a code to reset your password."
    >
      <Formik 
            initialValues={{username: ""}}
            // validationSchema={ResetEmailValidator}
            onSubmit={(values) => submitForm(values)}>
            {({ errors, touched, values }: any) => (
                <FormWrapper>
                  <Form className="form">
                    <div className="input">
                      <label>Phone Number</label>
                      <Field
                        name="username"
                        type="text"
                        placeholder="08166181091"
                        className={`${(touched.username && errors.username) ? 'form-error': ''}`}
                      />
                      {touched.username && errors.username && (
                        <p className="form-error-message">{errors.username}</p>
                      )}
                    </div>
                    <button type="submit">{isSubmitting === paths.RESET_PASSWORD ? (<ButtonLoader />) :'Send me code'}</button>
                  </Form>
                </FormWrapper>
            )}
          </Formik>
      <RememberPassword hasText />
    </NewAuthLayout>
  )
}

export default PasswordEmailReset;

