import React, { FC, useState } from 'react'
import styled from 'styled-components'
import { constants } from '../../../util/constants'
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
    onChange: Function
}

const PhoneNumberInput: FC<IPhoneNumberInput> = ({placeholder, value, onChange }: any) => {
    const [selected, setSelected]: any = useState(constants.COUNTRIES_PHONE_CODES[0])
    const handleChange = (type: "code" | "number", val: any) => {
        const newValue = {
            ...value,
        }
        newValue[type] = val;
        if (type === 'code') {
            setSelected(constants.COUNTRIES_PHONE_CODES.find(country => country.phoneCode === val))
        }
        onChange(newValue)
    }
  return (
    <StyleWrapper>
            <div className="phone-input-wrapper input">
                <div className="phone-code-wrapper">
                    <select
                    className="phone-code"
                    name="phoneCode"
                    value={value?.code}
                    onChange={(event) => handleChange('code', event.target.value)}
                    id="">
                    {constants.COUNTRIES_PHONE_CODES.map(
                        (country) => (
                        <option
                            value={country.phoneCode}>
                            {country.phoneCode} -
                            {country.name}
                        </option>
                        ),
                    )}
                    </select>
                    <img className='flag' src={asset('flags', selected?.countryCode )} alt={value?.code}/>
                </div>                
                    <input
                        className="green-txt phone-no"
                        type="text"
                        name="mobile"
                        value={value?.number}
                        onChange={(event) => handleChange('number', event.target.value)}
                        placeholder={placeholder}
                    />

                </div>
    </StyleWrapper>
  )
}

export default PhoneNumberInput