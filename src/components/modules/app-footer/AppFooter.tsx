import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { subscribe } from '../../../redux/actions/actions'
import { paths } from '../../../util/paths'
import { asset } from '../../../util/util'

const Footer = styled.footer`
        background: #03211D;
        .footer-inner { 
            width: 80%;
            margin: auto;
            padding: 80px 0px;
            .logo-line { 
                display: grid;
                grid-template-columns: 1fr 0fr;
                @media only screen and (max-width: 900px) {
                    grid-template-columns: 1fr;
                    grid-gap: 32px;
                }
                .sb-logo { 

                    img { 
                        width: 200px;
                        /* height: 31px; */
                    }
                }

                .social-links { 
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    grid-gap: 16px;
                    width: fit-content;
                    a { 
                        
                        display: block;
                        border: 1px solid white;
                        border-radius: 50%;
                        padding: 11px;
                        img { 
                            width: 23px;
                            height: 23px;
                        }
                    }
                }
            }

            .copyright-line { 
                padding-bottom: 16px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.25);
                margin-top: 55px;
                @media only screen and (max-width: 900px) {
                    margin-top: 45px;
                }
                .text { 
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 28px;
                    letter-spacing: -0.01em;
                    color: #FFFFFF;
                }
            }

            .main-area { 
                margin: 60px auto;
                display: grid;
                grid-template-columns: 2fr 1fr;
                @media only screen and (max-width: 900px) {
                    grid-template-columns: 1fr;
                }
                .nav-links { 
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    
                    .footer-nav { 
                        margin-bottom: 24px;
                        .title { 
                            /* font-family: 'Faro'; */
                            font-style: normal;
                            font-weight: 400;
                            font-size: 24px;
                            line-height: 32px;
                            color: rgba(255, 255, 255, 0.65);
                            margin-bottom: 24px;

                            @media only screen and (max-width: 900px) {
                                font-size: 20px;
                            }
                        }

                        ul.links { 
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 28px;
                            letter-spacing: -0.01em;
                            padding: 0;
                            margin: 0;
                            list-style-type: none;
                            color: rgba(255, 255, 255, 0.65);
                            @media only screen and (max-width: 900px) {
                                font-size: 16px;
                            }
                            li { 
                                margin: 14px 0;
                                a {

                                }
                            }
                        }
                    }
                }

                .search-area { 

                    .title { 
                        font-weight: 400;
                        font-size: 24px;
                        line-height: 32px;
                        color: rgba(255, 255, 255, 0.35);
                        margin-bottom: 32px;

                        @media only screen and (max-width: 900px) {
                            font-size: 20px;
                            margin-bottom: 24px;
                        }
                    }

                    .search-box { 
                        display: grid;
                        /* grid-template-columns: 1fr 0fr; */
                        grid-gap: 16px;
                        /* max-width: 570px; */
                        grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                        input.search-input { 
                            width: 100%;
                            background: #FBFCFB;
                            border: 0.3px solid rgba(0, 0, 0, 0.33);
                            box-sizing: border-box;
                            border-radius: 6px;
                            padding: 16px 24px;
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 28px;
                            letter-spacing: -0.01em;
                            color: #000000;
                            min-width: 250px;

                            @media only screen and (max-width: 900px) {
                                font-size: 14px;
                                padding: 13px 16px;
                            }
                        }


                        .search-btn { 
                            padding: 16px 5px;
                            background: #FDDB3A;
                            border-radius: 6px;
                            border: none;
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 28px;
                            letter-spacing: -0.01em;
                            color: #000000;
                            min-width: 187px;
                            @media only screen and (max-width: 900px) {
                                padding: 14px 5px;
                            }
                        }
                    }
                }
            }

            .summary-line { 
                font-weight: 400;
                font-size: 15px;
                line-height: 28px;
                letter-spacing: -0.01em;
                color: rgba(255, 255, 255, 0.65);
                margin-top: 50px;
                padding-top: 24px;
                border-top: 1px solid rgba(255, 255, 255, 0.25);
                @media only screen and (max-width: 900px) {
                    font-size: 12px;
                }
            }
        }
  
`
export const AppFooter = () => {
  const history = useHistory()
  const [subscribeValue, setSubscribeValue] = useState<{ email: string }>({
    email: '',
  })

  const handleSubscribeClick = () => {
    if (subscribeValue.email) subscribe(subscribeValue)
  }

  return (
    <Footer>
      <div className="footer-inner">
          <div className="logo-line">
              <div className="sb-logo">
                  <img src={asset('', 'main-logo.svg')} alt="SBRemit" />
              </div>

              <div className="social-links">
                  <a
                      href="https://www.instagram.com/sb.remit"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'instagram.svg')} alt="instagram" />{' '}
                  </a>
                  <a
                      href="https://linkedin.com/SBremitt"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'linkedin.svg')} alt="linkedin" />{' '}
                  </a>
                  <a
                      href="https://facebook.com/SBremitt"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'facebook.svg')} alt="facebook" />{' '}
                  </a>
                  <a
                      href="https://twitter.com/SBremitt"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'twitter.svg')} alt="twitter" />{' '}
                  </a>
              </div>
          </div>

          <div className="copyright-line">
              <div className="text">© Copyright 2022 SB remit. All rights reserved</div>
          </div>

          <div className="main-area">
              <div className="nav-links">
                  <div className="footer-nav">
                      <div className="title">Company</div>

                      <ul className="links">
                          <li>
                              <Link to="/">About</Link>
                          </li>
                          <li>
                              <Link to="/">FAQs</Link>
                          </li>
                          <li>
                              <Link to="/">Blog</Link>
                          </li>
                      </ul>
                  </div>

                  <div className="footer-nav">
                      <div className="title">Legal</div>

                      <ul className="links">
                          <li>
                              <Link to="/">Privacy Policy</Link>
                          </li>
                          <li>
                              <Link to="/">Terms & Conditions</Link>
                          </li>
                      </ul>
                  </div>

                  <div className="footer-nav">
                      <div className="title">Contact us</div>

                      <ul className="links">
                          <li>
                              <Link to="/">+44(0)3301334158</Link>
                          </li>
                          <li>
                              <Link to="/">contactsbremit.com</Link>
                          </li>
                      </ul>
                  </div>
              </div>
              <div className="search-area">
                  <div className="title">Stay tuned for latest from SB Remit</div>
                  <div className="search-box">
                      <input type="text" className='search-input' placeholder='Enter your email' name="" id="" />

                      <button className="search-btn">Submit</button>
                  </div>
              </div>
          </div>

          <div className="summary-line">
              SB Remit is the trading name of Sukate & Bezeboh Ltd, registered in England and Wales, Company number 12735266, registered office 78 Woodlands Way, Leeds, LS14 2AW. Sukate & Bezeboh Ltd is registered and regulated in the United Kingdom by the Financial Conduct Authority under electronic money regulations 2011 with firm reference number 935783 for the provision of payment services. SB Remit, Canada, is registered and regulated by the Financial and Reporting Analysis Centre of Canada as a Foreign Money Service Business. FMSB registration number: M21646577.
          </div>
      </div>
    </Footer>
   
  )
}


 // <Footer>
    //   <div className="up">
    //     <div className="main">
    //       <div className="logo">
    //         <img src={asset('', 'main-logo.svg')} alt="main logo" />
    //       </div>
    //     </div>
    //     <div className="company-legal">
    //       <div className="company">
    //         <h3>Company</h3>
    //         <ul>
    //           <li onClick={() => history.push('/content/about')}>About</li>
    //           <li onClick={() => history.push(paths.SUPPORT + '#faq')}>FAQs</li>
    //           <li onClick={() => history.push('/')}>Blog</li>
    //         </ul>
    //       </div>
    //       <div className="legal">
    //         <h3>Legal</h3>
    //         <ul>
    //           <li onClick={() => history.push('/support/legal/privacy')}>
    //             Privacy
    //           </li>
    //           <li onClick={() => history.push('/support/legal/terms')}>
    //             Terms & Conditions
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //     <div className="contact">
    //       <h3
    //         className=" is-clickable"
    //         onClick={() => history.push(paths.CONTACT)}
    //       >
    //         Contact us
    //       </h3>
    //       <ul>
    //         <li>+44(0)3301334158</li>
    //         <li>contact@sbremit.com</li>
    //         <li className="socials">
    //         <a
    //             href="https://www.instagram.com/sb.remit"
    //             target="_blank"
    //             rel="noreferrer"
    //           >
    //             {' '}
    //             <img src={asset('icons', 'instagram.svg')} alt="instagram" />{' '}
    //           </a>
    //           {/* <a
    //             href=""
    //             target="_blank"
    //             rel="noreferrer"
    //           >
    //             {' '}
    //             <img src={asset('icons', 'linkedin.svg')} alt="linkedin" />{' '}
    //           </a> */}
    //           <a
    //             href="https://facebook.com/SBremitt"
    //             target="_blank"
    //             rel="noreferrer"
    //           >
    //             {' '}
    //             <img src={asset('icons', 'facebook.svg')} alt="facebook" />{' '}
    //           </a>
    //           {/* <a
    //             href=""
    //             target="_blank"
    //             rel="noreferrer"
    //           >
    //             {' '}
    //             <img src={asset('icons', 'twitter.svg')} alt="twitter" />{' '}
    //           </a> */}
    //         </li>
    //       </ul>
    //     </div>
    //     <div className="subscribe">
    //       <p>Stay tuned for latest news from SB Remit</p>
    //       <div>
    //         <input
    //           onChange={(e) => setSubscribeValue({ email: e.target.value })}
    //           type="email"
    //           placeholder="Enter your email"
    //         />
    //       </div>
    //       <div>
    //         <button onClick={() => handleSubscribeClick()}>Subscribe</button>
    //       </div>
    //     </div>
    //   </div>
    //   <hr />
    //   <div className="description">
    //     <p>
    //       SB Remit is the trading name of Sukate & Bezeboh Ltd, registered in
    //       England and Wales, Company number 12735266, registered office 78
    //       Woodlands Way, Leeds, LS14 2AW. Sukate & Bezeboh Ltd is registered and
    //       regulated in the United Kingdom by the Financial Conduct Authority
    //       under electronic money regulations 2011 with firm reference number
    //       935783 for the provision of payment services. SB Remit, Canada, is
    //       registered and regulated by the Financial and Reporting Analysis
    //       Centre of Canada as a Foreign Money Service Business. FMSB
    //       registration number: M21646577.
    //     </p>
    //   </div>
    //   <hr />
    //   <div className="copyright">
    //     &copy; Copyright 2022 SB remit. All rights reserved
    //   </div>
    // </Footer>