import React from 'react'
import { asset, formatCurrencyWithoutFloats } from '../../../../util/util'
import styled from 'styled-components'
import { countriesAndCodes, countriesTransferMethodAvailability } from 'util/constants'
import { useSelector } from 'react-redux'

const Field = styled.div`
        margin: 0px 16px;
        .text { 
            font-weight: 400;
            font-size: 12px;
            line-height: 15px;
            letter-spacing: 0.04em;
            color: #A3A3A3;
        }

        .input-container { 
            display: grid;
            grid-template-columns: 1fr 0fr;
            grid-gap: 10px;

            .input-wrapper { 
                display: grid;
                grid-template-columns: 1fr 0fr;
                input.exchange { 
                    border: none;
                    border-bottom: 0.5px solid rgba(0, 123, 93, 0.42);
                    width: 100%;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 20px;
                    letter-spacing: 0.04em;
                    color: #0A0E0D;
                    outline: none;
                }

                .arrow { 
                    position: relative;
                    top: 12px;
                    width: 24px;
                    height: 24px;
                }
            }

            .currency-selector-wrapper {
                .currency-selector { 
                    min-width: 123px;
                    display: grid;
                    grid-template-columns: 0fr 1fr 0fr;
                    grid-gap: 8px;
                    border-bottom: 1px solid rgba(0, 123, 93, 0.42);;
                    padding: 5px 10px 3px 5px;
                    cursor: pointer;
                    img.currency-flag { 
                        width: 23px;
                        height: 16px;
                    }

                    .selected-currency { 
                        font-weight: 400;
                        font-size: 16px;
                        line-height: 20px;
                        letter-spacing: 0.04em;
                        color: #0A0E0D;
                    }

                    .caret-down { 
                        width: 24px;
                        height: 24px;
                    }
                }
                .countries-dropdown-wrapper {
                    .countries-dropdown {
                        width: 100%;
                        float: right;
                        position: absolute;
                        background: white;
                        width: fit-content;
                        padding: 10px 0px;
                        border: 1px solid lightgrey;
                        border-radius: 5px;
                        z-index: 1;
                        ul {
                            padding: 0;
                            margin: 0;
                            list-style: none;
                            li {
                                padding: 10px 20px;
                                cursor: pointer;

                                &:hover {
                                    background: #007b5c25;
                                    color: #007B5D;
                                }
                            }
                        }
                    }
                }

            }

        }

        .message-block {
            min-height: 12px;
            font-size: 12px;
        }

`

const LandingPageLayout = ({data, max, inputRef, setCountriesDropDownOpen, countriesDropDown, handleXInputChange, setChangedInput, countries, handleCountrySelection }: any) => {
  const transfer = useSelector((state: any)=>state.transfer);
  console.log(data.value);

  return (

    <Field className="exchange-rate-input">
        <div className="text">
            
            {data?.isSend ? 'YOU SEND': 'THEY GET'}
        </div>

        <div className="input-container">
            <div className="input-wrapper">
                <input type="text" placeholder='0.00' className="exchange"  autoComplete='off' ref={inputRef} name={data?.currency +'_'+ window.location.href} key={data?.currency +'_'+ window.location.href} 
                value={(data.isSend ? (data?.value || "") : Math.round(data?.value)) || ""} 
                onChange={(e) => {handleXInputChange(e, data); setChangedInput(); }} />
                <img src={asset('icons', 'rate-up-arrow.svg')} alt="" className="arrow" />
            </div>
            <div className="currency-selector-wrapper">
                <div className="currency-selector" onClick={() => setCountriesDropDownOpen(!countriesDropDown)} >
                    <img src={asset('flags', `${data?.image}.png`)} alt="" className="currency-flag" />
                    <div className="selected-currency">
                        {data?.currency}
                    </div>
                    <img src={asset('icons', 'black-caret-down.svg')} alt="caret-down" className="caret-down" />
                </div>
                {
                    countriesDropDown &&
                    <div className="countries-dropdown-wrapper">
                        <div className="countries-dropdown">
                            <ul>
                                {
                                    Object.keys(countries).map(country => {
                                        const countryCode: any = countriesAndCodes.find(_country => _country.name === country)?.countryCode
                                        const isAvailableCountry = countriesTransferMethodAvailability[countryCode]?.[transfer.transferMethod]
                                       return <li className={`${isAvailableCountry === false && 'is-unavailable-option'}`} onClick={() => handleCountrySelection(country)}>{country}</li>
                                    })
                                }
                            </ul>
                        </div>
                    </div>
                }
            </div>

        </div>
        <div className="message-block">
            {
                max && <span className={`max-div ${(max && Number(data?.total) > Number(max)) ? 'red-txt' : ''}`}> {(max && Number(data?.total) > Number(max)) ?  <span className="max-value"> Maximum {formatCurrencyWithoutFloats(max)} {data?.currency} allowed at a time </span> : '' } </span>
            }
        </div>
    </Field>
  )
}

export default LandingPageLayout