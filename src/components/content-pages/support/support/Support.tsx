import React, { useState } from 'react'
import { asset } from '../../../../util/util';
import Body from './Support.css'
import NavHeader from '../../nav-header/NavHeader';
import { Link, useHistory } from 'react-router-dom';
import { paths } from '../../../../util/paths';


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

    const history = useHistory()

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

                        <div className="option" onClick={() => history.push(paths.CONTACT)}>
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

                <section className="faq" id="faq">
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
