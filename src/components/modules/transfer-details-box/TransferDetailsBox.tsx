import { PAYMENT_GATEWAYS } from 'components/pages/payment-method/PaymentMethod.helper';
import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTransactionDetails, getTransferMethodById } from '../../../redux/actions/actions';
import { constants, transferMethodsInWords } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { formatCurrency, getInclusiveText, parseWithUnderscores } from '../../../util/util';
import Div from './TransferDetailsBox.css'  

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
    const promoCode = isTransaction ? transaction?.meta?.promoCode : transferQuote?.meta?.promoCode;
    const referralDiscountValue = isTransaction ? transaction?.meta?.referralDiscount : transferQuote?.meta?.referralDiscount;
    const paymentGatewayCharge = isTransaction ? formatCurrency(`${+transaction?.meta?.paymentGatewayCharge}`) : 0;
    const totalToPay = isTransaction ? formatCurrency(`${+transaction?.meta?.totalToPay + +paymentGatewayCharge}`) : formatCurrency(`${Number(transferQuote?.totalToPay)}`);

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

    const transferPaymentMade = () =>  {
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
                    {
                        promoCode && 
                        <div className="row ">
                            <div className="left green-txt">Promo</div>
                            <div className="right uppercase green-txt"> {promoCode} </div>
                        </div>
                    }

                    {
                        Boolean(referralDiscountValue) && 
                        <div className="row ">
                            <div className="left green-txt">Referral Discount</div>
                            <div className="right uppercase green-txt"> {referralDiscountValue} {sendCurrency} </div>
                        </div>
                    }

                    <div className="row">
                        <div className="left" dangerouslySetInnerHTML={{__html: getTransferFeeText(transferQuote?.transferMethod || transaction?.transferMethod)}} ></div>
                        <div className="right uppercase"> +{serviceFee} {sendCurrency}</div>
                    </div>

                    <div className="row">
                        <div className="left">SB Remit Transfer Charge</div>
                        <div className="right uppercase"> {"0.00"} {sendCurrency} </div>
                    </div>

                    {
                        Boolean(Number(paymentGatewayCharge)) &&
                        <div className="row">
                            <div className="left">Payment Gateway Charge</div>
                            <div className="right uppercase"> {paymentGatewayCharge} {sendCurrency}</div>
                        </div>
                    }

                    { 
                        transferPaymentMade() && 
                        <div className="row">
                            <div className="left">Payment Gateway Used</div>
                            <div className="right capitalize italicize">{PAYMENT_GATEWAYS[transaction?.meta?.paymentGatewayUsed?.toLowerCase()]?.provider || transaction?.meta?.paymentGatewayUsed?.toLowerCase()}</div>
                        </div>
                    }

                    <div className="row">
                        <div className="left">They get <small> {getInclusiveText(parseWithUnderscores(transferMethod))} </small> </div>
                        <div className="right uppercase"><b>{receiveAmount} {receiveCurrency}</b></div>
                    </div>

                    <div className="row">
                        <div className="left">Total to pay</div>
                        <div className="right uppercase"><b className="green-txt">{totalToPay} {sendCurrency}</b></div>
                    </div>

            </div>
        </Div>

    )
}

export default TransferDetailsBox;
