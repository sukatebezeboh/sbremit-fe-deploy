import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ExchangeRateInput from '../../ui-components/exchange-rate-input/ExchangeRateInput';
import SBRemitLogo from "../../ui-components/sbremit-landing-logo/SBRemitLandingLogo";
import { style } from "./LandingPage.css";

const LandingPage = (props) => {
    const [toSend] = useState({ value: 100, currency: 'gbp', isSend: true });
    const [toReceive] = useState({ value: '74,081', currency: 'xaf' });
    const bg = props.location ? `/assets/bg/${props.location}-bg.png` : null;
    const Body = style(bg);

    return (
        <Body>
            <div>
                <Link to="/"><SBRemitLogo /></Link>
                <div className="nav">
                    <Link to="/sign-up"><button className="sign-up">Sign up</button></Link>
                    <Link to="/sign-in"><a href="/" className="sign-in">Sign in</a></Link>
                </div>
            </div>
            <div className="f-growing">
                <span>Send Money, No Palaver</span>
            </div>
            <div className="hero-grid">
                <div className="hero-texts">
                    <div>
                        Send Money, No Palaver
                </div>
                    <div>
                        A low cost means of sending money which is fast, secure and reliable with multiple delivery options
                </div>
                </div>
                <div className="hero-rect">
                    <div className="md-txt">Choose how receiver gets the money</div>
                    <div><button disabled>Mobile Money</button><button disabled>Bank Transfer</button><button disabled>Cash Pickup</button></div>
                    <div className="md-txt amt-txt">Enter an amount to send</div>
                    <div>
                        <ExchangeRateInput data={toSend} />
                    </div>
                    <div className="wrapper">
                        <div className="timeline-box">
                            <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt="" /></i> <span className="deep-green">1 GBP = 70.036 XAF</span></span></div>
                            <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt="" /></i> <span>Service fee starts from <span className="deep-green">0.95 GBP</span></span> </span></div>
                            <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt="" /></i>  <span>Transfers with SBremit costs you <span className="deep-green">0.00 GBP</span> </span> <i className="mobile sa">SBremit charges you<span className="deep-green">0.00 GBP</span> for this transfer</i> </span></div>
                            <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt="" /></i>  <span>Total to pay <span className="deep-green">100.95 GBP</span></span></span></div>
                            <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i> <span className="not-mobile">Transfer arrives <b>Within 2 hours</b></span> <span className="mobile we-conv">We’ll convert 99.05 GBP</span> </span></div>
                        </div>
                    </div>
                    <div className="receive">
                        <ExchangeRateInput data={toReceive} />
                    </div>
                    <button>Start sending money</button>
                </div>
            </div>
        </Body>

    )
}

export default LandingPage;
