import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import styled from "styled-components";
import { getServiceRateValue, getTransactionDetails } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { constants, transferMethodsInWords } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { formatCurrency, getInclusiveText, getMoneyValue, getQueryParam, parseWithUnderscores } from '../../../util/util';

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

    const history = useHistory();

    const transfer = useSelector((state: any) => state.transfer);    
    const transaction = transfer?.transactionDetails;
    const transferQuote = transfer.currentTransferQuote
    const serviceFee = transferId ? transaction?.meta?.serviceFee : ( transferQuote?.promo?.type === constants.FREE_OPERATOR_FEE ? 0 : transferQuote?.meta?.serviceFee);
    const transferMethod = transferId ? transferMethodsInWords[transaction?.transferMethod] : transferMethodsInWords[transferQuote?.transferMethod];
    const sendAmount = transferId ? formatCurrency(transaction?.originAmount) : formatCurrency(transferQuote?.originAmount);
    const sendCurrency = transferId ? transaction?.originCurrency : transferQuote?.originCurrency;
    const xBase = transferId ? transaction?.meta?.exchangeBase : transferQuote?.meta?.exchangeBase;
    const xRate = transferId ? transaction?.meta?.exchangeRate : formatCurrency( transferQuote?.meta?.exchangeRate );
    const xTarget = transferId ? transaction?.meta?.exchangeTarget : transferQuote?.meta?.exchangeTarget;
    const receiveAmount = transferId ? formatCurrency(transaction?.destinationAmount) : formatCurrency(transferQuote?.destinationAmount);
    const receiveCurrency = transferId ? transaction?.destinationCurrency : transferQuote?.destinationCurrency;
    const totalToPay = transferId ? transaction?.meta?.totalToPay : formatCurrency(`${Number(transferQuote?.totalToPay)}`);
    const promoCode = transferId ? transaction?.meta?.promoCode : transferQuote?.meta?.promoCode;
    const referralDiscountValue = transferId ? transaction?.meta?.referralDiscountValue : transferQuote?.meta?.referralDiscount;

    // console.log(receiveAmount, transferMethod, Number(getServiceRateValue(getMoneyValue(receiveAmount), transferMethod?.replace(' ', '_'), false, false)));
    useEffect(() => {
        // if (!transferId && !transferQuote.id) {
        //     history.push(paths.GET_QUOTE)
        // }
        if ( transferId ) {
            getTransactionDetails( undefined, transferId )
        }
    }, [])

    const getTransferFeeText = (selectedMethod: string) => {
        const texts: any = {
            "mobile_money": `Mobile Operator <a href="#" class='light-green click-hover-tab'>Cash Out Fee</a>:
                <div class="hover-tab">
                    <div class="tab-list"> <a href="https://mtn.cm/momo/fees" target="_blank">MTN MOMO Fees</a> </div>
                    <div class="tab-list"> <a href="https://www.orange.cm/fr/tarification-orange-money.html" target="_blank"> Orange Money Fees </a> </div>
                </div>
            `,
            "bank_transfer": `Bank Pay Out Fee: <a href="#" class='light-green click-hover-tab fas fa-info'></a>
            <div class="hover-tab">
                <div class="tab-list"> A fee charged by local payout partner which is added to the amount you send or deducted from the amount the recipient gets </div>
            </div> `,
            "cash_pickup": `Cash Pick-up Partner Fee: <a href="#" class='light-green click-hover-tab fas fa-info'></a>
            <div class="hover-tab">
                <div class="tab-list"> A fee charged by local payout partner which is added to the amount you send or deducted from the amount the recipient gets </div>
            </div>`
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
                        {!transferId && <Link to={paths.TRANSFER_METHOD}><div className="update">Edit</div></Link>}
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
                    {promoCode && <div className="row ">
                        <div className="left green-txt">Promo</div>
                        <div className="right uppercase green-txt"> {promoCode} </div>
                    </div>}
                    {Boolean(referralDiscountValue) && <div className="row ">
                        <div className="left green-txt">Referral Discount</div>
                        <div className="right uppercase green-txt"> {referralDiscountValue} {sendCurrency} </div>
                    </div>}
                    <div className="row">
                        <div className="left" dangerouslySetInnerHTML={{__html: getTransferFeeText(transferQuote?.transferMethod || transaction?.transferMethod)}} ></div>
                        <div className="right uppercase">  { (Number(serviceFee) || transferMethod === "mobile money" ) ? `+${serviceFee}` : `${Number(getServiceRateValue(getMoneyValue(receiveAmount), transferMethod?.replace(' ', '_'), false, false, xRate))}`} {sendCurrency}</div>
                    </div>
                    <div className="row">
                        <div className="left">SB Remit Transfer Charge</div>
                        <div className="right uppercase">{"0.00"} {sendCurrency}</div>
                    </div>
                    <div className="row">
                        <div className="left">They get <small> {getInclusiveText(parseWithUnderscores(transferMethod))} </small> </div>
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
