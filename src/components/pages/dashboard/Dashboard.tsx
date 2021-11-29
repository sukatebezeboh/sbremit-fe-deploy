import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { checkSkip, getRecipients, getTransactionDetails, getUserTransactions, toastAction } from '../../../redux/actions/actions';
import { RECIPIENT, TRANSFER } from '../../../redux/actionTypes';
import { resources } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { asset, convertDateString, formatCurrency, getValueFromArray } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import RoundFloatingPlus from '../../ui-components/parts/RoundFloatingPlus';
import TransactionDetail from '../../ui-components/transaction-detail-modal/TransactionDetail';
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
            complete: transfer.paginatedCompletedTransactions.paginated?.[transfer.currentTransactionsPage] || [],
            cancelled: transfer.paginatedCancelledTransactions.paginated?.[transfer.currentTransactionsPage] || [],
            pending: transfer.paginatedPendingTransactions.paginated?.[transfer.currentTransactionsPage] || [],
        }
        return filters[selectedFilter||"all"]
    }

    const getCorrespondingPages = () => {
        const filters: any = {
            all: transfer.paginatedTransactions.pages,
            complete: transfer.paginatedCompletedTransactions.pages,
            cancelled: transfer.paginatedCancelledTransactions.pages,
            pending: transfer.paginatedPendingTransactions.pages,
        }
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
                    <div onClick={()=>_setSelectedFilter("complete")} className={selectedFilter === "complete" ? "selected-border-green" : ''}> 
                        <div className="green-txt">{getTransactionStatusCount('complete')}</div>
                        <div>Complete Transactions</div>
                    </div>
                    <div onClick={()=>_setSelectedFilter("pending")} className={selectedFilter === "pending" ? "selected-border-yellow" : ''}> 
                        <div className="yellow-txt">{getTransactionStatusCount('pending')}</div>
                        <div>Pending Transactions</div>
                    </div>
                    <div onClick={()=>_setSelectedFilter("cancelled")} className={selectedFilter === "cancelled" ? "selected-border-red" : ''}> 
                        <div className="red-txt">{getTransactionStatusCount('cancelled')}</div>
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
                        <div>
                            <div>{convertDateString(transaction.dateCreated)}</div>
                            <div className="name">To <b>{getValueFromArray(transaction.recipientId, 'id', recipients, 'firstName')} {getValueFromArray(transaction.recipientId, 'id', recipients, 'lastName')}</b></div>
                        </div>
                        <div className={"status"}><span className={`sentence-case ${transaction.status?.toLowerCase()}`}>{transaction.status}</span></div>
                        <div>
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
