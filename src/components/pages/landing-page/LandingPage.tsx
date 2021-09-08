import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getQuoteService, getServiceRate, setNewQuote, setNewQuoteWithoutAuth } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { formatCurrency, getMoneyValue } from '../../../util/util';
import { AppFooter } from '../../ui-components/app-footer/AppFooter';
import ExchangeRateInput from '../../ui-components/exchange-rate-input/ExchangeRateInput';
import SBRemitLogo from "../../ui-components/sbremit-landing-logo/SBRemitLandingLogo";
import { style } from "./LandingPage.css";
import NavHeader from '../../content-pages/nav-header/NavHeader';

const bg = window.location.pathname.indexOf('/en/') !== -1 ? `/assets/bg/${'en'}-bg.png` :  window.location.pathname.indexOf('/ca/') !== -1 ? `/assets/bg/${'ca'}-bg.png` : undefined;
    const Body = style(bg);
const LandingPage = (props: any) => {

    const transfer = useSelector((state: any)=>state.transfer)
    const history = useHistory();
    const appValues = useSelector((state: any) => state.appValues);


    const conversionRate = transfer.conversionRate;
    const toSend = transfer.toSend;
    const toReceive = transfer.toReceive;
    toReceive.value = transfer.toSend.value * conversionRate?.rate
    const serviceFee = Number(toSend.value) ? transfer.serviceFee : formatCurrency("0");
    const payInCountries = appValues.payInCountries;
    const payOutCountries = appValues.payOutCountries;
    const max  = transfer.transferMax;

    console.log(transfer);
    
    const dispatch = useDispatch()

    const [selected, setSelected] = useState(transfer.transferMethod || "mobile_money");

    const setTransferMethod = (method: string) => {
        setSelected(method);
        dispatch({type: TRANSFER, payload: {...transfer, transferMethod: method}})
    }

    useEffect(()=>{
        getServiceRate();
    }, [transfer.toSend, transfer.transferMethod])

    useEffect(() => {
        setTransferMethod("mobile_money")
        getQuoteService(toSend.currency, toReceive.currency);
    }, [])

    useEffect(() => {

        window.addEventListener("scroll", handleScroll )
        return () => {
            window.removeEventListener( "scroll", handleScroll )
          }
    }, [])

    const handleScroll = () => {
        try {
            if (window.scrollY > 20) {
                const navContainer: any = document.querySelector("#nav-container");
                navContainer.className = "white-bg-shadow";
            } else {
                const navContainer: any = document.querySelector("#nav-container");
                navContainer.className = "no-white-bg-shadow";
            }
        } catch(e) {
        }
    }

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

    const getTransferFeeText = (selectedMethod: string) => {
        const texts: any = {
            "mobile_money": `Mobile Operator <a href="#" class='light-green click-hover-tab'>Transfer Fee </a> from: 
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
        <Body>
            <div>
                <div className="nav">
                    <NavHeader page="home"/>
                </div>
            </div>
            <div className="f-growing">
                <span>Send Money, No Palaver</span>
            </div>
            <div className="hero-grid">
                <div className="hero-texts">
                    <div>
                        Send Money, No Palaver
                </div>
                    <div>
                        A low cost means of sending money which is fast, secure and reliable with multiple delivery options
                </div>
                </div>
                <div className="hero-rect">
                    <div className="md-txt">Choose how receiver gets the money</div>
                    <div>
                        <button className={selected === "mobile_money" ? "selectedTM" : ""} onClick={() => setTransferMethod('mobile_money')} >Mobile Money</button>
                        <button className={selected === "bank_transfer" ? "selectedTM" : ""}  onClick={() => setTransferMethod('bank_transfer')} >Bank Transfer</button>
                        <button className={selected === "cash_pickup" ? "selectedTM" : ""}  onClick={() => setTransferMethod('cash_pickup')}>Cash Pickup</button></div>
                    <div className="md-txt amt-txt">Enter an amount to send</div>
                    <form>
                        <div>
                            {/* <ExchangeRateInput key={'landingPageToSend'} data={toSend} handleXInputChange={handleXInputChange} /> */}
                            {
                                ExchangeRateInput({data: toSend, handleXInputChange, max, countries: payInCountries})
                            }
                        </div>
                        <div className="wrapper">
                            <div className="timeline-box">
                                <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt="" /></i> <span className="deep-green">1 GBP = {formatCurrency(conversionRate?.rate)} XAF</span></span></div>
                                <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt="" /></i> <span> <div style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: getTransferFeeText(selected)}}></div>  <span className="deep-green"> {serviceFee} GBP</span>  </span> </span></div>
                                <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt="" /></i>  <span>SB Remit Transfer Charge <span className="deep-green">0.00 GBP</span> </span> <i className="mobile sa">SBremit charges you<span className="deep-green">0.00 GBP</span> for this transfer</i> </span></div>
                                <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt="" /></i>  <span>Total to pay <span className="deep-green">{formatCurrency(`${Number(toSend.value) + Number(serviceFee)}`)} GBP</span></span></span></div>
                                <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i> 
                                {/* <span className="not-mobile">Transfer arrives <b>Within 2 hours</b></span> */}
                                 <span className="mobile we-conv">We’ll convert {formatCurrency(toSend.value)} GBP</span> </span></div>
                            </div>
                        </div>
                        <div className="offset"></div>
                        <div className="receive">
                            {/* <ExchangeRateInput key={'landingPageToRecieve'} data={toReceive} handleXInputChange={handleXInputChange} /> */}
                            {
                                ExchangeRateInput({data: toReceive, handleXInputChange, key: 'landingPageToRecieve', countries: payOutCountries})
                            }
                        </div>
                    </form>
                    <button onClick={()=>{
                        setNewQuoteWithoutAuth(toSend.currency, toReceive.currency, () => history.push(paths.SIGN_UP));
                        }}>Start sending money</button>
                </div>
            </div>
        </Body>

    )
}

export default LandingPage;
