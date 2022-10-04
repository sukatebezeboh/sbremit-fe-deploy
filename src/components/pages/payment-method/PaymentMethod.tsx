import {useEffect, useMemo, useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/transfer-details-box/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import { useDispatch, useSelector } from 'react-redux';
import { paths } from '../../../util/paths';
import { cancelTransfer, getRecipient, getTransactionDetails, initiateInteracTransferPayment, stackNewToast, toastAction, unstackNewToast, updateTransferWithPaymentGatewayCharge } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { ConfirmModal } from '../../modules/confirm-modal/ConfirmModal';
import { formatCurrency, getMoneyValue, getQueryParam, isUserFirstTransaction, userHasReachedFinalVerificationStage, userIsVerified } from '../../../util/util';
import PaymentRedirect from '../../modules/Trust-payments/PaymentRedirect';
import { constants } from '../../../util/constants';
import RecipientDetailsBox from 'components/modules/parts/RecipientDetailsBox';
import  Body from './PaymentMethod.css'
import PaymentOption from './payment-option/PaymentOption';
import { PAYMENT_GATEWAYS } from './PaymentMethod.helper';
import { themeNames } from 'components/modules/toast-factory/themes';

const PaymentMethod = () => {
    const history = useHistory();
    const [selected, setSelected] = useState('')
    const recipients = useSelector((state: any)=>state.recipients.recipients)

    const user = useSelector((state: any)=>state.auth.user)
    const transfer = useSelector((state: any)=>state.transfer);
    const transaction = transfer?.transactionDetails;
    const [openConfirmModal, setOpenConfirmModal] = useState<null | 'forCancel' | 'forProceed'>(null);
    const transferId = getQueryParam('t');
    const recipient = useMemo(() => recipients.find((r:any) => r.id === transaction?.recipientId ), [recipients, transaction])
    const [ paymentMethodOptions, setPaymentMethodOptions ] = useState<any>([PAYMENT_GATEWAYS['trust-payment']]);

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
        if (selected === 'trust-payment'){}
        else if (selected === "bank_transfer") {
            history.push(paths.CREATE_TRANSFER + '?t=' + transferId)
        }
        else if (selected === "truelayer") {
            history.push(paths.TRUELAYER_PROVIDERS + '?t=' + transferId)
        }
        else if (selected === "interac") {
            initiateInteracTransferPayment(+transferId);
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
    }, [transaction?.id])

    useEffect(() => {
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
        // if ( recipient?.remittanceHandler === remittanceHandlers.PIVOT_REMITTANCE_HANDLER ) {
        //     verifyPivotRecipientAccount({
        //         mobile: recipient?.mobile,
        //         mobileMoneyProvider: recipient?.mobileMoneyProvider
        //     }, () => history.push(paths.RECIPIENT + "?t=" + transferId))
        // }
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
            selectPaymentMethod('truelayer')
            PAYMENT_GATEWAYS['trust-payment'].isRecommended = false
            setPaymentMethodOptions([
                PAYMENT_GATEWAYS['truelayer'],
                PAYMENT_GATEWAYS['trust-payment']
            ])
        }
        else if ( transaction?.originCurrency === "CAD"  ) {
            selectPaymentMethod('trust-payment')
            setPaymentMethodOptions([
                PAYMENT_GATEWAYS['trust-payment'],
                PAYMENT_GATEWAYS['interac'],
            ])
        }
        else if ( (transaction?.originCurrency === "EUR") ) {
            selectPaymentMethod('trust-payment')
        } else {
            selectPaymentMethod('bank_transfer')
        }
    }

    type TPaymentMethods = 'interac' | 'trust-payment' | 'truelayer' | 'bank_transfer';
    const selectPaymentMethod = (paymentGateway: TPaymentMethods) => {
        setSelected(paymentGateway)
        updateTransferWithPaymentGatewayCharge(transferId, paymentGateway, () => verifyPaymentMethodMaxLimit(paymentGateway))
    }

    const getTotalToPay = () => {
        return getMoneyValue(`${transaction?.meta?.totalToPay}`) + +transaction?.meta?.paymentGatewayCharge;
    }

    const verifyPaymentMethodMaxLimit = (paymentGateway: TPaymentMethods) => {
        if (PAYMENT_GATEWAYS[paymentGateway]?.maxLimit &&
            PAYMENT_GATEWAYS[paymentGateway]?.maxLimit < getTotalToPay()
        ) {
            stackNewToast({
                name: "exceeded-max-for-payment-gateway-notice",
                show: true,
                type: 'error',
                timeout: -1,
                defaultThemeName: themeNames.CENTER_PROMPT,
                message: `To continue to pay with <span class="capitalize italicize">${PAYMENT_GATEWAYS[paymentGateway]?.provider}</span>, please send an amount below ${PAYMENT_GATEWAYS[paymentGateway]?.maxLimit}${transaction?.originCurrency} or use a different payment method`,
                close: () => {
                    unstackNewToast({name: "exceeded-max-for-payment-gateway-notice"})
                    history.push(paths.GET_QUOTE)
                },
                closeBtnText: "Use a different payment method",
                extraBtnText: "Make corrections",
                extraBtnHandler: () => unstackNewToast({name: "exceeded-max-for-payment-gateway-notice"}),
                extraBtnClass: 'verif-toast-failed-extra-btn-class'
            })
        }
    }

    return (
        <Body>

            {
                openConfirmModal === 'forCancel' &&
                <ConfirmModal
                    message="Are you sure you want to cancel this transfer?"
                    onSave={{
                        label: 'Yes, cancel',
                        fn: () => handleCancel()
                    }}
                    onCancel={{
                        label: "No, don't cancel",
                        fn: () => setOpenConfirmModal(null)
                    }}
                /> 
            }

            {
                openConfirmModal === 'forProceed' &&
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
                />
            }

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
                            paymentMethodOptions.map((paymentMethod: any) => (
                                <PaymentOption 
                                    key={paymentMethod.slug}
                                    paymentMethod={paymentMethod}
                                    isSelected={paymentMethod.slug === selected}
                                    selectPaymentMethod={selectPaymentMethod}
                                    label={paymentMethod.label(transaction)}
                                />
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
                    selected === 'trust-payment' ?
                    <PaymentRedirect 
                        mainamount = {getTotalToPay()} 
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
