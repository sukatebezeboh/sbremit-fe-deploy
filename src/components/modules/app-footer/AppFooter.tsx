import React, { useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./AppFooter.css";
import {
  editUserSettingsAction,
  subscribe,
} from "../../../redux/actions/actions";
import { paths } from "../../../util/paths";
import { asset } from "../../../util/util";
import FooterStickyBanner from "../footer-sticky-banner/FooterStickyBanner";
import CookieNotice from "../cookie-notice/CookieNotice";
import { CookieService } from "services/CookieService";
import { useSelector } from "react-redux";

export const AppFooter = () => {
  const user = useSelector((state: any) => state.auth.user);

  const [subscribeValue, setSubscribeValue] = useState<{ email: string }>({
    email: "",
  });

  const [showCookieNotice, setShowCookieNotice] = useState(
    () => !CookieService.get("cookie-notice")
  );

  const handleSubscribeClick = () => {
    if (subscribeValue.email) subscribe(subscribeValue);
  };

  const handleUnsubscribeClick = () => {
    editUserSettingsAction({
      marketingPermissions: false,
    });
  };

  return (
    <Footer>
      {showCookieNotice && (
        <FooterStickyBanner>
          <CookieNotice close={() => setShowCookieNotice(false)} />
        </FooterStickyBanner>
      )}
      <div className="footer-inner">
        <div className="logo-line">
          <div className="sb-logo">
            <img src={asset("", "main-logo-white.svg")} alt="SBRemit" />
          </div>

          <div className="social-links">
            <a
              href="https://www.instagram.com/sb.remit"
              target="_blank"
              rel="noreferrer"
            >
              <img src={asset("icons", "instagram.svg")} alt="instagram" />{" "}
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
              <img src={asset("icons", "facebook.svg")} alt="facebook" />{" "}
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
          <div className="text">
            © Copyright 2022 SB remit. All rights reserved
          </div>
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
              <div className="title">About</div>

              <ul className="links">
                <li>
                  <Link to={paths.TUTORIALS}>Tutorials</Link>
                </li>
                <li>
                  <Link to={paths.CAMEROON}>Cameroon</Link>
                </li>
                <li>
                  <Link to={paths.KENYA}>Kenya</Link>
                </li>
                <li>
                  <Link to={paths.UGANDA}>Uganda</Link>
                </li>
                <li>
                  <Link to={paths.TANZANIA}>Tanzania</Link>
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
                <li>
                  <Link to={paths.COOKIE_POLICY}>Cookie Policy</Link>
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
              <input
                type="text"
                className="search-input"
                placeholder="Enter your email"
                name=""
                id=""
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setSubscribeValue({ email: e.target.value })
                }
              />

              <button className="search-btn" onClick={handleSubscribeClick}>
                Submit
              </button>
            </div>
            {user && user.settings.marketingPermissions && (
              <span
                className="underline unsubscribe-text"
                onClick={() => handleUnsubscribeClick()}
              >
                Unsubscribe
              </span>
            )}
          </div>
        </div>

        <div className="summary-line">
          SB Remit is the trading name of Sukate & Bezeboh Ltd, registered in
          England and Wales, Company number 12735266, registered office 78
          Woodlands Way, Leeds, LS14 2AW. Sukate & Bezeboh Ltd is registered and
          regulated in the United Kingdom by the Financial Conduct Authority
          under electronic money regulations 2011 with firm reference number
          935783 for the provision of payment services. SB Remit, Canada, is
          registered and regulated by the Financial and Reporting Analysis
          Centre of Canada as a Foreign Money Service Business. FMSB
          registration number: M21646577.
        </div>
      </div>
    </Footer>
  );
};
