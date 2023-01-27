import {useEffect} from 'react'
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/transfer-details-box/TransferDetailsBox';
import { useSelector } from 'react-redux';
import { getRecipient, getTransactionDetails, initiatePayment } from '../../../redux/actions/actions';
import { paths } from '../../../util/paths';
import { formatCurrency, getInclusiveText, parseWithUnderscores } from '../../../util/util';
import Body from './CreateTransfer.css'

const CreateTransfer = () => {
    const history = useHistory();
    const transactionDetails =  useSelector((state: any)=>state.transfer.transactionDetails)
    const user =  useSelector((state: any) => state.auth.user)
    const recipient = useSelector((state: any) => state.recipients.recipient)

    const cancelPayment = () => {
        history.push(paths.PAYMENT_METHOD + '?t=' + transactionDetails.id)
    }

    const handleSubmit = () => {
        initiatePayment(()=>history.push(paths.TRANSFER_COMPLETE + '?t=' + transactionDetails.id))
    }

    useEffect(() => {
        getTransactionDetails( undefined );
    }, [])

    useEffect(() => {
        getRecipient( transactionDetails?.recipientId )
    }, [transactionDetails])

    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <div>
                <PageHeading heading="Manual Bank Payment" subheading="Transfer the total to pay to SBremit’s account" back={paths.PAYMENT_METHOD  + '?t=' + transactionDetails?.id} />
                <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <div className="box-container details">
                    <div className="within">
                        <div>
                            <div className="pls-note">Please note</div>
                            <div className="list">
                                <ul>
                                    <li>You must include the reference provided when making transfer</li>
                                    <li>Bank transfer to SBRemit account must be done within 24 hours. </li>
                                </ul>
                            </div>
                        </div>
                        <div className="green-box">

                            <div>
                                <span>Account name</span>
                                <span>SUKATE & BEZEBOH LTD</span>
                            </div>

                            <div>
                                <span>Account number</span>
                                <span>34690451</span>
                            </div>

                            <div>
                                <span>Sort code</span>
                                <span>23-22-90</span>
                            </div>

                            <div>
                                <span>Reference</span>
                                <span>SBR{ user.meta.customerId || transactionDetails?.meta?.transactionId?.substring(0, 10)}</span>
                            </div>
                        </div>
                        <Link to={paths.PAYMENT_METHOD + '?t=' + transactionDetails?.id} ><div className="green-txt cpm-text">Change payment method</div></Link>
                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox transferId={transactionDetails?.id} />
                    </div>
                </div>
                <div className="btns">
                    <span className="cancel" onClick={()=>cancelPayment()}>Cancel payment</span> 
                    <span className="btn-group">
                        <button onClick={handleSubmit}>I am sending {formatCurrency(`${Number((transactionDetails?.destinationAmount) )}`)} {transactionDetails?.destinationCurrency} to {recipient.firstName} </button> 
                        <small> {getInclusiveText(parseWithUnderscores(transactionDetails?.transferMethod))} </small> 
                    </span>
                </div>

            </div>
        </Body>
    )
}

export default CreateTransfer;
