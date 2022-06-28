import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { transfer } from 'redux/reducers/transfer';
import styled from 'styled-components';
import { paths } from '../../../util/paths';

const Div = styled.div`
            display: grid;
            /* grid-template-columns: 3fr 2.3fr; */
            width: 100% ;
            margin: 0px auto 50px;
            
            .recipient-details {
                background: #007B5D;
            }
            hr {
                margin: 20px 0px;
                border: 1px solid #f8f7f8;
            }
            >div {
                background: #FFFFFF;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                width: 100%;
                max-height: 100%;
                padding: 44px;
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
@media only screen and (max-width: 900px) {
    margin-bottom: 0px;
    >div {
        padding: 20px;
    }
}
`

const RecipientDetailsBox = (props: any) => {
    const {hideType, green_mamba} = props;
    const recipient = useSelector((state: any) => state.recipients.recipient)
    const transfer = useSelector((state: any) => state.transfer)
    console.log(transfer, "::here")
    return (
        <Div className={hideType}>
            <div className={`${green_mamba && 'recipient-details'}`}>
                <div className="heading">
                    <div className={`${green_mamba ? 'title white-txt' : 'title'}`}>Recipient’s Details</div>
                    <Link to={`${paths.RECIPIENT}?update=${recipient.id}`}><div className="update">Update</div></Link>
                </div>
                <hr/>
                <div className="row">
                    <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Name</div>
                    <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.firstName + ' ' + recipient.lastName }</div>
                </div>
                <div className="row">
                    <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Mobile No.</div>
                    <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.mobile}</div>
                </div>
                {
                    recipient.profile.email &&
                    <div className="row">
                        <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Email</div>
                        <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.email || '-'}</div>
                    </div>
                }

                {
                    recipient.profile.state &&
                    <div className="row">
                        <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>City</div>
                        <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.state || '-'}</div>
                    </div>
                }
                <div className="row">
                    <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Reason</div>
                    <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.reason || '-'}</div>
                </div>

                {
                    recipient.profile.bankName &&
                    <div className="row">
                        <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Recipient’s Bank Name</div>
                        <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.bankName || '-'}</div>
                    </div>
                }

                {
                    !recipient.profile.accountNumber &&
                    <div className="row">
                        <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Account Number</div>
                        <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.accountNumber || '-'}</div>
                    </div>
                }

                {recipient.profile.pickupPoint && <div className="row">
                    <div className={`${green_mamba ? 'left white-txt' : 'left'}`}>Pickup point</div>
                    <div className={`${green_mamba ? 'right white-txt' : 'right'}`}>{recipient.profile.pickupPoint || '-'}</div>
                </div>}
            </div>
        </Div>
    )
}

export default RecipientDetailsBox
