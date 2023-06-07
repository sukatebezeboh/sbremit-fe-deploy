import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteRecipient, getRecipients, getUserTransactions, refreshUserDetails, toastAction, updateTransferRecipient } from '../../../redux/actions/actions';
import { RECIPIENT } from '../../../redux/actionTypes';
import { maxTransfersUnverified, remittanceHandlers, resources } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { asset, getMax, getQueryParam, isUserFirstTransaction, replaceUnderscores, userHasReachedFinalVerificationStage, userIsVerified } from '../../../util/util';
import NavBar from '../../modules/navbar/NavBar';
import NewRecipientModal from '../../modules/new-recipient-modal/NewRecipientModal';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/transfer-details-box/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import Body from './Recipient.css';

const RecipientCard = ({recipient,selectedRecipient, handleRecipientClick}: any) => {
    const [hoveredRecipientId, setHoveredRecipientId] = useState(null)
    const handleRecipientDelete  = (recipientId: string|number) => {
      deleteRecipient(recipientId, () => getRecipients())
    }
    return(
        <div onMouseLeave={() => setHoveredRecipientId(null)} className={`recipient recipient-hoverable  ${selectedRecipient?.id === recipient.id && 'selected-border'}`} onClick={() => handleRecipientClick(recipient)} >
            <div className={`recipient-dropdown-container ${selectedRecipient?.id === recipient.id && 'selected-icon'}`} onClick={() => setHoveredRecipientId(recipient.id)}>
                <img className="recipient-dropdown-btn" src={asset('icons', 'three-dots.svg')} alt="dots" />
            </div>
            { hoveredRecipientId === recipient.id &&
            <div className='recipient-dropdown-option-container'>
                <div className="icon-container">
                    <img className="recipient-icon-delete" src={asset('icons', 'bin.svg')} alt="" />
                </div>
                <div className="delete-txt" onClick={() => handleRecipientDelete(recipient.id)}>Delete</div>
            </div>}
            <div><img src={`${resources.DICE_BEAR_RECIPIENT}${recipient.firstName + ' ' + recipient.lastName + recipient.id }.svg`} alt="user"/></div>
            <div>
                <div>{recipient.firstName + ' ' + recipient.lastName}</div>
                {recipient.profile.transferMethod && <small className="capitalize recipient-transfer-method" >({replaceUnderscores(recipient.profile.transferMethod)})</small>}
                {recipient.profile.mobileMoneyProvider && <small className="capitalize d-block recipient-transfer-method" >{(recipient.profile.mobileMoneyProvider)}</small>}
            </div>
        </div>
    )
}

const Recipient = () => {
    const history = useHistory();
    const recipients = useSelector((state: any)=>state.recipients.recipients);
    const recipient = useSelector((state: any)=>state.recipients.recipient);
    const transfer = useSelector((state: any)=>state.transfer);

    const [ transferDetailsModalOpen, setTransferDetailsModalOpen ] = useState(false)

    const {toSend, toReceive, transferMethod} = transfer;

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
        refreshUserDetails((user: any) => checkPageAuthorization(user));
    }, [transfer])

    const paramTransferId = getQueryParam('t');
    const editMode = () => {
        const transferId = paramTransferId;

        if (transferId) {

            return true;
        }
        return false;
    }

    const checkPageAuthorization = (user: any) => {
        if (editMode()) return;
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
        const mobileMoneyMax = getMax(transferMethod,  toReceive?.countryCode, toSend?.countryCode);
        if (transferMethod === "mobile_money" && (Number(toReceive.total)) > mobileMoneyMax) {
            history.replace(paths.GET_QUOTE)
            toastAction({
                show: true,
                type: "warning",
                timeout: 10000,
                title: "Exceeded maximum!",
                message: `The maximum transferable amount (inclusive of charges) for ${replaceUnderscores(transferMethod)} is ${mobileMoneyMax} ${toReceive.currency} for Mobile Money`
            })
            return
        }
        if (userIsVerified(user)) {
        } else {
            if (isUserFirstTransaction(user) && Number(toSend.total) < maxTransfersUnverified[toSend?.currency?.toUpperCase()]) {
            }
            else if (userHasReachedFinalVerificationStage(user)) {}
            else {
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

    useEffect(() => {
        setFilteredRecipients( recipients )
        handleRecipientUpdate()
    }, [recipients])

    const handleRecipientClick = (recipient: any) => {

        if (recipient.profile.transferMethod !== transferMethod) {
            if (!editMode()) {

                return toastAction({
                        show: true,
                        type: "warning",
                        timeout: 5000,
                        message: `Select a recipient with ${transfer.transferMethod?.replace( '_', ' ' )} transfer method for this transaction`
                    })
            }
        }

        if ( transfer.remittanceHandler !== (recipient.profile.remittanceHandler || remittanceHandlers.MANUAL_REMITTANCE_HANDLER) ) {
            return toastAction({
                show: true,
                type: "warning",
                timeout: 5000,
                message: `Select a recipient with a mobile money provider for non-manual remittances`
            })
        }
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
        setRecipientDataForUpdate(recipientData);
        setOpenNRModal(true);
    }

    const handleContinue = () =>{
        return recipient.id ? history.push(paths.REVIEW) : toastAction({
            show: true,
            type: "warning",
            message: `Select / Add Recipient`
        })
    }

    const handleContinueEditMode = () => {
        if (!selectedRecipient) {
            toastAction({
                show: true,
                type: 'warning',
                timeout: 10000,
                message: "Select a recipient"
            })
            return;
        }

        updateTransferRecipient(()=>history.push(paths.PAYMENT_METHOD + "?t=" + paramTransferId), paramTransferId);
    }

    return (
        <Body>
            <NavBar />
            <ProgressBar point={2} />
            <NewRecipientModal openModal={setOpenNRModal} modalOpen={openNRModal} selectRecipient={handleRecipientClick} recipientData={recipientDataForUpdate} />

            {transferDetailsModalOpen && (<div className="timeline-modal-container desktop-hide">
                <div className="overlay" onClick={() => setTransferDetailsModalOpen(false)}></div>
                <div className="timeline-modal">
                    <TransferDetailsBox transferId={paramTransferId} />
                </div>
            </div>)}
            <div className="page-content">
                <div className="search">
                    <div><input type="text" onChange={(e) => filterRecipients(e)} placeholder="Search recipients"/> <button className=""> <img src={asset("icons", "search.svg")} alt="search"/> </button> </div>
                </div>
                <div className={openNRModal ? "mobile-hide" : ''}>
                    <PageHeading heading="Recipient" subheading="Who are you sending money to?" back={paths.GET_QUOTE} />
                    <div className="green-txt desktop-hide view-td is-link" onClick={() => setTransferDetailsModalOpen(true)}  >View transfer details</div>
                </div>
                {/* <RoundFloatingPlus showPlus={!openNRModal} callBack={()=>setOpenNRModal(true)} /> */}
                <div className="box-container">
                    <div className="right part">
                            <div className="heading mobile-hide">
                                <div className="title">My saved recipients</div>
                            </div>
                            <hr className="mobile-hide"/>
                            <div className="small-boxes">
                                <div className="recipient plus" onClick={()=>setOpenNRModal(true)}>
                                    <img src={asset("icons", "add.svg")} alt="plus"/>
                                    <span>Add recipient</span>
                                </div>
                                {
                                    filteredRecipients
                                    .filter((isTransferMethod: any) => isTransferMethod.profile.transferMethod === transfer.transferMethod)
                                    .map((recipient: any)=> <RecipientCard key={recipient.id} recipient={recipient} selectedRecipient={selectedRecipient} handleRecipientClick={handleRecipientClick}/>)
                                }
                            </div>

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox transferId={paramTransferId} />
                    </div>
                </div>
                <div className="btns">
                    {
                       editMode() ? <>
                            <button onClick={handleContinueEditMode}>Update transfer</button>
                        </> : <>
                            <span onClick={()=>history.push(paths.GET_QUOTE)}>Back</span>
                            <button onClick={handleContinue}>Continue</button>
                        </>
                    }
                </div>
            </div>
        </Body>
    )
}

export default Recipient;
