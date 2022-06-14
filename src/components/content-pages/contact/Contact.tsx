import React, { useState } from 'react';
import Body from './Contact.css'
import { asset } from '../../../util/util';
import NavHeader from '../nav-header/NavHeader';
import { Link } from 'react-router-dom';
import { paths } from 'util/paths';
import emailjs from '@emailjs/browser';
import { toastAction } from 'redux/actions/actions';


const Contact = () => {
    const [ values, setValues ] = useState({
        fullname: '',
        email: '',
        mobile: '',
        transferId: '',
        message: '',
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        emailjs.send('service_899wtxn', 'template_2oj9lu8', values, 'p1WYYOlh6LUYqiOST')
        .then(res => {
            toastAction({
                show: true,
                type: 'success',
                timeout: 10000,
                message: 'Mail recieved. We will address your request shortly',
              })
        }, error => {
            toastAction({
                show: true,
                type: 'error',
                timeout: 10000,
                message: 'There was error sending your mail. Retry after 5 minutes',
              })
        })
    }

    const handleChange = (e: any) => {
        setValues(values => ({
            ...values,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Body>
            <NavHeader page="contact" />
            <main>
                <div className="detail-panel">
                    <h1>Contact us</h1>
                    <p>Contact us via any medium below, you may also visit our <Link to={paths.SUPPORT}><span className="green-txt bold">support centre</span></Link></p>

                    <div className="boxes">
                        <a target="_blank" href="mailto:support@sbremit.com" rel="noreferrer">
                            <div className="box">
                                <img src={asset('icons', 'email.svg')} alt="mail" />
                                <div className="key">Email</div>
                                <div className="value">support@sbremit.com</div>
                            </div>
                        </a>

                        <a href="tel:+44(0)3301334158">
                            <div className="box">
                                <img src={asset('icons', 'phone-call.svg')} alt="call" />
                                <div className="key">Phone</div>
                                <div className="value">+44(0)3301334158</div>
                            </div>
                        </a>
                    </div>

                    <div className="follow mobile-grid-hide">
                        <p>Follow us on</p>

                        <div className="socials">
                            <a href="https://www.instagram.com/sb.remit" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'instagram-green.svg')} alt="instagram" />
                                </div>
                            </a>

                            {/* <a href="" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'linkedin-green.svg')} alt="linkedin" />
                                </div>
                            </a> */}

                            <a href="https://facebook.com/SBremitt" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'facebook-green.svg')} alt="facebook" />
                                </div>
                            </a>

                            {/* <a href="" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'twitter-green.svg')} alt="twitter" />
                                </div>
                            </a> */}
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="form-panel">
                        <div className="box">
                            <h5>Leave us a message</h5>
                            <div className="text">we’ll get back to you within 24 hours</div>


                            <div className="form-group-2">
                                <div className="input-div">
                                    <label htmlFor="fullname">Full name</label>
                                    <input onChange={handleChange} type="text" name="fullname" placeholder="Enter your full name" value={values.fullname} />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input onChange={handleChange} type="text" name="mobile" placeholder="e.g. +44(0)3301334158" value={values.mobile}  />
                                </div>
                            </div>

                            <div className="form-group-2">
                                <div className="input-div">
                                    <label htmlFor="email">Email</label>
                                    <input onChange={handleChange} type="text" name="email" placeholder="Enter your email address" value={values.email} />
                                </div>

                                <div className="input-div">
                                    <label htmlFor="transfer-id">Transfer ID</label>
                                    <input onChange={handleChange} type="text" name="transferId" placeholder="e.g TR71294645323" value={values.transferId} />
                                </div>
                            </div>

                            <div className="form-group-1">
                                <div className="input-div">
                                    <label htmlFor="mobile">Message</label>
                                    <textarea onChange={handleChange} name="message" placeholder="Type your message" value={values.message}></textarea>
                                </div>
                            </div>

                            <button className="btn" type="submit">Submit</button>
                        </div>
                    </div>
                </form>
                <div className="detail-panel desktop-hide">
                    <div className="follow">
                        <p>Follow us on</p>

                        <div className="socials">
                            <a href="https://www.instagram.com/sb.remit" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'instagram-green.svg')} alt="instagram" />
                                </div>
                            </a>

                            {/* <a href="" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'linkedin-green.svg')} alt="linkedin" />
                                </div>
                            </a> */}

                            <a href="https://facebook.com/SBremitt" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'facebook-green.svg')} alt="facebook" />
                                </div>
                            </a>

                            {/* <a href="" target="_blank" rel="noreferrer">
                                <div className="social">
                                    <img src={asset('icons', 'twitter-green.svg')} alt="twitter" />
                                </div>
                            </a> */}
                        </div>
                    </div>
                </div>
            </main>
        </Body>
    )
}

export default Contact
