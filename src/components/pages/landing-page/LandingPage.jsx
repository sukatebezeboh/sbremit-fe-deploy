import React, {useState} from 'react';
import ExchangeRateInput from '../../ui-components/ExchangeRateInput';
import SBRemitLogo from "../../ui-components/SBRemitLogo";
import {style} from "./LandingPage.css";

const LandingPage = (props) => {
    const [toSend] = useState({value: 100, currency: 'gbp', isSend: true});
    const [toReceive] = useState({value: '70,036', currency: 'xaf'});
    const bg = props.location ? `/assets/bg/${props.location}-bg.png` : null;
    const Body = style(bg);

    return (
    <Body>
        <div>
            <SBRemitLogo />
            <div className="nav">
                <button className="sign-up">Sign up</button>
                <a href="/" className="sign-in">Sign in</a>
            </div>
        </div>
        <div className="f-growing">
                The Fastest Growing Money Transfer Company
        </div>
        <div className="hero-grid">
            <div className="hero-texts">
                <div>
                    The Fastest Growing Money Transfer Company
                </div>
                <div>
                    Our quest to transfer money better starts here, the future chooses Sukate & Bezeboh
                </div>
            </div>
            <div className="hero-rect">
                <div className="md-txt">Choose how receiver gets the money</div>
                <div><button disabled>Mobile Money</button><button disabled>Bank Transfer</button><button disabled>Cash Pickup</button></div>
                <div className="md-txt amt-txt">Enter an amount to send</div>
                <div>
                    <ExchangeRateInput data={toSend}/>
                </div>
                <div className="wrapper">
                    <div className="timeline-box">
                        <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt=""/></i> <span className="deep-green">1 GBP = 70.036 XAF</span></span></div>
                        <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt=""/></i> <span>Service fee starts from <span className="deep-green">0.95 GBP</span></span> </span></div>
                        <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt=""/></i>  <span>Transfers with SBremit costs you <span className="deep-green">0.00 GBP</span> </span> <sa className="mobile">SBremit charges you<span className="deep-green">0.00 GBP</span> for this transfer</sa> </span></div>
                        <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt=""/></i>  <span>Total to pay <span className="deep-green">100.95 GBP</span></span></span></div>
                        <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i> <span>Transfer arrives <b>Within 2 hours</b></span></span></div>
                    </div>
                </div>
                <div className="receive">
                    <ExchangeRateInput data={toReceive}/>
                </div>
                <button>Start sending money</button>
            </div>
        </div>
    </Body>

)}

export default LandingPage;
