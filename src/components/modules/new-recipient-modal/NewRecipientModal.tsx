import { Field, Form, Formik } from 'formik';
import React, { useEffect, useState } from 'react'
import { createRecipient, verifyPivotRecipientReference } from '../../../redux/actions/actions';
import { paths } from '../../../util/paths';
import { RecipientBankTransferBankTransferValidator, RecipientBankTransferMicrofinanceTransferValidator, RecipientCashPickupValidator, RecipientMobileMoneyValidator, RecipientValidator } from "../../../util/form-validators";
import FormButton from '../form-button/FormButton';
import PageHeading from '../page-heading/PageHeading';
import { useDispatch, useSelector } from 'react-redux';
import { BANK_NAMES, countriesAndCodes, REASONS, remittanceHandlers, transferMethodsInWords } from '../../../util/constants';
import { isObjectNotEmpty } from '../../../util/util';
import FormikFormObserver from '../formik-form-observer/FormikFormObserver';
import PhoneNumberInput from '../parts/PhoneNumberInput';
import Div from './NewRecipientMethod.css'

const getRecipientCreateValidationSchema = ( transferMethod: string, isAccountNoStandAlone: boolean, onChangeCallback?:Function ) => {
    onChangeCallback?.();
    return {
        "cash_pickup": RecipientCashPickupValidator,
        "bank_transfer_bankTransfer": RecipientBankTransferBankTransferValidator(isAccountNoStandAlone),
        "bank_transfer_microfinanceTransfer": RecipientBankTransferMicrofinanceTransferValidator,
        "mobile_money": RecipientMobileMoneyValidator
    }[transferMethod] ?? RecipientValidator;
}

function NewRecipientModal(props: any) {
    const {modalOpen, openModal, selectRecipient, recipientData} = props;
    const dispatch = useDispatch()
    const [otherReasons, setOtherReasons] = useState(false);
    const [reasonValue, setReasonValue] = useState('');
    const [bankValue, setBankValue] = useState('');
    const [modeTransfer, setModeTransfer] = useState<String>('bankTransfer');
    const [ showVerifyStep, setShowVerifyStep ] = useState(false);
    const transfer = useSelector((state: any) => state.transfer)
    const [mobileProvider, setMobileProvider] = useState('')

    const getCountry = () => {
        return countriesAndCodes.find(country => country.countryCode === transfer.toReceive.countryCode);
    }

    const country = getCountry();

    const initialValues = {
        firstName: recipientData?.firstName || "",
        lastName: recipientData?.lastName || "",
        mobile: recipientData?.profile?.mobile || "",
        phoneCode: recipientData?.profile?.phoneCode || country?.phoneCode,
        confirmMobile: recipientData?.profile?.mobile || "",
        confirmPhoneCode: recipientData?.profile?.phoneCode || country?.phoneCode,
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

    const handleBankChange = (e: any) => {
        const {value} = e.target;
        if (value === 'Other') setBankValue('');
        else setBankValue(value);
    }

    useEffect(() => {
        if ( transfer.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER ) {
            // setShowVerifyStep(true)
        }
    }, [])

    const verifyRecipient = (event: any, payload: any, errors: any) => {
        event.preventDefault()
        if (Object.values(errors).length) return;
        payload.mobileMoneyProvider = mobileProvider
        verifyPivotRecipientReference(payload, () => setShowVerifyStep(false), () => setShowVerifyStep(false))
    }

    const updateVerifyStep = (values: any) => {
        if ( transfer.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER ) {
            // setShowVerifyStep(true)
        }
    }

    const isPivotRecipientAccount = (): boolean => {
        return (transfer.toReceive.countryCode === 'UG' || transfer.toReceive.countryCode === 'KE' || transfer.toReceive.countryCode === 'TZ');
    }

    return (
        modalOpen && <Div>
            <div className="overlay">
            </div>
            <div className="modal">
                <div className="head mobile-hide">
                <div className="t-id">Add a new recipient <span className="no-wrap"> ( {transferMethodsInWords[transfer?.transferMethod]} ) </span> </div>
                    <div className="close" onClick={()=>openModal(false)} >x</div>
                </div>
                {
                    transfer.transferMethod === "bank_transfer" && (
                        <div className="transfer-type">
                            <ul>
                                <li
                                    className={`${modeTransfer === 'bankTransfer' ? 'underline' : ''}`}
                                    onClick={() => setModeTransfer('bankTransfer')}
                                > Bank transfer </li>
                                {
                                    transfer.toReceive.countryCode === 'CM' &&
                                    <li
                                        className={`${modeTransfer === 'microfinanceTransfer' ? 'underline microfinance' : 'microfinance'}`}
                                        onClick={() => setModeTransfer('microfinanceTransfer')}
                                    > Microfinance transfer </li>
                                }
                            </ul>
                        </div>
                    )
                }
                <Formik
                    initialValues={{...initialValues}}
                    validationSchema={getRecipientCreateValidationSchema(`${transfer?.transferMethod}${transfer?.transferMethod === "bank_transfer" ? "_"+modeTransfer : ''}`, isPivotRecipientAccount(), () => {} )}
                    onSubmit={values => {
                        const newValue = {
                            ...values,
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
                                    ? setMobileProvider('AIRTEL')
                                    : transfer.toReceive.countryCode === 'UG'
                                    && String(newValues.mobile).substring(0, 2) === '77'
                                    ? setMobileProvider('MTN')
                                    : setMobileProvider('')

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
                                            <div>Phone number <i> {transfer.transferMethod === "mobile_money" ? '*' : '(optional)'}</i></div>
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
                                                isNotCopy={true}
                                                isNotPaste={true}
                                            />
                                            <div className="margin-adjust"></div>
                                            <div className="phone-no-error-box"><span className="red-txt">{errors.mobile}</span> </div>
                                        </div>
                                    </div>

                                        {
                                            transfer.transferMethod === 'mobile_money' &&
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
                                                        isNotPaste={true}
                                                        isNotCopy={true}
                                                    />
                                                    <div className="margin-adjust"></div>
                                                    <div className="phone-no-error-box"><span className={`${errors.confirmMobile || errors.confirmPhoneCode ? 'red-txt' : 'green-txt'} form-error-message`}>{errors.confirmMobile || errors.confirmPhoneCode || 'Phone Numbers Match'  }</span> </div>
                                                </div>
                                            </div>
                                        }

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
                                        transfer.transferMethod === "cash_pickup" &&
                                        <div className={(touched.email && errors.email) ? 'form-error': ''}>
                                            <div>Email {transfer.currentTransferQuote.transferMethod === "mobile_money" && '-Optional'}</div>
                                            <Field type="text" name="email" placeholder="Recipient’s email address" />
                                        </div>
                                    }

                                    {
                                        transfer.transferMethod === "cash_pickup" &&
                                        <div className={(touched.state && errors.state) ? 'form-error': ''}>
                                            <div>City/State</div>
                                            <Field type="text" name="state" placeholder="" />
                                        </div>
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
                                            {
                                                !isPivotRecipientAccount()
                                                ?   <Field type="text" name="bankName" placeholder="" />
                                                :   <Field as="select"  name='bankName' value={bankValue || initialValues.bankName} onInput={(e: any) => handleBankChange(e)}>
                                                        <option value="">Select</option>
                                                        {
                                                            BANK_NAMES.map((name: string) => (
                                                                <option value={name}>{name}</option>
                                                                )
                                                            )
                                                        }
                                                    </Field>
                                            }
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
                                            <div>Recipient Account Number<i>*</i>
                                                <span className="red-txt">
                                                    {
                                                        !isPivotRecipientAccount()
                                                        ? (errors.bankCode || errors.branchCode || errors.accountNumber || errors.key)
                                                        : (errors.accountNumberStandAlone)
                                                    }
                                                </span>
                                            </div>
                                            {
                                                !isPivotRecipientAccount() &&
                                                <span>
                                                    <Field as="select" name="countryCode">
                                                        <option value="CM12">CM21</option>
                                                    </Field>
                                                    <Field type="text" className="bank-code" name="bankCode" placeholder="Bank code" />
                                                    <Field type="text" className="branch-code" name="branchCode" placeholder="Branch code" />
                                                </span>
                                            }

                                            <Field type="text"
                                                className={`account-number ${isPivotRecipientAccount() && 'show-account-number'}`}
                                                name={
                                                    isPivotRecipientAccount()
                                                    ? "accountNumberStandAlone"
                                                    : "accountNumber"
                                                }
                                                placeholder="Account no"
                                            />
                                            {
                                                !isPivotRecipientAccount() &&
                                                <Field type="text" className="key" name="key" placeholder="key" />
                                            }
                                        </div>
                                        )}
                                        {modeTransfer === "microfinanceTransfer" && (
                                            <>
                                                <div>
                                                <div>Account Number<i>*</i><span className="red-txt">{errors.recipientAccountNumber}</span></div>
                                                <Field type="text" name="recipientAccountNumber" placeholder="Account no" />
                                                </div>
                                                <div className={(touched.accountBranch && errors.accountBranch) ? 'form-error': ''}>
                                                    <div> Account Branch<i>*</i></div>
                                                <Field type="text" name="accountBranch" placeholder="" />
                                                </div>
                                            </>
                                        )}
                                    </React.Fragment> : ''}

                                    {transfer.transferMethod === "cash_pickup" ?
                                        <div className={(touched.pickupPoint && errors.pickupPoint) ? 'form-error': ''}>
                                            <div>Pickup point</div>
                                            <Field as="select" type="text" name="pickupPoint" placeholder="e.g. 3450012398" >
                                                <option value=""> - Select - </option>
                                                <option value="SB Capital (Akwa)"> SB Capital (Akwa)</option>
                                            </Field>
                                        </div>
                                    : ''}
                                </div>
                                <div className="modal-btns">
                                    <span onClick={()=>openModal(false)}>Cancel</span>
                                    {
                                        showVerifyStep
                                        ? <FormButton onClick={(e: any) => verifyRecipient(e, values, errors)} label={"Verify"} />
                                        : <FormButton style={{backgroundColor: "#007b5d", "color": "white"}} label={isObjectNotEmpty(recipientData) ? "Save" : "Add recipient"} formName={paths.RECIPIENT} />
                                    }
                                </div>
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
