import React, {useEffect, useMemo, useState} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/parts/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import RadioButton from '../../modules/parts/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { paths } from '../../../util/paths';
import { cancelTransfer, confirmTransfer, getRecipient, getRecipients, getTransactionDetails, toastAction, verifyPivotRecipientAccount, verifyPivotRecipientReference } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { ConfirmModal } from '../../modules/confirm-modal/ConfirmModal';
import http from '../../../util/http';
import { formatCurrency, getMoneyValue, getQueryParam, isUserFirstTransaction, userHasReachedFinalVerificationStage, userIsVerified } from '../../../util/util';
import PaymentRedirect from '../../modules/Trust-payments/PaymentRedirect';
import { constants, remittanceHandlers } from '../../../util/constants';
import RecipientDetailsBox from 'components/modules/parts/RecipientDetailsBox';
import { themeNames } from 'components/modules/toast-factory/themes';
import  Body from './PaymentMethod.css'

const PaymentMethod = () => {
    const history = useHistory();
    const [selected, setSelected] = useState('')
    const recipients = useSelector((state: any)=>state.recipients.recipients)

    const user = useSelector((state: any)=>state.auth.user)
    const transfer = useSelector((state: any)=>state.transfer);
    const transaction = transfer?.transactionDetails;
    const [openConfirmModal, setOpenConfirmModal] = useState<null | 'forCancel' | 'forProceed'>(null);
    const transferId = getQueryParam('t');
    const [redirectToCardPaymentProvider, setRedirectToCardPaymentProvider] = useState(false);
    const recipient = useMemo(() => recipients.find((r:any) => r.id === transaction?.recipientId ), [recipients, transaction])
    const [ paymentMethodOptions, setPaymentMethodOptions ] = useState<any>([{
        slug: 'card',
        method: 'Card payment',
        provider: 'Trust payment'
    }]);

    const dispatch = useDispatch()

    const handleProceed = async ( transfer: any) => {
        dispatch({type: TRANSFER, payload: {...transfer, paymentMethod: selected}})
        if(!selected){
            toastAction({
                show: true,
                type: 'warning',
                timeout: 10000,
                message: 'Select a payment method to proceed'
            })
            return
        }
        if (selected==="card"){
            // history.push(paths.CARD_PAYMENT)
            setRedirectToCardPaymentProvider(true)
        }
        else if (selected==="bank_transfer") {
            history.push(paths.CREATE_TRANSFER + '?t=' + transferId)
        }
        else if (selected==="truelayer") {
            history.push(paths.TRUELAYER_PROVIDERS + '?t=' + transferId)
        }
        else{
            return
        }
    }

    const handleCancel = () => {
        cancelTransfer(() => history.push(paths.DASHBOARD))
    }

    useEffect(() => {
        getTransactionDetails(()=>{}, transferId);
    }, [transferId])

    useEffect(() => {
        autoSelectPaymentMethod()
        transaction && getRecipient(transaction?.recipientId)

        if ( transaction && transaction.status?.toUpperCase() !== constants.TRANSFER_STATUS_PENDING ) {
            toastAction({
                show: true,
                type: "warning",
                timeout: 60000,
                message: "You cannot make a payment for a transfer that's not pending!"
            })
            return history.push(paths.TRANSFER_METHOD)
        }
    }, [transaction])

    useEffect(() => {
        if ( recipient?.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER ) {
            verifyPivotRecipientAccount({
                mobile: recipient?.mobile,
                mobileMoneyProvider: recipient?.mobileMoneyProvider
            }, () => history.push(paths.RECIPIENT + "?t=" + transferId))
        }
    }, [recipient])

    const autoSelectPaymentMethod = () => {
        if (!userIsVerified(user) && !isUserFirstTransaction(user) && !userHasReachedFinalVerificationStage(user)) {
            toastAction({
                show: true,
                type: "info",
                timeout: 15000,
                title: "Just a minute, please!",
                message: "We need to verify who you are to make this transaction"
            })
            history.push(paths.VERIFICATION)
        }
        if (transaction?.originCurrency === 'GBP') {
            setSelected('truelayer')
            setPaymentMethodOptions([
                {
                    slug: 'truelayer',
                    method: 'Direct bank transfer',
                    provider: 'TrueLayer'
                },
                {
                    slug: 'card',
                    method: 'Card payment',
                    provider: 'Trust payment'
                }
            ])

            
            // setSelected('card')
        } else if ( (transaction?.originCurrency === "CAD" || transaction?.originCurrency === "EUR") ) {
            setSelected('card')
        } else {
            setSelected('bank_transfer')
        }
    }

    return (
        <Body>
            {openConfirmModal === 'forCancel' ?
            <ConfirmModal
            message="Are you sure you want to cancel this transfer?"
            onSave={{
                label: 'Yes, cancel',
                fn: ()=>handleCancel()
            }}
            onCancel={{
                label: "No, don't cancel",
                fn: () => setOpenConfirmModal(null)
            }}
            /> :
            openConfirmModal === 'forProceed' ?
            <ConfirmModal
            message="Are you sure you want to procced?"
            onSave={{
                label: 'Yes, proceed',
                fn: ()=>handleProceed(transfer)
            }}
            onCancel={{
                label: "No, not yet",
                fn: () => setOpenConfirmModal(null)
            }}
            /> : <></>}
            <NavBar />
            <ProgressBar point={4} />

            <div className="page-content">
                <div>
                    <PageHeading heading="Pay" subheading="How would you like to pay for the transfer?" back="/review" />
                    <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <div className="box-container details">
                    <div>
                        {
                            paymentMethodOptions.map((pm: any) => (
                                <label htmlFor={pm.method}>
                                    <div className={`payment-options-card ${pm.slug === selected && "selected-border-green"}`} onClick={() => setSelected(pm.slug)}>
                                        <div className="inp-container">
                                            <input type="radio" name="payment-option" id={pm.method} value={pm.method} />
                                            <span className="checkmark"></span>
                                        </div>
                                        <div className="method-container">
                                            <div className="title">
                                                {pm.method}
                                            </div>
                                            <div className="provider green-txt">
                                                {pm.provider}
                                            </div>
                                        </div>
                                    </div>
                                </label>
                            ))
                        }
                            <div>
                                <div className="pls-note">Please note</div>
                                <div className="list">
                                    <ul>
                                        <li>Please ensure the <span className="green-txt"> payment details</span> of your recipient are &nbsp; correct. <span className="red-txt"> Any error after this step cannot be corrected</span> <span className="green-txt"><Link to={paths.RECIPIENT + "?t=" + transferId}>Edit recipient details</Link> </span></li>
                                        <li>If all details are correct, proceed to pay the sum of <b className="green-txt">{formatCurrency(`${transaction?.meta?.totalToPay}`)} {transaction?.originCurrency}</b> to complete your transfer</li>
                                    </ul>
                                </div>
                            </div>
                        { 
                            <div className="box-container details">
                                <RecipientDetailsBox hideType="mobile-hide" green_mamba />
                                <RecipientDetailsBox hideType="desktop-hide" />
                            </div>
                        }
                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox transferId={transferId} />
                    </div>
                </div>
                <div className="btns"><span onClick={()=>setOpenConfirmModal('forCancel')}>Cancel transfer</span>
                 {
                    selected==="card" ?
                    <PaymentRedirect 
                        mainamount = {getMoneyValue(transaction?.meta?.totalToPay)} 
                        currencyiso3a = {transaction?.originCurrency} 
                        transactionId={transaction?.meta?.transactionId} 
                        transferId={transferId} 
                    />
                    :
                    <span> 
                        <button onClick={()=>setOpenConfirmModal('forProceed')}>Proceed to payment</button> 
                    </span>
                }
                </div>
            </div>
        </Body>
    )
}

export default PaymentMethod;
