import React, {useState} from 'react'
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import style from './ChangePassword.css'

const Body = style();

const ChangePassword = () => {

    const [pwNewIcon, setPwNewIcon] = useState('show');
    const [newPasswordType, setNewPasswordType] = useState('password');

    const [pwOldIcon, setPwOldIcon] = useState('show');
    const [oldPasswordType, setOldPasswordType] = useState('password');




    const handleNewPasswordClick = () => {
        setNewPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwNewIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    const handleOldPasswordClick = () => {
        setOldPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwOldIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    


    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="Change Password" subheading="Update your password from your old one" back="/profile" />
                <div className="box">
                    <div>
                        <div className="content">Enter the new password you want to access your account with</div>
                        <div className="form">
                            <div className="name">Old Password<i>*</i></div>
                            <input type={oldPasswordType} placeholder="Type your current password"/>
                            <img className="show-hide" onClick={handleOldPasswordClick} src={`./assets/icons/${pwOldIcon}.svg`} alt="show/hide"/>
                        </div>
                        <div className="form">
                            <div className="name">New Password<i>*</i></div>
                            <input type={newPasswordType} placeholder="Create your password"/>
                            <img className="show-hide" onClick={handleNewPasswordClick} src={`./assets/icons/${pwNewIcon}.svg`} alt="show/hide"/>
                        </div>
                        <div className="form">
                            <div className="name">Confirm New Password<i>*</i></div>
                            <input type={newPasswordType} placeholder="Create your password"/>
                            <img className="show-hide" onClick={handleNewPasswordClick} src={`./assets/icons/${pwNewIcon}.svg`} alt="show/hide"/>
                        </div>
                        <div className="btn"><span>Cancel</span><button>Reset</button></div>
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
                </div>

            </div>
        </Body>
    )
}

export default ChangePassword;
