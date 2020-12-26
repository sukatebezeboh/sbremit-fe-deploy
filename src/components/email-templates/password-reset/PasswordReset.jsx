import React from 'react'
import BaseTemplate from "../base-template/BaseTemplate-1";
import { useHistory } from "react-router-dom";

const PasswordReset = () => {
    const heading = "Password Reset";
    const content = "A password reset was requested for this account, click the button below to create a new password. The link expires 24 hours after you have received ithis email.";
    const buttonText = "Reset my password";
    const history = useHistory();
    const handleBtn = () =>{
        history.push('/reset-password')
    }

    return (
        <BaseTemplate heading={heading} content={content} buttonText={buttonText} handleBtn={handleBtn} />
    )
}

export default PasswordReset;
