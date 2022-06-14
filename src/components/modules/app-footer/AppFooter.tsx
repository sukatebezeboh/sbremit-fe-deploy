import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import Footer from './AppFooter.css'
import { subscribe } from '../../../redux/actions/actions'
import { paths } from '../../../util/paths'
import { asset } from '../../../util/util'




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
                  <img src={asset('', 'main-logo-white.svg')} alt="SBRemit" />
              </div>

              <div className="social-links">
                  <a
                      href="https://www.instagram.com/sb.remit"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'instagram.svg')} alt="instagram" />{' '}
                  </a>
                  {/* <a
                      href="https://linkedin.com/SBremitt"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'linkedin.svg')} alt="linkedin" />{' '}
                  </a> */}
                  <a
                      href="https://facebook.com/SBremitt"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'facebook.svg')} alt="facebook" />{' '}
                  </a>
                  {/* <a
                      href="https://twitter.com/SBremitt"
                      target="_blank"
                      rel="noreferrer"
                  >
                      <img src={asset('icons', 'twitter.svg')} alt="twitter" />{' '}
                  </a> */}
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
                              <Link to={paths.ABOUT}>About</Link>
                          </li>
                          <li>
                              <Link to={paths.SUPPORT}>FAQs</Link>
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
                              <Link to={paths.PRIVACY_POLICY}>Privacy Policy</Link>
                          </li>
                          <li>
                              <Link to={paths.TERMS}>Terms & Conditions</Link>
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
                              <Link to="/">contact@sbremit.com</Link>
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