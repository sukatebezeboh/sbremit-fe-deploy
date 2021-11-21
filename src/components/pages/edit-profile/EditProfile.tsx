import { Field, Form, Formik } from 'formik';
import React, {useState} from 'react'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { changePasswordAction, editProfileAction } from '../../../redux/actions/actions';
import { ChangePasswordValidator, EditProfileValidator } from '../../../util/form-validators';
import { paths } from '../../../util/paths';
import FormButton from '../../ui-components/form-button/FormButton';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import style from './EditProfile.css'

const Body = style();

const EditProfile = () => {

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

    const user = useSelector((state: any) => state.auth.user);
    const history = useHistory();

    const initialValues: any = {
        location_country: "gb",
        ...user?.profile,
    }


    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="Edit Profile" subheading="Update your profile details" back={paths.PROFILE} mobileHide="subheading" />
                <Formik
                        initialValues={{...initialValues}}
                        validationSchema={EditProfileValidator}
                        onSubmit={values => {
                            editProfileAction(values, () => history.push(paths.PROFILE))
                        }}>
                        {
                            ({errors, touched, values}: any) => (
                                <Form>
                                    <div className="box">
                                        <div>
                                            <div className="content">Edit your profile details below</div>

                                            <div className="form part">
                                                <hr className="mobile-hide"/>

                                            <div className="inputs">
                                                <div className="names">
                                                    <div className={(touched.firstName && errors.firstName) ? 'form-error': ''}>
                                                        <div>First Name<i>*</i></div>
                                                        <Field name="firstName" type="text" placeholder="John"/>
                                                        {(touched.firstName && errors.firstName) && <div className="form-error-message form-error-message-adjust-up">{errors.firstName}</div>}
                                                    </div>
                                                    <div></div>
                                                    <div className={(touched.lastName && errors.lastName) ? 'form-error': ''}>
                                                        <div>Last Name<i>*</i></div>
                                                        <Field name="lastName" type="text" placeholder="Doe"/>
                                                        {(touched.lastName && errors.lastName) && <div className="form-error-message form-error-message-adjust-up">{errors.lastName}</div>}
                                                    </div>
                                                </div>
                                                <div className="grid-col-1-1 grid-gap-3">
                                                    <div className={(touched.mobile && errors.mobile) ? 'form-error': ''}>
                                                        <div className="mobile-head">Mobile<i>*</i></div>
                                                        <Field name="mobile" type="text" className="phone-no" placeholder="e.g 07967885952"/>
                                                        <Field as="select" name="phoneCode" id="" >
                                                            <option value="uk">United Kingdom</option>
                                                        </Field>
                                                        <img src="./assets/flags/UK.png" alt="uk"/>
                                                    </div>

                                                    <div className={((touched.day && errors.day) || (touched.month && errors.month) || (touched.year && errors.year)) ? 'form-error': ''}>
                                                        <div>Date of birth<i>*</i></div>
                                                        <div className="grid-col-1-2-1 grid-gap-3 dob">
                                                            <div><Field name="day" type="text" placeholder="Day"/></div>
                                                            <div><Field name="month" type="text" placeholder="Month"/></div>
                                                            <div><Field name="year" type="text" placeholder="Year"/></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className={(touched.gender && errors.gender) ? 'form-error': ''}>
                                                    <div>Gender<i>*</i></div>
                                                    <div className="grid-col-1-1-1-2 m-grid-col-1-1-1">
                                                        <span className="grid-col-0-1 radio-span">
                                                            <Field type="radio" name="gender" value="male" />
                                                            <span className="radio-txt">Male</span>
                                                        </span>
                                                        <span className="grid-col-0-1 radio-span">
                                                            <Field type="radio" name="gender" value="female" />
                                                            <span className="radio-txt">Female</span>
                                                        </span>
                                                        <span className="grid-col-0-1 radio-span">
                                                            <Field type="radio" name="gender" value="Other" />
                                                            <span className="radio-txt">Other</span>
                                                        </span>
                                                        <span className="m-grid-col-span-1-4"> <Field name="gender" className="specify" placeholder="Please specify" /> </span>
                                                    </div>
                                                    {(touched.gender && errors.gender) && <div className="form-error-message form-error-message-adjust-up">{errors.gender}</div>}
                                                </div>

                                                <div className={(touched.address1 && errors.address1) ? 'form-error': ''}>
                                                    <div>Address line 1<i>*</i></div>
                                                    <Field name="address1" type="text" placeholder="Street name and no." />
                                                    {(touched.address1 && errors.address1) && <div className="form-error-message form-error-message-adjust-up">{errors.address1}</div>}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="">
                                        <div className="form part second">
                                            <hr className="mobile-hide"/>

                                            <div className="inputs">
                                                <div className={(touched.address2 && errors.address2) ? 'form-error': ''}>
                                                    <div>Address line 2</div>
                                                    <Field name="address2" type="text" placeholder="Apartment, suite, unit, building, floor" />
                                                    {(touched.address2 && errors.address2) && <div className="form-error-message form-error-message-adjust-up">{errors.address2}</div>}
                                                </div>
                                                <div className={`city-town-div ${(touched.city && errors.city) ? 'form-error': ''}`}>
                                                    <div>City / Town</div>
                                                    <Field name="city" type="text" />
                                                    {(touched.city && errors.city) && <div className="form-error-message form-error-message-adjust-up">{errors.city}</div>}
                                                </div>
                                                <div className={`state-input-div ${(touched.state && errors.state) ? 'form-error': ''}`}>
                                                    <div>State</div>
                                                    <Field name="state" type="text" />
                                                    {(touched.state && errors.state) && <div className="form-error-message form-error-message-adjust-up">{errors.state}</div>}
                                                </div>
                                                <div className={`state-input-div ${(touched.location_country && errors.location_country) ? 'form-error': ''}`}>
                                                    <div>Location Country</div>
                                                    <Field name="location_country" as="select" type="text" >
                                                        <option value=""></option>
                                                        <option value="gb">United Kingdom</option>
                                                    </Field>
                                                    <img src="./assets/flags/UK.png" alt="uk"/>
                                                    {(touched.location_country && errors.location_country) && <div className="form-error-message form-error-message-adjust-up">{errors.location_country}</div>}
                                                </div>
                                                <div className={(touched.zip && errors.zip) ? 'form-error': ''}>
                                                    <div>Postal / zip code</div>
                                                    <Field name="zip" type="text" />
                                                    {(touched.zip && errors.zip) && <div className="form-error-message form-error-message-adjust-up">{errors.zip}</div>}
                                                </div>


                                            </div>

                                        </div>

                                        <div className="btn">
                                            <span>Cancel</span>
                                            <FormButton label="Save" formName={paths.EDIT_PROFILE}/>
                                        </div>
                                    </div>
                                </div>
                            </Form>
                            )
                        }
                </Formik>
            </div>
        </Body>
    )
}

export default EditProfile;
