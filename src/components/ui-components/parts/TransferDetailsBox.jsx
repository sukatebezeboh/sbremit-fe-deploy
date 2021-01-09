import React from 'react'
import styled from "styled-components";

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

`

const TransferDetalsBox = () => {
    return (
    <Div className="mobile-hide">
        <div className="transfer-details part">
                <div className="heading">
                    <div className="title">Transfer Details</div>
                    <div className="update">Edit</div>
                </div>
                <hr/>
                <div className="row">
                    <div className="left">Transfer method</div>
                    <div className="right">Bank Transfer</div>
                </div>
                <div className="row">
                    <div className="left">You send</div>
                    <div className="right"><b>100 GBP</b></div>
                </div>
                <div className="row">
                    <div className="left">Exchange rate</div>
                    <div className="right">1 GBP = 70.36 XAF</div>
                </div>
                <div className="row">
                    <div className="left">Service fee</div>
                    <div className="right">+0.95 GBP</div>
                </div>
                <div className="row">
                    <div className="left">They get</div>
                    <div className="right"><b>70,036 XAF</b></div>
                </div>
                <div className="row">
                    <div className="left">Total to pay</div>
                    <div className="right"><b className="green-txt">100.95 GBP</b></div>
                </div>
                <div className="row">
                    <div className="left">Transfer time</div>
                    <div className="right">within 2 hours</div>
                </div>
        </div>
    </Div>

    )
}

export default TransferDetalsBox;
