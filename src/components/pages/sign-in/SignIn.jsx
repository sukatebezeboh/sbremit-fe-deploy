import React, {useState} from "react";
import { Link } from "react-router-dom";
import style from "./../shared/auth.css";

const Body = style('sign-in');

const SignIn = () => {
    const [passwordType, setPasswordType] = useState('password');
    const [pwIcon, setPwIcon] = useState('show');

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
            </div>
            <div>
                <Link to="/"> <img src="./assets/main-logo.svg" alt=""/> </Link>
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
                            <div>Password <span className="f-pass">Forgot Password?</span></div>
                            <input type={passwordType} placeholder="Enter your password"/>
                            <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                        </div>

                        <button>Sign up</button>
                    </div>
                </div>
            </div>
        </Body>
    )
}

export default SignIn;
