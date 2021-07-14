import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getQuoteService, getServiceRate, setNewQuote, toastAction } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { formatCurrency, getMoneyValue } from '../../../util/util';
// import { asset } from '../../../util/util';
import ExchangeRateInput from '../../ui-components/exchange-rate-input/ExchangeRateInput';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import ProgressBar from '../../ui-components/progress-bar/ProgressBar';
import style from './GetQuote.css';


const Body = style();

const GetQuote = () => {
    
    const transfer = useSelector((state: any)=>state.transfer);
    const appValues = useSelector((state: any) => state.appValues);

    const conversionRate = transfer.conversionRate;
    const toSend = transfer.toSend;
    const toReceive = transfer.toReceive;
    toReceive.value = transfer.toSend.value * conversionRate?.rate
    const serviceFee = Number(toSend.value) ? transfer.serviceFee : formatCurrency("0");
    const payInCountries = appValues.payInCountries;
    const payOutCountries = appValues.payOutCountries;
    const dispatch = useDispatch()
    const history = useHistory();
    const max  = transfer.transferMax;
    const transferMethod = transfer.transferMethod

    const handleXInputChange = (e: any, data: any) => {
        const caret = e.target.selectionStart
        const element = e.target
        window.requestAnimationFrame(() => {
            element.selectionStart = caret
            element.selectionEnd = caret
        })

        const value = getMoneyValue(formatCurrency(e.target.value));

        // if(!value) return;
        if (data.isSend) {
            dispatch({
                type: TRANSFER, 
                payload: {
                    ...transfer,
                    toSend: {...toSend, value: `${value}`}, 
                    toReceive: {...toReceive, value: `${value * conversionRate?.rate}`}
                }
            })

        } else {
            dispatch({
                type: TRANSFER, 
                payload: {
                    ...transfer,
                    toSend: {...toSend, value: `${value / conversionRate?.rate}`}, 
                    toReceive: {...toReceive, value: `${value}`}
                }
            })
        }
    }
    useEffect(()=>{
        getServiceRate();
    }, [transfer.toSend])

    useEffect(() => {
        getQuoteService(toSend.currency, toReceive.currency);
    }, [])

    const handleContinue = () => {
        if (!Number(toSend.value)) {
            toastAction({
                show: true,
                type: "warning",
                timeout: 10000,
                message: "You can't send "+toSend.value+ " "+toSend.currency
            })
            return
        }
        const mobileMoneyMax = 500000;
        if (transferMethod === "mobile_money" && (Number(toReceive.value) + Number(serviceFee)) > mobileMoneyMax) {
            toastAction({
                show: true,
                type: "warning",
                timeout: 10000,
                title: "Exceeded maximum!",
                message: `The maximum transfarable amount (inclusive of charges) form Mobile Money is ${mobileMoneyMax}XAF for Mobile Money`
            })
            return
        }
        setNewQuote(toSend.currency, toReceive.currency);
        history.push(paths.RECIPIENT)
    }


    const getTransferFeeText = (selectedMethod: string) => {
        const texts: any = {
            "mobile_money": `Mobile Operator <a href="#" class='light-green click-hover-tab'>Transfer Fee </a> from: 
                <div class="hover-tab">
                    <div class="tab-list"> <a href="https://mtn.cm/momo/fees">MTN MOMO Fees</a> </div>
                    <div class="tab-list"> <a href="https://www.orange.cm/fr/tarification-orange-money.html"> Orange Money Fees </a> </div>
                </div>
            `,
            "bank_transfer": "Bank Transfer Fee: ",
            "cash_pickup": "Cash Pick-up Fee: "
        }

        return texts[selectedMethod];
    }

    return (
        <Body>
            <NavBar />
            <ProgressBar />
            <div className="page-content">
                <PageHeading heading="Get quote" subheading="How much would you like to send to your recipient?" back="/transfer-method" />
                <div className="box">
                    <div className="head">
                        <span className="capitalize">{transferMethod?.replace("_", " ")}</span>
                        <span><Link to="/transfer-method">Change transfer method</Link></span>
                    </div>

                    <div className="calc">
                        <div className="hero-rect">
                            <div>
                                <ExchangeRateInput max={max} data={toSend} handleXInputChange={handleXInputChange} countries={payInCountries}/>
                            </div>
                            <div className="wrapper">
                                <div className="timeline-box">
                                    <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt=""/></i> <span className="deep-green no-wrap">1 GBP = {formatCurrency(conversionRate?.rate)} XAF</span></span></div>
                                    <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt=""/></i> <span> <div style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: getTransferFeeText(transferMethod)}}></div> <span className="deep-green">{serviceFee} GBP</span></span> </span></div>
                                    {/* <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt=""/></i>  <span>Transfers with SBremit costs you <span className="deep-green">0.00 GBP</span> </span> </span></div> */}
                                    <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt=""/></i>  <span>Total to pay <span className="deep-green">{formatCurrency(`${Number(toSend.value) + Number(serviceFee)}`)} GBP</span></span></span></div>
                                    <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i> <span className="not-mobile">Transfer arrives <b>Within 2 hours</b></span> </span></div>
                                </div>
                            </div>
                            <div className="receive">
                                <ExchangeRateInput data={toReceive} handleXInputChange={handleXInputChange} countries={payOutCountries} />
                            </div>
                        </div>
                        <div className="footnote">SBremit charges you <b className="green-txt">{serviceFee} GBP</b> for this transfer</div>

                    </div>
                </div>
                <div className="btns"><span>Cancel</span> <button onClick={()=>handleContinue()}>Continue</button> </div>
            </div>
        </Body>
    )
}

export default GetQuote;
