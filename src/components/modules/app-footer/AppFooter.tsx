import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { subscribe } from '../../../redux/actions/actions'
import { paths } from '../../../util/paths'
import { asset } from '../../../util/util'

const Footer = styled.div`
  padding: 76px 5% 30px;
  background: #007b5d;
  font: normal normal normal 18px Montserrat;
  color: #cccccc;
  font-size: 16px;
  .up {
    display: grid;
    grid-template-columns: 2fr 2fr 1fr 3.5fr;
    grid-gap: 85px;
    .main {
      align-self: center;
      .logo {
        img {
          width: 214px;
          height: 50px;
          -webkit-filter: invert(0%) sepia(21%) saturate(28%) hue-rotate(346deg)
            brightness(204%) contrast(97%);
          filter: invert(0%) sepia(0%) saturate(45%) hue-rotate(1deg)
            brightness(300%) contrast(400%);
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
        cursor: pointer;
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
        color: #ffffff;
        padding: 0px;
        margin: 0px;
      }
      div {
        input {
          margin: 20px 0px;
          background: #ffffff 0% 0% no-repeat padding-box;
          border-radius: 5px;
          border: none;
          padding: 13px 20px;
          font: normal normal normal 18px Montserrat;
          letter-spacing: 0.45px;
          color: #a3a3a3;
          width: 90%;
          outline: none;
        }
        button {
          margin: 10px 0px;
          padding: 13px 20px;
          font: normal normal normal 18px/22px Montserrat;
          letter-spacing: 0.45px;
          color: #424242;
          background: #fcd20f 0% 0% no-repeat padding-box;
          border-radius: 8px;
          border: none;
        }
      }
    }
  }
  .description {
    p {
      margin: 0;
    }
  }
  hr {
    border: none;
    border-top: 1px solid #f5f7f7;
    border-radius: 8px;
    opacity: 0.2;
    margin-top: 50px;
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
      font-size: 13px !important;
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
            color: #a3a3a3;
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
  @media only screen and (max-width: 600px) {
    p {
      font-size: 13px;
    }
    .copyright {
      font-size: 12px;
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
      <div className="up">
        <div className="main">
          <div className="logo">
            <img src={asset('', 'main-logo.svg')} alt="main logo" />
          </div>
        </div>
        <div className="company-legal">
          <div className="company">
            <h3>Company</h3>
            <ul>
              <li onClick={() => history.push('/content/about')}>About</li>
              <li onClick={() => history.push(paths.SUPPORT + '#faq')}>FAQs</li>
              <li onClick={() => history.push('/')}>Blog</li>
            </ul>
          </div>
          <div className="legal">
            <h3>Legal</h3>
            <ul>
              <li onClick={() => history.push('/support/legal/privacy')}>
                Privacy
              </li>
              <li onClick={() => history.push('/support/legal/terms')}>
                Terms & Conditions
              </li>
            </ul>
          </div>
        </div>
        <div className="contact">
          <h3
            className=" is-clickable"
            onClick={() => history.push(paths.CONTACT)}
          >
            Contact us
          </h3>
          <ul>
            <li>+44(0)3301334158</li>
            <li>contact@sbremit.com</li>
            <li className="socials">
              <img src={asset('icons', 'instagram.svg')} alt="instagram" />
              <img src={asset('icons', 'linkedin.svg')} alt="linkedin" />
              <a
                href="https://facebook.com/SBremitt"
                target="_blank"
                rel="noreferrer"
              >
                {' '}
                <img src={asset('icons', 'facebook.svg')} alt="facebook" />{' '}
              </a>
              <img src={asset('icons', 'twitter.svg')} alt="twitter" />
            </li>
          </ul>
        </div>
        <div className="subscribe">
          <p>Stay tuned for latest news from SB Remit</p>
          <div>
            <input
              onChange={(e) => setSubscribeValue({ email: e.target.value })}
              type="email"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <button onClick={() => handleSubscribeClick()}>Subscribe</button>
          </div>
        </div>
      </div>
      <hr />
      <div className="description">
        <p>
          SB Remit is the trading name of Sukate & Bezeboh Ltd, registered in
          England and Wales, Company number 12735266, registered office 78
          Woodlands Way, Leeds, LS14 2AW. Sukate & Bezeboh Ltd is registered and
          regulated in the United Kingdom by the Financial Conduct Authority
          under electronic money regulations 2011 with firm reference number
          935783 for the provision of payment services. SB Remit, Canada, is
          registered and regulated by the Financial and Reporting Analysis
          Centre of Canada as a Foreign Money Service Business. FMSB
          registration number: M21646577.
        </p>
      </div>
      <hr />
      <div className="copyright">
        &copy; Copyright 2022 SB remit. All rights reserved
      </div>
    </Footer>
  )
}
