import React, {useEffect, useState} from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/parts/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import styled from "styled-components";
import RadioButton from '../../modules/parts/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { paths } from '../../../util/paths';
import { cancelTransfer, confirmTransfer, getTransactionDetails, toastAction } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { ConfirmModal } from '../../modules/confirm-modal/ConfirmModal';
import http from '../../../util/http';
import { formatCurrency, getMoneyValue, getQueryParam, isUserFirstTransaction, userIsVerified } from '../../../util/util';
import PaymentRedirect from '../../modules/Trust-payments/PaymentRedirect';

const Body = styled.div`
    .page-content {
        margin-top: 0px;
        .box-container {
            display: grid;
            grid-template-columns: 2fr 1.5fr;
            grid-gap: 4%;
            padding-top: 50px;
        }
        hr {
            border: 1px solid #f8f7f8;
            margin-bottom: 30px;
        }

        .btns {
            text-align: right;
            margin: 65px 0px;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                cursor: default;
            }
            button {
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 8px;
                width: 300px;
                height: 80px;
                text-align: center;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
        .details {
            div {
                .radio-card {
                    display: grid;
                    grid-template-columns: 1.5fr 15fr;
                    background: #FFF;
                    margin-bottom: 30px;
                    box-shadow: 0px 10px 12px #CCCCCC80;
                    border-radius: 15px;
                    padding: 25px;
                    .rc-head {
                        font: normal normal 600 20px Montserrat;
                        color: #424242;
                    }
                    .rc-body {
                        margin-top: 20px;
                        font: normal normal normal 14px Montserrat;
                        color: #A3A3A3;
                        >div {
                            margin-top: 5px;
                        }
                    }
                    .rc-foot {
                        margin-top: 32px;
                        font: normal normal normal 14px Montserrat;
                        color: #424242;
                    }
                }
            }
            
        }
        
    }

@media only screen and (max-width: 900px) { 
    .page-content {
        width: 100%;
        height: 120vh;
        margin-top: -10px;
        margin-bottom: -50px;
        padding-top: 10px;
        .page-heading {
            margin-top: 10px;
            .heading {
                z-index: 1;
            }
        }

        .box-container {
            grid-template-columns: 1fr;
            padding-top: 0px;
            margin-top: 10px;
            margin-bottom: 50px;
            .part {
                padding: 20px;
            }
        }
        .btns {
            margin-top: -70px;
            padding: 0px 5%;
            button {
                width: 100%;
                height: 40px;
                font: normal normal normal 13px/16px Montserrat;
            }
            span {
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

@media only screen and (max-width: 900px) { 
    .page-content {
        .box-container {
            grid-gap: 1%!important;
        }
        .view-td {
            text-decoration: underline;
            font: normal normal normal 11px/14px Montserrat;
            color: #007B5D;
            margin-top: 20px;
            margin-left: 4%;
        }
        .details {
            grid-template-columns: 1fr;
            grid-gap: 15px;
            width: 100%;
            >div {
                padding: 15px 10px;
                .heading {
                    .title {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                    .update {
                        font: normal normal normal 11px/14px Montserrat;
                    }
                }
                .row {
                    font: normal normal normal 11px/22px Montserrat;
                }
            }
            div {
                .radio-card {
                    padding: 15px;
                    grid-template-columns: 2.5fr 15fr;
                    min-height: fit-content;
                    border-radius: 8px;
                    .rc-head {
                        font: normal normal 600 15px Montserrat;
                        color: #424242;
                    }
                    .rc-body {
                        margin-top: 15px;
                        font: normal normal normal 11px Montserrat;
                    }
                    .rc-foot {
                        margin-top: 25px;
                        font: normal normal normal 11px Montserrat;
                    }
                }
            }
        }
    }
}
`

const PaymentMethod = () => {
    const history = useHistory();
    const [selected, setSelected] = useState('')
    const recipient = useSelector((state: any)=>state.recipients.recipient)
    const user = useSelector((state: any)=>state.auth.user)
    const transfer = useSelector((state: any)=>state.transfer);
    const transaction = transfer.transactionDetails;
    const [openConfirmModal, setOpenConfirmModal] = useState<null | 'forCancel' | 'forProceed'>(null);
    // const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const transferId = getQueryParam('t');
    const [redirectToCardPaymentProvider, setRedirectToCardPaymentProvider] = useState(false);

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
    }, [])

    useEffect(() => {
        autoSelectPaymentMethod()
    }, [transaction])

    const autoSelectPaymentMethod = () => {
        if (!userIsVerified(user) && !isUserFirstTransaction(user)) {
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
            // setSelected('truelayer')
            setSelected('card')
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
                            selected === "bank_transfer" 
                            && <div className="radio-card" onClick={()=>setSelected('bank_transfer')}>
                                <div className="radio-div">
                                    {/* <RadioButton selected={selected==='bank_transfer'} /> */}
                                </div>
                                <div>
                                    <div className="rc-head"> Manual Bank Transfer</div>
                                    <div className="rc-head">Please ensure the <span className="green-txt"> payment details</span> of your recipient are correct. <span className="red-txt"> Any error after this step cannot be corrected</span></div>
                                    <div className="rc-body">
                                        <div>
                                            Pay the sum of <b className="green-txt">{formatCurrency(`${Number(transfer.toSend.value) + Number(transfer.serviceFee)}`)} {transfer.toSend.currency}</b> directly from your bank account. Your transfer will be completed as soon as your payment reflects on our account.
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                    <div className="rc-foot">
                                            {/* Low cost transfer - {transfer.serviceFee} {transfer.toSend.currency} */}
                                    </div>
                                </div>
                            </div>
                        }
                        { 
                            selected==='card' 
                            && <div className="radio-card disabled" onClick={() => {
                                setSelected('card')
                                }}>
                                <div className="radio-div">
                                    {/* <RadioButton selected={selected==='card'}/> */}
                                </div>
                                <div>
                                    {/* <div className="rc-head">Debit Card</div> */}
                                    <div className="rc-head">Please ensure the <span className="green-txt"> payment details</span> of your recipient are correct. <span className="red-txt"> Any error after this step cannot be corrected</span></div>
                                    <div className="rc-body">
                                        {/* <div>
                                            Please ensure payment detail of your recipient is correct, any error after this step cannot be corrected
                                        </div> */}
                                        <div className="green-txt">
                                            <Link to={paths.RECIPIENT + "?t=" + transferId}>Click here to confirm you have selected the right recipient</Link> 
                                        </div>
                                        <br /> <br /><br />
                                        <div>
                                            {/* Pay the sum of <b className="green-txt">{formatCurrency(`${transaction?.meta?.totalToPay}`)} {transaction.originCurrency}</b> directly from your bank account. This is a more immediate process than the manual alternative. Your transfer will be completed as soon as your payment reflects on our account. */}
                                        </div>
                                        <div>
                                            If all details are correct, proceed to pay the sum of <b className="green-txt">{formatCurrency(`${transaction?.meta?.totalToPay}`)} {transaction.originCurrency}</b> to complete your transfer
                                        </div>
                                    </div>
                                    <div className="rc-foot">
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            selected==='truelayer'
                            && <div className="radio-card" onClick={()=>setSelected('truelayer')}>
                                    <div className="radio-div">
                                        {/* <RadioButton selected={selected==='truelayer'} /> */}
                                    </div>
                                    <div>
                                        {/* <div className="rc-head">Bank Transfer with Truelayer</div> */}
                                        <div className="rc-head">Please ensure the <span className="green-txt"> payment details</span> of your recipient are correct. <span className="red-txt"> Any error after this step cannot be corrected</span></div>
                                        <div className="rc-body">
                                            {/* <div>
                                                Please ensure payment detail of your recipient is correct, any error after this step cannot be corrected
                                            </div> */}
                                            <div className="green-txt">
                                               <Link to={paths.RECIPIENT + "?t=" + transferId}>Click here to confirm you have selected the right recipient</Link> 
                                            </div>
                                            <br /> <br /><br />
                                            <div>
                                                {/* Pay the sum of <b className="green-txt">{formatCurrency(`${transaction?.meta?.totalToPay}`)} {transaction.originCurrency}</b> directly from your bank account. This is a more immediate process than the manual alternative. Your transfer will be completed as soon as your payment reflects on our account. */}
                                            </div>
                                            <div>
                                                If all details are correct, proceed to pay the sum of <b className="green-txt">{formatCurrency(`${transaction?.meta?.totalToPay}`)} {transaction.originCurrency}</b> to complete your transfer
                                            </div>
                                        </div>
                                        <div className="rc-foot">
                                                {/* Low cost transfer - {transfer.serviceFee} {transfer.toSend.currency} */}
                                        </div>
                                    </div>
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
                    <PaymentRedirect mainamount = {getMoneyValue(transaction?.meta?.totalToPay)} currencyiso3a = {transaction.originCurrency} transactionId={transaction?.meta?.transactionId} transferId={transferId} />
                    :
                    <span> <button onClick={()=>setOpenConfirmModal('forProceed')}>Proceed to payment</button> </span>
                }
                </div>
            </div>
        </Body>
    )
}

export default PaymentMethod;
