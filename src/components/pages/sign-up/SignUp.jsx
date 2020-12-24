import React, {useState} from "react";
import { Link } from "react-router-dom";
import style from "./../shared/auth.css";

const Body = style('sign-up');

const SignUp = () => {
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
                <Link to="/"><img src="./assets/main-logo.svg" alt=""/></Link>
                <div className="form">
                    <div className="heading">Create an account. It’s free!</div>
                    <div className="sub-heading">Already have an account? <Link to="/sign-in"><span>Sign in</span></Link> </div>
                    <div className="inputs">
                        <div>
                            <div>
                                <div>First Name<i>*</i></div>
                                <input type="text" placeholder="John" />
                            </div>
                            <div></div>
                            <div>
                                <div>Last Name<i>*</i></div>
                                <input type="text" placeholder="Doe"/>
                            </div>
                        </div>
                        <div>
                            <div>Country of Residence<i>*</i></div>
                            <select name="" id="">
                                <option value="">United Kingdom</option>
                            </select>
                            <img src="./assets/flags/gbp.png" alt="uk"/>
                        </div>
                        <div>
                            <div>Email<i>*</i></div>
                            <input type="text" placeholder="Your email address"/>
                        </div>
                        <div>
                            <div>Password<i>*</i></div>
                            <input type={passwordType} placeholder="Create your password"/>
                            <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                        </div>

                        <button>Sign up</button>
                    </div>
                    <hr/>
                    <div className="terms">By signing up you agree to our <span>Terms of Use</span> and <span>Privacy Policy.</span></div>
                </div>
            </div>
        </Body>
    )
}

export default SignUp;
