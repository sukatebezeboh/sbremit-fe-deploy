import React, {useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import TransferDetailsBox from '../../ui-components/parts/TransferDetailsBox';
import styled from "styled-components";
import { useSelector } from 'react-redux';
import { cancelTransfer } from '../../../redux/actions/actions';
import { paths } from '../../../util/paths';

const Body = styled.div`
    .page-content {
        margin-top: 150px;
        .box-container {
            display: grid;
            grid-template-columns: 2fr 1.3fr;
            grid-gap: 5.5%;
            padding-top: 50px;
        }
        hr {
            border: 1px solid #f8f7f8;
            margin-bottom: 30px;
        }

        .btns {
            text-align: right;
            margin: 65px 0px;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                cursor: default;
            }
            button {
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 8px;
                width: 300px;
                height: 80px;
                text-align: center;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
        .details {
            
            .pls-note {
                font: normal normal 600 16px Montserrat;
                color: #424242;
            }
            .list {
                font: normal normal normal 16px Montserrat;
                color: #424242;
                ul {
                    margin-top: 15px;
                    margin-left: -2%;
                    list-style: none;
                    li{
                        text-indent: 20px;
                        margin-top: 15px;
                        :before {
                            content: ' ';
                            width: 10px;
                            height: 10px;
                            border-radius: 50%;
                            background: #FCD20F;
                            display: inline-block; 
                            margin-right: 4%; 
                            margin-left: -7%;
                        }
                    }
                }
            }
            .green-box {
                background: #007B5D 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                width: 1005;
                /* height: 349px; */
                margin-top: 40px;
                margin-bottom: 50px;
                padding: 0px 50px;
                div{
                    font: normal normal normal 16px/44px Montserrat;
                    color: #CCCCCC;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    padding: 12px 0px;
                    border-bottom: 1px solid #3e876c;
                    span:last-child {
                        text-align: right;
                        font: normal normal normal 16px/44px Montserrat;
                        color: #FFFFFF;
                    }
                }
            }
        }
        
    }

@media only screen and (max-width: 900px) { 
    .page-content {
        width: 100%;
        height: 120vh;
        margin-top: 60px;
        margin-bottom: -50px;
        padding-top: 10px;
        .page-heading {
            margin-top: 10px;
            .heading {
                z-index: 1;
            }
        }

        .box-container {
            grid-template-columns: 1fr;
            padding-top: 0px;
            margin-top: 10px;
            margin-bottom: 50px;
            .within {
                margin: 20px;
                .list {
                    ul {
                        margin-left: -40px;
                        font: normal normal normal 13px/20px Montserrat;
                        color: #424242;
                        li {
                            padding-left: 20px;
                            text-indent: -20px;
                            margin-top: 15px;
                            :before {
                                width: 7px;
                                height: 7px;
                                margin-right: 4%; 
                                margin-left: 0%;
                            }
                        }
                    }
                }
                .green-box {
                    padding: 0px 20px;
                    margin-bottom: 20px;
                    div {
                        span {
                            font: normal normal normal 11px/22px Montserrat;
                        }
                    }
                }
            }
            
        }
        .btns {
            margin-top: 0px;
            padding: 0px 2%;
            button {
                width: 100%;
                height: 40px;
                font: normal normal normal 13px/16px Montserrat;
            }
            span {
                font: normal normal normal 13px/16px Montserrat;
                text-align: center;
                display: block;
                margin-right: 0px;
                position: relative;
                top: 70px;
            }
        }
        .cpm-text {
            font: normal normal normal 11px/14px Montserrat;
        }
       
    }
    .view-td {
            text-decoration: underline;
            font: normal normal normal 11px/14px Montserrat;
            color: #007B5D;
            margin-top: 20px;
            margin-left: 4%;
        }
}

@media only screen and (max-width: 900px) { 
    .page-content {
        .box-container {
            grid-gap: 1%!important;
        }
       
        .details {
            grid-template-columns: 1fr;
            grid-gap: 15px;
            width: 100%;
            
            
        }
    }
}

@media only screen and (max-width: 590px) { 
    .page-content {
        .details {
            
            
        }
        
    }
        
}
`

const CreateTransfer = () => {
    const history = useHistory();
    const transactionDetails =  useSelector((state: any)=>state.transfer.transactionDetails)

    const cancelPayment = () => {
        cancelTransfer(() =>history.push('/payment-method'))
    }

    return (
        !transactionDetails ?
        <Redirect to={paths.REVIEW} />
        :
        <Body>
            <NavBar />
            <div className="page-content">
                <div>
                <PageHeading heading="Manual Bank Payment" subheading="Transfer the total to pay to SBremit’s GB account" back="/payment-method" />
                <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <div className="box-container details">
                    <div className="within">
                        
                        <div>
                            <div className="pls-note">Please note</div>
                            <div className="list">
                                <ul>
                                    <li>You must include the reference provided when making transfer</li>
                                    <li>Transfer must be done within 24 hours</li>
                                    <li>We’ll process your transfer when we receive the payment from your bank</li>
                                </ul>
                            </div>
                        </div>
                        <div className="green-box">
                            <div>
                                <span>Bank</span>
                                <span>Barclays Bank</span>
                            </div>

                            <div>
                                <span>Account name</span>
                                <span>SBremit Ltd</span>
                            </div>

                            <div>
                                <span>Sort code</span>
                                <span>20-25-48</span>
                            </div>

                            <div>
                                <span>Account number</span>
                                <span>2348573900</span>
                            </div>

                            <div>
                                <span>Reference</span>
                                <span>SBR334908</span>
                            </div>
                            
                        </div>
                        <div className="green-txt cpm-text">Change payment method</div>

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox />
                    </div>
                    
                </div>
                <div className="btns"><span onClick={()=>cancelPayment()}>Cancel payment</span> <button onClick={()=>history.push('/transfer-complete')}>I’ve sent 100.95 GBP</button> </div>
            </div>
        </Body>
    )
}

export default CreateTransfer;
