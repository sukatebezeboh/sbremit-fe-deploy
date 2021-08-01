import React, { useState } from 'react'
import styled from 'styled-components';
import { asset } from '../../../../util/util';
import NavHeader from '../../nav-header/NavHeader';
import { Link } from 'react-router-dom';
import { paths } from '../../../../util/paths';

const Body = styled.div`
    padding: 100px 0px;
    main {
        .hero {
            .hero-text {
                margin-top: 100px;
                text-align: center;
                font: normal normal normal 32px/40px Montserrat;
                color: #424242;
            }

            .search-box {
                text-align: center;
                .search-container {
                    height: 50px;
                    margin-top: 40px;
                    input {
                        height: 50px;
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        border: 0.5px solid #CCCCCC;
                        border-radius: 24px;
                        width: 35%;
                        outline: none;
                        padding-left: 20px;
                        padding-right: 40px;
                        font: normal normal normal 16px/19px Montserrat;
                        color: #A3A3A3;
                    }
                    button {
                        background: #FCD20F;
                        border-radius: 50%;
                        border: none;
                        width: 50px;
                        height: 50px;
                        position: relative;
                        left: -45px;
                        top: 3px;
                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }

            .hero-options {
                text-align: center;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 60%;
                margin: 100px auto;
                grid-gap: 60px;
                .option {
                    background: #FFFFFF 0% 0% no-repeat padding-box;
                    box-shadow: 0px 10px 12px #CCCCCC80;
                    border-radius: 15px;
                    display: inline-block;
                    aspect-ratio: 5/4;
                    /* min-width: 216px; */
                    max-width: 315px;
                    vertical-align: middle;
                    display: grid;
                    text-align: center;
                    grid-template-rows: 2fr 1fr;
                    img {
                        width: 70px;
                        height: 70px;
                        margin: auto;
                    }
                    img.enlarge {
                        width: 100px;
                        height: 100px;

                    }
                    .text {
                        font: normal normal normal 16px/30px Montserrat;
                        color: #424242;
                    }
                }
            }
        }
        .legal, .faq {
            width: 90%;
            margin: auto;
            margin-bottom: 150px;
            h1 {
                font: normal normal 600 40px/32px Montserrat;
                color: #424242;
                margin-bottom: 45px;
                &::after {
                    content: "";
                    display: block;
                    width: 50px;
                    height: 4px;
                    background: #007B5D 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    margin: 20px 0;
                }
            }
            .content {
                width: 80%;
                margin: auto;
                .sub {
                    font: normal normal normal 16px/30px Montserrat;
                    color: #A3A3A3;
                }
                .body {
                    margin-bottom: 60px;
                    h5 {
                        font: normal normal bold 16px/30px Montserrat;
                        color: #424242;
                        margin: 0;
                        margin: 10px 0px;
                        padding: 0;
                    }
                    p {
                        font: normal normal normal 16px/30px Montserrat;
                        color: #424242;
                        margin: 0;
                    }
                    .link {
                        font: normal normal normal 16px/30px Montserrat;
                        color: #007B5D;
                        img {
                            width: 11px;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }

        .faq {
            .content {
                display: grid;
                grid-template-columns: 0fr 1fr;
                grid-gap: 20px;
                width: 85%;
                .open {
                    img {
                        width: 20px;
                        height: 20px;
                        margin-top: 5px;
                        cursor: pointer;
                    }
                }
                .body {
                    h5 {
                        margin: 0;
                        padding: 0;
                        margin-bottom: 20px;
                    }
                    .details {
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        box-shadow: 0px 3px 6px #00000029;
                        border: 0.5px solid #CCCCCC;
                        border-radius: 10px;
                        padding: 30px;
                        .default-link {
                            text-decoration: underline!important;
                            color: #3B7CFF!important;
                        }
                        .green-bold {
                            font-weight: bold;
                            color: #007B5D;
                        }
                        .bullet-point {
                            font: normal normal normal 16px/30px Montserrat;
                            color: #424242;
                            &::before {
                                content: '';
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                background: #007B5D;
                                border-radius: 50%;
                                margin-right: 10px;
                                margin-top: 8px;
                                margin-bottom: 3px;
                            }
                        }
                        .note {
                            font: italic normal normal 16px/26px Montserrat;
                            color: #007B5D;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                            li {
                                .key {
                                    display: inline;
                                    font: normal normal normal 16px/26px Montserrat;
                                    color: #A3A3A3;
                                }
                                .value {
                                    display: inline;
                                }
                            }
                        }
                        p {
                            margin-bottom: 20px;
                        }
                        .helpful {
                            font: normal normal normal 16px/30px Montserrat;
                            color: #A3A3A3;
                            margin-bottom: 20px;
                        }
                        .vote {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            max-width: 300px;
                            .opt {
                                display: inline-grid;
                                grid-template-columns: 0fr 1fr;
                                grid-gap: 10px;
                                img {
                                    width: 19px;
                                    height: 19px;
                                    margin-top: 0px;
                                }
                                div {
                                    font: normal normal normal 16px Montserrat;
                                    color: #424242;
                                }
                            }
                        }
                    }
                }
                &.collapsed {
                    .open {

                    }
                    .body {
                        margin-bottom: 40px;
                        h5 {
                            font: normal normal normal 16px/30px Montserrat;
                        }
                        .details {
                            display: none;
                        }
                    }
                }
            }
        }

    }

@media only screen and (max-width: 900px) { 
    padding: 50px 0px;
    main {
        .hero {
            .hero-text {
                font: normal normal normal 20px/32px Montserrat;
                color: #424242;
            }

            .search-box {
                text-align: center;
                .search-container {
                    margin-top: 40px;
                    input {
                        height: 36px;
                        border-radius: 24px;
                        width: 70%;
                        font: normal normal normal 13px/16px Montserrat;
                    }
                    button {
                        width: 37px;
                        height: 37px;
                        left: -35px;
                        top: 0px;
                        img {
                            width: 13px;
                            height: 13px;
                        }
                    }
                }
            }

            .hero-options {
                text-align: center;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 100%;
                margin: 30px auto;
                grid-gap: 20px;
                overflow-x: scroll;
                padding: 20px;
                ::-webkit-scrollbar {
                    display: none;

                }
                .option {
                    border-radius: 7px; 
                    display: inline-block;
                    aspect-ratio: 5/4;
                    width: 155px;
                    display: grid;
                    grid-template-rows: 2fr 1fr;
                    img {
                        width: 33px;
                        height: 33px;
                        margin: auto;
                    }
                    img.enlarge {
                        width: 50px;
                        height: 50px;

                    }
                    .text {
                        font: normal normal normal 13px/20px Montserrat;
                        color: #424242;
                    }
                }
            }
        }
        .legal, .faq {
            width: 90%;
            margin: auto;
            margin-bottom: 50px;
            h1 {
                font: normal normal bold 18px/25px Montserrat;
                margin-bottom: 30px;
                &::after {
                    content: "";
                    display: block;
                    width: 26px;
                    height: 2px;
                    background: #007B5D 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    margin: 5px 0;
                }
            }
            .content {
                width: 80%;
                margin: auto;
                .sub {
                    font: normal normal normal 13px/20px Montserrat;
                }
                .body {
                    margin-bottom: 30px;
                    h5 {
                        font: normal normal bold 13px/20px Montserrat;
                        margin: 0;
                        margin: 10px 0px;
                        padding: 0;
                    }
                    p {
                        font: normal normal normal 13px/20px Montserrat;
                        margin: 0;
                    }
                    .link {
                        font: normal normal normal 13px/30px Montserrat;
                        img {
                            width: 11px;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }

        .faq {
            .content {
                display: grid;
                grid-template-columns: 0fr 1fr;
                grid-gap: 20px;
                width: 85%;
                .open {
                    img {
                        width: 10px;
                        height: 10px;
                        margin-top: 0px;
                        cursor: pointer;
                    }
                }
                .body {
                    h5 {
                        margin: 0;
                        padding: 0;
                        margin-bottom: 20px;
                    }
                    .details {
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        box-shadow: 0px 3px 6px #00000029;
                        border: 0.5px solid #CCCCCC;
                        border-radius: 10px;
                        padding: 30px;
                        .default-link {
                            text-decoration: underline!important;
                            color: #3B7CFF!important;
                        }
                        .green-bold {
                            font-weight: bold;
                            color: #007B5D;
                        }
                        .bullet-point {
                            font: normal normal normal 13px/20px Montserrat;
                            color: #424242;
                            &::before {
                                content: '';
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                background: #007B5D;
                                border-radius: 50%;
                                margin-right: 10px;
                                margin-top: 8px;
                                margin-bottom: 3px;
                            }
                        }
                        .note {
                            font: normal normal normal 13px/20px Montserrat;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                            li {
                                .key {
                                    display: inline;
                                    font: normal normal normal 13px/20px Montserrat;
                                    color: #A3A3A3;
                                }
                                .value {
                                    display: inline;
                                }
                            }
                        }
                        p {
                            margin-bottom: 20px;
                        }
                        .helpful {
                            font: normal normal normal 13px/20px Montserrat;
                            color: #A3A3A3;
                            margin-bottom: 20px;
                        }
                        .vote {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            max-width: 300px;
                            .opt {
                                display: inline-grid;
                                grid-template-columns: 0fr 1fr;
                                grid-gap: 10px;
                                img {
                                    width: 19px;
                                    height: 19px;
                                    margin-top: 0px;
                                }
                                div {
                                    font: normal normal normal 13px Montserrat;
                                    color: #424242;
                                }
                            }
                        }
                    }
                }
                &.collapsed {
                    .open {

                    }
                    .body {
                        margin-bottom: 40px;
                        h5 {
                            font: normal normal normal 13px Montserrat;
                        }
                        .details {
                            display: none;
                        }
                    }
                }
            }
        }

    }
}
`
const Support = () => {
    const [openPanels, setOpenPanels]: any = useState([]);

    const isPanelOpen = (panelId: number) => {
        return openPanels.includes(panelId);
    }

    const togglePanel = (panelId: number) => {
        isPanelOpen(panelId) ? 
        setOpenPanels( openPanels.filter((p: number)=> p !== panelId) )
        :
        setOpenPanels( [...new Set([...openPanels, panelId])] )
    }

    return (
        <Body>
            <NavHeader page="support" />

            <main>
                <section className="hero">
                    <div className="hero-text">
                        How can we help you today?
                    </div>
                    <div className="search-box">
                        <div className="search-container">
                            <input type="text" name="search" placeholder="Ask a question" />
                            <button> <img src={asset('icons', 'loupe.svg')} alt="search" /> </button>
                        </div>
                    </div>

                    <div className="hero-options">
                        <div className="option">
                            <img src={asset('icons', 'play-button.svg')} alt="play" />
                            <div className="text">Get Started</div>
                        </div>

                        <div className="option">
                            <img className="enlarge" src={asset('icons', 'mortarboard.svg')} alt="mortarboard" />
                            <div className="text">Tutorials</div>
                        </div>

                        <div className="option">
                            <img src={asset('icons', 'support.svg')} alt="support" />
                            <div className="text">Contact us</div>
                        </div>

                        <div className="option">
                            <img src={asset('icons', 'route.svg')} alt="route" />
                            <div className="text">User guide</div>
                        </div>
                    </div>
                </section>

                <section className="legal">
                    <h1>Legal</h1>
                    <div className="content">
                        <div className="sub">
                            Find legal information and resources for SB Remit product and services
                        </div>

                        <div className="body">
                            <h5>Terms and Conditions</h5>
                            <p>These terms and conditions create a contract between you and SB Remit (the “Agreement”). Please read the Agreement carefully.</p>
                            <Link to={'/support/legal/terms'}>
                                <div className="link">
                                    Read SB Remit Terms and Conditions <img src={asset('icons', 'right-arrow-angle.svg')} alt="goto" />
                                </div>
                            </Link>
                        </div>

                        <div className="body">
                            <h5>Privacy Policy</h5>
                            <p>SB Remit is committed to your privacy. Read our customer Privacy Policy for a clear explanation of how we gather, use, disclose, and manage your information..</p>
                            <Link to={'/support/legal/privacy'}>
                                <div className="link">
                                    Read SB Remit Privacy Policy <img src={asset('icons', 'right-arrow-angle.svg')} alt="goto" />
                                </div>
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="faq">
                    <h1>Frequently Asked Questions</h1>
                    <div className={`content ${isPanelOpen(0) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(0)} src={asset('icons', `${isPanelOpen(0) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>How do I set up a transfer?</h5>
                            <div className="details">
                                <p>
                                    Setting up a transfer is easy, and can be done in a few simple steps. 
                                </p>
                                <p>
                                    To start, key in the amount you want to send to obtain a quote and choose a delivery method. Then login or sign-up if you don’t already have an account. Enter the recipient details and pay for the transfer with either a debit or credit card or a bank transfer. 
                                </p>
                                <p>
                                    Your transfer will then be processed and delivered to your recipient. The delivery time of your transfer may vary depending on the country you are sending to, the delivery method you choose and how you pay for the transfer. You can find more information about delivery times here.
                                </p>

                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={`content ${isPanelOpen(1) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(1)} src={asset('icons', `${isPanelOpen(1) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>How long will my transfer take?</h5>
                            <div className="details">
                                <p>
                                    On average, a transfer with SB Remit takes up to 10 minutes by mobile money wallet and cash pick-up, with bank transfer taking up to one working day. The delivery time of your transfer may vary depending on the country you are sending to, the delivery method you choose and how you pay for the transfer. 
                                </p>
                                <p>
                                    If you pay with faster payment in the UK, it can take up to two hours for your payment to reach SB Remit’s account. For other European countries, it can take up to 2 workings days. Once we have received your payment, we will immediately process your transfer and notify you via email and push notification. Payments done by card are a much faster option, as they only take a few minutes to reach our account. 
                                </p>
                                <p className="note">
                                    Please note that sometimes transfers can take a little bit longer if additional documents are required or if you send money over the weekend or on public holidays.
                                </p>

                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`content ${isPanelOpen(2) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(2)} src={asset('icons', `${isPanelOpen(2) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>How can I pay for my transfer?</h5>
                            <div className="details">
                                <p>
                                    You can easily pay for your transfer with either a debit/credit card or a bank transfer. Please note that the maximum amount for card payments is 20,000 GBP/24,000 EUR. If you are paying with a bank transfer, you can send the money to SB Remit’s bank account using the following details: 
                                    
                                    <ul>
                                        <li><div className="key">GBP:</div> <div className="value"></div> </li>
                                        <li><div className="key">Bank name:</div> <div className="value"></div> </li>
                                        <li><div className="key">Account name:</div> <div className="value">Sukate & Bezeboh Ltd</div> </li>
                                        <li><div className="key">Sort code:</div> <div className="value"></div> </li>
                                        <li><div className="key">Account number:</div> <div className="value"></div> </li>
                                        <li><div className="key">EUR:</div> <div className="value"></div> </li>
                                        <li><div className="key">Bank name:</div> <div className="value"></div> </li>
                                        <li><div className="key">IBAN:</div> <div className="value"></div> </li>
                                        <li><div className="key">BIC:</div> <div className="value"></div> </li>
                                    </ul>
                                </p>
                                <p className="note">
                                    Please remember to include your payment reference when making the bank transfer and to double check that the amount is correct.
                                </p>

                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`content ${isPanelOpen(3) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(3)} src={asset('icons', `${isPanelOpen(3) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>Can I make recurring transfers?</h5>
                            <div className="details">
                                <p>
                                    SB Remit currently does not have the option for setting up recurring transfers. We’re constantly adding new features, so keep an eye out as we hope to offer this in the future. However, details of your recipients are saved in your account to make it easier for you to effect new transfers. This means new transfers to existing recipients can be done with a single click once you sign into your account.
                                </p>

                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={`content ${isPanelOpen(4) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(4)} src={asset('icons', `${isPanelOpen(4) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>What is a Transfer ID?</h5>
                            <div className="details">
                                <p>
                                    A Transfer ID is a unique number given to every transfer you set up. It is the number you’ll need to give our Customer Support team if you contact them with any questions. You can find the Transfer ID in your transfer history and in emails you’ve received.
                                </p>
                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>



                    <div className={`content ${isPanelOpen(5) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(5)} src={asset('icons', `${isPanelOpen(5) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>How do I cancel my SB Remit transfer?</h5>
                            <div className="details">
                                <p>
                                    While we do our best to fulfil cancellation requests, please note that it’s not always possible to do so, particularly if the transfer has reached your recipient or their receiving bank. If you wish to request a cancellation, please contact SB Remit’s customer service through the number on their website.<br/> Alternatively, using the SB Remit website;                                
                                </p>
                                <div className="bullet-point">
                                    Navigate to the <a className="default-link" href={paths.LANDING}>www.sbremit.com</a>  support centre
                                </div>
                                <div className="bullet-point">
                                    Click the <span className="green-bold">"contact us”</span> button at the top of the page
                                </div>
                                <div className="bullet-point">
                                    Send us a message with the transfer ID and the details of your cancellation request.
                                </div>
                                <br />
                                <p>
                                Our team will then review your request and let you know if cancellation is possible. If successful, the cancellation process takes 24 hours. A refund will then be initiated. 
                                </p>
                                <p>
                                Refunds take up to five working days, depending on the speed of your bank. Card payments are refunded within 48 hours, though this can take longer during bank holidays and weekends.
                                </p>
                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`content ${isPanelOpen(6) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(6)} src={asset('icons', `${isPanelOpen(6) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>How can I view the status of my transfer?</h5>
                            <div className="details">
                                <p>
                                    Your recent transfers will appear on the home screen of the SB Remit website or app after you log in. Tap the relevant transfer to see its status. You will also receive updates by email, including a notification that the transfer has been delivered successfully.
                                </p>

                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className={`content ${isPanelOpen(7) || " collapsed"}`}>
                        <div className="open">
                            <img onClick={() => togglePanel(7)} src={asset('icons', `${isPanelOpen(7) ? "minus-close.svg" : "plus-open.svg"}`)} alt="close" />
                        </div>

                        <div className="body">
                            <h5>Why does the status say “Transfer completed”, but the money isn’t in my recipient’s account?</h5>
                            <div className="details">
                                <p>
                                    When you see the status <span className="green-txt">“transfer completed”</span> , it means that we’ve handed over the money to your recipient’s bank. Most banks credit the money to the receiving account quite quickly, but some take up to 24 hours. Your recipient will need to contact their bank for further information. <br/> Occasionally the receiving bank rejects the transfer after we’ve handed over the money. This usually happens if there is a mistake in the bank details the sender entered. We will contact you as soon as we are notified about the rejection by the receiving bank. This can take several business days, depending on the speed of the bank.
                                </p>
                                <p className="note">
                                    If your transfer has not been delivered within three business days and you have not heard from us, please contact us via our customer service.
                                </p>
                                <p className="helpful">
                                    Was this article helpful?
                                </p>
                                <div className="vote">
                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>Yes</div>
                                    </div>

                                    <div className="opt">
                                        <img src={asset('icons', 'positive-vote.svg')} alt="vote" />
                                        <div>No</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
               

                </section>

            </main>
        </Body>
    )
}

export default Support
