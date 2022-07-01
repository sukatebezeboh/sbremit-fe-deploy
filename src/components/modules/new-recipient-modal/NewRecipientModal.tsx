import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components';

import { createRecipient, verifyPivotRecipientReference } from '../../../redux/actions/actions';
import { paths } from '../../../util/paths';
import { RecipientBankTransferBankTransferValidator, RecipientBankTransferMicrofinanceTransferValidator, RecipientCashPickupValidator, RecipientMobileMoneyValidator, RecipientValidator } from "../../../util/form-validators";
import FormButton from '../form-button/FormButton';
import PageHeading from '../page-heading/PageHeading';
import { useDispatch, useSelector } from 'react-redux';
import { countriesAndCodes, REASONS, remittanceHandlers, transferMethodsInWords } from '../../../util/constants';
import { isObjectNotEmpty } from '../../../util/util';
import FormikFormObserver from '../formik-form-observer/FormikFormObserver';
import PhoneNumberInput from '../parts/PhoneNumberInput';

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
        width: 70%;
        min-height: 661px;
        background: #fff;
        margin: 0px auto;
        padding: 60px 0px 20px;
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 14%;
        transform: translateY(-50%);
        .transfer-fields {
            select {
                width: 17% !important;
                margin-right: 5px;
            }
            .branch-code, .bank-code{
                width: 17%; !important;
                margin-right: 5px;
            }
            .key {
                width: 12% !important;
            }
            .account-number {
                width: 25% !important;
                margin-right: 5px;
            }
        }
        .transfer-type {
            width: 80%;
            margin: 0px auto;
            padding: 0;
            ul {
                display: flex;
                list-style: none;
                li {
                    cursor: pointer;
                    color: #818080;
                    font-size: 16px;
                    font-weight: 600;
                    margin-left: -40px;
                    :hover {
                        border-bottom: 1px solid #818080;
                    }
                }
                .underline {
                    border-bottom: 1px solid #4c8778;
                    color: #4c8778;
                }
                .microfinance {
                    margin-left: 20px !important;
                }

            }
        }
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
                padding: 10px;
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
                padding-left: 7px;
            }
            select.phone  {
                background-position-x: 22%;
                padding-left: 200px;
                border: none;
            }
            input.phone-no {
                width: 100%;
                border: none;
                border-left: 1px solid #7FBCAD;
                border-radius: 0px;
            }
            div.mobile-head {
                margin-bottom: -50px;
            }
            div.country-code{
                position: relative;
                top: -42px;
                left: 10px;
                display: flex;
                align-items: center;
                width: fit-content;
                height: 25px;
                pointer-events: none;
                img{
                    width: 25px;
                    height: 19px;
                }
            }
            div.phone-no-error-box{
                margin-top: 50px;
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
                /* color: #424242; */
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
    padding: 0px;
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

                .modified-tel-input {
                    //width: 40%;
                    .phone-input-wrapper {
                        width: 100%;
                    }
                }
                div {
                    font: normal normal normal 10px/13px Montserrat;
                }
                input, select {
                    //height: 30px;
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
                    width: calc(100% - 80px);
                    border-top: 1px solid #7FBCAD;
                    border-right: 1px solid #7FBCAD;
                    border-bottom: 1px solid #7FBCAD;
                    padding: 0px 5px;
                }
                select {
                    background-position-y: 3px;
                }
                select.phone{
                    padding: 10px 50%;
                    background-position-y: 3px;
                    background-position-x: 55px;
                }
                .mobile-head {
                    margin-bottom: -31px;
                }
                /* select+img{
                    top: -29px;
                    left: 10px;
                } */
                div.country-code{
                    top: -32px;
                }
                div.phone-no-error-box{
                    margin-top: 30px;
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

const getRecipientCreateValidationSchema = ( transferMethod: string, onChangeCallback?:Function ) => {
    onChangeCallback?.();
    return {
        "cash_pickup": RecipientCashPickupValidator,
        "bank_transfer_bankTransfer": RecipientBankTransferBankTransferValidator,
        "bank_transfer_microfinanceTransfer": RecipientBankTransferMicrofinanceTransferValidator,
        "mobile_money": RecipientMobileMoneyValidator
    }[transferMethod] ?? RecipientValidator;
}

function NewRecipientModal(props: any) {
    const {modalOpen, openModal, selectRecipient, recipientData} = props;
    const dispatch = useDispatch()
    const [otherReasons, setOtherReasons] = useState(false);
    const [reasonValue, setReasonValue] = useState('');
    const [modeTransfer, setModeTransfer] = useState<String>('bankTransfer');
    const [ showVerifyStep, setShowVerifyStep ] = useState(false);
    const transfer = useSelector((state: any) => state.transfer)
    const [mobileProvider, setMobileProvider] = useState("")

    const getCountry = () => {
        return countriesAndCodes.find(country => country.countryCode === transfer.toReceive.countryCode);
    }

    const country = getCountry();

    const initialValues = {
        firstName: recipientData?.firstName || "",
        lastName: recipientData?.lastName || "",
        mobile: recipientData?.profile?.mobile || "",
        phoneCode: recipientData?.profile?.phoneCode || '+' + country?.phoneCode,
        confirmMobile: recipientData?.profile?.mobile || "",
        confirmPhoneCode: recipientData?.profile?.phoneCode || '+' + country?.phoneCode,
        email: recipientData?.profile?.email || "",
        state: recipientData?.profile?.state || "",
        reason: recipientData?.profile?.reason || "",
        bankName: recipientData?.profile?.bankName || "",
        accountNumber: recipientData?.profile?.accountNumber || "",
        pickupPoint: recipientData?.profile?.pickupPoint || "",
        branchCode: "",
        bankCode: "",
        key: "",
        countryCode: "CM21",
        accountBranch: "",
        recipientAccountNumber: "",
        mobileMoneyProvider: recipientData?.profile?.mobileMoneyProvider || ""
    }

    const handleReasonsChange = (e: any) => {
        const {value} = e.target;
        if (value === 'Other') {
            setReasonValue('')
            setOtherReasons(true);
        }
        else {
            setReasonValue(value)
            setOtherReasons(false)
        }
    }

    useEffect(() => {
        if ( transfer.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER ) {
            setShowVerifyStep(true)
        }
    }, [])

    const verifyRecipient = (event: any, payload: any) => {
        event.preventDefault()
        payload.mobileMoneyProvider = mobileProvider
        verifyPivotRecipientReference(payload, () => setShowVerifyStep(false), () => setShowVerifyStep(false))
    }

    const updateVerifyStep = (values: any) => {
        if ( transfer.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER ) {
            setShowVerifyStep(true)
        }
    }


    return (
        modalOpen && <Div>
            <div className="overlay">
            </div>
            <div className="modal">
                <div className="head mobile-hide">
                <div className="t-id">Add a new recipient <span className="no-wrap"> ({mobileProvider} {transferMethodsInWords[transfer?.transferMethod]} ) </span> </div>
                    <div className="close" onClick={()=>openModal(false)} >x</div>
                </div>
                {transfer.transferMethod === "bank_transfer" && (
                <div className="transfer-type">
                    <ul>
                        <li
                            className={`${modeTransfer === 'bankTransfer' ? 'underline' : ''}`}
                            onClick={() => setModeTransfer('bankTransfer')}
                        >
                            Bank transfer
                        </li>
                        <li
                            className={`${modeTransfer === 'microfinanceTransfer' ? 'underline microfinance' : 'microfinance'}`}
                            onClick={() => setModeTransfer('microfinanceTransfer')}
                        >
                            Microfinance transfer
                        </li>
                    </ul>
                </div>
                )}
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={getRecipientCreateValidationSchema(`${transfer?.transferMethod}${transfer?.transferMethod === "bank_transfer" ? "_"+modeTransfer : ''}`, () => {} )}
                    onSubmit={values => {
                        const newValue = {
                            firstName: values.firstName,
                            lastName: values.lastName,
                            mobile: values.mobile,
                            phoneCode: values.phoneCode,
                            email: values.email,
                            state: values.state,
                            reason: values.reason,
                            bankName: values.bankName,
                            accountNumber: `${modeTransfer === 'bankTransfer' ? `${values.countryCode} ${values.bankCode} ${values.branchCode} ${values.accountNumber} ${values.key}` : values.recipientAccountNumber}`,
                            mobileMoneyProvider: values.mobileMoneyProvider || mobileProvider
                        }
                        dispatch(createRecipient(newValue, { openModal, selectRecipient }))
                    }}>
                    {
                        ({errors, touched, values}: any) => {
                            return(
                            <Form>
                                <FormikFormObserver callback={(newValues: any, context: any) => {
                                    updateVerifyStep(newValues)
                                    transfer.toReceive.countryCode === 'UG'
                                    && String(newValues.mobile).substring(0, 2) === '70'
                                    ? setMobileProvider("AIRTEL")
                                    : transfer.toReceive.countryCode === 'UG'
                                    && String(newValues.mobile).substring(0, 2) === '77'
                                    ? setMobileProvider("MTN")
                                    : setMobileProvider("")

                                }} />
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

                                        <div className="modified-tel-input">
                                            <div>Phone number<i>*</i></div>
                                            <PhoneNumberInput
                                                Input={Field}
                                                Select={Field}
                                                isControlledComp={false}
                                                phoneCodeExternalProps={{
                                                    as: 'select',
                                                    required: true,
                                                }}
                                                phoneCodeName="phoneCode"
                                                countries={country ? [country] : undefined}
                                                name="mobile"
                                                placeholder="e.g 07967885952"
                                                showBorder={true}
                                            />
                                            <div className="margin-adjust"></div>
                                            <div className="phone-no-error-box"><span className="red-txt">{errors.mobile}</span> </div>
                                        </div>
                                    </div>

                                    <div className={(touched.confirmMobile && errors.confirmMobile) || (touched.confirmPhoneCode && errors.confirmPhoneCode) ? 'form-error' : (touched.confirmMobile && !errors.confirmMobile) || (touched.confirmPhoneCode && errors.confirmPhoneCode) ? 'form-success' : ''}>
                                        <div className="modified-tel-input">
                                            <div>Confirm Phone number<i>*</i></div>
                                            <PhoneNumberInput
                                                Input={Field}
                                                Select={Field}
                                                isControlledComp={false}
                                                phoneCodeExternalProps={{
                                                    as: 'select',
                                                    required: true,
                                                }}
                                                phoneCodeName="confirmPhoneCode"
                                                countries={country ? [country] : undefined}
                                                name="confirmMobile"
                                                placeholder="e.g 07967885952"
                                                showBorder={true}
                                            />
                                            <div className="margin-adjust"></div>
                                            <div className="phone-no-error-box"><span className={`${errors.confirmMobile || errors.confirmPhoneCode ? 'red-txt' : 'green-txt'} form-error-message`}>{errors.confirmMobile || errors.confirmPhoneCode || 'Phone Numbers Match'  }</span> </div>
                                        </div>
                                    </div>

                                    {transfer.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER && <div className={(touched.email && errors.email) ? 'form-error': ''}>
                                        <div>Mobile money provider</div>
                                        <Field as="select" name='mobileMoneyProvider' id="mobileMoneyProvider">
                                            {
                                                transfer.toReceive.countryCode === 'UG'
                                                ? [mobileProvider].map((provider: any) => {
                                                    return <option value={provider}>{provider}</option>
                                                })
                                                : ['MTN', 'AIRTEL', 'MPESA'].map((provider: any) => {
                                                    return <option value={provider}>{provider}</option>
                                                })
                                            }

                                        </Field>
                                    </div>}

                                    {
                                        transfer.currentTransferQuote.transferMethod === "mobile_money" ?
                                        " "
                                        :
                                        (
                                            <div className={(touched.email && errors.email) ? 'form-error': ''}>
                                                <div>Email</div>
                                                <Field type="text" name="email" placeholder="Recipient’s email address" />
                                            </div>
                                        )
                                    }

                                    {
                                        transfer.currentTransferQuote.transferMethod === "mobile_money" ?
                                        " "
                                        :
                                        (
                                            <div className={(touched.state && errors.state) ? 'form-error': ''}>
                                                <div>City/State</div>
                                                <Field type="text" name="state" placeholder="" />
                                            </div>
                                        )
                                    }

                                    <div className={(touched.reason && errors.reason) ? 'form-error': ''}>
                                        <div>Reason</div>
                                            <Field as="select"  name='reason' id="reason" value={reasonValue || initialValues.reason} onInput={(e: any) => handleReasonsChange(e)}>
                                                <option value="">Select</option>
                                                {
                                                    REASONS.map((reason: string) => (
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
                                        {modeTransfer === "bankTransfer" && (
                                        <div className={(touched.bankName && errors.bankName) ? 'form-error': ''}>
                                            <div> Beneficiary Bank Name<i>*</i></div>
                                            <Field type="text" name="bankName" placeholder="" />
                                        </div>
                                        )}
                                        {modeTransfer === "microfinanceTransfer" && (
                                            <>
                                                <div className={(touched.bankName && errors.bankName) ? 'form-error': ''}>
                                                    <div> Micro Finance Name<i>*</i></div>
                                                    <Field type="text" name="bankName" placeholder="" />
                                                </div>
                                            </>
                                        )}
                                        {modeTransfer === "bankTransfer" && (
                                        <div className={(touched.accountNumber && errors.accountNumber) ? 'form-error transfer-fields': 'transfer-fields'}>
                                            <div>Recipient Account Number<i>*</i> <span className="red-txt">{errors.bankCode || errors.branchCode || errors.accountNumber || errors.key}</span> </div>
                                            <Field as="select" name="countryCode">
                                                <option value="CM12">CM21</option>
                                            </Field>
                                            <Field type="text" className="bank-code" name="bankCode" placeholder="Bank code" />
                                            <Field type="text" className="branch-code" name="branchCode" placeholder="Branch code" />
                                            <Field type="text" className="account-number" name="accountNumber" placeholder="Account no" />
                                            <Field type="text" className="key" name="key" placeholder="key" />
                                        </div>
                                        )}
                                        {modeTransfer === "microfinanceTransfer" && (
                                            <>
                                                <div>
                                                <div>Account Number<i>*</i><span className="red-txt">{errors.recipientAccountNumber}</span></div>
                                                <Field type="text"name="recipientAccountNumber" placeholder="Account no" />
                                                </div>
                                                <div className={(touched.accountBranch && errors.accountBranch) ? 'form-error': ''}>
                                                    <div> Account Branch<i>*</i></div>
                                                <Field type="text" name="accountBranch" placeholder="" />
                                                </div>
                                            </>
                                        )}
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
                                <div className="modal-btns"><span onClick={()=>openModal(false)}>Cancel</span> { showVerifyStep ? <button onClick={(e) => verifyRecipient(e, values)}>Verify</button> : <FormButton style={{backgroundColor: "#007b5d", "color": "white"}} label={isObjectNotEmpty(recipientData) ? "Save" : "Add recipient"} formName={paths.RECIPIENT} /> } </div>
                            </Form>
                        )}
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
