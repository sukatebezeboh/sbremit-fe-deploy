import React from 'react'
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import styled from "styled-components";
import { paths } from '../../../util/paths';
import { formatCurrency } from '../../../util/util';

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

const TransferDetailsBox = () => {
    const transfer = useSelector((state: any) => state.transfer);    

    return (
        !(transfer.transferMethod && transfer.conversionRate?.rate && transfer.serviceFee && transfer.toSend.value && transfer.toReceive.value) ?
        <Redirect to={paths.TRANSFER_METHOD} />
        :
        <Div className="">
            <div className="transfer-details part">
                    <div className="heading">
                        <div className="title">Transfer Details</div>
                        <div className="update">Edit</div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="left">Transfer method</div>
                        <div className="right sentence-case">{transfer.transferMethod.replace('_', ' ')}</div>
                    </div>
                    <div className="row">
                        <div className="left">You send</div>
                        <div className="right uppercase"><b>{transfer.toSend.value} {transfer.toSend.currency}</b></div>
                    </div>
                    <div className="row">
                        <div className="left">Exchange rate</div>
                        <div className="right uppercase">1 {transfer.conversionRate?.base} = {formatCurrency(transfer.conversionRate?.rate?.rate)} {transfer.conversionRate?.target}</div>
                    </div>
                    <div className="row">
                        <div className="left">Service fee</div>
                        <div className="right uppercase">+{transfer.serviceFee} GBP</div>
                    </div>
                    <div className="row">
                        <div className="left">They get</div>
                        <div className="right uppercase"><b>{transfer.toReceive.value} {transfer.toReceive.currency}</b></div>
                    </div>
                    <div className="row">
                        <div className="left">Total to pay</div>
                        <div className="right uppercase"><b className="green-txt">{Number(transfer.toSend.value) + Number(transfer.serviceFee)} {transfer.toSend.currency}</b></div>
                    </div>
                    <div className="row">
                        <div className="left">Transfer time</div>
                        <div className="right">within 2 hours</div>
                    </div>
            </div>
        </Div>

    )
}

export default TransferDetailsBox;
