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
  const handleSendLink = (email: string) => history.push(`${paths.EMAIL_LINK_SENT}?email=${email}`)
  const submitForm = (values: any) => {
    const newValue = {...values, type: 'EMAIL'}
    resetPasswordAction(newValue, "email", handleSendLink)
  }
  return (
    <NewAuthLayout
      image="email"
      header='Enter email address'
      detail="Don’t worry, resetting your password is easy. Please enter the email address you registered with, you will be sent a link to reset your password."
    >
      <Formik 
            initialValues={{username: ""}}
            validationSchema={ResetEmailValidator}
            onSubmit={(values) => submitForm(values)}>
            {({ errors, touched, values }: any) => (
                <FormWrapper>
                  <Form className="form">
                    <div className="input">
                      <label>Email address</label>
                      <Field
                        name="username"
                        type="text"
                        placeholder="Enter email address"
                        className={`${(touched.username && errors.username) ? 'form-error': ''}`}
                      />
                      {touched.username && errors.username && (
                        <p className="form-error-message">{errors.username}</p>
                      )}
                    </div>
                    <button type="submit">{isSubmitting === paths.RESET_PASSWORD ? (<ButtonLoader />) :'Request Reset Link'}</button>
                  </Form>
                </FormWrapper>
            )}
          </Formik>
      <RememberPassword hasText />
    </NewAuthLayout>
  )
}

export default PasswordEmailReset;
