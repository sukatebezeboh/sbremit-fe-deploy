import React, { useEffect } from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/transfer-details-box/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import RecipientDetailsBox from '../../modules/parts/RecipientDetailsBox';
import { useDispatch, useSelector } from 'react-redux';
import { paths } from '../../../util/paths';
import { confirmTransfer, toastAction } from '../../../redux/actions/actions';
import { RESET_TRANSFER } from 'redux/actionTypes';
import Body from './Review.css'

const Review = () => {
    const history = useHistory();
    const recipient = useSelector((state: any)=>state.recipients.recipient)
    const transfer = useSelector((state: any)=>state.transfer)
    const user = useSelector((state: any) => state.auth.user);
    const dispatch = useDispatch();


    
    const handleConfirmClick = () => {
        // const userIsVerified = Boolean(user?.meta?.verified) && user?.meta?.verified !== "retry"
        const userIsVerified = false
        confirmTransfer(recipient, transfer, (id: string) => {
            if(userIsVerified){
                dispatch({
                    type: RESET_TRANSFER,
                    payload: undefined
                })
                history.push(paths.PAYMENT_METHOD + '?t=' + id);
                return
            }
            toastAction({
                show: true,
                type: "info",
                timeout: 15000,
                title: "Just a minute, please!",
                message: "We need to verify who you are to make this transaction"
            })
            history.replace(paths.VERIFICATION + '?t=' + id)
        })
    }

    useEffect(() => {
      if (!transfer?.toSend?.value) {
        history.replace(paths.RECIPIENT);
      }
    }, [])
    
    const isRecipientValid = () => {
        if (transfer.transferMethod === "bank_transfer") {
            if (!Boolean(recipient?.profile?.accountNumber) && !Boolean(recipient?.profile?.iban)) {
                toastAction({
                    show: true,
                    type: "warning",
                    timeout: 15000,
                    message: "For bank transfer, you should select a recipient with account details or create a new one having those details"
                })
                return false;
            }
        }
        return recipient.id;
    }

    return (
        !isRecipientValid() ?
        <Redirect to={paths.RECIPIENT} />
        :
        <Body>
            <NavBar />
            <ProgressBar point={2} />
            <div className="page-content">
                <div>
                    <PageHeading heading="Review" subheading="Review the details of your transfer" back={paths.RECIPIENT} />
                </div>
                <div className="box-container details">
                    <RecipientDetailsBox hideType="mobile-hide" />
                    <TransferDetailsBox />
                    <RecipientDetailsBox hideType="desktop-hide" />
                </div>
                <div className="btns"><span onClick={()=>history.push(paths.RECIPIENT)}>Back</span> <button onClick={handleConfirmClick}>Confirm</button> </div>
            </div>
        </Body>
    )
}

export default Review;
