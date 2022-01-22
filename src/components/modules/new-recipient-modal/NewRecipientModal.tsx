import { Field, Form, Formik } from 'formik';
import React, { useState } from 'react'
import styled from 'styled-components';

import { createRecipient } from '../../../redux/actions/actions';
import { paths } from '../../../util/paths';
import { RecipientValidator } from "../../../util/form-validators";
import FormButton from '../form-button/FormButton';
import PageHeading from '../page-heading/PageHeading';
import { useDispatch, useSelector } from 'react-redux';
import { REASONS } from '../../../util/constants';
import { isObjectNotEmpty } from '../../../util/util';

const Div = styled.div`
    .overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 150vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 2;
    }

    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 55%;
        min-height: 661px;
        background: #fff;
        margin: 0px auto;
        padding: 60px 0px 30px;
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 22%;
        transform: translateY(-50%);
        .head {
            border-bottom: 1px solid #F0F0F0;
            display: grid!important;
            grid-template-columns: 3fr 4fr;
            width: 80%;
            margin: 0px auto;
            padding: 20px 0px;
            .t-id {
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                span {
                    color: #424242; 
                }
            }
            .close {
                text-align: right;
                font: normal normal normal 26px/24px Montserrat;
                color: #A3A3A3;
                cursor: pointer;
            }
        }
        .form {
            width: 80%;
            margin: 30px auto 0px;
            >div{
                margin-top: 20px;
                font: normal normal normal 15px/19px Montserrat;
                color: #A3A3A3;
                i{
                    color: #FCD20F;
                }
                .show-hide{
                    width: 16px;
                    height: 16px;
                    position: relative;
                    top: -33px;
                    left: 90%;
                }
                >div{
                    font: normal normal normal 15px/19px Montserrat;
                    line-height: 19px;
                }
            }
            input, select{
                margin-bottom: 5px;
                width: 100%;
                height: 48px;
                border: 2px solid #7FBCAD;
                border-radius: 4px;
                background: #ffffff;
                outline: none;
                font: normal normal normal 14px Montserrat;
                color: #A3A3A3;
                padding: 20px;
                ::placeholder{
                    color: #A3A3A3; 
                }
            }
            select{
                -webkit-appearance: none;
                -moz-appearance: none;
                background: transparent;
                background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(127, 188, 173)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                background-repeat: no-repeat;
                background-position-x: 95%;
                background-position-y: 10px;
                padding: 0px;
                padding-left: 15px;
            }
            select.phone  {
                background-position-x: 15%;
                padding-left: 75px;
            }
            input.phone-no {
                position: relative;
                top: 51px;
                width: 79%;
                height: 44px;
                margin-left: 20%;
                border: 2px solid transparent;
                background: #fff;
            }
            div.mobile-head {
                margin-bottom: -50px;
            }
            select+img{
                position: relative;
                top: -35px;
                left: 20px;
                width: 25px;
                height: 19px;
                box-shadow: 0px 3px 6px #00000029;
                border-radius: 1px;
                pointer-events: none;
            }
            div.margin-adjust {
                margin-bottom: -44px;
            }
            span.reason-close {
                color: red;
                position: relative;
                right: 5%;
                top: -40px;
                float: right;
                cursor: pointer;

            }
        }
        .modal-btns {
            text-align: right;
            margin: 65px 10%;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                cursor: default;
            }
            button {
                background: #FCD20F;
                border-radius: 4px;
                width: 200px;
                height: 48px;
                text-align: center;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
    }
@media only screen and (max-width: 900px) { 
    padding:0px;
    .overlay {
        background: #fff;
    }
    .mobile-modal {
        .page-heading {
            
            .heading {
                z-index: 2;
            }
            
        }
    }
    .modal {
        width: 100%;
        left: 0%;
        /* top: 50px; */
        padding: 0px;
        box-shadow: none;
        overflow-y: scroll;
        height: 100vh;
        padding-bottom: 100vh;
        .form {
            grid-template-columns: 1fr;
            grid-gap: 0px;
            width: 90%;
            >div {
                margin-top: 15px;
                div {
                    font: normal normal normal 10px/13px Montserrat;
                }
                input, select {
                    height: 30px;
                    border: 1px solid #7FBCAD;
                    border-radius: 4px;
                    padding: 0px 15px;
                    ::placeholder {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                }
                div.margin-adjust {
                    margin-bottom: -25px;
                }
                input.phone-no {
                        top: 32px;
                        height: 25px!important;
                        margin-left: 15%;
                        width: 85%;
                        padding-left: 5px;
                        border: 1px solid transparent;
                        padding: 0px 5px;
                    }
                    select {
                        background-position-y: 3px;
                    }
                    select.phone{
                        padding: 10px 50%;
                        background-position-y: 3px;
                        background-position-x: 10%;
                    }
                    .mobile-head {
                        margin-bottom: -31px;
                    }
                    select+img{
                        top: -29px;
                        left: 10px;
                    }
            }
        }
        .modal-btns {
            margin: 20px 0px;
            padding: 0px 5%;
            width: 100%;
            button {
                width: 100%;
                height: 40px;
                font: normal normal normal 13px/16px Montserrat;
                border-radius: 6px;
            }
            >span {
                font: normal normal normal 13px/16px Montserrat;
                text-align: center;
                display: block;
                margin-right: 0px;
                position: relative;
                top: 70px;
            }
        }
    }
}

`

function NewRecipientModal(props: any) {
    const {modalOpen, openModal, selectRecipient, recipientData} = props;
    const dispatch = useDispatch()
    const [otherReasons, setOtherReasons] = useState(false);
    const [reasonValue, setReasonValue] = useState('');
    const transfer = useSelector((state: any) => state.transfer)

    const initialValues = {
        firstName: recipientData?.firstName || "",
        lastName: recipientData?.lastName || "",
        mobile: recipientData?.profile?.mobile || "",
        phoneCode: recipientData?.profile?.phoneCode || "+237",
        email: recipientData?.profile?.email || "",
        state: recipientData?.profile?.state || "",
        reason: recipientData?.profile?.reason || "",
        bankName: recipientData?.profile?.bankName || "",
        accountNumber: recipientData?.profile?.accountNumber || "",
        pickupPoint: recipientData?.profile?.pickupPoint || ""
    }

    const handleReasonsChange = (e: any) => {
        const {value} = e.target;
        if (value == 'Other') {
            setReasonValue('')
            setOtherReasons(true);
        }
        else {
            setReasonValue(value)
            setOtherReasons(false)
        }
    }

    return (
        modalOpen && <Div>
            <div className="overlay">
            </div>
            <div className="modal">
                <div className="head mobile-hide">
                    <div className="t-id">Add a new recipient</div>
                    <div className="close" onClick={()=>openModal(false)} >x</div>
                </div>
                <Formik
                        initialValues={{...initialValues}}
                        validationSchema={RecipientValidator}
                        onSubmit={values => {
                            dispatch(createRecipient(values, { openModal, selectRecipient }))
                        }}>
                        {
                            ({errors, touched, values}: any) => (
                                <Form>
                                    <div className="form grid-col-1-1 grid-gap-3">
                                            <div className={(touched.firstName && errors.firstName) ? 'form-error': ''}>
                                                <div>First name<i>*</i></div>
                                                <Field type="text" name="firstName" placeholder="John" />
                                            </div>
                                            <div className={(touched.lastName && errors.lastName) ? 'form-error': ''}>
                                                <div>Last name<i>*</i></div>
                                                <Field type="text" name="lastName" placeholder="Doe" />
                                            </div>
                                            <div className={(touched.mobile && errors.mobile) ? 'form-error': ''}>
                                                <div className="mobile-head">Mobile<i>*</i></div>
                                                <Field type="text" name="mobile" className="phone-no" placeholder="e.g 07967885952"/>
                                                <Field as="select" name="phoneCode" id="" className="phone" >
                                                    <option value="+01">United Kingdom</option>
                                                    <option value="+237">Cameroon</option>
                                                </Field>
                                                <img src={`./assets/flags/${values.phoneCode == "+237" ? "CM" : "UK"}.png`} alt="country"/>
                                                <div className="margin-adjust"></div>
                                            </div>
                                            <div className={(touched.email && errors.email) ? 'form-error': ''}>
                                                <div>Email</div>
                                                <Field type="text" name="email" placeholder="Recipient’s email address" />
                                            </div>
                                            <div className={(touched.state && errors.state) ? 'form-error': ''}>
                                                <div>City/State</div>
                                                <Field type="text" name="state" placeholder="" />
                                            </div>
                                            <div className={(touched.reason && errors.reason) ? 'form-error': ''}>
                                                <div>Reason</div>
                                                    <Field as="select"  name='reason' id="reason" value={reasonValue || initialValues.reason} onInput={(e: any) => handleReasonsChange(e)}>
                                                        <option value="">Select</option>
                                                        {
                                                            REASONS.map((reason: string) => (
                                                                // (reason !== 'Other') ? (<option value={reason}>{reason}</option>) : (<option value={REASONS.includes(values.reason) ? '-' : values.reason }>{reason}</option>) 
                                                                <option value={reason}>{reason}</option>
                                                                )
                                                            )
                                                        }

                                                    </Field>
                                                {
                                                    otherReasons ?
                                                    <Field placeholder="Enter your reason here" value={reasonValue} onInput={(e :any) => setReasonValue(e.target.value)} type="text" name={otherReasons ? 'reason' : ''} id="" />
                                                    : <></>
                                                }
                                            </div>
                                            {transfer.transferMethod === "bank_transfer" ?
                                            <React.Fragment>
                                                <div className={(touched.bankName && errors.bankName) ? 'form-error': ''}>
                                                    <div> Beneficiary Bank Name</div>
                                                    <Field type="text" name="bankName" placeholder="" />
                                                </div>
                                                <div className={(touched.accountNumber && errors.accountNumber) ? 'form-error': ''}>
                                                    <div>Recipient Account Number <span className="red-txt">{errors.accountNumber}</span> </div>
                                                    <Field type="text" name="accountNumber" placeholder="e.g. 3450012398" />
                                                </div>
                                            </React.Fragment> : ''}

                                            {transfer.transferMethod === "cash_pickup" ?
                                                <div className={(touched.pickup_point && errors.pickup_point) ? 'form-error': ''}>
                                                    <div>Pickup point</div>
                                                    <Field as="select" type="text" name="pickupPoint" placeholder="e.g. 3450012398" >
                                                        <option value=""> - Select - </option>
                                                        <option value="SB Capital (Akwa)"> SB Capital (Akwa)</option>
                                                    </Field>
                                                </div>
                                             : ''}


                                    </div>
                                    <div className="modal-btns"><span onClick={()=>openModal(false)}>Cancel</span> <FormButton label={isObjectNotEmpty(recipientData) ? "Save" : "Add"} formName={paths.RECIPIENT} /> </div>
                                </Form>
                            )
                        }
                    </Formik>
            </div>

             {/* MOBILE NR MODAL */}
             <div className="desktop-hide mobile-modal">
                <PageHeading heading="Add a new recipient" back="#" callBack={()=>openModal(false)} />
            </div>
        </Div>
    )
}

export default NewRecipientModal
