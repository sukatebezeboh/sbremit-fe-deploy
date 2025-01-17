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
    placeholder?: string,
    value?: {
        code: string,
        number: string|number
    },
    onChange?: Function,
    isNotCopy?: boolean,
    isNotPaste?: boolean,
    name?: string,
    phoneCodeDisabled?: boolean,
    phoneCodeName?: string,
    isControlledComp?: boolean
    Input?: any,
    Select?: any,
    phoneCodeExternalProps?: any,
    countries?: readonly CountryType[] | any
    phoneNumberExternalProps?: any
    showBorder?: boolean
}
const input = styled.input``
const select = styled.select``
const PhoneNumberInput: FC<IPhoneNumberInput> = ({
    placeholder,
    value,
    onChange,
    isNotCopy,
    isNotPaste,
    name,
    countries = constants.COUNTRIES_PHONE_CODES,
    phoneCodeName,
    isControlledComp = true,
    Input = input,
    Select = select,
    phoneCodeExternalProps = {},
    phoneNumberExternalProps = {},
    showBorder = false
}: IPhoneNumberInput) => {
    countries.sort((a: any, b: any) => a.name.localeCompare(b.name));
    const [selected, setSelected]: any = useState(countries[0])
    const handleChange = (type: "code" | "number", val: any) => {

        if ( type === "number" && val > 99999999999999) return
        if ( type === "number" && val === '0' ) return

        const newValue = {
            ...value,
        }
        newValue[type] = val;
        if (type === 'code') {
            setSelected(constants.COUNTRIES_PHONE_CODES.find(country => country.phoneCode === val))
        }
        onChange?.(newValue)
    }

    const phoneCodeControlProps = isControlledComp ? {
        value: value?.code,
        onChange: (event: any) => handleChange('code', event.target.value)
    } : {}

    const phoneNumberControlProps = isControlledComp ? {
        value: value?.number,
        onChange: (event: any) => handleChange('number', event.target.value)
    } : {}
  return (
    <StyleWrapper>
            <div className={`phone-input-wrapper input-error-div input ${showBorder && 'selected-border-green'}`}>
                <div className="phone-code-wrapper">
                    <Select
                        className="phone-code"
                        name={ phoneCodeName || "phoneCode"}
                        id=""
                        {...phoneCodeControlProps}
                        {...phoneCodeExternalProps}
                        >
                        {countries.map(
                            (country: any) => (
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
                        onCopy={isNotCopy && ((e: any) => {
                            e.preventDefault()
                            return false
                        })}
                        onPaste={isNotPaste && ((e: any) => {
                            e.preventDefault()
                            return false
                        })}
                        {...phoneNumberControlProps}
                        {...phoneNumberExternalProps}
                    />

                </div>
    </StyleWrapper>
  )
}

export default PhoneNumberInput