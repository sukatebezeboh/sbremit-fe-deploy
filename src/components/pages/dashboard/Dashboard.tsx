import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getRecipients, getTransactionDetails, getUserTransactions } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
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

    const dispatch = useDispatch()
    useEffect(() => {
        getUserTransactions();
        getRecipients();
    }, [])

    const setPageTo = (page: string|number) => {
        dispatch({type: TRANSFER, payload: {...transfer, currentTransactionsPage: page}})
    }

    const transactions = transfer.paginatedTransactions.paginated?.[transfer.currentTransactionsPage] || [];
    const allTransactions = transfer.transactions;
    
    return (
        <Body>
            <NavBar />
            <TransactionDetail openTDModal={openTDModal} data={modalData} handleOpenTDModal={handleOpenTDModal} handleShowPlus={handleShowPlus} />
            <div className="page-content">
                <PageHeading heading="Dashboard" subheading="View recent transactions and analytics"/>
                <Link to="/transfer-method">
                    <RoundFloatingPlus showPlus={showPlus} />
                </Link>
                <div className="transactions">
                    <div> 
                        <div className="green-txt">10</div>  
                        <div>Complete Transactions</div>
                    </div>
                    <div> 
                        <div className="yellow-txt">2</div>  
                        <div>Pending Transactions</div>
                    </div>
                    <div> 
                        <div className="red-txt">1</div>  
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
                        }
                        }>
                        <div><img src={asset('images', 'noimage.png')} alt=""/></div>
                        <div>
                            <div>{convertDateString(transaction.dateCreated)}</div>
                            <div className="name">To <b>{getValueFromArray(transaction.recipientId, 'id', recipients, 'firstName')} {getValueFromArray(transaction.recipientId, 'id', recipients, 'lastName')}</b></div>
                        </div>
                        <div className={"status"}><span className={"sentence-case "+transaction.status?.toLowerCase()}>{transaction.status}</span></div>
                        <div>
                            <div className="uppercase">{formatCurrency(transaction.destinationAmount)} {transaction.destinationCurrency}</div>
                            <div className="amt-gbp uppercase">{formatCurrency(transaction.originAmount)} {transaction.originCurrency}</div>
                        </div>
                    </div>
                    <hr/>
                    <div className="down">
                        <div>Transaction #: <span>SBR{transaction.dateCreated}</span></div>
                        <div>
                            <span><img src={asset('icons', 'reload.svg')} alt="resend"/> Resend</span> 
                            <span className="view-det"><img src={asset('icons', 'show.svg')} alt="view"/> View details</span>
                        </div>
                    </div>
                </div>)}
                {transfer.paginatedTransactions.pages?.length > 1 ? <div className="pagination">
                    <img src={asset('icons', 'prev.svg')} alt="prev"/> 
                    {
                        transfer.paginatedTransactions.pages?.map((page: string)=>(
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
