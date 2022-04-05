import { InputAdornment, TextField } from '@mui/material'
import React from 'react'
import PhoneCodeSelect from './PhoneCodeSelect'
import styled from 'styled-components'

const StyleWrapper = styled.div`
    .phone-number-input {
        /* border: 1px solid green;
        height: fit-content; */
        border: 1px solid rgba(0, 123, 93, 0.6);;
        width: 100%;
        border-radius: 6px;
        /* padding-top: 2px;
        padding-bottom: 2px; */

        .MuiInput-root {
            &::before {
                display: none;
            }
            ::after {
                display: none;
            }

            input {
                height: 42px;
            }
        }

        .phone-code-field {
            width: 150px;
            border: none;
            /* border-right: 1px solid rgba(0, 123, 93, 0.6); */
            /* padding: 0px 10px; */
            /* position: absolute; */
            padding: 0;
            * {
                padding: 0;
                border: none;
            }
            .MuiAutocomplete-endAdornment {
                left: 60%;
                margin-left: 0px;
            }
            .phone-code-input {
                border: none;
                input {
                    border: none;
                    padding: 0px 20px 0px 20px;
                    border-right: 1px solid rgba(0, 123, 93, 0.6);
                    width: 60px;
                }
            }
        }
    }

`
const PhoneNumberInput = ({placeholder}: any) => {
  return (
    <StyleWrapper>
        <TextField
            id="input-with-icon-textfield"
            className='phone-number-input'
            placeholder={placeholder}
            type="number"
            InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <PhoneCodeSelect />
                </InputAdornment>
            ),
            }}
            variant="standard"
        />
    </StyleWrapper>
  )
}

export default PhoneNumberInput