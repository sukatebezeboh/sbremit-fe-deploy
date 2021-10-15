import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { TRANSFER } from '../../../redux/actionTypes';
import { formatCurrency, formatCurrencyWithoutFloats } from '../../../util/util';

const Field = styled.div`
        .max-div {
            position: absolute;
            margin-top: -35px;
            right: 0;
            color: #007B5D;
            font-weight: bolder;
            .max-value {
                font-weight: lighter;
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
            }
            >div{
                >input{
                    font: normal normal normal 300 25px/30px Montserrat;
                    width: 100%;
                    border: none;
                    outline: none;
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

const ExchangeRateInput = (props: any) =>{
    const {data, handleXInputChange, max, countries} = props;
    const [countriesDropDown, setCountriesDropDown] = useState(false);
    const dispatch = useDispatch();
    const transfer = useSelector((state: any) => state.transfer)
    const appValues = useSelector((state: any) => state.appValues)


    const handleCountrySelection = (country: string) => {
        const countriesList = appValues.countries;
        const countryKey =  Object.keys(countriesList).find(key => countriesList[key] === country);
        if (data.isSend) {
            dispatch({
                type: TRANSFER, 
                payload: {
                    ...transfer,
                    toSend: {...transfer.toSend, currency: countries[country], image: countryKey},
                }
            })
        }
        else {
            dispatch({
                type: TRANSFER,
                payload: {
                    ...transfer,
                    toReceive: {...transfer.toReceive, currency: countries[country], image: countryKey},
                }
            })
        }
        setCountriesDropDown(false)
    }

    useEffect(() => {
        console.count('toReceive');
        console.log(data.isSend, data.value, "toReceive")
    }, [transfer.toReceive.value]);

    useEffect(() => {
        console.count('data')
        console.log(data.isSend, data.value, "data")
    }, [data]);
       return (
        <Field key={data?.currency +'-field-'+ window.location.pathname}>
            <div className={`x-input ${(max && data?.value > max) ? 'selected-border-yellow' : ''}`}>
                <div className="xi-1">
                    <div className="grey-txt you-send">{data?.isSend ? 'You send': 'They get'}</div>
                    <input name={data?.currency +'_'+ window.location.href} key={data?.currency +'_'+ window.location.href} type="text" value={data.isSend ? formatCurrency(data?.value) : formatCurrencyWithoutFloats(Math.round(data?.value))} onChange={(e) => {handleXInputChange(e, data)}}/>
                </div>
                <div  className="flg-drp">
                    {
                        // max && <span className="float-right max-div">Max: <span className="max-value">{max} GBP</span> </span>
                    }
                    <img onClick={() => setCountriesDropDown(!countriesDropDown)} src={`./assets/flags/${data?.image}.png`} alt={data?.currency}/>
                    <span onClick={() => setCountriesDropDown(!countriesDropDown)} className="data-c">{data?.currency}</span>
                    <span onClick={() => setCountriesDropDown(!countriesDropDown)} className="span-angle"><img src="./assets/icons/angle-down.svg" alt=""/></span>
                    {
                        countriesDropDown &&
                        <div className="countries-dropdown">
                            <ul>
                                {
                                    Object.keys(countries).map(country => (
                                        <li onClick={() => handleCountrySelection(country)}>{country}</li>
                                    ))
                                }
                            </ul>
                        </div>
                    }
                </div>
                
            </div>
        </Field>
        )
}

export default ExchangeRateInput;
