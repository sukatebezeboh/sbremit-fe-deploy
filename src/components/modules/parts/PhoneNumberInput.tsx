import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { constants, CountryType } from '../../../util/constants'
import { asset } from '../../../util/util'

const StyleWrapper = styled.div`
    .phone-input-wrapper {
        display: flex;
        width: 100%;
        height: 50px;
        padding: 0!important;


        .phone-code-wrapper {
            position: relative;
            margin-left: 10px;
            select.phone-code {
                width: 60px;
                height: 100%;
                border: none;
                background: transparent;
                color: black;
                padding: 10px 30px;
                cursor: pointer;
                outline: none;
                option {
                    color: rgba(0, 123, 93, 0.6);
                }
            }

            img.flag {
                width: 30px;
                height: 25px;
                position: absolute;
                top: 10px;
                left: 5px;
                pointer-events: none;
            }            
        }
        input.phone-no {
            height: 100%;
            width: 100%;
            margin-left: 10px;
            border: none;
            outline: none;
            background: transparent;
            border-left: 1px solid rgba(0, 123, 93, 0.6);
            padding: 0 15px;
        }

    }

`
interface IPhoneNumberInput {
    placeholder: string,
    value: {
        code: string,
        number: string|number
    },
    onChange: Function,
    name?: string,
    phoneCodeDisabled?: boolean,
    phoneCodeName?: string,
    phoneCodeIsControlledComp?: boolean
    Input?: any,
    Select?: any,
    phoneCodeExternalProps?: any,
    countries?: readonly CountryType[]
    phoneNumberExternalProps?: any
}
const input = styled.input``
const select = styled.select``
const PhoneNumberInput: FC<IPhoneNumberInput> = ({
    placeholder, 
    value, 
    onChange, 
    name, 
    countries = constants.COUNTRIES_PHONE_CODES,
    phoneCodeName, 
    phoneCodeIsControlledComp = true, 
    Input = input, 
    Select = select,
    phoneCodeExternalProps = {},
    phoneNumberExternalProps = {}
}: IPhoneNumberInput) => {
    const [selected, setSelected]: any = useState(constants.COUNTRIES_PHONE_CODES[0])
    const handleChange = (type: "code" | "number", val: any) => {
        console.log(type, val)
        if ( type === "number" && val > 99999999999999) return
        if ( type === "number" && val === '0' ) return

        const newValue = {
            ...value,
        }
        newValue[type] = val;
        if (type === 'code') {
            setSelected(constants.COUNTRIES_PHONE_CODES.find(country => country.phoneCode === val))
        }
        onChange(newValue)
    }

    const phoneCodeControlProps = phoneCodeIsControlledComp ? {
        value: value?.code,
        onChange: (event: any) => handleChange('code', event.target.value)
    } : {}

    const phoneNumberControlProps = phoneCodeIsControlledComp ? {
        value: value?.number,
        onChange: (event: any) => handleChange('number', event.target.value)
    } : {}
  return (
    <StyleWrapper>
            <div className="phone-input-wrapper input-error-div input">
                <div className="phone-code-wrapper">
                    <Select
                        className="phone-code"
                        name={ phoneCodeName || "phoneCode"}
                        id=""
                        {...phoneCodeControlProps}
                        {...phoneCodeExternalProps}
                        >
                        {countries.map(
                            (country) => (
                            <option
                                value={country.phoneCode}>
                                {country.phoneCode} -
                                {country.name}
                            </option>
                            ),
                        )}
                    </Select>
                    <img className='flag' src={asset('flags', selected?.countryCode )} alt={value?.code}/>
                </div>                
                    <Input
                        className="green-txt phone-no"
                        type="number"
                        name={name || "mobile"}
                        placeholder={placeholder}
                        {...phoneNumberControlProps}
                        {...phoneNumberExternalProps}
                    />

                </div>
    </StyleWrapper>
  )
}

export default PhoneNumberInput