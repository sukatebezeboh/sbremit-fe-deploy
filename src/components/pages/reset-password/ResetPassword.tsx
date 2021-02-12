import { Field, Form, Formik } from 'formik';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { resetPasswordAction } from '../../../redux/actions/actions';
import { REDIRECT } from '../../../redux/actionTypes';
import { ResetPasswordValidator } from '../../../util/form-validators';
import { paths } from '../../../util/paths';
import FormButton from '../../ui-components/form-button/FormButton';
import SBRemitLogo from '../../ui-components/sbremit-logo/SBRemitLogo'
import style from './ResetPassword.css'

const Body = style();

const ResetPassword = () => {
    const [pwIcon, setPwIcon] = useState('show');
    const [passwordType, setPasswordType] = useState('password');
    const dispatch = useDispatch();
    const redirect = useSelector((state: any)=> state.redirect)

    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }
    useEffect(() => {
        dispatch({type: REDIRECT, payload: {...redirect, resetPassword: false}})
    }, [])

    const initialValues: any = {
        password: "",
        confirmation: ""
    }
    return (
        <Body>
            <div>
                <SBRemitLogo />
                <div className="heading">Reset Password</div>
                <div className="content">Enter the new password you want to access your account with</div>
                <Formik
                        initialValues={{...initialValues}}
                        validationSchema={ResetPasswordValidator}
                        onSubmit={values => {
                            resetPasswordAction(values, "reset")
                        }}>
                        {
                            ({errors, touched, values}: any) => (
                                <Form>
                                    <div className={`form ${(touched.password && errors.password) ? 'form-error': ''}`}>
                                        <div className="name">New Password<i>*</i></div>
                                        <Field name="password" type={passwordType} placeholder="Create your password"/>
                                        <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                        {(touched.password && errors.password) && <div className="form-error-message form-error-message-adjust-up">{errors.password}</div>}
                                    </div>
                                    <div className={`form ${(touched.confirmation && errors.confirmation) ? 'form-error': ''}`}>
                                        <div className="name">Confirm New Password<i>*</i></div>
                                        <Field name="confirmation" type={passwordType} placeholder="Create your password"/>
                                        <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                        {(touched.confirmation && errors.confirmation) && <div className="form-error-message form-error-message-adjust-up">{errors.confirmation}</div>}
                                    </div>
                                    <div className="btn"><FormButton label="Reset" formName={paths.RESET_PASSWORD}/></div>
                                </Form>
                            )
                        }
                </Formik>
                <div className="footer">Remember your password? <span>Try Logging in</span></div>
            </div>
            <div className="text">
                <div>To protect your account the password must contain at least:</div>
                <ul>
                    <li>1 uppercase letter (A-Z)</li>
                    <li>1 lowercase letter (a-z)</li>
                    <li>1 number (0-9)</li>
                    <li>8 characters</li>
                </ul>
            </div>
        </Body>
    )
}

export default ResetPassword;
