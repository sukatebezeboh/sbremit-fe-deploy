import FancyToggle from 'components/modules/fancy-toggle/FancyToggle'
import React from 'react'
import { asset } from '../../../util/util'
import Body from './TempLanding.css'

const TempLanding = () => {

    const supportedCountriesListing = [
        {
            name: "Cameroon",
            flag: 'CM.png',
            active: true
        },
        {
            name: "Chad",
            flag: 'CM.png',
            active: false
        },
        {
            name: "Cent. Africa Republic",
            flag: 'CM.png',
            active: false
        },
        {
            name: "Republic of Congo",
            flag: 'CM.png',
            active: false
        },
        {
            name: "Garbon",
            flag: 'CM.png',
            active: false
        },
        {
            name: "Equatorial Guinea",
            flag: 'CM.png',
            active: false
        },
    ]
  return (
    <Body>
        <main>
            <div className="main-inner">
                <nav className="nav">
                    <div className="logo-container">
                        <div className="img-wrapper">
                            <img src={asset('', 'main-logo-white.svg')} alt="logo" className="logo" />
                        </div>
                    </div>
                    <div className="content-links">
                        <div className="content-links-wrapper">
                            <span className="link">
                                About
                            </span>

                            <span className="link">
                                Contact
                            </span>

                            <span className="link">
                                Support
                            </span>
                        </div>
                    </div>

                    <div className="auth-links">
                        <div className="auth-links-inner">
                            <button className="sign-in">
                                Sign in
                            </button>

                            <button className="sign-up">
                                Sign up
                            </button>
                        </div>
                    </div>
                </nav>

                <div className="hero">
                    <div className="hero-inner">
                        <div className="left">
                            <h2 className="hero-heading">
                                Send Money, No Palaver
                            </h2>
                            <p className="hero-text">
                                A low cost means of sending money which is fast, secure and reliable with multiple delivery options
                            </p>

                            <button className="hero-fca">
                                We are FCA Regulated, learn what this means <img src={asset('icons', 'round-yellow-arrow-right.svg')} alt="" />
                            </button>
                        </div>
                        <div className="right">
                            <div className="right-inner">
                                <div className="exchange-rate-calculator">
                                    <div className="calculator-inner">
                                        <div className="title">
                                            Choose how recipient gets the money
                                        </div>

                                        <div className="calculator-nav">
                                            <div className="options">
                                                <div className="option active">
                                                    Mobile Money
                                                </div>

                                                <div className="option">
                                                    Bank Transfer
                                                </div>

                                                <div className="option">
                                                    Cash Pickup
                                                </div>
                                            </div>
                                        </div>

                                        <div className="simple-prompt">
                                            Enter an amount to send
                                        </div>

                                        <div className="exchange-rate-input">
                                            <div className="text">
                                                YOU SEND
                                            </div>

                                            <div className="input-container">
                                                <div className="input-wrapper">
                                                    <input type="text" placeholder='0.00' className="exchange" />
                                                    <img src={asset('icons', 'rate-down-arrow.svg')} alt="" className="arrow" />
                                                </div>  
                                                <div className="currency-selector">
                                                    <img src={asset('flags', 'GB.png')} alt="" className="currency-flag" />
                                                    <div className="selected-currency">
                                                        GBP
                                                    </div>
                                                    <img src={asset('icons', 'black-caret-down.svg')} alt="caret-down" className="caret-down" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="timeline">
                                            <div className="timeline-inner">
                                                <div className="bullet-points-container">
                                                    <div className="dot top-dot"></div>


                                                    <div className="transactional-points">
                                                        <div className="point-icon">
                                                            &times;
                                                        </div>

                                                        <div className="point-text">
                                                            <span className="green-txt">1GB=778.32 XAF</span>
                                                        </div>
                                                    </div>


                                                    <div className="transactional-points">
                                                        <div className="point-icon">
                                                            +
                                                        </div>

                                                        <div className="point-text">
                                                            Mobile Operator <span className="green-txt">Cash Out Fee</span> from: <span className="green-txt"> 0 GBP</span>
                                                        </div>
                                                    </div>


                                                    <div className="transactional-points">
                                                        <div className="point-icon">
                                                            -
                                                        </div>

                                                        <div className="point-text">
                                                            SB Remit charges you <span className="green-txt"> 0.00 GBP</span> for this transfer
                                                        </div>
                                                    </div>

                                                    <div className="transactional-points">
                                                        <div className="point-icon red">
                                                            =
                                                        </div>

                                                        <div className="point-text">
                                                            Total to pay <span className="green-txt"> 0.00 GBP</span>
                                                        </div>
                                                    </div>

                                                    <div className="dot bottom-dot"></div>
                                                </div>
                                            </div>
                                        </div>


                                        <div className="exchange-rate-input">
                                            <div className="text">
                                                THEY GET
                                            </div>

                                            <div className="input-container">
                                                <div className="input-wrapper">
                                                    <input type="text" placeholder='0.00' className="exchange" />
                                                    <img src={asset('icons', 'rate-up-arrow.svg')} alt="" className="arrow" />
                                                </div>
                                                <div className="currency-selector">
                                                    <img src={asset('flags', 'GB.png')} alt="" className="currency-flag" />
                                                    <div className="selected-currency">
                                                        XAF
                                                    </div>
                                                    <img src={asset('icons', 'black-caret-down.svg')} alt="caret-down" className="caret-down" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="extras">
                                            <div className="extras-inner">
                                                <div className="promo-side">
                                                    <input type="text" placeholder='Apply promo code' className="promo-code-input" />
                                                </div>
                                                <div className="toggle-side">
                                                    <div className="toggle">
                                                        <FancyToggle label="Include operator fee" isActive={true} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button className="send-btn">Start sending money</button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="background-circle bg-circle-up"></div>
            <div className="background-circle bg-circle-down"></div>
        </main>

        <section className="countries-remit" id="countries">
            <div className="section-inner">
                <h2 className='heading'>Countries we remit to</h2>
                <div className="subheading">We transfer from UK, Canada, and Europe to:</div>

                <div className="listings">
                    {
                        supportedCountriesListing.map((listing: any) => (
                            <div className="listing">
                                <div className="listing-inner">
                                    <img src={asset('flags', listing.flag)} alt="Cameroon" />
                                    <div className="text">{listing.name}</div>
                                </div>
                                <div className={`checkmark ${listing.active ? 'active' : 'inactive'}`}>
                                    { listing.active ? <img src={asset('icons', 'green-checkmark.svg')} alt="" /> : 'Coming soon'}
                                </div>
                            </div>
                        ))
                    }
 
                </div>
            </div>
            <div className="big-image">
                <img src={asset('images', 'dotted-globe.svg')} alt="countries-map" />
            </div>
            <div className="register-interest">
                We are constantly adding more countries to the list. <span className="register-interest-link green-txt">Register your interest</span>
            </div>
        </section>

        <section className="we-are-different" id="we-are-different">
            <div className="section-inner">
                <h2 className="heading">Why are we different and better?</h2>

                <div className="points-list">
                    <div className="point-container">
                        <div className="point">
                            <div className="icon-side">
                                <div className="icon-wrapper">
                                    <img src={asset('icons', 'no-fee.svg')} alt="no-fee" className="icon" />
                                </div>
                            </div>
                            <div className="text-side">
                                <div className="title">No fee</div>
                                <div className="text">
                                    Zero transaction fees for all your transfers - meaning more money gets to your recipient.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="point-container">
                        <div className="point">
                            <div className="icon-side">
                                <div className="icon-wrapper">
                                    <img src={asset('icons', 'transfer-point.svg')} alt="no-fee" className="icon" />
                                </div>
                            </div>
                            <div className="text-side">
                                <div className="title">Excellent exchange rate</div>
                                <div className="text">
                                    Our exchange rates are the best in the market. <span className="green-link">Click here</span> to see how we are better than our competitors.                                
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="point-container">
                        <div className="point">
                            <div className="icon-side">
                                <div className="icon-wrapper">
                                    <img src={asset('icons', 'cash-point.svg')} alt="no-fee" className="icon" />
                                </div>
                            </div>
                            <div className="text-side">
                                <div className="title">Multiple delivery options</div>
                                <div className="text">
                                    Mobile money, bank transfer, and cash pickup.  <span className="green-link">Click here</span> to see how we compare with our competitors                                
                                </div>
                            </div>
                        </div>
                    </div>


                    <div className="point-container">
                        <div className="point">
                            <div className="icon-side">
                                <div className="icon-wrapper">
                                    <img src={asset('icons', 'money.svg')} alt="no-fee" className="icon" />
                                </div>
                            </div>
                            <div className="text-side">
                                <div className="title">No hidden cost</div>
                                <div className="text">
                                    We take pride in being the most transparent money remittance company with no hidden surprise costs.
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="point-container">
                        <div className="point">
                            <div className="icon-side">
                                <div className="icon-wrapper">
                                    <img src={asset('icons', 'friendly.svg')} alt="no-fee" className="icon" />
                                </div>
                            </div>
                            <div className="text-side">
                                <div className="title">Customer friendly</div>
                                <div className="text">
                                    Customer friendly experience that is completely transparent at all transfer steps.
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>

        <section className="transfer-methods" id="transfer-methods">
            <div className="section-inner">
                <h2 className="heading">
                    How we make a transfer
                </h2>
                <div className="subheading">
                    Make a transfer in a few simple steps once you sign up
                </div>

                <div className="methods">
                    <div className="method-step">
                        <div className="image-up">
                            <img src={asset('images', 'transfer-methods-step-1.png')} alt="step-1" />
                        </div>
                        <div className="text-down">
                            <div className="step-title">Signup or sign in</div>
                            <div className="steps">
                                <div className="step">
                                    <div className="numbering">1.</div>
                                    <div className="instruction">Excellent exchange rate</div>
                                </div>
                                <div className="step">
                                    <div className="numbering">2.</div>
                                    <div className="instruction">No fee</div>
                                </div>
                                <div className="step">
                                    <div className="numbering">3.</div>
                                    <div className="instruction">Amount recipients receives</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="method-step">
                        <div className="image-up">
                            <img src={asset('images', 'transfer-methods-step-2.png')} alt="step-2" />
                        </div>
                        <div className="text-down">
                            <div className="step-title">Add a recipient</div>
                            <div className="steps">
                                <div className="step">
                                    <div className="numbering">1.</div>
                                    <div className="instruction">Add recipient</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="method-step">
                        <div className="image-up">
                            <img src={asset('images', 'transfer-methods-step-3.png')} alt="step-3" />
                        </div>
                        <div className="text-down">
                            <div className="step-title">Review Transaction</div>
                            <div className="steps">
                                <div className="step">
                                    <div className="numbering">1.</div>
                                    <div className="instruction">Excellent exchange rate</div>
                                </div>
                                <div className="step">
                                    <div className="numbering">2.</div>
                                    <div className="instruction">No fee</div>
                                </div>
                                <div className="step">
                                    <div className="numbering">3.</div>
                                    <div className="instruction">Amount recipients receives</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="method-step">
                        <div className="image-up">
                            <img src={asset('images', 'transfer-methods-step-4.png')} alt="step-4" />
                        </div>
                        <div className="text-down">
                            <div className="step-title">Transfer successful</div>
                            <div className="steps">
                                <div className="step">
                                    <div className="numbering">1.</div>
                                    <div className="instruction">Excellent exchange rate</div>
                                </div>
                                <div className="step">
                                    <div className="numbering">2.</div>
                                    <div className="instruction">No fee</div>
                                </div>
                                <div className="step">
                                    <div className="numbering">3.</div>
                                    <div className="instruction">Amount recipients receives</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section className="compare" id="compare">
            <div className="section-inner">
                <h2 className="heading">
                    How we compare with others
                </h2>

                <div className="btn-div">
                    <button className="compare-btn">
                        Sending 200 GBP with....
                    </button>
                </div>

                <div className="table">

                </div>
            </div>
        </section>

        <section className="partners" id="partners">
            <div className="section-inner">
                <div className="small-heading">
                    OUR PARTNERS
                </div>

                <div className="partner-listing">
                    <img src={asset('logos', 'trust-payment.png')} alt="trust-payment" />
                    <img src={asset('logos', 'twilio.png')} alt="twilio" />
                    <img src={asset('logos', 'trulioo.png')} alt="trulioo" />
                    <img src={asset('logos', 'ifx.png')} alt="ifx" />
                    <img src={asset('logos', 'gimac.png')} alt="gimac" />
                    <img src={asset('logos', 'fixer.png')} alt="fixer" />
                </div>
            </div>
        </section>

        <section className="happy-customers" id="happy-customers">
            <div className="section-inner">
                <h2 className="heading">
                    What our customers are saying
                </h2>

                <div className="image-container">
                    <img src={asset('images', 'happy-customer-1.png')} className="happy-customer" alt="happy-customer" />
                    <img src={asset('icons', 'white-round-arrow-right.svg')} alt="arrow" className='next-icon' />
                </div>

                <div className="testimonials">
                    <div className="arrow left-arrow">
                        <img src={asset('icons', 'black-round-arrow-left.svg')} alt="arrow" />
                    </div>

                    <div className="testimonial-cards">
                        <div className="testimonial-card">
                            <img src={asset('icons', 'big-quote.svg')} alt="big-quote" className='big-quote' />

                            <p className="text">
                                They are very efficient and always helpful.
                                The Set up process for their app was very easy and rapid. They are easy and straight forward to contact directly, and also responsive.
                                I will recommend them for their excellent customer service and professionalism.
                                For the past two years, I have been able to send money to family and my business in Cameroon at the touch of a button with assurance and security. I have never had any issue with any of my transactions.
                            </p>

                            <div className="customer">
                                <div className="name">
                                    Charles Mambo
                                </div>
                                <div className="from">
                                    (London)
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <img src={asset('icons', 'big-quote.svg')} alt="big-quote" className='big-quote' />

                            <p className="text">
                                Excellent customer service! Prompt and efficient communication and a really easy way to transfer funds. SB Remit offers great rates and the staff is always helpful, courteous and pleasant to work with. SB Remit makes money transfer a walk in the park!
                            </p>

                            <div className="customer">
                                <div className="name">
                                    Cynthia
                                </div>
                                <div className="from">
                                    (London)
                                </div>
                            </div>
                        </div>

                        <div className="testimonial-card">
                            <img src={asset('icons', 'big-quote.svg')} alt="big-quote" className='big-quote' />

                            <p className="text">
                                I have been using SB remit to send money back home since May 2021. The service is great every time, and now even better with the launch of their website. The registration process is easy and straightforward. I am most impressed by how quickly my loved ones receive their money. Literally a few minutes after sending.
                            </p>

                            <div className="customer">
                                <div className="name">
                                    Charles Mambo
                                </div>
                                <div className="from">
                                    (London)
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="arrow right-arrow">
                        <img src={asset('icons', 'black-round-arrow-right.svg')} alt="arrow" />
                    </div>
                </div>

                <div className="scroll-dots">
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div>
            </div>
            <div className="section-behind-overlap">

            </div>
        </section>
    </Body>
  )
}

export default TempLanding