import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components'
import { cancelTransfer, getUserTransactions, toastAction } from '../../../redux/actions/actions';
import { RECIPIENT, TRANSFER } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { asset, convertDateString, downloadPDF, formatCurrency, getValueFromArray } from '../../../util/util';
import PageHeading from '../page-heading/PageHeading';
import Pdf from "react-to-pdf";
import Receipt from '../receipt/Receipt';
import { constants } from '../../../util/constants';
import ProgressBar from '../progress-bar/ProgressBar';


const style = () => styled.div`
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: ${(document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth) + 1000}px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1;
    .disable {
        opacity: 0.2;
        pointer-events: none;
    }
    .is-resending {
        transition: 3s ease-out;
        transform: rotateZ(-720deg);
    }
    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 75%;
        background: #fff;
        margin: 47px auto;
        padding: 60px 0px 30px;
        .head {
            border-bottom: 1px solid #f7f6f7;
            display: grid;
            grid-template-columns: 3fr 3fr 4fr;
            width: 85%;
            margin: 0px auto;
            padding: 20px 0px;
            .t-id {
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                span {
                    color: #424242; 
                }
            }
            .status {
                span {
                    display: inline-block;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    font: normal normal normal 13px Montserrat;
                    color: #FFFFFF;
                    padding: 7px 15px;
                    /* height: 30px; */
                }
            }
            .close {
                text-align: right;
                font: normal normal normal 26px/24px Montserrat;
                color: #A3A3A3;
                cursor: default;
            }
        }

        .sub {
            display: grid;
            grid-template-columns: 3fr 2fr;
            margin: 30px auto;
            width: 85%;
            .name {
                display: grid;
                grid-template-columns: 1fr 5fr 2fr;
                background: #FFFFFF 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                padding: 30px;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                >div {
                    :nth-child(2) {
                        div {
                            :first-child {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                                margin-bottom: 10px;
                            }
                            :last-child {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                        }
                    }
                    :last-child {
                        div {
                            text-align: right;
                            :first-child {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                            :last-child {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                            }
                        }
                    }
                }
            }

            .actions {
                display: grid;
                grid-template-columns: 1fr 1fr;
                >div, a.export {
                    border-radius: 15px;
                    width: 124px;
                    height: 124px;
                    text-align: center;
                    margin: auto;
                    padding-top: 26px;
                    div {
                        font: normal normal normal 16px/44px Montserrat;
                    }
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
                .export {
                    color: #A3A3A3;
                    border: 2px solid #A3A3A3;
                }
                .cancel {
                    color: #CF0921;
                    border: 2px solid #CF0921;

                }
                .resend {
                    color: #007B5D;
                    border: 2px solid #007B5D;
                }
            }
        }

        .timeline {
            background: #007B5D 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 4px #CCCCCC80;
            padding: 30px 6%;
            margin-bottom: 50px;
            .bar {
                height: 8px;
                width: 80%;
                border-radius: 15px;
                background: #3f896f;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 0fr;
                padding: 0px;
                margin: auto;
                .point {
                    background: #fff;
                    width: 4px;
                    height: 4px;
                    border-radius: 15px;
                    margin: 2px;
                }
                .point-1 {
                    width: 43px;
                    height: 6px;
                }
                .point-complete {
                    width: 100%;
                    height: 6px;
                }
            }
            .point-labels {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr;
                margin-top: 20px;
                >div {
                    width: 200%;
                    padding-left: 0px;
                    margin-left: -50%;
                    text-align: center;
                    div:first-child {
                        font: normal normal normal 16px/16px Montserrat;
                        color: #FFFFFF;
                    }
                    div:last-child{
                        font: normal normal normal 13px/18px Montserrat;
                        color: #A3A3A3;
                        /* width: 300px; */
                    }
                }
            }
        }

        .details {
            display: grid;
            grid-template-columns: 3fr 2.3fr;
            width: 90% ;
            margin: 0px auto 50px;
            .recipient-details {
                margin-left: 25px;
            }
            hr {
                margin: 20px 0px;
                border: 1px solid #f8f7f8;
            }
            >div {
                background: #FFFFFF 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                width: 90%;
                padding: 50px;
                margin: auto;
                .heading {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    .title {
                        font: normal normal normal 20px/24px Montserrat;
                        color: #A3A3A3;
                    }
                    .update {
                        text-align: right;
                        font: normal normal normal 16px/19px Montserrat;
                        color: #007B5D;
                    }
                }
                .row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin: 5px 0px;
                    font: normal normal normal 16px/44px Montserrat;
                    .left {
                        color: #A3A3A3;
                    }
                    .right {
                        text-align: right;
                        color: #424242;
                    }
                }
            }
        }
    }
    .green {
        color: #007B5D;
    }

    @media only screen and (max-width: 900px) { 
        padding: 0px;
        background: #FFF;
        height: 100%;
        position: fixed;
        overflow-y: scroll;;;
        .modal{
            margin: 0px;
            width: 100%;
            box-shadow: none;
            overflow-y: hidden;
            .head {
                display: none;
            }
            .sub {
                grid-template-columns: 1fr;
                margin: 5px auto;
                .name {
                    padding: 15px 10px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    >div{
                        img:nth-child(1){
                            width: 30px;
                            height: 30px;
                        }
                        :nth-child(2){
                            div {
                                :first-child{
                                    font: normal normal normal 8px Montserrat;
                                    margin-bottom: 5px;
                                }
                                :last-child{
                                    font: normal normal normal 11px Montserrat;
                                }
                            }
                        }
                        :nth-child(3){
                            div{
                                font: normal normal normal 8px Montserrat !important;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
                .actions {
                    grid-template-columns: 1fr 1fr 1fr;
                    padding-left: 60%;
                    >div {
                        text-align: center;
                        width: 50px;
                        height: 50px;
                        border-radius: 5px;
                        padding-top: 5px;
                        border-width: 1px !important;

                        img {
                            width: 21px;
                            height: 21px;
                            filter: invert(0%) sepia(21%) saturate(28%) hue-rotate(346deg) brightness(204%) contrast(97%);
                            
                        }
                        div {
                            margin-top: -3px;
                            font: normal normal normal 10px Montserrat;
                        }
                    }
                    .export {
                    }
                    .resend {
                        color: white;
                        border: 2px solid #007B5D;
                        background: #007B5D;
                        :hover {
                            color: #007B5D;
                            background: white;
                            cursor: pointer;
                            img {
                                filter: none;

                            }
                        }
                    }
                }
            }
            .timeline {
                display: none;
            }
            .details {
                grid-template-columns: 1fr;
                grid-gap: 15px;
                width: 100%;
                >div {
                    padding: 15px 20px;
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
                .recipient-details {
                    margin-left: auto;

                }
                .transfer-details {

                }
            }
        }
        .mobile-modal {

            div.status {
                span {
                    position: absolute;
                    top: 20px;
                    left: 82% ;
                    z-index: 3;
                    /* width: 54px;
                    height: 16px; */
                    display: inline-block;
                    display: inline-block;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    font: normal normal normal 8px Montserrat;
                    color: #FFFFFF;
                    padding: 3px 10px;
                }
            }
            div.view-details {
                font: normal normal normal 8px/44px Montserrat;
                color: #A3A3A3;
                position: absolute;
                top: 140px;
                left: 6%;
            }
        }

        .timeline-modal-container {
            .overlay {
                position: fixed;
                top: 0px;
                left: 0px;
                z-index: 3;
                width: 100%;
                background: #000000;
                opacity: 0.3;
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                height: 130vh;
            }
            .timeline-modal {
                width: 80%;
                background: #007B5D;
                /* box-shadow: 0px 2px 4px #CCCCCC80; */
                border-radius: 8px;
                height: 330px;
                margin: auto auto;
                position: fixed;
                top: 175px;
                left: 10%;
                display: block;
                z-index: 3;
                padding: 30px 50px;
                .timeline {
                    display: grid;
                    grid-template-columns: 1fr 4fr;
                    grid-gap: 10%;
                    .bar {
                        width: 5px;
                        height: 244px;
                        background: #3f896f;
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr 0fr;
                        grid-gap: 0px;
                        .point {
                            background: #fff;
                            width: 2px;
                            height: 2px;
                            border-radius: 15px;
                            margin: 2px;
                        }
                        .point-1 {
                            width: 3px;
                            height: 100%;
                        }
                    }
                    .point-labels {
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr 0fr;
                        >div {
                            width: 250px;
                            div:first-child {
                                font: normal normal normal 13px/14px Montserrat;
                                color: #FFFFFF;
                            }
                            div:last-child{
                                font: normal normal normal 11px/14px Montserrat;
                                color: #A3A3A3;
                            }
                        }
                    }
                }
            }
        }
    }

`

const Modal = style();
const ref: any = React.createRef()

const TransactionDetail = (props: any) => {
    const {openTDModal, handleOpenTDModal, handleShowPlus, data, handleResend, isResending} = props;
    const [openMobileTimeline, handleOpenMobileTimeline] = useState(false);
    const recipients = useSelector((state: any) => state.recipients.recipients);
    const transfer = useSelector((state: any) => state.transfer);
    const dispatch = useDispatch();
    const history = useHistory();
    const showMobileModal = (bool: boolean) => {
        handleOpenMobileTimeline(bool)
    }

    const recipient: any = data.recipientId ?  getValueFromArray(data?.recipientId, 'id', recipients) : {}
    openTDModal ? handleShowPlus(false) : handleShowPlus(true)

    const transferPaymentMade  = () =>  {
       return data.status === constants.TRANSFER_STATUS_PAYMENT_COMPLETED || data.meta.paymentCompleted
    }

    const referralDiscountValue = data?.referralDiscountValue;


    return (
        (openTDModal && data) && (
        <Modal >

            <div ref={ref} id="receipt" style={{width: '1944px', height: 'fit-content', margin: 'auto', position: 'absolute', zIndex: -200, display: 'none' }}>
                <Receipt data={data} recipient={recipient} />
            </div>
            <div className="modal" id="TD-Modal" >
                <div className="head">
                    <div className="t-id">Transaction #: <span>SBR{data.meta.transactionId}</span></div>
                    <div className="status"> <span className={`"sentence-case ${data.status?.toLowerCase()}`}>{data.status}</span> </div>
                    <div className="close" onClick={()=>handleOpenTDModal(false)} >x</div>
                </div>
                <div className="sub">
                    <div className="name">
                        <div> <img src={asset('images', 'noimage.png')} alt=""/> </div>
                        <div> <div>{convertDateString(data.dateCreated)}</div> <div>To <b>{recipient?.firstName} {recipient?.lastName}</b></div> </div>
                        <div className="uppercase"> <div>{formatCurrency(data.destinationAmount)} {data.destinationCurrency}</div> <div>{formatCurrency(data.originAmount)} {data.originCurrency}</div> </div>
                    </div>
                    <div className="actions" >
                        {data.meta.receipt_url && <a href={data.meta.receipt_url} target="_blank" rel="noreferrer"  className="export" >
                            <img src={asset('icons', 'export.svg')} alt="export"/>
                            <div> Download <span className="mobile-hide"></span></div>
                        </a>}
                        {/* <div className={`cancel ${data.status?.toLowerCase() === "cancelled" ? "disable" : ""}`} onClick={() => cancelTransfer(() => {
                            getUserTransactions();
                            handleOpenTDModal(false)
                        }, data.id)}>
                            <img src={asset('icons', 'cancel.svg')} alt="cancel"/>
                            <div>Cancel</div>
                        </div> */}
                        <div className="resend" onClick={() => handleResend(data, recipient)}>
                            <img className={isResending ? "is-resending" : ""} src={asset('icons', 'reload.svg')} alt="reload"/>
                            <div>Resend</div>
                        </div>
                        {
                            !transferPaymentMade() && data.status?.toLowerCase()?.includes(constants.TRANSFER_STATUS_PENDING.toLowerCase()) && <div className="resend" onClick={() => history.push(paths.PAYMENT_METHOD + "?t=" + data.id)}>
                                <img className="" src={asset('icons', 'cash.svg')} alt="reload"/>
                                <div>Pay</div>
                            </div>
                        }
                    </div>
                </div>

                <div className="timeline">
                    <div className="bar">
                        <div className={`point point-1 ${transferPaymentMade() && "point-complete"}`}></div>
                        <div className={`point point-2 ${transferPaymentMade() && data.approved && "point-complete"}`}></div>
                        <div className={`point point-3 ${data.status === constants.TRANSFER_STATUS_COMPLETE && "point-complete"}`}></div>
                        <div className="point point-4"></div>
                    </div>
                    <div className="point-labels">
                        <div className="label-1"> <div>Transfer created</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                        <div className="label-2"> <div>Received {data.originCurrency} payment</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                        <div className="label-3"> <div>Vendor processing transfer</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                        <div className="label-4"> <div>Recipient receives {data.destinationCurrency}</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                    </div>
                </div>

                <div className="details">
                    <div className="recipient-details mobile-hide">
                        <div className="heading">
                            <div className="title">Recipient’s Details</div>
                            <div className="update">Update</div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="left">Name</div>
                            <div className="right">{recipient?.firstName} {recipient?.lastName}</div>
                        </div>
                        <div className="row">
                            <div className="left">Mobile No.</div>
                            <div className="right">{recipient?.profile?.mobile || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Email</div>
                            <div className="right">{recipient?.profile?.email || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">City</div>
                            <div className="right">{recipient?.profile?.state || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Reason</div>
                            <div className="right">{recipient?.profile?.reason || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Recipient’s Bank Name</div>
                            <div className="right">{recipient?.profile?.bankName || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Account Number</div>
                            <div className="right">{recipient?.profile?.accountNumber || '-'}</div>
                        </div>
                    </div>
                    <div className="transfer-details" >
                        <div className="heading">
                                <div className="title">Transfer Details</div>
                                {/* <div className="update">Update</div> */}
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="left">Transfer method</div>
                                <div className="right sentence-case">{data.transferMethod?.replace('_', ' ')}</div>
                            </div>
                            <div className="row">
                                <div className="left">You send</div>
                                <div className="right"><b>{formatCurrency(data.originAmount)} {data.originCurrency}</b></div>
                            </div>
                            <div className="row">
                                <div className="left">Exchange rate</div>
                                <div className="right"> 1 {data?.meta?.exchangeBase} = {data?.meta?.exchangeRate} {data?.meta?.exchangeTarget} </div>
                            </div>
                            <div className="row">
                                <div className="left">Service fee</div>
                                <div className="right"> {data?.meta?.serviceFee} {data.originCurrency} </div>
                            </div>
                            {data?.meta?.promoCode && <div className="row">
                                <div className="left">Promo used</div>
                                <div className="right"> {data?.meta?.promoCode}</div>
                            </div>}
                            {Boolean(referralDiscountValue) && <div className="row ">
                                <div className="left green-txt">Referral Discount</div>
                                <div className="right uppercase green-txt"> {referralDiscountValue} {data.originCurrency} </div>
                            </div>}
                            <div className="row">
                                <div className="left">They get <small className="sentence-case"> ({data?.transferMethod.replace("_", " ")} fee inclusive) </small> </div>
                                <div className="right "><b>{formatCurrency(data.destinationAmount)} {data.destinationCurrency}</b> </div>
                            </div>
                            <div className="row">
                                <div className="left">Total paid</div>
                                <div className="right"><b className="green">{data?.meta?.totalToPay} {data.originCurrency} </b></div>
                            </div>
                            {/* <div className="row">
                                <div className="left">Transfer time</div>
                                <div className="right">within 2 hours</div>
                            </div> */}
                    </div>
                    <div className="recipient-details desktop-hide">
                        <div className="heading">
                            <div className="title">Recipient’s Details</div>
                            <div className="update">Update</div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="left">Name</div>
                            <div className="right">{recipient?.firstName} {recipient?.lastName}</div>
                        </div>
                        <div className="row">
                            <div className="left">Mobile No.</div>
                            <div className="right">{recipient?.profile?.mobile || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Email</div>
                            <div className="right">{recipient?.profile?.email || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">City</div>
                            <div className="right">{recipient?.profile?.state || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Reason</div>
                            <div className="right">{recipient?.profile?.reason || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Recipient’s Bank Name</div>
                            <div className="right">{recipient?.profile?.bankName || '-'}</div>
                        </div>
                        <div className="row">
                            <div className="left">Account Number</div>
                            <div className="right">{recipient?.profile?.accountNumber || '-'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE TD MODAL */}
            <div className="desktop-hide mobile-modal">
                <PageHeading heading={`Transaction #: SBR${data.meta.transactionId}`} callBack={()=>handleOpenTDModal(false)} />
                <div className="status"> <span>{constants.TRANSFER_STATUS_PENDING}</span> </div>
                <div className="view-details" onClick={()=>showMobileModal(true)}>View transaction update</div>
            </div>
           {openMobileTimeline && (<div className="timeline-modal-container desktop-hide">
                <div className="overlay" onClick={()=>showMobileModal(false)}></div>
                <div className="timeline-modal">
                    <div className="timeline">
                        <div className="bar">
                            <div className="point point-1"></div>
                            <div className="point point-2"></div>
                            <div className="point point-3"></div>
                            <div className="point point-4"></div>
                        </div>
                        <div className="point-labels">
                            <div className="label-1"> <div>Transfer created</div> <div>20 Nov 2020</div> </div>
                            <div className="label-2"> <div>Received {data.originCurrency} payment</div> <div>20 Nov 2020</div> </div>
                            <div className="label-3"> <div>Vendor processing transfer</div> <div>20 Nov 2020</div> </div>
                            <div className="label-4"> <div>Recipient receives {data.destinationCurrency}</div> <div>20 Nov 2020</div> </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </Modal>
        )
    )
}

export default TransactionDetail;
