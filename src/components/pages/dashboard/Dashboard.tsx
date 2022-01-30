import { replace } from 'formik';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { checkForVerificationStatusToast, checkSkip, getRecipients, getTransactionDetails, getUserTransactions, refreshUserDetails, toastAction } from '../../../redux/actions/actions';
import { RECIPIENT, TRANSFER } from '../../../redux/actionTypes';
import { constants, resources } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { asset, convertDateString, formatCurrency, getValueFromArray, replaceUnderscores } from '../../../util/util';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import RoundFloatingPlus from '../../modules/parts/RoundFloatingPlus';
import TransactionDetail from '../../modules/transaction-detail-modal/TransactionDetail';
import TransferExpiryCountDown from '../../modules/transfer-expiry-countdown/TransferExpiryCountDown';
import style from './Dashboard.css';


const Body = style();

const Dashboard = () => {
    let transfer = useSelector((state: any) => state.transfer);
    const recipients = useSelector((state: any) => state.recipients.recipients);
    const [openTDModal, handleOpenTDModal] = useState(false);
    const [showPlus, handleShowPlus] = useState(true);
    const [modalData, setModalData] = useState({});
    const [selectedFilter, setSelectedFilter] = useState("");
    const history = useHistory();
    const [isResending, setIsResending] = useState(false);


    const dispatch = useDispatch()
    useEffect(() => {
        checkSkip(() => history.push(paths.RECIPIENT));
        getUserTransactions();
        getRecipients();
        refreshUserDetails((user: any) => checkForVerificationStatusToast(user, history));
    }, [])

    const _setSelectedFilter = (status: string) => {
        if (selectedFilter === status) {
            setSelectedFilter("")
            setPageTo(1)
        }else {
            setSelectedFilter(status)
            setPageTo(1)
        }
    }

    const setPageTo = (page: string|number) => {
        dispatch({type: TRANSFER, payload: {...transfer, currentTransactionsPage: page}})
    }

    const getTransactions = () => {
        const filters: any = {
            all: transfer.paginatedTransactions.paginated?.[transfer.currentTransactionsPage] || [],
        }

        filters[constants.TRANSFER_STATUS_COMPLETE.toLowerCase()] = transfer.paginatedCompletedTransactions.paginated?.[transfer.currentTransactionsPage] || [];
        filters[constants.TRANSFER_STATUS_CANCELLED.toLowerCase()] = transfer.paginatedCancelledTransactions.paginated?.[transfer.currentTransactionsPage] || [];
        filters[constants.TRANSFER_STATUS_PENDING.toLowerCase()] = transfer.paginatedPendingTransactions.paginated?.[transfer.currentTransactionsPage] || [];
        return filters[selectedFilter||"all"]
    }

    const getCorrespondingPages = () => {
        const filters: any = {
            all: transfer.paginatedTransactions.pages,
        }

        filters[constants.TRANSFER_STATUS_COMPLETE.toLowerCase()]  = transfer.paginatedCompletedTransactions.pages;
        filters[constants.TRANSFER_STATUS_CANCELLED.toLowerCase()] = transfer.paginatedCancelledTransactions.pages
        filters[constants.TRANSFER_STATUS_PENDING.toLowerCase()] = transfer.paginatedPendingTransactions.pages

        return filters[selectedFilter||"all"]
    }

    const handleResend = (data: any, recipient: any) => {
        setIsResending(true)

        if (Array.isArray(recipient)) {
            recipient = recipient.find((r) => r.id === data.recipientId )
        }

        const toSend = {
            value: data.originAmount,
            currency: data.originCurrency,
            image: data.originCurrency
        }

        const toReceive = {
            value: data.destinationAmount,
            currency: data.destinationCurrency,
            image: data.destinationCurrency
        }

        const transferMethod = data.transferMethod

        dispatch({type: RECIPIENT, payload: recipient})
        dispatch({type: TRANSFER, payload: {...transfer, toSend, toReceive, transferMethod}})
        toastAction({
            show: true,
            type: 'info',
            timeout: 10000,
            message: "Okay. Let's start resending in a smooth sail..."
        })

        setTimeout(()=>{
            history.push(paths.TRANSFER_METHOD)
            setIsResending(false)
        }, 1000 )
    }

    const transactions = getTransactions();
    const allTransactions = transfer.transactions;
    const pages = getCorrespondingPages();

    const getTransactionStatusCount = (status: string) => {
        return allTransactions.filter((t: any)=>t.status?.toLowerCase() === status).length
    }

    const showTransactionExpiry = (transaction: any) => {
        return transaction.status?.toLowerCase() === constants.TRANSFER_STATUS_PENDING?.toLowerCase() || transaction.meta.expired
    }

    return (
        <Body>
            <NavBar />
            <TransactionDetail openTDModal={openTDModal} data={modalData} handleOpenTDModal={handleOpenTDModal} handleShowPlus={handleShowPlus} handleResend={(data: any, recipient: any) => handleResend(data, recipient)} isResending={isResending} />
            <div className="page-content">
                <PageHeading heading="Dashboard" subheading="View recent transactions and analytics"/>
                <Link to="/transfer-method">
                    <RoundFloatingPlus showPlus={showPlus} />
                </Link>
                <div className="transactions">
                    <div onClick={()=>_setSelectedFilter(constants.TRANSFER_STATUS_COMPLETE.toLowerCase())} className={selectedFilter === constants.TRANSFER_STATUS_COMPLETE.toLowerCase() ? "selected-border-green" : ''}> 
                        <div className="green-txt">{getTransactionStatusCount(constants.TRANSFER_STATUS_COMPLETE.toLowerCase())}</div>
                        <div>Complete Transactions</div>
                    </div>
                    <div onClick={()=>_setSelectedFilter(constants.TRANSFER_STATUS_PENDING.toLowerCase())} className={selectedFilter === constants.TRANSFER_STATUS_PENDING.toLowerCase() ? "selected-border-yellow" : ''}> 
                        <div className="yellow-txt">{getTransactionStatusCount(constants.TRANSFER_STATUS_PENDING.toLowerCase())}</div>
                        <div>Pending Transactions</div>
                    </div>
                    <div onClick={()=>_setSelectedFilter(constants.TRANSFER_STATUS_CANCELLED.toLowerCase())} className={selectedFilter === constants.TRANSFER_STATUS_CANCELLED.toLowerCase() ? "selected-border-red" : ''}> 
                        <div className="red-txt">{getTransactionStatusCount(constants.TRANSFER_STATUS_CANCELLED.toLowerCase())}</div>
                        <div>Cancelled Transactions</div>
                    </div>
                    <Link to="/transfer-method">
                        <div className="green-bg start-transfer"> 
                            <div> <img src={asset('icons', 'add.svg')} alt=""/> </div>  
                            <div> Start new transfer</div>
                        </div>
                    </Link>
                </div>
                <div className="t-history">Transaction History <span>({allTransactions.length})</span></div>
                {transactions && transactions.map((transaction: any) => <div className="history">
                    <div 
                    className="up" 
                    onClick={()=>{
                            setModalData(transaction);
                            handleOpenTDModal(true);
                        }}>
                        <div><img src={`${resources.DICE_BEAR_RECIPIENT}${getValueFromArray(transaction.recipientId, 'id', recipients, 'firstName') + ' ' + getValueFromArray(transaction.recipientId, 'id', recipients, 'lastName') + transaction.recipientId }.svg`} alt=""/></div>
                        <div className="user-brief">
                            <div>{convertDateString(transaction.dateCreated)}</div>
                            <div className="name">To <b>{getValueFromArray(transaction.recipientId, 'id', recipients, 'firstName')} {getValueFromArray(transaction.recipientId, 'id', recipients, 'lastName')}</b></div>
                            { showTransactionExpiry(transaction) && <TransferExpiryCountDown dateCreated={transaction.dateCreated} />}
                        </div>
                        <div className="status"><span className={`sentence-case ${transaction.status?.toLowerCase()}`}>{replaceUnderscores(transaction.status)}</span></div>
                        <div className="figures">
                            <div className="uppercase">{formatCurrency(transaction.destinationAmount)} {transaction.destinationCurrency}</div>
                            <div className="amt-gbp uppercase">{formatCurrency(transaction.originAmount)} {transaction.originCurrency}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div>Transaction #: <span>SBR{transaction.meta.transactionId}</span></div>
                        <div>
                            <span className="is-clickable" onClick={() => handleResend(transaction, recipients)} ><img src={asset('icons', 'reload.svg')} alt="resend"  className={isResending ? "is-resending" : ""} /> Resend</span> 
                            <span
                            className="view-det"
                            onClick={()=>{
                                setModalData(transaction);
                                handleOpenTDModal(true);
                            }}><img src={asset('icons', 'show.svg')} alt="view"/> View details</span>
                        </div>
                    </div>
                </div>)}
                {pages?.length > 1 ? <div className="pagination">
                    <img src={asset('icons', 'prev.svg')} alt="prev"/> 
                    {
                        pages?.map((page: string)=>(
                            <span className={transfer.currentTransactionsPage == page ? "active green-bg white-txt" : ""} onClick={()=>setPageTo(page)} >{page}</span>
                        ))
                    }
                    <img src={asset('icons', 'next.svg')} alt="next"/>
                 </div>: <></>}
            </div>
        </Body>
    )
}

export default Dashboard;
