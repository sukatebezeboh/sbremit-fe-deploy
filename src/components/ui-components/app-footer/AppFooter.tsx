import React from 'react'
import styled from 'styled-components';
import { asset } from '../../../util/util';

const Footer = styled.div`
    padding: 76px 5% 30px;
    background: #007B5D;
    font: normal normal normal 18px Montserrat;
    color: #CCCCCC;
    .up {
        display: grid;
        grid-template-columns: 3fr 2fr 1fr 2.5fr;
        grid-gap: 85px;
        .main {
            .logo {
                img {
                    width: 214px;
                    height: 50px;
                    -webkit-filter: invert(0%) sepia(21%) saturate(28%) hue-rotate(346deg) brightness(204%) contrast(97%);
                    filter: invert(0%) sepia(0%) saturate(45%) hue-rotate(1deg) brightness(300%) contrast(400%);
                }
            }
            p {
                font: normal normal normal 18px/30px Montserrat;
                margin-top: 26px;
            }
        }
        h3 {
            color: #fff;
            font: normal normal bold 18px Montserrat;
            margin: 0px;
        }
        ul {
            list-style-type: none;
            padding: 0px;
            margin: 0;
            li {
                margin-top: 20px;
                white-space: nowrap;
            }
        }
        .company-legal {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 85px;
            .company {
                h3 {

                }
                ul {
                    li {

                    }
                }
            }
            .legal {
                h3 {

                }
                ul {
                    li {

                    }
                }
            }
        }
        .contact {
            h3 {

            }
            ul {
                li {

                }
                li.socials {
                    margin-top: 30px;
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    img {
                        width: 20px;
                        /* height: 30px; */
                    }
                }
            }
        }
        .subscribe {
            p {
                font: normal normal normal 18px Montserrat;
                letter-spacing: 0.45px;
                color: #FFFFFF;
                padding: 0px;
                margin: 0px;
            }
            div {
                input {
                    margin: 20px 0px;
                    background: #FFFFFF 0% 0% no-repeat padding-box;
                    border-radius: 5px;
                    border: none;
                    padding: 13px 20px;
                    font: normal normal normal 18px Montserrat;
                    letter-spacing: 0.45px;
                    color: #A3A3A3;
                    width: 90%;
                    outline: none;
                }
                button {
                    margin: 10px 0px;
                    padding: 13px 20px;
                    font: normal normal normal 18px/22px Montserrat;
                    letter-spacing: 0.45px;
                    color: #424242;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 8px;
                    border: none;
                }
            }
        }
    }
    hr {
        border: none;
        border-top: 1px solid #F5F7F7;
        border-radius: 8px;
        opacity: 0.2;
        margin-top: 75px;
        margin-bottom: 30px;
    }
    .copyright {
        color: white;
    }
    @media only screen and (max-width: 1200px) { 
        .up {
            grid-template-columns: 2fr 2fr;
        }
    }
    @media only screen and (max-width: 900px) { 
        .up {
            grid-template-columns: 1fr;
            font-size: 13px!important;
            grid-gap: 50px;
            .main {
                .logo {
                    img {
                        width: 99px;
                        height: 22px;
                    }
                }
                p {
                    font: normal normal normal 13px/30px Montserrat;
                    margin-top: 26px;
                }
            }

            .contact {
                ul {
                    width: 200px;
                    li.socials {
                        img {
                            width: 15px;
                            /* height: 30px; */
                        }
                    }
                }
            }
            .subscribe {
                p {
                    font: normal normal normal 13px Montserrat;
                }
                div {
                    input {
                        color: #A3A3A3;
                        font: normal normal normal 13px Montserrat;
                        letter-spacing: 0.33px;
                    }
                    button {
                        font: normal normal normal 13px Montserrat;
                    }
                }
            }
        }
    }
`
export const AppFooter = () => {
    return (
        <Footer>
            <div className="up">
                <div className="main">
                    <div className="logo">
                        <img src={asset('', 'main-logo.svg')} alt="main logo" />
                    </div>
                    <p>
                        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet.
                    </p>
                </div>
                <div className="company-legal">
                    <div className="company">
                        <h3>Company</h3>
                        <ul>
                            <li>About</li>
                            <li>FAQs</li>
                            <li>Blog</li>
                        </ul>
                    </div>
                    <div className="legal">
                        <h3>Legal</h3>
                        <ul>
                            <li>Privacy</li>
                            <li>Terms & Conditions</li>
                        </ul>
                    </div>
                </div>
                <div className="contact">
                    <h3>Contact us</h3>
                    <ul>
                        <li>+44 798 759 0594</li>
                        <li>contact@sbremit.com</li>
                        <li className="socials">
                            <img src={asset('icons', 'instagram.svg')} alt="instagram" />
                            <img src={asset('icons', 'linkedin.svg')} alt="linkedin" />
                            <img src={asset('icons', 'facebook.svg')} alt="facebook" />
                            <img src={asset('icons', 'twitter.svg')} alt="twitter" />
                        </li>
                    </ul>
                </div>
                <div className="subscribe">
                    <p>Stay tuned for latest news from SB remit</p>
                    <div>
                        <input type="text" placeholder="Enter your email" />
                    </div>
                    <div>
                        <button>Subscribe</button>
                    </div>
                </div>
            </div>
           <hr />
           <div className="copyright">
                &copy; Copyright 2021 SB remit. All rights reserved
           </div>

        </Footer>
    )
}
