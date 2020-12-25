import React from 'react'
import BaseTemplate from "./../base-template/BaseTemplate-1";
import style from './ForgotPassword.css'

const Div = style();
const ForgotPassword = () => {
    const heading = "Welcome to SBremit";
    const content = "Thank you for signing up. Please verify your email address by clicking on the button below";
    const buttonText = "Confirm my account";
    const handleBtn = () =>{
        alert();
    }

    return (
        <Div>
            <BaseTemplate heading={heading} content={content} buttonText={buttonText} handleBtn={handleBtn} />
        </Div>
    )
}

export default ForgotPassword;
