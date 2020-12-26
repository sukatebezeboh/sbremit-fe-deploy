import React, {useState} from "react";
import { Link } from "react-router-dom";
import style from "./../shared/auth.css";
import ForgotPasswordModal from './../../ui-components/ForgotPasswordModal';
import SBRemitLogo from "../../ui-components/SBRemitLogo";


const Body = style('sign-in');

const SignIn = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [pwIcon, setPwIcon] = useState('show');
    const [showModal, setShowModal] = useState(false);

    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    const handleForgotPassword = () => setShowModal(true);

    return (
        <Body>
            <div>
            </div>
            <ForgotPasswordModal show={showModal} setShow={setShowModal} />
            <div>
                <SBRemitLogo />
                <div className="form">
                    <div className="heading">Welcome back!</div>
                    <div className="sub-heading">New to SBremit? <Link to="/sign-up"><span>Sign up</span></Link> </div>
                    <div className="inputs">
                        <div></div>
                        <div className="email">
                            <div>Email</div>
                            <input type="text" placeholder="Your email address" />
                        </div>
                        <div>
                            <div>Password <span className="f-pass" onClick={handleForgotPassword}>Forgot Password?</span></div>
                            <input type={passwordType} placeholder="Enter your password"/>
                            <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                        </div>

                        <button>Sign in</button>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default SignIn;
