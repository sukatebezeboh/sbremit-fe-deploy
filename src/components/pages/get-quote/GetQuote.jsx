import React, {useState} from 'react'
import { Link, useHistory } from 'react-router-dom';
// import { asset } from '../../../util/util';
import ExchangeRateInput from '../../ui-components/exchange-rate-input/ExchangeRateInput';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import ProgressBar from '../../ui-components/progress-bar/ProgressBar';
import style from './GetQuote.css';


const Body = style();

const GetQuote = () => {

    const [toSend] = useState({value: 100, currency: 'gbp', isSend: true});
    const [toReceive] = useState({value: '70,036', currency: 'xaf'});
    const history = useHistory(); 

    return (
        <Body>
            <NavBar />
            <ProgressBar />
            <div className="page-content">
                
                <PageHeading heading="Get quote" subheading="How much would you like to send to your recipient?" back="/transfer-method" />
                <div className="box">
                    <div className="head">
                        <span>Bank Transfer</span>
                        <span><Link to="/transfer-method">Change transfer method</Link></span>
                    </div>

                    <div className="calc">
                        <div className="hero-rect">
                            <div>
                                <ExchangeRateInput data={toSend}/>
                            </div>
                            <div className="wrapper">
                                <div className="timeline-box">
                                    <div className="timeline timeline-1"> <span><i><img src="./assets/icons/times.svg" alt=""/></i> <span className="deep-green">1 GBP = 70.036 XAF</span></span></div>
                                    <div className="timeline timeline-2"> <span><i><img src="./assets/icons/plus.svg" alt=""/></i> <span>Service fee starts from <span className="deep-green">0.95 GBP</span></span> </span></div>
                                    {/* <div className="timeline timeline-3"> <span><i><img src="./assets/icons/minus.svg" alt=""/></i>  <span>Transfers with SBremit costs you <span className="deep-green">0.00 GBP</span> </span> </span></div> */}
                                    <div className="timeline timeline-4"> <span><i><img src="./assets/icons/equal.svg" alt=""/></i>  <span>Total to pay <span className="deep-green">100.95 GBP</span></span></span></div>
                                    <div className="timeline timeline-5"> <span><i className="fas fa-circle"></i> <span className="not-mobile">Transfer arrives <b>Within 2 hours</b></span> </span></div>
                                </div>
                            </div>
                            <div className="receive">
                                <ExchangeRateInput data={toReceive}/>
                            </div>
                        </div>
                        <div className="footnote">SBremit charges you <b className="green-txt">0.00 GBP</b> for this transfer</div>

                    </div>
                </div>
                <div className="btns"><span>Cancel</span> <button onClick={()=>history.push('/verification')}>Continue</button> </div>
            </div>
        </Body>
    )
}

export default GetQuote;
