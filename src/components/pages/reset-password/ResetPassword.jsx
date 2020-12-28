import React, {useState} from 'react'
import SBRemitLogo from '../../ui-components/sbremit-logo/SBRemitLogo'
import style from './ResetPassword.css'

const Body = style();

const ResetPassword = () => {
    const [pwIcon, setPwIcon] = useState('show');
    const [passwordType, setPasswordType] = useState('password');


    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    return (
        <Body>
            <div>
                <SBRemitLogo />
                <div className="heading">Reset Password</div>
                <div className="content">Enter the new password you want to access your account with</div>
                <div className="form">
                    <div className="name">New Password<i>*</i></div>
                    <input type={passwordType} placeholder="Create your password"/>
                    <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                </div>
                <div className="form">
                    <div className="name">Confirm New Password<i>*</i></div>
                    <input type={passwordType} placeholder="Create your password"/>
                    <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                </div>
                <div className="btn"><button>Reset</button></div>
                <div className="footer">Remember your password? <span>Try Logging in</span></div>
            </div>
            <div className="text">
                <div>To protect your account the password must contain at least:</div>
                <ul>
                    <li>1 uppercase letter (A-Z)</li>
                    <li>1 lowercase letter (a-z)</li>
                    <li>1 number (0-9)</li>
                    <li>8 characters</li>
                </ul>
            </div>
        </Body>
    )
}

export default ResetPassword;
