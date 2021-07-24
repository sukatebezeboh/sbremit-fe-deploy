import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import styled from "styled-components";
import { getTransactionDetails } from '../../../redux/actions/actions';
import { paths } from '../../../util/paths';
import { formatCurrency, getQueryParam } from '../../../util/util';

const Div = styled.div`
    .transfer-details {
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
    .part{
        background: #FFFFFF;
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 100%;
        padding: 50px;
        margin: 0px auto;
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
    }
    .hover-tab {
        position: absolute;
        display: none;
        width: 200px;
        background: #fff;
        box-shadow: 0px 1px 5px #CCCCCC80;
        z-index: +50;
        padding: 10px;
        cursor: pointer;
        margin-left: -80px;

        .tab-list {
            &:hover {
                background: #f8fcfb;
                color: #007B5D;
            }
        }
    }
    .click-hover-tab {
        cursor: pointer;
        color: #007B5D;
        font-style: oblique;
    }
    .click-hover-tab:hover ~ .hover-tab{
        display: inline-block!important;
    }
    .hover-tab:hover {
        display: inline-block!important;
    }   
    @media only screen and (max-width: 900px) { 
                grid-template-columns: 1fr;
                grid-gap: 15px;
                width: 100%;
                >div {
                    padding: 15px 20px;
                    .heading {
                        .title {
                            font: normal normal normal 13px/16px Montserrat;
                        }
                        .update {
                            font: normal normal normal 11px/14px Montserrat;
                        }
                    }
                    .row {
                        font: normal normal normal 11px/22px Montserrat;
                    }
                }
                .recipient-details {
                    margin-left: auto;

                }
                .transfer-details {

                }
            }
`

const TransferDetailsBox = ( { transferId } :any ) => {

    const transfer = useSelector((state: any) => state.transfer);    
    const transaction = transfer.transactionDetails;
    console.log(transferId, transfer, transaction);
    
    const transferMethod = transferId ? transaction?.transferMethod?.replace('_', ' ') : transfer.transferMethod.replace('_', ' ');
    const sendAmount = transferId ? formatCurrency(transaction?.originAmount) : formatCurrency(transfer.toSend.value);
    const sendCurrency = transferId ? transaction?.originCurrency : transfer.toSend.currency;
    const xBase = transferId ? transaction?.meta?.exchangeBase : transfer.conversionRate?.base;
    const xRate = transferId ? transaction?.meta?.exchangeRate : formatCurrency(transfer.conversionRate?.rate);
    const xTarget = transferId ? transaction?.meta?.exchangeTarget : transfer.conversionRate?.target;
    const serviceFee = transferId ? transaction?.meta?.serviceFee : transfer.serviceFee;
    const receiveAmount = transferId ? formatCurrency(transaction?.destinationAmount) : formatCurrency(transfer.toReceive.value);
    const receiveCurrency = transferId ? transaction?.destinationCurrency : transfer.toReceive.currency;
    const totalToPay = transferId ? transaction?.meta?.totalToPay : formatCurrency(`${Number(transfer.toSend.value) + Number(transfer.serviceFee)}`);

    useEffect(() => {
        if ( transferId ) {
            getTransactionDetails( undefined, transferId )
        }
    }, [])

    const getTransferFeeText = (selectedMethod: string) => {
        const texts: any = {
            "mobile_money": `Mobile Operator <a href="#" class='light-green click-hover-tab'>Transfer Fee</a>:
                <div class="hover-tab">
                    <div class="tab-list"> <a href="https://mtn.cm/momo/fees" target="_blank">MTN MOMO Fees</a> </div>
                    <div class="tab-list"> <a href="https://www.orange.cm/fr/tarification-orange-money.html" target="_blank"> Orange Money Fees </a> </div>
                </div>
            `,
            "bank_transfer": "Bank Transfer Fee: ",
            "cash_pickup": "Cash Pick-up Fee: "
        }

        return texts[selectedMethod];
    }

    return (
        // !(transfer.transferMethod && transfer.conversionRate?.rate && transfer.serviceFee && transfer.toSend.value && transfer.toReceive.value) ?
        // <Redirect to={paths.TRANSFER_METHOD} />
        // :
        <Div className="">
            <div className="transfer-details part">
                    <div className="heading">
                        <div className="title">Transfer Details</div>
                        <Link to={paths.TRANSFER_METHOD}><div className="update">Edit</div></Link>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="left">Transfer method</div>
                        <div className="right sentence-case">{transferMethod}</div>
                    </div>
                    <div className="row">
                        <div className="left">You send</div>
                        <div className="right uppercase"><b>{sendAmount} {sendCurrency}</b></div>
                    </div>
                    <div className="row">
                        <div className="left">Exchange rate</div>
                        <div className="right uppercase">1 {xBase} = {xRate} {xTarget}</div>
                    </div>
                    <div className="row">
                        <div className="left" dangerouslySetInnerHTML={{__html: getTransferFeeText(transfer.transferMethod)}} ></div>
                        <div className="right uppercase">+{serviceFee} GBP</div>
                    </div>
                    <div className="row">
                        <div className="left">SB Remit Transfer Charge</div>
                        <div className="right uppercase">{"0.00"} GBP</div>
                    </div>
                    <div className="row">
                        <div className="left">They get</div>
                        <div className="right uppercase"><b>{receiveAmount} {receiveCurrency}</b></div>
                    </div>
                    <div className="row">
                        <div className="left">Total to pay</div>
                        <div className="right uppercase"><b className="green-txt">{totalToPay} {sendCurrency}</b></div>
                    </div>
                    {/* <div className="row">
                        <div className="left">Transfer time</div>
                        <div className="right">within 2 hours</div>
                    </div> */}
            </div>
        </Div>

    )
}

export default TransferDetailsBox;
