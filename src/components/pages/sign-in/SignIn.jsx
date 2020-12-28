import React, {useState} from "react";
import { Link, useHistory } from "react-router-dom";
import style from "./../shared/auth.css";
import ForgotPasswordModal from '../../ui-components/forgot-password-modal/ForgotPasswordModal';
import SBRemitLogo from "../../ui-components/sbremit-logo/SBRemitLogo";


const Body = style('signin');

const SignIn = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [pwIcon, setPwIcon] = useState('show');
    const [showModal, setShowModal] = useState(false);
    const history = useHistory();

    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    const handleForgotPassword = () => setShowModal(true);
    const handleSignIn = () => history.push('/dashboard');

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

                        <button onClick={handleSignIn}>Sign in</button>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default SignIn;
