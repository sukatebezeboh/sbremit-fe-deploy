import { Field, Form, Formik } from 'formik';
import React, {useState} from 'react'
import { changePasswordAction } from '../../../redux/actions/actions';
import { ChangePasswordValidator } from '../../../util/form-validators';
import { paths } from '../../../util/paths';
import FormButton from '../../ui-components/form-button/FormButton';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import style from './ChangePassword.css'

const Body = style();

const ChangePassword = () => {

    const [pwNewIcon, setPwNewIcon] = useState('show');
    const [newPasswordType, setNewPasswordType] = useState('password');

    const [pwOldIcon, setPwOldIcon] = useState('show');
    const [oldPasswordType, setOldPasswordType] = useState('password');

    const handleNewPasswordClick = () => {
        setNewPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwNewIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    const handleOldPasswordClick = () => {
        setOldPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwOldIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    const initialValues: any = {
        oldPassword: "",
        password: "",
        confirmation: ""
    }
    


    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="Change Password" subheading="Update your password from your old one" back="/profile" mobileHide="subheading" />
                <div className="box">
                    <div>
                        <div className="content">Enter the new password you want to access your account with</div>
                        <Formik
                        initialValues={{...initialValues}}
                        validationSchema={ChangePasswordValidator}
                        onSubmit={values => {
                            changePasswordAction(values)
                        }}>
                        {
                            ({errors, touched, values}: any) => (
                                <Form>
                                    <div className={`form ${(touched.oldPassword && errors.oldPassword) ? 'form-error': ''}`}>
                                        <div className="name">Old Password<i>*</i></div>
                                        <Field name="oldPassword" type={oldPasswordType} placeholder="Type your current password"/>
                                        <img className="show-hide" onClick={handleOldPasswordClick} src={`./assets/icons/${pwOldIcon}.svg`} alt="show/hide"/>
                                        {(touched.oldPassword && errors.oldPassword) && <div className="form-error-message form-error-message-adjust-up">{errors.oldPassword}</div>}
                                    </div>
                                    <div className={`form ${(touched.password && errors.password) ? 'form-error': ''}`}>
                                        <div className="name">New Password<i>*</i></div>
                                        <Field name="password" type={newPasswordType} placeholder="Create your password"/>
                                        <img className="show-hide" onClick={handleNewPasswordClick} src={`./assets/icons/${pwNewIcon}.svg`} alt="show/hide"/>
                                        {(touched.password && errors.password) && <div className="form-error-message form-error-message-adjust-up">{errors.password}</div>}
                                    </div>
                                    <div className={`form ${(touched.confirmation && errors.confirmation) ? 'form-error': ''}`}>
                                        <div className="name">Confirm New Password<i>*</i></div>
                                        <Field name="confirmation" type={newPasswordType} placeholder="Create your password"/>
                                        <img className="show-hide" onClick={handleNewPasswordClick} src={`./assets/icons/${pwNewIcon}.svg`} alt="show/hide"/>
                                        {(touched.confirmation && errors.confirmation) && <div className="form-error-message form-error-message-adjust-up">{errors.confirmation}</div>}
                                    </div>
                                    <div className="btn">
                                        <span>Cancel</span>
                                        <FormButton label="Save new password" formName={paths.CHANGE_PASSWORD}/>
                                    </div>
                                </Form>
                            )
                        }
                </Formik>
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
                </div>

            </div>
        </Body>
    )
}

export default ChangePassword;
