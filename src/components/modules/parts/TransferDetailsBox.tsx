import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { getTransactionDetails, getTransferMethodById } from '../../../redux/actions/actions';
import { constants, transferMethodsInWords } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { formatCurrency, getInclusiveText, parseWithUnderscores } from '../../../util/util';

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
                width: fit-content;
                float: right;
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

const TransferDetailsBox = ( { transferId, transferData = null } :any ) => {

    const transfer = useSelector((state: any) => state.transfer);

    const transaction = transferData || transfer?.transactionDetails;
    const isTransaction = transferData || transferId;

    const transferQuote = transfer.currentTransferQuote
    const serviceFee = isTransaction ? transaction?.meta?.serviceFee : ( transferQuote?.promo?.type === constants.FREE_OPERATOR_FEE ? 0 : transferQuote?.meta?.serviceFee);
    const transferMethod = isTransaction ? transferMethodsInWords[transaction?.transferMethod] : transferMethodsInWords[transferQuote?.transferMethod];
    const sendAmount = isTransaction ? formatCurrency(transaction?.originAmount) : formatCurrency(transferQuote?.originAmount);
    const sendCurrency = isTransaction ? transaction?.originCurrency : transferQuote?.originCurrency;
    const xBase = isTransaction ? transaction?.meta?.exchangeBase : transferQuote?.meta?.exchangeBase;
    const xRate = isTransaction ? transaction?.meta?.exchangeRate : formatCurrency( transferQuote?.meta?.exchangeRate );
    const xTarget = isTransaction ? transaction?.meta?.exchangeTarget : transferQuote?.meta?.exchangeTarget;
    const receiveAmount = isTransaction ? formatCurrency(transaction?.destinationAmount) : formatCurrency(transferQuote?.destinationAmount);
    const receiveCurrency = isTransaction ? transaction?.destinationCurrency : transferQuote?.destinationCurrency;
    const totalToPay = isTransaction ? transaction?.meta?.totalToPay : formatCurrency(`${Number(transferQuote?.totalToPay)}`);
    const promoCode = isTransaction ? transaction?.meta?.promoCode : transferQuote?.meta?.promoCode;
    const referralDiscountValue = isTransaction ? transaction?.meta?.referralDiscount : transferQuote?.meta?.referralDiscount;

    useEffect(() => {
        if ( transferId ) {
            getTransactionDetails( undefined, transferId )
        }
    }, [])

    const getTransferFeeText = (selectedMethod: string) => {
        selectedMethod = getTransferMethodById(selectedMethod) || selectedMethod
        const texts: any = {
            "mobile_money": `Mobile Operator <a href="/mobile-money-rate" class='light-green click-hover-tab'>Cash Out Fee</a>`,
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

    const transferPaymentMade  = () =>  {
        return isTransaction && (transaction?.status === constants.TRANSFER_STATUS_PAYMENT_COMPLETED || transaction?.meta?.paymentGatewayUsed)
    }

    return (
        <Div className="">
            <div className="transfer-details part">
                    <div className="heading">
                        <div className="title">Transfer Details</div>
                        {!isTransaction && <Link to={paths.TRANSFER_METHOD}><div className="update">Edit</div></Link>}
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
                        <div className="right uppercase"> +{serviceFee} {sendCurrency}</div>
                    </div>
                    {/* <div className="row">
                        <div className="left">Mobile operator cash-out fee</div>
                        <div className="right uppercase"> +{serviceFee} {sendCurrency}</div>
                    </div> */}
                    <div className="row">
                        <div className="left">SB Remit Transfer Charge</div>
                        <div className="right uppercase">{"0.00"} {sendCurrency}</div>
                    </div>
                    <div className="row">
                        <div className="left">They get <small> {getInclusiveText(parseWithUnderscores(transferMethod))} </small> </div>
                        <div className="right uppercase"><b>{receiveAmount} {receiveCurrency}</b></div>
                    </div>
                    { 
                        transferPaymentMade() && 
                        <div className="row">
                            <div className="left">Payment Gateway Used</div>
                            <div className="right capitalize">{transaction?.meta?.paymentGatewayUsed}</div>
                        </div>
                    }
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
