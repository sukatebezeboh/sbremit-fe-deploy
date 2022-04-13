import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import SBRemitLogo from '../../modules/sbremit-logo/SBRemitLogo'
import style from '../shared/auth.css'
import { Formik, Form, Field } from 'formik'
import { SignUpValidator } from '../../../util/form-validators'
import { signUpAction } from '../../../redux/actions/actions'
import ButtonLoader from '../../modules/button-loader/ButtonLoader'
import { SIGN_UP } from '../../../redux/actionTypes'
import { paths } from '../../../util/paths'
import { constants } from '../../../util/constants'
import { CreationModal } from '../../modules/creation-modal/CreationModal'
import styled from 'styled-components'
import { asset, getQueryParam, isPhoneNumber } from '../../../util/util'

const Body = style('signup')

const ModalDiv = styled.div`
  .highlight {
    font-weight: bold;
  }
`

const SignUp = () => {
  const [passwordType, setPasswordType] = useState('password')
  const [pwIcon, setPwIcon] = useState('show')
  const [openModal, setOpenModal] = useState(false)
  const [redirect, setRedirect] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()
  const submitting = useSelector((state: any) => state.submitting)
  const createAccountSuccess = useSelector(
    (state: any) => state.createAccountSuccess,
  )
  const createAccountError = useSelector(
    (state: any) => state.createAccountError,
  )
  const countries: any = useSelector((state: any) => state.appValues.countries)


  useEffect(() => {
    setOpenModal(false)
  }, [])

  useEffect(() => {
    if (createAccountError !== null) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }, [createAccountError])

  useEffect(() => {
    if (createAccountSuccess !== null && !history?.location?.state) {
      setOpenModal(true)
    } else {
      setOpenModal(false)
    }
  }, [createAccountSuccess, history?.location?.state])

  const handlePasswordClick = () => {
    setPasswordType((prevValue) => {
      return prevValue === 'password' ? 'text' : 'password'
    })
    setPwIcon((prevValue) => {
      return prevValue === 'show' ? 'hide' : 'show'
    })
  }

  const initialValues: any = {
    firstName: '',
    lastName: '',
    location_country: 'AD',
    username: '',
    password: '',
    mobile: '',
    checked: true,
    referral: getQueryParam('referral') ?? ''
  }

  const handleSubmit = (values: any) => {
    dispatch(signUpAction(values))
  }

  return (
    <>
      {openModal && (
        <ModalDiv>
          <CreationModal
            title={
              createAccountSuccess !== null
                ? 'Account successfully created'
                : 'Account creation failed'
            }
            message1={
              createAccountSuccess !== null ? (
                <p>
                  Please check your email/phone{' '}
                  <span className="highlight">
                    {createAccountSuccess.username}
                  </span>{' '}
                  to activate your account, make sure to check your{' '}
                  <span className="highlight">spam</span> and other inboxes e.g{' '}
                  <span className="highlight">promotions</span>
                </p>
              ) : (
                createAccountError?.message
              )
            }
            message2={
              createAccountSuccess !== null &&
              'It can take up to 5 minutes for the email to arrive'
            }
            callToAction={createAccountSuccess !== null ? 'success' : 'error'}
            buttonText={
              createAccountSuccess !== null ? 'Continue' : 'Try again'
            }
            redirectLink={ isPhoneNumber(createAccountSuccess?.username) ? `${paths.CONFIRM_ACCOUNT_SMS}?phone=${encodeURIComponent(createAccountSuccess.username)}` : paths.SIGN_IN}
            redirect={redirect}
            setModalState={(value: boolean) => setOpenModal(value)}
            setRedirect={(value: boolean) => setRedirect(value)}
          />
        </ModalDiv>
      )}

      <Body>
        <div></div>
        <div>
          <SBRemitLogo />
          <Formik
            initialValues={{ ...initialValues }}
            validationSchema={SignUpValidator}
            onSubmit={(values) => {
              const {checked, ...newValue}  = values

              const newValues = {
                ...newValue,
                settings: {
                  marketingPermission: values.checked.length > 0 && values.checked[0] === 'checked' ? true : false,
                }
              }

              handleSubmit(newValues)}}
          >
            {({ errors, touched, values }: any) => (
              <Form className="form">
                <div className="heading">Create an account. It’s free!</div>
                <div className="sub-heading">
                  Already have an account?{' '}
                  <Link to="/sign-in">
                    <span>Sign in</span>
                  </Link>{' '}
                </div>
                <div className="inputs">
                  <div>
                    <div
                      className={
                        touched.firstName && errors.firstName
                          ? 'form-error'
                          : ''
                      }
                    >
                      <div>
                        First Name<i>*</i>
                      </div>
                      <Field name="firstName" type="text" placeholder="John" />
                      {touched.firstName && errors.firstName && (
                        <div className="form-error-message">
                          {errors.firstName}
                        </div>
                      )}
                    </div>
                    <div></div>
                    <div
                      className={
                        touched.lastName && errors.lastName ? 'form-error' : ''
                      }
                    >
                      <div>
                        Last Name<i>*</i>
                      </div>
                      <Field name="lastName" type="text" placeholder="Doe" />
                      {touched.lastName && errors.lastName && (
                        <div className="form-error-message">
                          {errors.lastName}
                        </div>
                      )}
                    </div>
                  </div>
                  <div
                    className={
                      touched.location_country && errors.location_country
                        ? 'form-error'
                        : ''
                    }
                  >
                    <div>
                      Country of Residence<i>*</i>
                    </div>
                    <Field as="select" name="location_country" id="">
                      {Object.keys(constants.SIGNUP_COUNTRIES).map((key) => (
                        <option value={key}>{countries[key]}</option>
                      ))}
                    </Field>
                    <img
                      src={asset('flags', `${values.location_country}.png`)}
                      alt={values.location_country}
                    />
                    {touched.location_country && errors.location_country && (
                      <div className="form-error-message form-error-message-adjust-up">
                        {errors.location_country}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      touched.username && errors.username ? 'form-error' : ''
                    }
                  >
                    <div>
                    Email or Phone Number<i>*</i>
                    </div>
                    <Field
                      name="username"
                      type="text"
                      placeholder="Your email address or phone number"
                    />
                    {touched.username && errors.username && (
                      <div className="form-error-message">
                        {errors.username}
                      </div>
                    )}
                  </div>
                  <div
                    className={
                      touched.password && errors.password ? 'form-error' : ''
                    }
                  >
                    <div>
                      Password<i>*</i>
                    </div>
                    <Field
                      name="password"
                      type={passwordType}
                      placeholder="Create your password"
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

                  <div
                    className={
                      touched.referral && errors.referral ? 'form-error' : ''
                    }
                  >
                    <div>
                      Referral Code <i>(optional)</i>
                    </div>
                    <Field
                      name="referral"
                      type="text"
                      placeholder="Referred by someone? Use their referral code here"
                    />
                    {touched.referral && errors.referral && (
                      <div className="form-error-message">
                        {errors.referral}
                      </div>
                    )}
                  </div>

                  <div className="marketing-permission-box">
                    <Field type="checkbox" name="checked" />
                    <label>
                      By ticking this box, you wish to be contacted for marketing information purposes or for any special offer
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="grid-col-1-0"
                    disabled={submitting === SIGN_UP}
                  >
                    {' '}
                    <span> Sign up </span>{' '}
                    {submitting === SIGN_UP && <ButtonLoader />}{' '}
                  </button>
                </div>
                <hr />
                <div className="terms">
                  By signing up you agree to our <span>Terms of Use</span> and{' '}
                  <span>Privacy Policy.</span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Body> 
    </>
  )
}

export default SignUp
