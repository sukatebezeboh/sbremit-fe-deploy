import React from 'react'
import { useSelector } from 'react-redux'
import { Field, Form, Formik } from 'formik'
import { resetPasswordAction } from '../../../redux/actions/actions';
import { ResetPasswordValidator } from '../../../util/form-validators';
import ButtonLoader from '../../modules/button-loader/ButtonLoader'
import {NewAuthLayout, RememberPassword, FormWrapper} from '../../modules/new-auth-layout/NewAuthLayout'
import { paths } from 'util/paths';

const ResetPassword = () => {
  const isSubmitting = useSelector((state: any) => state.submitting)
  // const toComplete = (email: string) => history.push(`${paths.EMAIL_LINK_SENT}?email=${email}`)
  return (
    <NewAuthLayout
      header='ResetPassword'
      detail="Please choose a new password"
      image="key"
    >
      <Formik 
            initialValues={{password: "", confirmation: ""}}
            validationSchema={ResetPasswordValidator}
            onSubmit={(values) => resetPasswordAction(values, "reset")}>
            {({ errors, touched, values }: any) => (
                <FormWrapper>
                  <Form className="form">
                    <div className="input">
                      <label>New password</label>
                      <Field
                        name="password"
                        type="password"
                        placeholder="New password"
                        className={`${(touched.password && errors.password) ? 'form-error': ''}`}
                      />
                      {touched.password && errors.password && (
                        <p className="form-error-message">{errors.password}</p>
                      )}
                    </div>
                    <div className="space" />
                    <div className="input">
                      <label>Confirm new password</label>
                      <Field
                        name="confirmation"
                        type="password"
                        placeholder="Confirm new password"
                        className={`${(touched.confirmation && errors.confirmation) ? 'form-error': ''}`}
                      />
                      {touched.confirmation && errors.confirmation && (
                        <p className="form-error-message">{errors.confirmation}</p>
                      )}
                    </div>
                    <button type="submit">{isSubmitting === paths.RESET_PASSWORD ? (<ButtonLoader />) :'Reset password'}</button>
                  </Form>
                </FormWrapper>
            )}
          </Formik>
      <RememberPassword hasText />
    </NewAuthLayout>
  )
}

export default ResetPassword;
;
