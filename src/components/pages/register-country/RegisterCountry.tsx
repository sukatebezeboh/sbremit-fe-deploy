import { Checkbox, FormControlLabel, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material'
import CountrySelect from 'components/modules/parts/CountrySelect'
import PhoneNumberInput from 'components/modules/parts/PhoneNumberInput'
import { themeNames } from 'components/modules/toast-factory/themes'
// import AccountCircle from '@mui/icons-material/AccountCircle';

import React from 'react'
import { useHistory } from 'react-router-dom'
import { registerCountry, stackNewToast, toastAction } from 'redux/actions/actions'
import styled from 'styled-components'
import { paths } from 'util/paths'
import { asset } from '../../../util/util'

const Page = styled.div`
    width: 50%;
    min-width: 300px;
    margin: auto;
    .top-line { 
        
        position: absolute;
        width: 100%;
        left: 0;
        top: 0;
        padding: 50px 10%;
        .close-x { 
            display: flex;
            gap: 16px;
            float: right;
            cursor: pointer;
            .x {
                font-size: 40px;
                width: 16px;
                height: 16px;
            }

            .text { 
                font-weight: 400;
                font-size: 18px;
                line-height: 21px;
                color: #000000;
                margin-top: 22px;
            }
        }
    }

.container { 
    margin: auto;
    margin-top: 150px;
    max-width: 600px;
    .logo-line { 
        margin: 50px auto;
        img { 
            width: 200px;
            display: block;
            margin: auto;
        }
    }

    .summary { 
        text-align: center;
        /* font-family: 'Faro'; */
        font-style: normal;
        font-weight: 300;
        font-size: 24px;
        line-height: 32px;
        /* or 133% */

        text-align: center;

        color: #0A0E0D;
        margin: 50px auto;
    }

    .form { 
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 20px 16px;
        .input-wrapper { 
            width: 100%;
            .input { 
                border: 1px solid rgba(0, 123, 93, 0.6);
                box-sizing: border-box;
                border-radius: 6px;
                font-weight: 400;
                font-size: 14px;
                /* line-height: 21px; */
                color: rgba(66, 66, 66, 0.8);
                padding: 10px 16px;
                width: 100%;
                height: 50px;
                background: transparent;
            }

            &.country-select {
                fieldset {
                    border-color: rgba(0, 123, 93, 0.6);
                }
            }

            .bottom-message-block {
                font-weight: 400;
                font-size: 12px;
                line-height: 21px;
                color: rgba(66, 66, 66, 0.8);

            }
        }

        .span-2-col { 
            grid-column: 1/3;
            .input-wrapper { 

                phonenumberinput { 

                }
            }
        }

        .form-section-title { 
            /* font-weight: 500; */
            font-size: 14px;
            line-height: 21px;
            margin-top: 16px;
            color: #424242;
        }

        .selections { 
            font-weight: 400;
            font-size: 14px;
            line-height: 21px;
            color: rgba(66, 66, 66, 0.8);
            .MuiRadio-root {
                width: 45px;
                height: 45px;

                svg {
                    width: 100%;
                    height: 100%;
                }
            }

        }

        .receive-updates { 
            font-weight: 400;
            font-size: 12px;
            line-height: 21px;
        }

        .submit-btn { 
            background: #FDDB3A;
            border-radius: 6px;
            border: none;
            width: 100%;
            padding: 12px;
            font-weight: 500;
            font-size: 14px;
            line-height: 21px;
            color: #000000;
            cursor: pointer;
            margin-top: 45px;
        }
    }
}

`

const RegisterCountry = () => {

    
    const [values, setValues]: any = React.useState({
        aim: "send",
        receiveUpdates: false,
        residence: "",
        suggestedCountry: ""
    });
    const [errors, setErrors]: any = React.useState({});

    const history = useHistory();

    const requiredValues: any = {
        aim: "Tell us what you would like to do",
        residence: "Telling us where you are helps us make decisions",
        suggestedCountry: "Add a country",
        name: "Name field is required",
        email: "Email field is required"
    }

    const handleChange = (key: string, value: any) => {
        const newValues = {
            ...values
        }

        const newErrors = {
            ...errors
        }
        if (!value) {
            newErrors[key] = requiredValues[key]
        } else {
            newErrors[key] = ""
        }
        setErrors(newErrors)

        newValues[key] = value
        setValues(newValues);
    };
    
    const handleSubmit = (event: any) => {
        event.preventDefault();
    
        const newErrors: any = {};
        for (const key in requiredValues) {
            if (!values[key]) {
                newErrors[key] = requiredValues[key]
            }
        }
        setErrors(newErrors)
        console.log(errors, values)
        if (!(Object.keys(newErrors)).length) {
            registerCountry(values)
        } else {
            stackNewToast({
                name: "register-country-form-error",
                show: true,
                type: 'error',
                timeout: 5000,
                defaultThemeName: themeNames.CLEAR_MAMBA,
                title: "You have errors in your form",
                message: "<div style='color: grey;'>Please fill all required fields to proceed</div>",
            })
        }
    };
  
  return (
    <Page>
        <div className="top-line">
            <div className="close-x" onClick={() => history.push(paths.LANDING)}>
                <span className="x"> <img src={asset('icons', 'close-x.svg')} alt="close-x" /> </span>
                <span className="text">Close</span>
            </div>
        </div>

        <div className="container">
            <div className="logo-line">
                <img src={asset('', 'main-logo.svg')} alt="SBRemit" />
            </div>    

            <div className="summary">
                We are constantly adding more countries to the list. Register your interest
            </div>        

            <div className="form">
                <div className="input-wrapper">
                    <input type="text" value={values.name} onChange={(event) => handleChange('name', event.target.value)} className='input' placeholder='Name' />
                    <div className="bottom-message-block red-txt">
                            {errors.name}
                    </div>
                </div>

                <div className="input-wrapper">
                    <input name="email" type="email" value={values.email} onChange={(event) => handleChange('email', event.target.value)} className='input' placeholder='Email' />
                    <div className="bottom-message-block red-txt">
                            {errors.email}
                    </div>
                </div>
                
                <div className=" span-2-col">
                    <div className="input-wrapper">


                        <PhoneNumberInput 
                            placeholder="Your phone number without the leading zero or country code"
                            value={values.phone} 
                            onChange={(value: any) => handleChange('phone', value)}
                            />

                        <div className="bottom-message-block red-txt">
                            {errors.phone}
                        </div>
                    </div>
                </div>

                <div className=" span-2-col">
                    <div className="input-wrapper country-select">
                        <CountrySelect
                            placeholder="Country of residence"
                            value={values.residence}
                            onChange={(event: any) => handleChange('residence', event.target.textContent)}
                        />

                        <div className="bottom-message-block red-txt">
                            {errors.residence}
                        </div>
                    </div>
                </div>

                <div className="span-2-col">
                    <div className="input-wrapper country-select red-txt">
                        <CountrySelect
                            placeholder="Suggest a country"
                            value={values.suggestedCountry}
                            onChange={(event: any) => handleChange('suggestedCountry', event.target.textContent)}
                        />
                        <div className="bottom-message-block red-txt">
                            {errors.suggestedCountry}
                        </div>
                    </div>
                </div>

                <div className="form-section-title bold span-2-col">What do you want to do?</div>

                <div className="selections span-2-col">
                    <RadioGroup
                        aria-labelledby="demo-error-radios"
                        name="aim"
                        value={values.aim}
                        onChange={(event) => handleChange('aim', event.target.value)}
                    >
                        <FormControlLabel value="send" control={<Radio color='success' />} label="I want to send money to this country." />
                        <FormControlLabel value="receive" control={<Radio color='success' />} label="I want to receive money from this country." />
                    </RadioGroup>

                    <div className="bottom-message-block red-txt">
                            {errors.aim}
                    </div>
                </div>

                <div className="receive-updates span-2-col">
                    <FormControlLabel
                    value={values.receiveUpdates}
                    control={<Checkbox
                        checked={values.receiveUpdates}
                        onChange={(event) => handleChange('receiveUpdates', !values.receiveUpdates)}
                        inputProps={{ 'aria-label': 'controlled' }}
                        
                    />}
                    label="Receive updates on countries we remit money to, add and more"
                    labelPlacement="end"
                    />
                </div>

                <button className="submit-btn span-2-col" onClick={handleSubmit}>Submit</button>
            </div>
        </div>

    </Page>
  )
}

export default RegisterCountry