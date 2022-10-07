import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getNewQuote } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';

const ExchangeRateInputWrapper = (props: any) =>{
    const {data, handleXInputChange, max, countries, setChangedInput, LayoutComponent} = props;
    const [countriesDropDownOpen, setCountriesDropDownOpen] = useState(false);
    const dispatch = useDispatch();
    const transfer = useSelector((state: any) => state.transfer)
    const user = useSelector((state: any) => state.auth.user)
    const appValues = useSelector((state: any) => state.appValues)
    const inputRef = useRef<HTMLInputElement>(null);

    const userDefaultCountry = Object.keys(countries)[0];
    useEffect(() => {
        if (user && userDefaultCountry && data.isSend) {
            handleCountrySelection(userDefaultCountry, (user && data.currency !== transfer.toSend.currency));
        }
    }, [userDefaultCountry, transfer.toSend.currency])

    const handleCountrySelection = (country: string, updateQuote = true) => {
        if (!country) return;
        const countriesList = appValues.countries;
        countriesList.EU = "European Union"
        const countryKey =  Object.keys(countriesList).find(key => countriesList[key] === country);
        if (data.isSend) {
            dispatch({
                type: TRANSFER,
                payload: {
                    ...transfer,
                    toSend: {...data, currency: countries[country], image: countryKey, countryCode: countryKey},
                }
            })
        }
        else {
            dispatch({
                type: TRANSFER,
                payload: {
                    ...transfer,
                    toReceive: {...data, currency: countries[country], image: countryKey, countryCode: countryKey},
                }
            })
        }
        setCountriesDropDownOpen(false)
        updateQuote && getNewQuote();
        triggerInputChange()
    }

    const triggerInputChange = () => {
        inputRef.current?.dispatchEvent( new Event( 'change', {bubbles: true} ) );
    }

    const propsBundle = {data, max, inputRef, setCountriesDropDownOpen, countriesDropDown: countriesDropDownOpen, handleXInputChange, setChangedInput, countries, handleCountrySelection }

    return (
        <LayoutComponent {...propsBundle} />
    )
}

export default ExchangeRateInputWrapper;
