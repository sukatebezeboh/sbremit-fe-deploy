import React, {useState, useCallback} from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link, useHistory } from "react-router-dom";
import SBRemitLogo from "../../ui-components/sbremit-logo/SBRemitLogo";
import style from "../shared/auth.css";
import {Formik, Form, Field} from 'formik';
import { SignUpValidator } from "../../../util/form-validators";
import { signUpAction } from "../../../redux/actions/actions";
import ButtonLoader from "../../ui-components/button-loader/ButtonLoader";
import { SIGN_UP, SUBMITTING, TOAST } from "../../../redux/actionTypes";
import Toast from "../../ui-components/toast-factory/toast/Toast";



const Body = style('signup');

const SignUp = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [pwIcon, setPwIcon] = useState('show');
    const history = useHistory();
    const dispatch = useDispatch()
    const submitting = useSelector((state: any) => state.submitting)

    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }
    const handleSignUp = useCallback(() => history.push('/email/confirm-account'), [history]);

    const initialValues: any = {
        firstName:"",
        lastName: "",
        location_country: "UK",
        username: "",
        password: "",
        mobile: ""
    }

    return (
        <Body>
            <div>
                
            </div>
            <div>
                <SBRemitLogo />
                    <Formik
                        initialValues={{...initialValues}}
                        validationSchema={SignUpValidator}
                        onSubmit={values => {
                            
                            dispatch(signUpAction(values))
                        }}>
                        {
                            ({errors, touched, values}: any) => (

                            
                                <Form className="form">
                                    <div className="heading">Create an account. It’s free!</div>
                                    <div className="sub-heading">Already have an account? <Link to="/sign-in"><span>Sign in</span></Link> </div>
                                    <div className="inputs">
                                        <div>
                                            <div className={(touched.firstName && errors.firstName) ? 'form-error': ''}>
                                                <div>First Name<i>*</i></div>
                                                <Field name="firstName" type="text" placeholder="John" />
                                                {(touched.firstName && errors.firstName) && <div className="form-error-message">{errors.firstName}</div>}
                                            </div>
                                            <div></div>
                                            <div className={(touched.lastName && errors.lastName) ? 'form-error': ''}>
                                                <div>Last Name<i>*</i></div>
                                                <Field name="lastName" type="text" placeholder="Doe"/>
                                               {(touched.lastName && errors.lastName) && <div className="form-error-message">{errors.lastName}</div>}
                                            </div>
                                        </div>
                                        <div className={(touched.location_country && errors.location_country) ? 'form-error': ''}>
                                            <div>Country of Residence<i>*</i></div>
                                            <Field as="select" name="location_country" id="">
                                                <option value="UK">United Kingdom</option>
                                                <option value="CA">Cameroon</option>
                                            </Field>
                                            <img src={`./assets/flags/${values.location_country}.png`} alt="uk"/>
                                            {(touched.location_country && errors.location_country) && <div className="form-error-message form-error-message-adjust-up">{errors.location_country}</div>}
                                        </div>
                                        <div className={(touched.username && errors.username) ? 'form-error': ''}>
                                            <div>Email<i>*</i></div>
                                            <Field name="username" type="text" placeholder="Your email address"/>
                                            {(touched.username && errors.username) && <div className="form-error-message">{errors.username}</div>}
                                        </div>
                                        <div className={(touched.password && errors.password) ? 'form-error': ''}>
                                            <div>Password<i>*</i></div>
                                            <Field name="password" type={passwordType} placeholder="Create your password"/>
                                            <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                            {(touched.password && errors.password) && <div className="form-error-message form-error-message-adjust-up">{errors.password}</div>}

                                        </div>

                                        <button type="submit" className="grid-col-1-0" disabled={submitting === SIGN_UP}> <span> Sign up </span> { submitting === SIGN_UP && <ButtonLoader/>} </button>
                                    </div>
                                    <hr/>
                                    <div className="terms">By signing up you agree to our <span>Terms of Use</span> and <span>Privacy Policy.</span></div>
                                </Form>
                            )
                        }
                    </Formik>
            </div>
        </Body>
    )
}

export default SignUp;
