import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { getRecipients, getUserTransactions, toastAction } from '../../../redux/actions/actions';
import { RECIPIENT } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { asset, getQueryParam } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import NewRecipientModal from '../../ui-components/new-recipient-modal/NewRecipientModal';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import RoundFloatingPlus from '../../ui-components/parts/RoundFloatingPlus';
import TransferDetailsBox from '../../ui-components/parts/TransferDetailsBox';
import ProgressBar from '../../ui-components/progress-bar/ProgressBar';
import Body from './Recipient.css';

const Recipient = () => {
    const history = useHistory();
    const recipients = useSelector((state: any)=>state.recipients.recipients);
    const recipient = useSelector((state: any)=>state.recipients.recipient);
    const transfer = useSelector((state: any)=>state.transfer);
    const user = useSelector((state: any)=> state.auth.user)
    console.log(transfer, user, "transfer", "------");

    const {toSend, toReceive, serviceFee, transferMethod} = transfer; 
    const max  = transfer.transferMax;

    const dispatch = useDispatch()

    const [openNRModal, setOpenNRModal] = useState(false)
    const [selectedRecipient, setSelectedRecipient] = useState(recipient)
    const [filteredRecipients, setFilteredRecipients] = useState(recipients);
    const [recipientDataForUpdate, setRecipientDataForUpdate] = useState({})
    useEffect(() => {
        getRecipients();
        getUserTransactions();
    }, [])

    useEffect(() => {
        checkPageAuthorization();
    }, [transfer, user])



    const checkPageAuthorization = () => {
        if (!transfer.transferMethod) {
            history.replace(paths.TRANSFER_METHOD);
            toastAction({
                show: true,
                type: "warning",
                timeout: 15000,
                message: "Please select a transfer method"
            })
            return
        }
        if (!Number(toSend.value)) {
            history.replace(paths.GET_QUOTE)
            return
        }
        const mobileMoneyMax = 500000;
        if (transferMethod === "mobile_money" && (Number(toReceive.value) + Number(serviceFee)) > mobileMoneyMax) {
            history.replace(paths.GET_QUOTE)
            toastAction({
                show: true,
                type: "warning",
                timeout: 10000,
                title: "Exceeded maximum!",
                message: `The maximum transferable amount (inclusive of charges) form Mobile Money is ${mobileMoneyMax}XAF for Mobile Money`
            })
            return
        }
        if (userIsVerified()) {
            // history.push(paths.RECIPIENT)
        } else {
            if (isUserFirstTransaction() && Number(toSend.value) < max) {
                // history.push(paths.RECIPIENT)
            } else {
                toastAction({
                    show: true,
                    type: "info",
                    timeout: 15000,
                    title: "Just a minute, please!",
                    message: "We need to verify who you are to make this transaction"
                })
                history.replace(paths.VERIFICATION)
            }
        }
    }

    const userIsVerified = (): boolean => {
        return Boolean(user.meta.verified);
    }

    const isUserFirstTransaction = (): boolean => {
        return !Boolean(transfer.transactions.length);
    }

    useEffect(() => {
        setFilteredRecipients( recipients )
        handleRecipientUpdate()
    }, [recipients])

    const handleRecipientClick = (recipient: any) => {
        setSelectedRecipient(recipient);
        dispatch({type: RECIPIENT, payload: recipient})
    }

    const filterRecipients = (e: React.ChangeEvent<HTMLInputElement>) => {
        const searchText = (e.target.value).trim().toLowerCase();

        const filtered = recipients.filter((recipient: any) => {
            return ((recipient.firstName.toLowerCase() + " " + recipient.lastName.toLowerCase()).indexOf(searchText) !== -1
            || (recipient.lastName.toLowerCase() + " " + recipient.firstName.toLowerCase()).indexOf(searchText) !== -1)
        })

        setFilteredRecipients( filtered );
    }

    const handleRecipientUpdate = () => {
        const recipientId =  getQueryParam('update');
        if (!recipientId) return;
 
        const recipientData = recipients.find((recipient: any) => recipient.id == recipientId);
        console.log(recipientData);
        setRecipientDataForUpdate(recipientData);
        setOpenNRModal(true);
    }
    return (
        <Body>
            <NavBar />
            <ProgressBar point={2} />
            <NewRecipientModal openModal={setOpenNRModal} modalOpen={openNRModal} selectRecipient={handleRecipientClick} recipientData={recipientDataForUpdate} />
            <div className="page-content">
                <div className="search">
                    <div><input type="text" onChange={(e) => filterRecipients(e)} placeholder="Search recipients"/> <button className=""> <img src={asset("icons", "search.svg")} alt="search"/> </button> </div>
                </div>
                <div className={openNRModal ? "mobile-hide" : ''}>
                    <PageHeading heading="Recipient" subheading="Who are you sending money to?" back={paths.VERIFICATION} />
                    <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <RoundFloatingPlus showPlus={!openNRModal} callBack={()=>setOpenNRModal(true)} />
                <div className="box-container">
                    <div className="right part">
                            <div className="heading mobile-hide">
                                <div className="title">My saved recipients</div>
                            </div>
                            <hr className="mobile-hide"/>
                            <div className="small-boxes">
                                <div className="recipient plus mobile-hide" onClick={()=>setOpenNRModal(true)}>
                                    <img src={asset("icons", "add.svg")} alt="plus"/>
                                    <span>New recipient</span>
                                </div>
                                {
                                    filteredRecipients.map((recipient: any, i: number)=>(
                                        <div key={i} className={`recipient ${selectedRecipient?.id == recipient.id && 'selected-border'}`} onClick={()=>handleRecipientClick(recipient)}>
                                            <div><img src={`${recipient.profile.picture || asset("images", "noimage.png")}`} alt="user"/></div>
                                            <div>{recipient.firstName + ' ' + recipient.lastName}</div>
                                        </div>

                                    ))
                                }
                            </div>

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox />
                    </div>
                </div>
                <div className="btns"><span onClick={()=>history.push(paths.VERIFICATION)}>Back</span> <button onClick={()=>{return recipient.id ? history.push('/review'): '#'}}>Continue</button> </div>
            </div>
        </Body>
    )
}

export default Recipient;
