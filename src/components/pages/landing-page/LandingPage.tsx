import Body from "./LandingPage.css";
import Table from "components/modules/table/Table";
import {
  customerFeedbackVideoItems,
  featureCompareTableData,
  getExchangeRateTableData,
  supportedCountriesListing,
} from "./LandingPage.helper";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import {
  getCompetitorRates,
  getQuoteService,
  getServiceRate,
  getServiceRateValue,
  updateAppValues,
} from "../../../redux/actions/actions";
import { TRANSFER } from "../../../redux/actionTypes";
import { paths } from "../../../util/paths";
import {
  asset,
  formatCurrency,
  getMax,
  getCountriesFiltered,
  getRemittanceHandler,
  scrollTo,
} from "../../../util/util";
import { constants } from "../../../util/constants";
import LandingPageExchangeRateInput from "components/modules/exchange-rate-input/LandingPageExchangeRateInput";
import { RESPONSIVE_TYPE_COLLAPSE_ALL } from "components/modules/table/ITable";
import ExchangeRateCalculator from "components/modules/exchange-rate-calculator/ExchangeRateCalculator";
import "react-slideshow-image/dist/styles.css";
import BackToTopButton from "components/modules/back-to-top/BackToTopButton";
import OwlCarousel from "components/modules/owl-carousel/OwlCarousel";
import { Helmet } from "react-helmet";

import { BsChevronDown, BsChevronRight, BsChevronUp } from "react-icons/bs";

const AboutDropdwonLinks = [
  {
    name: "Tutorials",
    link: paths.TUTORIALS,
  },
  {
    name: "Cameroon",
    link: paths.CAMEROON,
  },
  {
    name: "Kenya",
    link: paths.KENYA,
  },
  {
    name: "Uganda",
    link: paths.UGANDA,
  },
  {
    name: "Tanzania",
    link: paths.TANZANIA,
  },
];

const LandingPage = () => {
  const transfer = useSelector((state: any) => state.transfer);
  const history = useHistory();
  const appValues = useSelector((state: any) => state.appValues);

  const promo = transfer.promo;
  const [promoText, setPromoText] = useState("");

  const conversionRate = transfer.conversionRate;
  const toSend = transfer.toSend;
  const toReceive = transfer.toReceive;
  const [changedInput, setChangedInput]: any = useState(null);

  const [competitorRates, setCompetitorRates]: any = useState([]);

  let rate = conversionRate?.rate;
  if (
    promo?.type === "FIXED_RATE" &&
    toSend.currency === promo.settings.baseCurrency &&
    toReceive.currency === promo.settings.targetCurrency &&
    Number(toSend.value) >= Number(promo.settings.minimumSpend) &&
    Number(toSend.value) <= Number(promo.settings.maximumSpend)
  ) {
    rate = promo.settings.rate;
  }
  const serviceFee = Number(toSend.value)
    ? transfer.serviceFee
    : formatCurrency("0");
  const payInCountries = appValues.payInCountries;
  const payOutCountries = appValues.payOutCountries;

  const dispatch = useDispatch();

  const [selected, setSelected] = useState(
    transfer.transferMethod || "mobile_money"
  );
  const allowOperatorFee = transfer.allowOperatorFee;
  const max = getMax(selected, toReceive?.countryCode, toSend?.countryCode);

  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const setAllowOperatorFee = (allow: boolean) => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        allowOperatorFee: allow,
      },
    });
  };

  const setTransferMethod = (method: string) => {
    setSelected(method);
    dispatch({
      type: TRANSFER,
      payload: { ...transfer, transferMethod: method },
    });
  };

  useEffect(() => {
    getServiceRate(selected);
  }, [
    transfer.toSend,
    transfer.transferMethod,
    selected,
    transfer.allowOperatorFee,
    transfer.toSend.currency,
    rate,
  ]);

  useEffect(() => {
    setTransferMethod(selected);
  }, [
    transfer.toSend?.value,
    transfer.toReceive?.value,
    transfer.allowOperatorFee,
    rate,
  ]);

  useEffect(() => {
    setTransferMethod(selected);
    getQuoteService(toSend.currency, toReceive.currency);
    updateAppValues();
    getCompetitorRates(
      {
        baseCurrency: constants.COMPETITOR_RATES_BASE_CURRENCY,
        targetCurrency: constants.COMPETITOR_RATES_TARGET_CURRENCY,
        sendAmount: constants.COMPETITOR_RATES_COMPARE_AMOUNT,
      },
      setCompetitorRates
    );
  }, []);

  const handleXInputChange = (e: any, data: any) => {
    const caret = e.target.selectionStart;
    const element = e.target;
    window.requestAnimationFrame(() => {
      element.selectionStart = caret;
      element.selectionEnd = caret;
    });

    const value = e.target.value;

    if (value.split(".")[1]?.length > 2) {
      return;
    }

    if (isNaN(value)) {
      return;
    }

    let rate = conversionRate?.rate;
    if (
      promo?.type === "FIXED_RATE" &&
      toSend.currency === promo.settings.baseCurrency &&
      toReceive.currency === promo.settings.targetCurrency &&
      Number(value) >= Number(promo.settings.minimumSpend) &&
      Number(value) <= Number(promo.settings.maximumSpend)
    ) {
      rate = promo.settings.rate;
    }
    if (data.isSend) {
      if (
        promo?.type === "FIXED_RATE" &&
        toSend.currency === promo.settings.baseCurrency &&
        toReceive.currency === promo.settings.targetCurrency &&
        Number(value) >= Number(promo.settings.minimumSpend) &&
        Number(value) <= Number(promo.settings.maximumSpend)
      ) {
        rate = promo.settings.rate;
      }

      if (
        promo?.type === "FIXED_RATE" &&
        toSend.currency === promo.settings.baseCurrency &&
        toReceive.currency === promo.settings.targetCurrency &&
        Number(value) / promo.settings.rate >=
          Number(promo.settings.minimumSpend) &&
        Number(value) / promo.settings.rate <=
          Number(promo.settings.maximumSpend)
      ) {
        rate = promo.settings.rate;
      } else {
        setPromoText("");
      }

      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          toSend: {
            ...toSend,
            adjusted: getAdjustedValue(
              value,
              value * rate,
              allowOperatorFee,
              selected,
              false
            ),
            value: `${value}`,
          },
          toReceive: {
            ...toReceive,
            value: `${value * rate}`,
            total: getAdjustedValue(
              value * rate,
              value * rate,
              allowOperatorFee,
              selected,
              true
            ),
          },
        },
      });
    } else {
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          toSend: {
            ...toSend,
            adjusted: getAdjustedValue(
              value / rate,
              value,
              allowOperatorFee,
              selected,
              false
            ),
            value: `${(value / rate).toFixed(2)}`,
          },
          toReceive: {
            ...toReceive,
            value: `${value}`,
            total: getAdjustedValue(
              value,
              value,
              allowOperatorFee,
              selected,
              true
            ),
          },
        },
      });
    }
  };

  const getTransferFeeText = (selectedMethod: string) => {
    const texts: any = {
      mobile_money: `Mobile Operator <a href="/mobile-money-rate" class='light-green click-hover-tab'>Cash Out Fee </a>`,
      bank_transfer: "Bank Pay Out Fee: ",
      cash_pickup: "Cash Pick-up Fee: ",
    };

    return texts[selectedMethod];
  };

  useEffect(() => {
    setTotalValue();
  }, [
    promo,
    toSend.value,
    toReceive.value,
    serviceFee,
    promo?.code,
    transfer.allowOperatorFee,
    rate,
  ]);

  const mutateInputValueDirectly = (rate: any) => {
    if (changedInput === "toSend") {
      toReceive.value = Number(toSend.value) * Number(rate);
    } else if (changedInput === "toReceive") {
      toSend.value = (Number(toReceive.value) / Number(rate)).toFixed(2);
    } else {
    }
  };

  const setTotalValue = () => {
    let total = Number(toSend.value) + Number(serviceFee);

    if (promo && isAcceptablePromoValue(promo)) {
      switch (promo.type) {
        case "PERCENTAGE":
          total = total - (Number(promo.settings.percentage) * total) / 100;
          setPromoText(`${promo.settings.percentage}% off`);
          break;
        case "FIXED_AMOUNT":
          total = total - Number(promo.settings.discountAmount);
          setPromoText(
            `${promo.settings.discountAmount}${toSend.currency} off`
          );
          break;
        case "FIXED_RATE":
          if (
            toSend.currency === promo.settings.baseCurrency &&
            toReceive.currency === promo.settings.targetCurrency
          ) {
            setPromoText(
              `1 ${promo.settings.baseCurrency} = ${promo.settings.rate} ${promo.settings.targetCurrency} fixed rate`
            );
            mutateInputValueDirectly(promo.settings.rate);
          } else {
            mutateInputValueDirectly(conversionRate?.rate);
          }
          break;
        case "FREE_OPERATOR_FEE":
          setPromoText(`0.00${toSend.currency} Operator Fee`);
          total = Number(toSend.value);
          break;
        default:
          setPromoText("");
          mutateInputValueDirectly(conversionRate?.rate);
          total = total * 1;
      }
    } else {
      setPromoText("");
      mutateInputValueDirectly(conversionRate?.rate);
    }
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        toSend: {
          ...toSend,
          adjusted: getAdjustedValue(
            toSend.value,
            toReceive.value,
            allowOperatorFee,
            selected,
            false
          ),
          total: `${total}`,
        },
        toReceive: {
          ...toReceive,
          total: getAdjustedValue(
            toReceive.value,
            toReceive.value,
            allowOperatorFee,
            selected,
            true
          ),
        },
        remittanceHandler: getRemittanceHandler(transfer),
      },
    });
  };

  const getAdjustedValue = (
    value: any,
    toRecieveValue: any,
    allowOperatorFee: any,
    transferMethod: any,
    isRecipientsValue: boolean
  ) => {
    value = Number(value);
    let adjustment = 0;
    if (allowOperatorFee || transferMethod === "mobile_money") {
      if (
        allowOperatorFee &&
        transferMethod === "mobile_money" &&
        isRecipientsValue
      ) {
        adjustment = Number(
          getServiceRateValue(
            toRecieveValue,
            transferMethod,
            isRecipientsValue,
            false
          )
        );
      }
    } else {
      adjustment =
        0 -
        Number(
          getServiceRateValue(
            toRecieveValue,
            transferMethod,
            isRecipientsValue,
            false
          )
        );
    }
    return Number(value) + adjustment;
  };

  const isAcceptablePromoValue = (promo: any) => {
    return (
      Number(toSend.value) >= Number(promo.settings.minimumSpend) &&
      Number(toSend.value) <= Number(promo.settings.maximumSpend)
    );
  };

  const calculatorProps = {
    page: "landing",
    setTransferMethod,
    selectedTransferMethod: selected,
    toSend,
    changedInput,
    setChangedInput,
    handleXInputChange,
    max,
    payInCountries,
    promo,
    isAcceptablePromoValue,
    conversionRate,
    transfer,
    allowOperatorFee,
    promoText,
    toReceive,
    getTransferFeeText,
    setAllowOperatorFee,
    payOutCountries: getCountriesFiltered(payOutCountries),
    ExchangeRateInput: LandingPageExchangeRateInput,
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Body>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Homepage | SB Remit</title>
        <meta
          name="keywords"
          content="money transfer,
                money transfer from uk,
                send money to africa,
                remit,
                money transfer to africa,
                transferring money to africa,
                money remittance company,"
        />
        <meta
          name="description"
          content="
                SB Remit provides a quick, easy, and secure way for businesses and individuals to transfer money, 
                primarily to and from Africa. Learn more about us today.
                "
        />
        <meta
          name="variation"
          content="send money to africa,
                  remit,
                  money transfer to africa,
                  transferring money to africa,
                  money remittance company"
        />
        <meta name="question" content="What are the means of money transfer?" />
        <meta
          name="queries"
          content="How do you transfer money from UK to Africa?"
        />
      </Helmet>
      <main id="hero" className={`${mobileNavOpen && "mobile-nav-open"} `}>
        <div className="main-inner">
          <nav className={`nav ${mobileNavOpen && "mobile-nav-open"} `}>
            <div className="logo-container">
              <div className="img-wrapper">
                <img
                  src={asset("", "sb-remit-logo.svg")}
                  alt="SB Remit Logo"
                  className="logo"
                />
              </div>
            </div>
            <div className="content-links">
              <div className="content-links-wrapper">
                <span className="link">
                  <div className="about-link" onMouseEnter={handleMouseEnter}>
                    <Link to={paths.ABOUT}>About</Link>
                    <div className="dropdown-icon">
                      {isHovered ? <BsChevronUp /> : <BsChevronDown />}
                    </div>
                  </div>
                  <div
                    className={
                      isHovered
                        ? "about-dropdown-links"
                        : "hide-about-dropdown-links"
                    }
                    onMouseLeave={handleMouseLeave}
                  >
                    {AboutDropdwonLinks.map((link, index) => (
                      <div
                        className="dropdwon-link"
                        key={index}
                        onClick={() => history.push(link.link)}
                      >
                        <span>{link.name}</span>
                        <div className="active-link-indicator"></div>
                      </div>
                    ))}
                  </div>
                </span>

                <span className="link">
                  <Link to={paths.CONTACT}>Contact</Link>
                </span>

                {/* <span className="link">
                  <Link to={paths.BLOG}>Blog</Link>
                </span> */}

                <span className="link">
                  <Link to={paths.SUPPORT}>Support</Link>
                </span>
              </div>
            </div>

            <div className="auth-links">
              <div className="auth-links-inner">
                <button
                  className="sign-in is-link link mobile-hide"
                  onClick={() => history.push(paths.SIGN_IN)}
                >
                  Log in
                </button>

                <button
                  className="sign-up is-link mobile-hide"
                  onClick={() => history.push(paths.SIGN_UP)}
                >
                  Sign up
                </button>

                {!mobileNavOpen ? (
                  <span
                    className="desktop-hide"
                    onClick={() => setMobileNavOpen(true)}
                  >
                    <img
                      src={asset("icons", "white-hamburger-menu.svg")}
                      alt="menu"
                    />
                  </span>
                ) : (
                  <span
                    className="desktop-hide mobile-nav-close-x"
                    onClick={() => setMobileNavOpen(false)}
                  >
                    &times;
                  </span>
                )}
              </div>
            </div>

            <div className="auth-btns desktop-hide">
              <div className="inner">
                <div>Start sending money</div>

                <div className="btns">
                  <button
                    className="login-btn"
                    onClick={() => history.push(paths.SIGN_IN)}
                  >
                    Login
                  </button>
                  <button
                    className="signup-btn"
                    onClick={() => history.push(paths.SIGN_UP)}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {mobileNavOpen && (
            <div className="mobile-nav">
              <div className="mobile-nav-inner">
                <ul className="links-container">
                  <li className="nav-link">
                    <span className="text">
                      <div className="mobile-about-link">
                        <div className="mobile-about-link-text">
                          <span onClick={() => history.push(paths.ABOUT)}>
                            About
                          </span>
                          <span
                            className="icon"
                            onClick={() => setIsHovered(!isHovered)}
                          >
                            {isHovered ? <BsChevronUp /> : <BsChevronDown />}
                          </span>
                        </div>

                        <div
                          className={
                            isHovered
                              ? "about-dropdown-links"
                              : "hide-about-dropdown-links"
                          }
                          onMouseLeave={handleMouseLeave}
                        >
                          {AboutDropdwonLinks.map((link, index) => (
                            <div
                              className="dropdwon-link"
                              key={index}
                              onClick={() => history.push(link.link)}
                            >
                              <span>{link.name}</span>
                              <BsChevronRight />
                            </div>
                          ))}
                        </div>
                      </div>
                    </span>
                  </li>

                  <li
                    className="nav-link"
                    onClick={() => history.push(paths.CONTACT)}
                  >
                    <span className="text">Contact</span>
                    <span className="icon">
                      <img
                        src={asset("icons", "black-caret-right.svg")}
                        alt="caret"
                      />
                    </span>
                  </li>

                  {/* <li
                    className="nav-link"
                    onClick={() => history.push(paths.BLOG)}
                  >
                    <span className="text">Blog</span>
                    <span className="icon">
                      <img
                        src={asset("icons", "black-caret-right.svg")}
                        alt="caret"
                      />
                    </span>
                  </li> */}

                  <li
                    className="nav-link"
                    onClick={() => history.push(paths.SUPPORT)}
                  >
                    <span className="text">Support</span>
                    <span className="icon">
                      <img
                        src={asset("icons", "black-caret-right.svg")}
                        alt="caret"
                      />
                    </span>
                  </li>
                </ul>

                <div className="nav-foot">
                  <div className="foot-text">Don’t have an account?</div>

                  <div className="foot-btn">
                    <button onClick={() => history.push(paths.SIGN_UP)}>
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="hero">
            <div className="hero-inner">
              <div className="left">
                <h2 className="hero-heading">
                  A Money Transfer Solution You Can Trust
                </h2>
                <p className="hero-text">
                  A low cost means of sending money which is fast, secure and
                  reliable with multiple delivery options
                </p>

                <div className="app-logos">
                  <a
                    className="app-logo-link"
                    href="https://apps.apple.com/gb/app/sb-remit-money-transfer/id6443882446 "
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img src={asset("logos", "apple.png")} alt="App Store" />
                  </a>
                  <a
                    className="app-logo-link"
                    href="https://play.google.com/store/apps/details?id=com.sbremit&gl=GB&authuser=1"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={asset("logos", "android.png")}
                      alt="Google Play"
                    />
                  </a>
                </div>

                <div className="hero-fca-container">
                  {/* <button className="hero-fca">
                                    We are FCA Regulated, learn what this means <img src={asset('icons', 'round-yellow-arrow-right.svg')} alt="" />
                                </button>                                 
                                */}
                </div>
              </div>
              <div className="right">
                <div className="right-inner">
                  <ExchangeRateCalculator {...calculatorProps} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="background-circle bg-circle-up"></div>
        <div className="bg-circle-container">
          <div className="background-circle bg-circle-down"></div>
        </div>
      </main>

      <section className="countries-remit" id="countries">
        <div className="section-inner">
          <h2 className="heading">
            Transferring money to Africa? We remit to:
          </h2>
          <div className="subheading">We transfer from UK and Canada to:</div>

          <div className="listings">
            {supportedCountriesListing.map((listing: any) => (
              <div className="listing">
                <div className="listing-inner">
                  <div className="img-container">
                    <img
                      src={asset("flags", listing.flag)}
                      srcSet={`${asset("flags", listing.flag)} 2x`}
                      alt={listing.name}
                      loading="lazy"
                    />
                  </div>

                  <div className="text">{listing.name}</div>
                </div>
                <div
                  className={`checkmark ${
                    listing.active ? "active" : "inactive"
                  }`}
                >
                  {listing.active ? (
                    <img src={asset("icons", "green-checkmark.svg")} alt="" />
                  ) : (
                    "Coming soon"
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="big-image">
          <img src={asset("images", "dotted-globe.svg")} alt="countries-map" />
        </div>
        <div className="register-interest">
          We are constantly adding more countries to the list.{" "}
          <span className="register-interest-link green-txt">
            <Link to={paths.REGISTER_COUNTRY}>Register your interest</Link>
          </span>
        </div>
      </section>

      <section className="we-are-different" id="we-are-different">
        <div className="section-inner">
          <h2 className="heading">
            What makes SB Remit different from its competitors?
          </h2>

          <div className="points-list">
            <div className="point-container">
              <div className="point">
                <div className="icon-side">
                  <div className="icon-wrapper">
                    <img
                      src={asset("icons", "no-fee.svg")}
                      alt="no-fee"
                      className="icon"
                    />
                  </div>
                </div>
                <div className="text-side">
                  <div className="title">
                    <h4>No fee</h4>
                  </div>
                  <div className="text">
                    Zero transaction fees for all your transfers - meaning more
                    money gets to your recipient.
                  </div>
                </div>
              </div>
            </div>

            <div className="point-container">
              <div className="point">
                <div className="icon-side">
                  <div className="icon-wrapper">
                    <img
                      src={asset("icons", "transfer-point.svg")}
                      alt="no-fee"
                      className="icon"
                    />
                  </div>
                </div>
                <div className="text-side">
                  <div className="title">
                    <h4>Excellent exchange rate</h4>
                  </div>
                  <div className="text">
                    Our exchange rates are the best in the market.{" "}
                    <span
                      className="green-txt bold is-link"
                      onClick={() =>
                        scrollTo(".landing-page-compare-exchange-rates-table")
                      }
                    >
                      Click here
                    </span>{" "}
                    to see how we are better than our competitors.
                  </div>
                </div>
              </div>
            </div>

            <div className="point-container">
              <div className="point">
                <div className="icon-side">
                  <div className="icon-wrapper">
                    <img
                      src={asset("icons", "cash-point.svg")}
                      alt="no-fee"
                      className="icon"
                    />
                  </div>
                </div>
                <div className="text-side">
                  <div className="title">
                    <h4>Multiple delivery options</h4>
                  </div>
                  <div className="text">
                    Mobile money, bank transfer, and cash pickup.{" "}
                    <span
                      className="green-txt bold is-link"
                      onClick={() =>
                        scrollTo(".landing-page-compare-features-table")
                      }
                    >
                      Click here
                    </span>{" "}
                    to see how we compare with our competitors
                  </div>
                </div>
              </div>
            </div>

            <div className="point-container">
              <div className="point">
                <div className="icon-side">
                  <div className="icon-wrapper">
                    <img
                      src={asset("icons", "money.svg")}
                      alt="no-fee"
                      className="icon"
                    />
                  </div>
                </div>
                <div className="text-side">
                  <div className="title">
                    <h4>No hidden cost</h4>
                  </div>
                  <div className="text">
                    We take pride in being the most transparent money remittance
                    company with no hidden surprise costs.
                  </div>
                </div>
              </div>
            </div>

            <div className="point-container">
              <div className="point">
                <div className="icon-side">
                  <div className="icon-wrapper">
                    <img
                      src={asset("icons", "friendly.svg")}
                      alt="no-fee"
                      className="icon"
                    />
                  </div>
                </div>
                <div className="text-side">
                  <div className="title">
                    <h4>Customer friendly</h4>
                  </div>
                  <div className="text">
                    Customer friendly experience that is completely transparent
                    at all transfer steps.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="transfer-methods" id="transfer-methods">
        <div className="section-inner">
          <h2 className="heading">How we make a transfer</h2>
          <div className="subheading">
            Make a transfer in a few simple steps once you sign up
          </div>

          <div className="methods">
            <div className="method-step">
              <div className="image-up">
                <img
                  src={asset("images", "transfer-methods-step-1.png")}
                  alt="step-1"
                />
              </div>
              <div className="text-down">
                <div className="step-title step-number">Step 1</div>
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
                    <div className="instruction">
                      Amount recipients receives
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="method-step">
              <div className="image-up">
                <img
                  src={asset("images", "transfer-methods-step-2.png")}
                  alt="step-2"
                />
              </div>
              <div className="text-down">
                <div className="step-title step-number">Step 2</div>
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
                <img
                  src={asset("images", "transfer-methods-step-3.png")}
                  alt="step-3"
                />
              </div>
              <div className="text-down">
                <div className="step-title step-number">Step 3</div>
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
                    <div className="instruction">
                      Amount recipients receives
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="method-step">
              <div className="image-up">
                <img
                  src={asset("images", "transfer-methods-step-4.png")}
                  alt="step-4"
                />
              </div>
              <div className="text-down">
                <div className="step-title step-number">Step 4</div>
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
                    <div className="instruction">
                      Amount recipients receives
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="compare" id="compare">
        <div className="section-inner">
          <h2 className="heading">Compare exchange rates</h2>

          {/* <div className="btn-div">
                    <button className="compare-btn">
                        Sending {constants.COMPETITOR_RATES_COMPARE_AMOUNT} GBP with....
                    </button>
                </div> */}

          <div className="table">
            <Table
              rows={getExchangeRateTableData(competitorRates).rows}
              headings={getExchangeRateTableData(competitorRates).heading}
              config={{
                customClassName:
                  "landing-page-table landing-page-compare-exchange-rates-table",
                cellSpacing: 0,
                cellPadding: 0,
                responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
              }}
            />

            <div
              className="align-center is-link green-txt light-green-bg br-10 mt-20 mx-auto fit-content p-5 px-10"
              onClick={() =>
                history.push(paths.LEGAL + "/terms?gotosection=section_17")
              }
            >
              To see how we collected this data, please click here
            </div>
          </div>

          <h2 className="heading">How we compare with others</h2>

          <div className="table">
            <Table
              rows={featureCompareTableData.rows}
              headings={featureCompareTableData.heading}
              config={{
                customClassName:
                  "landing-page-table landing-page-compare-features-table",
                cellSpacing: 0,
                cellPadding: 0,
                responsiveType: RESPONSIVE_TYPE_COLLAPSE_ALL,
                targetHeadingLineForMobileResponsiveness: 1,
              }}
            />
          </div>
        </div>
      </section>

      <section className="partners" id="partners">
        <div className="section-inner">
          <div className="small-heading">OUR PARTNERS</div>

          <div className="partner-listing">
            <img
              src={asset("logos", "trust-payment.png")}
              alt="trust-payment"
            />
            <img src={asset("logos", "twilio.png")} alt="twilio" />
            <img src={asset("logos", "trulioo.png")} alt="trulioo" />
            <img src={asset("logos", "ifx.png")} alt="ifx" />
            <img src={asset("logos", "gimac.png")} alt="gimac" />
            <img src={asset("logos", "fixer.png")} alt="fixer" />
          </div>
        </div>
      </section>

      <section className="happy-customers" id="happy-customers">
        <div className="section-inner">
          <h2 className="heading">What our customers are saying</h2>

          <div className="image-container">
            {/* <img src={asset('images', 'happy-customer-1.png')} className="happy-customer" alt="happy-customer" /> */}
            {/* <video className="happy-customer" poster="http://images.fineartamerica.com/images-medium-large/starry-night-alex-ruiz.jpg" controls> */}
            {/* <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" type="video/mp4" /> */}
            {/* <source src="movie.ogg" type="video/ogg" /> */}
            {/* </video> */}

            <OwlCarousel items={customerFeedbackVideoItems} />
            <img
              src={asset("icons", "white-round-arrow-right.svg")}
              alt="arrow"
              className="next-icon"
            />
          </div>

          <div className="testimonials">
            <div className="arrow left-arrow">
              {/* <img src={asset('icons', 'black-round-arrow-left.svg')} alt="arrow" /> */}
            </div>

            <div className="testimonial-cards">
              <div className="testimonial-card">
                <img
                  src={asset("icons", "big-quote.svg")}
                  alt="big-quote"
                  className="big-quote"
                />

                <p className="text">
                  They are very efficient and always helpful. The Set up process
                  for their app was very easy and rapid. They are easy and
                  straight forward to contact directly, and also responsive. I
                  will recommend them for their excellent customer service and
                  professionalism. For the past two years, I have been able to
                  send money to family and my business in Cameroon at the touch
                  of a button with assurance and security. I have never had any
                  issue with any of my transactions.
                </p>

                <div className="customer">
                  <div className="name">Charles Mambo</div>
                  <div className="from">(London)</div>
                </div>
              </div>

              <div className="testimonial-card">
                <img
                  src={asset("icons", "big-quote.svg")}
                  alt="big-quote"
                  className="big-quote"
                />

                <p className="text">
                  Excellent customer service! Prompt and efficient communication
                  and a really easy way to transfer funds. SB Remit offers great
                  rates and the staff is always helpful, courteous and pleasant
                  to work with. SB Remit makes money transfer a walk in the
                  park!
                </p>

                <div className="customer">
                  <div className="name">Cynthia</div>
                  <div className="from">(London)</div>
                </div>
              </div>

              <div className="testimonial-card">
                <img
                  src={asset("icons", "big-quote.svg")}
                  alt="big-quote"
                  className="big-quote"
                />

                <p className="text">
                  I have been using SB remit to send money back home since May
                  2021. The service is great every time, and now even better
                  with the launch of their website. The registration process is
                  easy and straightforward. I am most impressed by how quickly
                  my loved ones receive their money. Literally a few minutes
                  after sending.
                </p>

                <div className="customer">
                  <div className="name">Tina Ntube</div>
                  <div className="from">(London)</div>
                </div>
              </div>
            </div>

            <div className="arrow right-arrow">
              {/* <img src={asset('icons', 'black-round-arrow-right.svg')} alt="arrow" /> */}
            </div>
          </div>

          {/* <div className="scroll-dots">
                    <div className="dot active"></div>
                    <div className="dot"></div>
                </div> */}
        </div>
        <div className="section-behind-overlap"></div>
      </section>
      <BackToTopButton />
    </Body>
  );
};

export default LandingPage;
