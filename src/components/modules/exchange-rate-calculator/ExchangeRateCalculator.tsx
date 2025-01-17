import _env from "env";
import { useEffect, useState } from "react";
import Container from "./ExchangeRateCalculator.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { paths } from "util/paths";
import {
  getSpreads,
  setNewQuoteWithoutAuth,
} from "../../../redux/actions/actions";
import { CookieService } from "../../../services/CookieService";
import {
  constants,
  countriesTransferMethodAvailability,
} from "../../../util/constants";
import { formatCurrency } from "../../../util/util";
import FancyToggle from "../fancy-toggle/FancyToggle";
import PromoCodeField from "../promo-code-field/PromoCodeField";
import Modal from "../modal/Modal";
import UpcomingCountries from "components/modules/upcoming-countries/UpcomingCountries";

const ExchangeRateCalculator = ({
  page,
  setTransferMethod,
  selectedTransferMethod,
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
  payOutCountries,
  ExchangeRateInput,
  user,
  userReferralDiscount,
}: any) => {
  const history = useHistory();
  const [openComingSoonModal, setOpenComingSoonModal] = useState(false);
  const transferMethodAvailability =
    countriesTransferMethodAvailability[transfer.toReceive.countryCode];
  const appValueCountries = useSelector(
    (state: any) => state.appValues.countries
  );
  const countryName = appValueCountries[transfer.toReceive.countryCode];

  useEffect(() => {
    getSpreads();
  }, []);

  const continueSending = () => {
    // if (constants.REMITTANCE_COUNTRIES_CODES.includes(toReceive?.countryCode)) {
    setNewQuoteWithoutAuth(toSend.currency, toReceive.currency, () =>
      history.push(
        CookieService.get("X-SERVICE_PROVIDER") === _env.X_SERVICE_PROVIDER
          ? paths.SIGN_IN
          : paths.SIGN_UP
      )
    );
    // } else {
    //     setOpenComingSoonModal(true)
    // }
  };

  const getPayInContries = (user: any) => {
    if (!user) return payInCountries;
    let countryName =
      appValueCountries[user?.profile?.location_country?.toUpperCase()];
    let countryCurrency = payInCountries[countryName];
    if (!payInCountries[countryName]) {
      countryName = "European Union";
      countryCurrency = "EUR";
    }

    return { [countryName]: countryCurrency };
  };

  return (
    <Container className="exchange-rate-calculator">
      <div className="calculator-inner">
        <div className="title">Choose how recipient gets the money</div>

        <div className="calculator-nav">
          <div className="options">
            <div
              onClick={() => setTransferMethod("mobile_money")}
              className={`option ${
                !transferMethodAvailability?.["mobile_money"] &&
                "is-unavailable-option"
              }  ${
                selectedTransferMethod === "mobile_money"
                  ? "selectedTM active"
                  : ""
              }`}
            >
              Mobile Money
            </div>

            <div
              onClick={() => setTransferMethod("bank_transfer")}
              className={`option ${
                !transferMethodAvailability?.["bank_transfer"] &&
                "is-unavailable-option"
              }  ${
                selectedTransferMethod === "bank_transfer"
                  ? "selectedTM active"
                  : ""
              }`}
            >
              Bank Transfer
            </div>

            <div
              onClick={() => setTransferMethod("cash_pickup")}
              className={`option ${
                !transferMethodAvailability?.["cash_pickup"] &&
                "is-unavailable-option"
              }  ${
                selectedTransferMethod === "cash_pickup"
                  ? "selectedTM active"
                  : ""
              }`}
            >
              Cash Pickup
            </div>
          </div>
        </div>

        <div className="simple-prompt">Enter an amount to send</div>
        {ExchangeRateInput({
          data: toSend,
          changedInput,
          setChangedInput: () => setChangedInput("toSend"),
          handleXInputChange,
          max:
            selectedTransferMethod !== constants.MOBILE_MONEY ? max : undefined,
          countries: getPayInContries(user),
        })}
        <div className="timeline">
          <div className="timeline-inner">
            <div className="bullet-points-container">
              <div className="dot top-dot"></div>

              <div className="transactional-points">
                <div className="point-icon">&times;</div>

                <div className="point-text">
                  <span
                    className={`deep-green green-txt ${
                      promo?.type === "FIXED_RATE" &&
                      isAcceptablePromoValue(promo)
                        ? "strikethrough"
                        : ""
                    }`}
                  >
                    1 {conversionRate.base} ={" "}
                    {formatCurrency(conversionRate?.rate)}{" "}
                    {conversionRate.target}
                  </span>
                </div>
              </div>

              {Boolean(Number(transfer.serviceFee)) && (
                <div className="transactional-points">
                  <div className="point-icon">+</div>

                  <div className="point-text">
                    <span
                      className={`${allowOperatorFee ? "" : "strikethrough"}`}
                    >
                      {" "}
                      <div
                        style={{ display: "inline" }}
                        dangerouslySetInnerHTML={{
                          __html: getTransferFeeText(selectedTransferMethod),
                        }}
                      ></div>{" "}
                      <span
                        className={`deep-green ${
                          promo?.type === "FREE_OPERATOR_FEE" &&
                          (isAcceptablePromoValue(promo) || !allowOperatorFee)
                            ? "strikethrough"
                            : ""
                        }`}
                      >
                        {transfer.serviceFee} {toSend.currency}
                      </span>
                    </span>
                  </div>
                </div>
              )}

              <div className="transactional-points">
                <div className="point-icon">-</div>

                <div className="point-text">
                  SB Remit charges you{" "}
                  <span className="green-txt"> 0.00 {toSend.currency} </span>{" "}
                  for this transfer
                </div>
              </div>

              {Boolean(
                Number(user?.referral?.useCount) ||
                  Number(user?.referral?.newUserBonusActive)
              ) && (
                <div className="transactional-points">
                  <div className="point-icon">-</div>

                  <div className="point-text">
                    Referral bonus{" "}
                    {
                      <span className="deep-green">
                        {" "}
                        {userReferralDiscount?.value} {toSend?.currency}{" "}
                      </span>
                    }
                  </div>
                </div>
              )}

              {promo && (
                <div className="transactional-points">
                  <div className="point-icon">-</div>

                  <div className="point-text">
                    Promo code{" "}
                    {promoText ? (
                      <span className="deep-green"> {promoText} </span>
                    ) : (

                    //   <span className="red-txt">
                    //     {" "}
                    //     *Spend btw: {promo?.settings?.minimumSpend}{" "}
                    //     {toSend.currency} and {promo?.settings?.maximumSpend}{" "}
                    //     {toSend.currency}{" "}
                    //   </span>

                      <>
                        <span className="deep-txt">
                          {promo?.settings?.baseCurrency != undefined ? (
                            <span>
                              {" "}
                              *1 {toSend.currency} = {promo?.settings?.rate}{" "}
                              {toReceive.currency}{" "}
                            </span>
                          ) : (
                            <span>
                              *Spend btw: {promo?.settings?.minimumSpend}{" "}
                              {toSend.currency} and{" "}
                              {promo?.settings?.maximumSpend} {toSend.currency}
                            </span>
                          )}{" "}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              )}

              <div className="transactional-points">
                <div className="point-icon red">=</div>

                <div className="point-text">
                  Total to pay{" "}
                  <span className="green-txt">
                    {" "}
                    {formatCurrency(`${toSend.total}`)} {toSend.currency}{" "}
                  </span>
                </div>
              </div>

              <div className="dot bottom-dot"></div>
            </div>
          </div>
        </div>

        {ExchangeRateInput({
          data: toReceive,
          changedInput,
          setChangedInput: () => setChangedInput("toReceive"),
          handleXInputChange,
          max:
            selectedTransferMethod === constants.MOBILE_MONEY ? max : undefined,
          key: "landingPageToRecieve",
          countries: payOutCountries,
        })}

        <div className="extras">
          <div className="extras-inner">
            <div className="promo-side">
              <PromoCodeField
                className="new-landing-page-promo-code-field"
                transfer={transfer}
              />
            </div>
            <div className="toggle-side">
              <div className="toggle">
                <FancyToggle
                  label="Include operator fee"
                  isActive={allowOperatorFee}
                  onChange={(e) =>
                    setAllowOperatorFee(Boolean(e.target.checked))
                  }
                />
              </div>
            </div>
          </div>
        </div>

        {/* <Modal component={() => <UpcomingCountries toSendFlag={toSend.image} toRecieveFlag={toReceive.countryCode} toSendCountry={countryName} setClose={() => setOpenComingSoonModal(false)} />} open={openComingSoonModal} setOpen={setOpenComingSoonModal} /> */}
        <button
          className="send-btn"
          onClick={() => {
            continueSending();
          }}
        >
          Start sending money
        </button>
      </div>
    </Container>
  );
};

export default ExchangeRateCalculator;
