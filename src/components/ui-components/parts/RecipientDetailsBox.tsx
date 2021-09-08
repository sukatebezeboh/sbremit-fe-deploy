import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { paths } from '../../../util/paths';

const Div = styled.div`
            display: grid;
            /* grid-template-columns: 3fr 2.3fr; */
            width: 100% ;
            margin: 0px auto 50px;
            .recipient-details {
            }
            hr {
                margin: 20px 0px;
                border: 1px solid #f8f7f8;
            }
            >div {
                background: #FFFFFF 0% 0% no-repeat padding-box;
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
    const {hideType} = props;
    const recipient = useSelector((state: any) => state.recipients.recipient)
    console.log(recipient);
    
    return (
        <Div className={hideType}>
            <div className="recipient-details">
                <div className="heading">
                    <div className="title">Recipient’s Details</div>
                    <Link to={`${paths.RECIPIENT}?update=${recipient.id}`}><div className="update">Update</div></Link>
                </div>
                <hr/>
                <div className="row">
                    <div className="left">Name</div>
                    <div className="right">{recipient.firstName + ' ' + recipient.lastName }</div>
                </div>
                <div className="row">
                    <div className="left">Mobile No.</div>
                    <div className="right">{recipient.profile.mobile}</div>
                </div>
                <div className="row">
                    <div className="left">Email</div>
                    <div className="right">{recipient.profile.email || '-'}</div>
                </div>
                <div className="row">
                    <div className="left">City</div>
                    <div className="right">{recipient.profile.state || '-'}</div>
                </div>
                <div className="row">
                    <div className="left">Reason</div>
                    <div className="right">{recipient.profile.reason || '-'}</div>
                </div>
                <div className="row">
                    <div className="left">Recipient’s Bank Name</div>
                    <div className="right">{recipient.profile.bankName || '-'}</div>
                </div>
                <div className="row">
                    <div className="left">Account Number</div>
                    <div className="right">{recipient.profile.accountNumber || '-'}</div>
                </div>
        </div>
        </Div>
    )
}

export default RecipientDetailsBox
