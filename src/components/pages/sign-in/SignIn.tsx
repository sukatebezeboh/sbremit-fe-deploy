import React, { useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import style from '../shared/auth.css'
import ForgotPasswordModal from '../../modules/forgot-password-modal/ForgotPasswordModal'
import SBRemitLogo from '../../modules/sbremit-logo/SBRemitLogo'
import { SignInValidator } from '../../../util/form-validators'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import { signInAction } from '../../../redux/actions/actions'
import ButtonLoader from '../../modules/button-loader/ButtonLoader'
import { SIGN_IN } from '../../../redux/actionTypes'
import { paths } from '../../../util/paths'

const Body = style('signin')

const SignIn = () => {
  const [passwordType, setPasswordType] = useState('password')
  const [pwIcon, setPwIcon] = useState('show')
  const [showModal, setShowModal] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const submitting = useSelector((state: any) => state.submitting)
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated,
  )

  const handlePasswordClick = () => {
    setPasswordType((prevValue) => {
      return prevValue === 'password' ? 'text' : 'password'
    })
    setPwIcon((prevValue) => {
      return prevValue === 'show' ? 'hide' : 'show'
    })
  }

  const handleForgotPassword: Function = (): void => setShowModal(true)
  const handleSignIn: Function = (): void => history.push('/dashboard')

  const initialValues: any = {
    username: '',
    password: '',
  }

  return isAuthenticated ? (
    <Redirect to={paths.DASHBOARD} />
  ) : (
    <Body>
      <div></div>
      <ForgotPasswordModal show={showModal} setShow={setShowModal} />
      <div>
        <SBRemitLogo />
        <Formik
          initialValues={{ ...initialValues }}
          validationSchema={SignInValidator}
          onSubmit={(values) => {
            dispatch(signInAction(values))
          }}
        >
          {({ errors, touched, values }: any) => (
            <Form className="form">
              <div className="heading">Welcome back!</div>
              <div className="sub-heading">
                New to SBremit?{' '}
                <Link to={{ pathname: '/sign-up', state: { fromLogin: true } }}>
                  <span>Sign up</span>
                </Link>{' '}
              </div>
              <div className="inputs">
                <div></div>
                <div
                  className={
                    'email ' +
                    (touched.username && errors.username ? 'form-error' : '')
                  }
                >
                  <div>Email</div>
                  <Field
                    name="username"
                    type="text"
                    placeholder="Your email address"
                  />
                  {touched.username && errors.username && (
                    <div className="form-error-message">{errors.username}</div>
                  )}
                </div>
                <div
                  className={
                    touched.password && errors.password ? 'form-error' : ''
                  }
                >
                  <div>
                    Password{' '}
                    <span
                      className="f-pass"
                      onClick={() => history.push('/forget-password')}
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <Field
                    name="password"
                    type={passwordType}
                    placeholder="Enter your password"
                  />
                  <img
                    className="show-hide"
                    onClick={handlePasswordClick}
                    src={`./assets/icons/${pwIcon}.svg`}
                    alt="show/hide"
                  />
                  {touched.password && errors.password && (
                    <div className="form-error-message form-error-message-adjust-up">
                      {errors.password}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="grid-col-1-0"
                  disabled={submitting === SIGN_IN}
                >
                  {' '}
                  <span>Sign in</span>{' '}
                  {submitting === SIGN_IN && <ButtonLoader />}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Body>
  )
}

export default SignIn
