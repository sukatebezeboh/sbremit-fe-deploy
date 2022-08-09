import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { paths } from '../../../util/paths';
import { asset, convertDateString, formatCurrency, getValueFromArray } from '../../../util/util';
import PageHeading from '../page-heading/PageHeading';
import Receipt from '../receipt/Receipt';
import { constants } from '../../../util/constants';
import Modal from './TransactionDetail.css'
import TransferDetailsBox from '../parts/TransferDetailsBox';
import RecipientDetailsBox from '../parts/RecipientDetailsBox';

const ref: any = React.createRef()

const TransactionDetail = (props: any) => {
    const {openTDModal, handleOpenTDModal, handleShowPlus, data, handleResend, isResending} = props;
    const [openMobileTimeline, handleOpenMobileTimeline] = useState(false);
    const recipients = useSelector((state: any) => state.recipients.recipients);
    const transfer = useSelector((state: any) => state.transfer);
    const history = useHistory();
    const showMobileModal = (bool: boolean) => {
        handleOpenMobileTimeline(bool)
    }

    const recipient: any = data.recipientId ?  getValueFromArray(data?.recipientId, 'id', recipients) : {}
    openTDModal ? handleShowPlus(false) : handleShowPlus(true)

    const transferPaymentMade  = () =>  {
       return data.status === constants.TRANSFER_STATUS_PAYMENT_COMPLETED || data.meta.paymentCompleted
    }

    const referralDiscountValue = data?.meta?.referralDiscount;


    return (
        (openTDModal && data) && (
        <Modal >

            <div ref={ref} id="receipt" style={{width: '1944px', height: 'fit-content', margin: 'auto', position: 'absolute', zIndex: -200, display: 'none' }}>
                <Receipt data={data} recipient={recipient} />
            </div>
            <div className="overlay" onClick={()=>handleOpenTDModal(false)}></div>
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
                    <RecipientDetailsBox recipientData={recipient} />
                    <TransferDetailsBox transferData={data}  />
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
                            <div className="label-1"> <div>Transfer created</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                            <div className="label-2"> <div>Received {data.originCurrency} payment</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                            <div className="label-3"> <div>Vendor processing transfer</div> <div>{convertDateString(data.dateCreated)}</div> </div>
                            <div className="label-4"> <div>Recipient receives {data.destinationCurrency}</div> <div>{convertDateString(data.dateCreated)}</div> </div>

                        </div>
                    </div>
                </div>
            </div>)}
        </Modal>
        )
    )
}

export default TransactionDetail;
