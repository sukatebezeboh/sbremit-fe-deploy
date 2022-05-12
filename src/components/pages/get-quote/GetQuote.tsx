import ExchangeRateCalculator from 'components/modules/exchange-rate-calculator/ExchangeRateCalculator';
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { AppService } from 'services/AppService';
import { getQuoteService, getServiceRate, getServiceRateValue, setNewQuote, setNewTransferQuote, toastAction, updateAppValues } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { constants } from '../../../util/constants';
import { paths } from '../../../util/paths';
import { formatCurrency, getMax, getUserReferralDiscount, getValueFromArray } from '../../../util/util';
// import { asset } from '../../../util/util';
import QuoteExchangeRateInput from '../../modules/exchange-rate-input/QuoteExchangeRateInput';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import FancyToggle from '../../modules/parts/FancyToggle';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import PromoCodeField from '../../modules/promo-code-field/PromoCodeField';
import Body from './GetQuote.css';

const GetQuote = () => {

    const transfer = useSelector((state: any)=>state.transfer);
    const appValues = useSelector((state: any) => state.appValues);
    const user = useSelector((state: any) => state.auth.user);
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

    const userReferralDiscount = getUserReferralDiscount(user, appValues);

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

        updateAppValues();
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
                    // toSend: {...toSend, adjusted: value - ( (allowOperatorFee || transferMethod === "mobile_money") ? 0 : Number(getServiceRateValue(value * rate, transfer.transferMethod, false, false))), value: `${value}`}, 
                    toSend: {...toSend, adjusted: getAdjustedValue(value, value * rate, allowOperatorFee, transfer.transferMethod, false), value: `${value}`}, 
                    // toReceive: {...toReceive, value: `${value * rate}`, total: Number(value * rate) + Number(getServiceRateValue(value, transfer.transferMethod, true))},
                    // toReceive: {...toReceive, value: `${value * rate}`, total: Number(value * rate) - ( (allowOperatorFee || transferMethod === "mobile_money") ? 0 : Number(getServiceRateValue(value * rate, transfer.transferMethod, true, false))) },
                    toReceive: {...toReceive, value: `${value * rate}`, total: getAdjustedValue(value * rate, value * rate, allowOperatorFee, transfer.transferMethod, true) },
                    referralDiscount: {
                        value: userReferralDiscount?.value,
                        type: userReferralDiscount?.type
                    }
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
                    // toSend: {...toSend, adjusted: (value / rate) - ( (allowOperatorFee || transferMethod === "mobile_money") ? 0 : Number(getServiceRateValue(value, transfer.transferMethod, false, false))), value: `${(value / rate).toFixed(2)}`}, 
                    toSend: {...toSend, adjusted: getAdjustedValue(value/rate, value, allowOperatorFee, transfer.transferMethod, false), value: `${(value / rate).toFixed(2)}`}, 
                    toReceive: {...toReceive, value: `${value}`, total: getAdjustedValue(value, value, allowOperatorFee, transfer.transferMethod, true)},
                    // toReceive: {...toReceive, value: `${value}`, total: Number(value) - ( (allowOperatorFee || transferMethod === "mobile_money") ? 0 : Number(getServiceRateValue(value, transfer.transferMethod, true, false)))},
                    // toReceive: {...toReceive, value: `${value}`, total: Number(value)},
                    referralDiscount: {
                        value: userReferralDiscount?.value,
                        type: userReferralDiscount?.type
                    }
                }
            })
        }
    }
    useEffect(()=>{
        getServiceRate();
    }, [transfer.toSend, transfer.allowOperatorFee, rate])

    useEffect(() => {
        getQuoteService(toSend.currency, toReceive.currency);
    }, [toSend.currency, toReceive.currency])

    useEffect(() => {
        setTotalValue()
    }, [promo, toSend.value, toReceive.value, transferMethod, serviceFee, promo?.code, rate, userReferralDiscount?.value])

    const mutateInputValueDirectly = (rate: any) => {
        if (changedInput === 'toSend') {
            toReceive.value = toSend.value * rate
        } else if (changedInput === 'toReceive'){
            toSend.value = (toReceive.value / rate).toFixed(2)
        } else {

        }
    }

    const setTotalValue = () => {
        let total = Number(toSend.value) + Number(serviceFee) - Number(userReferralDiscount?.value);

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
                // toSend: {...toSend, adjusted: toSend.value - ( (allowOperatorFee || transferMethod === "mobile_money") ? 0 : Number(getServiceRateValue(toReceive.value, transfer.transferMethod, false, false))), total: `${total}`},
                toSend: {...toSend, adjusted: getAdjustedValue(toSend.value, toReceive.value, allowOperatorFee, transfer.transferMethod, false), total: `${total}`},
                // toReceive: {...toReceive, total: Number(toReceive.value) + Number(getServiceRateValue(toReceive.value, transfer.transferMethod, true))},
                toReceive: {...toReceive, total: getAdjustedValue(toReceive.value, toReceive.value, allowOperatorFee, transfer.transferMethod, true)},
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
        && Number(toSend.value) <= Number(promo.settings.maximumSpend)
        // && Math.floor(Number(toSend.value) * Number(promo.settings.rate)) === Math.floor(toReceive.value);
    }

    const handleContinue = () => {
        if ( Number(toSend.total) <= 0) {
            toastAction({
                name: "no-value-sent",
                show: true,
                type: "warning",
                timeout: 10000,
                message: "You can't send "+(formatCurrency(toSend.total) || '0.00')+ " "+toSend.currency
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
        setNewQuote(toSend.currency, toReceive.currency, () => history.push(paths.RECIPIENT) );
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


    const setTransferMethod = (method: string) => {
        dispatch({type: TRANSFER, payload: {...transfer, transferMethod: method}})
    }

    const calculatorProps = {
        page: 'quote',
        setTransferMethod,
        selectedTransferMethod: transferMethod,
        toSend,
        changedInput,
        setChangedInput,
        handleXInputChange,
        max,
        payInCountries,
        promo,
        isAcceptablePromoValue,
        conversionRate,
        transfer,
        allowOperatorFee,
        promoText,
        toReceive,
        getTransferFeeText,
        setAllowOperatorFee,
        payOutCountries,
        user,
        userReferralDiscount,
        ExchangeRateInput: QuoteExchangeRateInput
    }

    return (
        <Body>
            <NavBar />
            <ProgressBar />
            <div className="page-content">
                <PageHeading heading="Get quote" subheading="How much would you like to send to your recipient?" back="/transfer-method" />
                <div className="box">
                    <ExchangeRateCalculator {...calculatorProps} />
                </div>
                <div className="btns"><span>Cancel</span> <button onClick={()=>handleContinue()}>Continue</button> </div>
            </div>
        </Body>
    )


}

export default GetQuote;
