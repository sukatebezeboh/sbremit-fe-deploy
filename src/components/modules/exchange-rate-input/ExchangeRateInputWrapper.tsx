import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getNewQuote } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { formatCurrencyWithoutFloats } from '../../../util/util';

const Field = styled.div`
        .max-div {
            position: absolute;
            margin-top: -35px;
            right: 0;
            color: #007B5D;
            font-weight: bolder;
            width: fit-content;
            white-space: nowrap;
            .max-value {
                font-weight: lighter;
            }
            @media only screen and (max-width: 900px) { 
                margin-top: -25px;
            }
        }
        .countries-dropdown {
            position: absolute;
            right: 0;
            top: 50px;
            background: #fff;
            box-shadow: 1px 2px 5px lightgray;
            padding: 10px ;
            z-index: 2;
            border-radius: 10px;
            max-height: 300px;
            overflow-y: scroll;
            ::-webkit-scrollbar {
                width: 5px;
            }

            ::-webkit-scrollbar-track {
                border-radius: 10px;
            }

            ::-webkit-scrollbar-thumb {
                border-radius: 10px;
                -webkit-box-shadow: inset 0 0 6px grey;
                box-shadow: inset 0 0 6px grey;
            }
            ul {
                list-style-type: none;
                padding: 0px;
                li {
                    font: normal normal normal 20px Montserrat;
                    color: grey;
                    padding: 5px 30px;
                    white-space: nowrap;
                    cursor: pointer;
                    &:hover {
                        background: #f8fcfb;
                    }
                }
            }
        }
        .x-input{
            border: 1.5px solid #7FBCAD;
            border-radius: 8px;
            width: 100%;
            padding: 13px 20px;
            margin-top: 30px;
            display: grid;
            grid-template-columns: 3fr 1fr;
            background: #fff;
            .you-send{
                font: normal normal normal 15px/19px Montserrat;
                color: lightgray;
            }
            >div{
                >input{
                    font: normal normal normal 300 25px/30px Montserrat;
                    width: 100%;
                    border: none;
                    outline: none;
                    /* color: #007B5D; */
                    @media only screen and (max-width: 900px) { 
                        width: 120px;
                    }
                }
            }
            >div.flg-drp{
                margin: 0px;
                position: relative;
                cursor: pointer;
                span{
                    display: inline-block;
                }
                >img{
                    box-shadow: 0px 3px 6px #00000029;
                    width: 40px;
                    height: 40px;    
                    border-radius: 50%;   
                    margin: 5px 10px;
                }
                .data-c{
                    font: normal normal 300 25px/30px Montserrat;
                    color: #424242;
                    margin-right: 23px;
                    margin-top: 8px;
                    text-transform: uppercase;
                }
                .span-angle{
                    font-size: 25px;
                    color: #007B5D;
                    margin-top: 10px;
                    img{
                        height: 17px;
                        width: 23px;
                    }
                }
            }
        }
`

const ExchangeRateInputWrapper = (props: any) =>{
    const {data, handleXInputChange, max, countries, setChangedInput, LayoutComponent} = props;
    const [countriesDropDownOpen, setCountriesDropDownOpen] = useState(false);
    const dispatch = useDispatch();
    const transfer = useSelector((state: any) => state.transfer)
    const appValues = useSelector((state: any) => state.appValues)
    const inputRef = useRef<HTMLInputElement>(null);

    const userDefaultCountry = Object.keys(countries)[0];
    useEffect(() => {
        if (userDefaultCountry && data.isSend) {
            handleCountrySelection(userDefaultCountry);
        }
    }, [userDefaultCountry])

    const handleCountrySelection = (country: string) => {
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
        getNewQuote();
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
