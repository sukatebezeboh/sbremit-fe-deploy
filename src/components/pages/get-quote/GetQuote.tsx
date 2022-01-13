import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getQuoteService, getServiceRate, getServiceRateValue, setNewQuote, toastAction } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { constants } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { settings } from '../../../util/settings';
import { formatCurrency, getMax, getMoneyValue } from '../../../util/util';
// import { asset } from '../../../util/util';
import ExchangeRateInput from '../../modules/exchange-rate-input/ExchangeRateInput';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import FancyToggle from '../../modules/parts/FancyToggle';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import PromoCodeField from '../../modules/promo-code-field/PromoCodeField';
import Body from './GetQuote.css';

const GetQuote = () => {

    const transfer = useSelector((state: any)=>state.transfer);
    const appValues = useSelector((state: any) => state.appValues);
    const promo = transfer.promo
    const [promoText, setPromoText] = useState("")

    const conversionRate = transfer.conversionRate;
    const toSend = transfer.toSend;
    const toReceive = transfer.toReceive;

    const serviceFee = Number(toSend.value) ? transfer.serviceFee : formatCurrency("0");
    const payInCountries = appValues.payInCountries;
    const payOutCountries = appValues.payOutCountries;
    const dispatch = useDispatch()
    const history = useHistory();
    const transferMethod = transfer.transferMethod
    const [changedInput, setChangedInput]: any = useState(null);
    const allowOperatorFee = transfer.allowOperatorFee; 
    const max  = getMax(transferMethod);

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

    useEffect(() => {
        if (!transferMethod) {
            history.replace(paths.TRANSFER_METHOD)
        }
    }, [])



    const setAllowOperatorFee = (allow: boolean) => {
        dispatch({
            type: TRANSFER, 
            payload: {
                ...transfer,
                allowOperatorFee: allow
            }
        })
    }
    const handleXInputChange = (e: any, data: any) => {        
        try {
                const caret = e.target.selectionStart
                const element = e.target
                window.requestAnimationFrame(() => {
                    element.selectionStart = caret
                    element.selectionEnd = caret
                })

        } catch ( error ) {
        }
        const value = e.target.value;

        if (value.split('.')[1]?.length > 2) {
            return;
        }

        if (isNaN(value)) {
            return
        }

        let rate = conversionRate?.rate;

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

            dispatch({
                type: TRANSFER,
                payload: {
                    ...transfer,
                    toSend: {...toSend, value: `${value}`}, 
                    toReceive: {...toReceive, value: `${value * rate}`, total: Number(value * rate) + Number(getServiceRateValue(value, transfer.transferMethod, true))}
                }
            })

        } else {
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
                    toSend: {...toSend, value: `${(value / rate).toFixed(2)}`}, 
                    toReceive: {...toReceive, value: `${value}`, total: Number(value) + Number(getServiceRateValue(value, transfer.transferMethod, true))}
                }
            })
        }
    }
    useEffect(()=>{
        getServiceRate();
    }, [transfer.toSend, transfer.allowOperatorFee, rate])

    useEffect(() => {
        getQuoteService(toSend.currency, toReceive.currency);
    }, [])

    useEffect(() => {
        setTotalValue()
    }, [promo, toSend.value, toReceive.value, serviceFee, promo?.code, rate])

    const mutateInputValueDirectly = (rate: any) => {
        if (changedInput === 'toSend') {
            toReceive.value = toSend.value * rate
        } else if (changedInput === 'toReceive'){
            toSend.value = (toReceive.value / rate).toFixed(2)
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
                        // handleXInputChange( 0 , {isSend: true})
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
                toSend: {...toSend, total: `${total}`},
                toReceive: {...toReceive, total: Number(toReceive.value) + Number(getServiceRateValue(toReceive.value, transfer.transferMethod, true))} 
            }
        })
    }

    const isAcceptablePromoValue = (promo: any) => {
        return Number(toSend.value) >= Number(promo.settings.minimumSpend)
        && Number(toSend.value) <= Number(promo.settings.maximumSpend)
        // && Math.floor(Number(toSend.value) * Number(promo.settings.rate)) === Math.floor(toReceive.value);
    }

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
        if (transferMethod === "mobile_money" && (Number(toReceive.total)) > max) {
            toastAction({
                show: true,
                type: "warning",
                timeout: 15000,
                title: "Exceeded maximum!",
                message: `The maximum transferrable amount inclusive of Mobile Operator <a href="#" class='light-green click-hover-tab'> Transfer Fees </a> for mobile money is ${formatCurrency(`${max}`)} frs
                    <div class="hover-tab">
                        <div class="tab-list"> <a href="https://mtn.cm/momo/fees" target="_blank">MTN MOMO Fees</a> </div>
                        <div class="tab-list"> <a href="https://www.orange.cm/fr/tarification-orange-money.html" target="_blank"> Orange Money Fees </a> </div>
                    </div>
                `
            })
            return
        }

        if ((transferMethod === "bank_transfer" || transferMethod === "cash_pickup") && (Number(toSend.value) + Number(serviceFee)) > max ) {
            toastAction({
                show: true,
                type: "warning",
                timeout: 15000,
                title: "Exceeded maximum!",
                message: `The maximum transferrable amount for ${transferMethod.replace('_', ' ')} is ${formatCurrency(`${max}`)} ${toSend.currency}`
            })
            return;
        }
        setNewQuote(toSend.currency, toReceive.currency);
        history.push(paths.RECIPIENT)
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
            "cash_pickup": "Cash Pick-up Partner Fee: "
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
                                <ExchangeRateInput setChangedInput={() => setChangedInput('toSend')} max={transferMethod !== constants.MOBILE_MONEY ? max : undefined} data={toSend} handleXInputChange={handleXInputChange} countries={payInCountries}/>
                            </div>
                            <div className="wrapper">
                                <div className="timeline-box">
                                    <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt=""/></i> <span className={`deep-green no-wrap ${promo?.type === "FIXED_RATE" && promoText ? "strikethrough" : ""}`} >1 {toSend.currency} = {formatCurrency(conversionRate?.rate)} {toReceive.currency}</span></span></div>
                                    <div className={`timeline timeline-2`}> <span><i><img src="./assets/icons/plus.svg" alt=""/></i> <span className={`${allowOperatorFee ? "" : "strikethrough"}`}> <div style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: getTransferFeeText(transferMethod)}}></div> <span className={`deep-green ${(promo?.type === "FREE_OPERATOR_FEE"  && isAcceptablePromoValue(promo) || !allowOperatorFee) ? "strikethrough" : ""}`}>{serviceFee} {toSend.currency}</span></span> </span></div>
                                    <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt=""/></i>  <span className="sb-charges">SB Remit charges you <span className="deep-green">0.00 {toSend.currency}</span> for this transfer </span> </span></div>
                                    {promo && <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt="" /></i>  <span>Promo code { promoText ? <span className="deep-green"> {promoText} </span> : <span className="red-txt"> *Spend btw: {promo?.settings?.minimumSpend} {toSend.currency} and {promo?.settings?.maximumSpend} {toSend.currency}  </span> }</span> </span></div>}
                                    <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt=""/></i>  <span>Total to pay <span className="deep-green">{formatCurrency(`${toSend.total}`)} {toSend.currency}</span></span></span></div>
                                    <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i> <span className="not-mobile">Transfer arrives <b>Within 30 minutes</b></span> </span></div>
                                </div>
                            </div>
                            <div className="receive" style={promo ? {marginTop: "250px"} : {}}>
                                <ExchangeRateInput setChangedInput={() => setChangedInput('toReceive')} max={transferMethod === constants.MOBILE_MONEY ? max : undefined} data={toReceive} handleXInputChange={handleXInputChange} countries={payOutCountries} />
                            </div>
                            <div className="toggle">
                                <FancyToggle label="Include operator fee" isActive={allowOperatorFee} setIsActive={() => setAllowOperatorFee(!allowOperatorFee)} />
                            </div>
                            <div className="footnote desktop-hide">SBremit charges you <b className="green-txt">0.00 {toSend.currency}</b> for this transfer</div>

                            <PromoCodeField />
                        </div>
                    </div>
                </div>
                <div className="btns"><span>Cancel</span> <button onClick={()=>handleContinue()}>Continue</button> </div>
            </div>
        </Body>
    )
}

export default GetQuote;
