import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getQuoteService, getServiceRate, getServiceRateValue, setNewQuoteWithoutAuth, updateAppValues } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { formatCurrency, getMax, useResizeObserver } from '../../../util/util';
import QuoteExchangeRateInput from '../../modules/exchange-rate-input/QuoteExchangeRateInput';
import { style } from "./LandingPage.css";
import NavHeader from '../../content-pages/nav-header/NavHeader';
import PromoCodeField from '../../modules/promo-code-field/PromoCodeField';
import { CookieService } from '../../../services/CookieService';
import FancyToggle from '../../modules/fancy-toggle/FancyToggle';
import { constants } from '../../../util/constants';
import config from '../../../env';
import { addTrackers } from 'react-ga';

const bg = window.location.pathname.indexOf('/en') !== -1 ? `/assets/bg/${'en'}-bg.png` :  window.location.pathname.indexOf('/ca') !== -1 ? `/assets/bg/${'ca'}-bg.png` : undefined;
const Body = style(bg);


const LandingPage = (props: any) => {
    const [screenType] = useResizeObserver(constants.MOBILE)
    const transfer = useSelector((state: any)=>state.transfer)
    const history = useHistory();
    const appValues = useSelector((state: any) => state.appValues);
    const promo = transfer.promo
    const [promoText, setPromoText] = useState("")

    const conversionRate = transfer.conversionRate;
    const toSend = transfer.toSend;
    const toReceive = transfer.toReceive;
    const [changedInput, setChangedInput] :any = useState(null);

    let rate= conversionRate?.rate;
    if (
        promo?.type === "FIXED_RATE"
        && toSend.currency === promo.settings.baseCurrency
        && toReceive.currency === promo.settings.targetCurrency
        && Number(toSend.value) >= Number(promo.settings.minimumSpend)
        && Number(toSend.value) <= Number(promo.settings.maximumSpend)
    ) {
        rate = promo.settings.rate
    }
    const serviceFee = Number(toSend.value) ? transfer.serviceFee : formatCurrency("0");
    const payInCountries = appValues.payInCountries;
    const payOutCountries = appValues.payOutCountries;

    const dispatch = useDispatch()

    const [selected, setSelected] = useState(transfer.transferMethod || "mobile_money");
    const allowOperatorFee = transfer.allowOperatorFee;
    const max  = getMax(selected);


    const setAllowOperatorFee = (allow: boolean) => {
        alert(allow)
        dispatch({
            type: TRANSFER,
            payload: {
                ...transfer,
                allowOperatorFee: allow
            }
        })
    }

    const setTransferMethod = (method: string) => {
        setSelected(method);
        dispatch({type: TRANSFER, payload: {...transfer, transferMethod: method}})
    }

    useEffect(()=>{
        getServiceRate(selected);
    }, [transfer.toSend, transfer.transferMethod, selected, transfer.allowOperatorFee, transfer.toSend.currency, rate])

    useEffect(() => {
        setTransferMethod(selected)
    }, [transfer.toSend?.value, transfer.toReceive?.value, transfer.allowOperatorFee, rate])

    useEffect(() => {
        setTransferMethod(selected)
        getQuoteService(toSend.currency, toReceive.currency);
        updateAppValues();
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
        } catch(e) {}
    }

    const handleXInputChange = (e: any, data: any) => {
        const caret = e.target.selectionStart
        const element = e.target
        window.requestAnimationFrame(() => {
            element.selectionStart = caret
            element.selectionEnd = caret
        })

        const value = e.target.value;

        if (value.split('.')[1]?.length > 2) {
            return;
        }

        if (isNaN(value)) {
            return
        }

        let rate = conversionRate?.rate;
        if (
            promo?.type === "FIXED_RATE"
            && toSend.currency === promo.settings.baseCurrency
            && toReceive.currency === promo.settings.targetCurrency
            && Number(value) >= Number(promo.settings.minimumSpend)
            && Number(value) <= Number(promo.settings.maximumSpend)
        ) {
            rate = promo.settings.rate
        }
        if (data.isSend) {
            if (
                promo?.type === "FIXED_RATE"
                && toSend.currency === promo.settings.baseCurrency
                && toReceive.currency === promo.settings.targetCurrency
                && Number(value) >= Number(promo.settings.minimumSpend)
                && Number(value) <= Number(promo.settings.maximumSpend)
            ) {
                rate = promo.settings.rate
            }

            if (
                promo?.type === "FIXED_RATE"
                && toSend.currency === promo.settings.baseCurrency
                && toReceive.currency === promo.settings.targetCurrency
                && (Number(value) / promo.settings.rate) >= Number(promo.settings.minimumSpend)
                && (Number(value) / promo.settings.rate) <= Number(promo.settings.maximumSpend)
            ) {
                rate = promo.settings.rate
            } else {
                setPromoText("")
            }

            dispatch({
                type: TRANSFER,
                payload: {
                    ...transfer,
                    toSend: {...toSend, adjusted: getAdjustedValue(value, value * rate, allowOperatorFee, selected, false), value: `${value}`}, 
                    toReceive: {...toReceive, value: `${value * rate}`, total: getAdjustedValue(value * rate, value * rate, allowOperatorFee, selected, true ) },
                }
            })

        } else {
            dispatch({
                type: TRANSFER,
                payload: {
                    ...transfer,
                    toSend: {...toSend, adjusted: getAdjustedValue(value/rate, value, allowOperatorFee, selected, false), value: `${(value / rate).toFixed(2)}`}, 
                    toReceive: {...toReceive, value: `${value}`, total: getAdjustedValue(value, value, allowOperatorFee, selected, true)},
                }
            })
        }
    }

    const getTransferFeeText = (selectedMethod: string) => {
        const texts: any = {
            "mobile_money": `Mobile Operator <a href="#" class='light-green click-hover-tab'>Cash Out Fee </a> from:
                <div class="hover-tab">
                    <div class="tab-list"> <a href="https://mtn.cm/momo/fees" target="_blank">MTN MOMO Fees</a> </div>
                    <div class="tab-list"> <a href="https://www.orange.cm/fr/tarification-orange-money.html" target="_blank"> Orange Money Fees </a> </div>
                </div>
            `,
            "bank_transfer": "Bank Pay Out Fee: ",
            "cash_pickup": "Cash Pick-up Fee: "
        }

        return texts[selectedMethod];
    }

    useEffect(() => {
        setTotalValue()
    }, [promo, toSend.value, toReceive.value, serviceFee, promo?.code, transfer.allowOperatorFee, rate])

    const mutateInputValueDirectly = (rate: any) => {
        if (changedInput === 'toSend') {
            toReceive.value = Number(toSend.value) * Number(rate)
        } else if (changedInput === 'toReceive'){
            toSend.value = (Number(toReceive.value) / Number(rate)).toFixed(2)
        } else {

        }
    }

    const setTotalValue = () => {

        let total = Number(toSend.value) + Number(serviceFee);

        if (
            promo
            && isAcceptablePromoValue(promo)
            ) {
            switch (promo.type) {
                case 'PERCENTAGE':
                    total =  total - ((Number(promo.settings.percentage) * total) / 100)
                    setPromoText(`${promo.settings.percentage}% off`);
                    break;
                case 'FIXED_AMOUNT':
                    total = total - Number(promo.settings.discountAmount);
                    setPromoText(`${promo.settings.discountAmount}${toSend.currency} off`);
                    break;
                case 'FIXED_RATE':
                    if (toSend.currency === promo.settings.baseCurrency && toReceive.currency === promo.settings.targetCurrency) {
                        setPromoText(`1 ${promo.settings.baseCurrency} = ${promo.settings.rate} ${promo.settings.targetCurrency} fixed rate`);
                        mutateInputValueDirectly(promo.settings.rate)
                    } else {
                        mutateInputValueDirectly(conversionRate?.rate)
                    }
                    break;
                case 'FREE_OPERATOR_FEE':
                    setPromoText(`0.00${toSend.currency} Operator Fee`);
                    total = Number(toSend.value)
                    break;
                default:
                    setPromoText('');
                    mutateInputValueDirectly(conversionRate?.rate)
                    total = total * 1
            }
        } else {
            setPromoText("");
            mutateInputValueDirectly(conversionRate?.rate)
        }
        dispatch({
            type: TRANSFER,
            payload: {
                ...transfer,
                toSend: {...toSend, adjusted: getAdjustedValue(toSend.value, toReceive.value, allowOperatorFee, selected, false), total: `${total}`},
                toReceive: {...toReceive, total: getAdjustedValue(toReceive.value, toReceive.value, allowOperatorFee, selected, true )},
            }
        })
    }

    const getAdjustedValue = (value: any, toRecieveValue: any, allowOperatorFee:any, transferMethod: any, isRecipientsValue: boolean) => {
        value = Number(value);
        let adjustment = 0
        if ((allowOperatorFee || transferMethod === "mobile_money") ) {
            if (allowOperatorFee && transferMethod === "mobile_money" && isRecipientsValue) {
                adjustment = Number(getServiceRateValue(toRecieveValue, transferMethod, isRecipientsValue, false))
            }
        } else {
            adjustment = 0 - Number(getServiceRateValue(toRecieveValue, transferMethod, isRecipientsValue, false));
        }
        return Number(value) + adjustment
    }

    const isAcceptablePromoValue = (promo: any) => {
        return Number(toSend.value) >= Number(promo.settings.minimumSpend)
        && Number(toSend.value) <= Number(promo.settings.maximumSpend);
    }

    const getXInputMarginAdjust = (newLinesValues: boolean[]) => {
        let initialMargin = screenType === constants.MOBILE ? 160 : -50;

        for( const newLine of newLinesValues ) {
            if (newLine) {
                initialMargin += 50
            }
        }

        return initialMargin + "px";
    }

    return (
        <Body>
            <div>
                <div className="nav">
                    <NavHeader page="home"/>
                </div>
            </div>
            <div className="header-links">
                <button className="start-sending-header-link" onClick={()=>{
                    setNewQuoteWithoutAuth(toSend.currency, toReceive.currency, () => history.push(CookieService.get('X-SERVICE_PROVIDER') === config.X_SERVICE_PROVIDER ? paths.SIGN_IN : paths.SIGN_UP));
                }}>
                    Start sending money
                </button>
                <div className="authentication-buttons">
                    <Link className="signup-link" to={paths.SIGN_UP}>Sign Up</Link>
                    <Link className="login-link" to={paths.SIGN_IN}>Login</Link>
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
                                QuoteExchangeRateInput({data: toSend, changedInput, setChangedInput: () => setChangedInput('toSend'), handleXInputChange,  max: selected !== constants.MOBILE_MONEY ? max : undefined , countries: payInCountries})
                            }
                        </div>
                        <div className="wrapper">
                            <div className="timeline-box">
                                <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt="" /></i> 
                                <span className={`deep-green ${promo?.type === "FIXED_RATE" && isAcceptablePromoValue(promo) ? "strikethrough" : ""}`}>1 {toSend.currency} = {formatCurrency(conversionRate?.rate)} XAF</span>
                                </span>
                                </div>
                                {Boolean(Number(transfer.serviceFee)) && <div className={`timeline timeline-2`}> 
                                    <span><i><img src="./assets/icons/plus.svg" alt=""/></i> 

                                       <span className={`${allowOperatorFee ? "" : "strikethrough"}`}> <div style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: getTransferFeeText(selected)}}></div> <span className={`deep-green ${(promo?.type === "FREE_OPERATOR_FEE"  && (isAcceptablePromoValue(promo) || !allowOperatorFee)) ? "strikethrough" : ""}`}>{transfer.serviceFee} {toSend.currency}</span></span> 
                                       
                                       </span>
                                </div>}
                                <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt="" /></i>  <span className="sb-charges">SB Remit charges you <span className="deep-green">0.00 {toSend.currency}</span> for this transfer </span>
                                {/* <i className="mobile sa">SBremit charges you<span className="deep-green">0.00 {toSend.currency}</span> for this transfer</i>  */}
                                </span></div>
                                {promo && <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt="" /></i>  <span>Promo code { promoText ? <span className="deep-green"> {promoText} </span> : <span className="red-txt"> *Spend btw: {promo?.settings?.minimumSpend} {toSend.currency} and {promo?.settings?.maximumSpend} {toSend.currency}  </span> }</span> </span></div>}
                                <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt="" /></i>  <span>Total to pay <span className="deep-green">{formatCurrency(`${toSend.total}`)} {toSend.currency}</span></span></span></div>
                                <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i>
                                {/* <span className="not-mobile">Transfer arrives <b>Within 2 hours</b></span> */}
                                 <span className="mobile we-conv">We’ll convert {formatCurrency(toSend.value)} {toSend.currency}</span> </span></div>
                            </div>
                        </div>
                        <div className="offset"></div>
                        <div className="receive" style={{marginTop: getXInputMarginAdjust([Boolean(promo), Boolean(Number(transfer?.serviceFee))])}}>
                            {/* <ExchangeRateInput key={'landingPageToRecieve'} data={toReceive} handleXInputChange={handleXInputChange} /> */}
                            {
                                QuoteExchangeRateInput({data: toReceive, changedInput, setChangedInput: () => setChangedInput('toReceive'), handleXInputChange, max: selected === constants.MOBILE_MONEY ? max : undefined, key: 'landingPageToRecieve', countries: payOutCountries})
                            }
                        </div>

                    </form>
                    <div className="toggle">
                        <FancyToggle label="Include operator fee" isActive={allowOperatorFee} onChange={(e) => setAllowOperatorFee(Boolean(e.target.value))} />
                    </div>
                        <PromoCodeField transfer={transfer} />
                        <button onClick={()=>{
                            setNewQuoteWithoutAuth(toSend.currency, toReceive.currency, () => history.push(CookieService.get('X-SERVICE_PROVIDER') === config.X_SERVICE_PROVIDER ? paths.SIGN_IN : paths.SIGN_UP));
                            }}>
                            Start sending money
                        </button>
                </div>
            </div>
        </Body>

    )
}

export default LandingPage;
