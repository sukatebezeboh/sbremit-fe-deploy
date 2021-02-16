import React from 'react'
import { useSelector } from 'react-redux'
import ButtonLoader from '../button-loader/ButtonLoader'
import styled from 'styled-components'

const Button = styled.button`
        align-items: center;
        display: inline-grid;
        text-align: center;
        padding-left: 20px !important;
        padding-right: 20px !important;
        span{
            display: inline-block;
            width: 100%;
            text-align: center;
        }
`

const FormButton = ({label, formName}: any) => {
    const submitting = useSelector((state: any) => state.submitting)

    return (
        <Button type="submit" className={submitting === formName ? "grid-col-1-0" : ""} disabled={submitting === formName}> <span> {label} </span> { submitting === formName && <ButtonLoader/>} </Button>
    )
}

export default FormButton
