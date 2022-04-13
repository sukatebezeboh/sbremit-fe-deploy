import _env from 'env';
import React from 'react'
import { useHistory } from 'react-router-dom';
import { paths } from 'util/paths';
import { setNewQuoteWithoutAuth } from '../../../redux/actions/actions';
import { CookieService } from '../../../services/CookieService';
import { constants } from '../../../util/constants';
import { formatCurrency } from '../../../util/util';
import LandingPageExchangeRateInput from '../exchange-rate-input/LandingPageExchangeRateInput';
import FancyToggle from '../parts/FancyToggle';
import PromoCodeField from '../promo-code-field/PromoCodeField';
import styled from 'styled-components'


const Container = styled.div`
    &.exchange-rate-calculator { 
        max-width: 600px;
        min-width: 300px;
        background: #FFFFFF;
        border: 0.3px solid rgba(10, 14, 13, 0.2);
        box-shadow: 0px 4px 16px #03523C;
        border-radius: 12px;
        margin: auto;
        @media only screen and (max-width: 900px) {
            margin: 20px auto 50px;
            width: 100%;
            min-width: 0;
        }
        .calculator-inner { 

            .title { 
                font-weight: 400;
                font-size: 21px;
                line-height: 29px;
                padding: 16px 10px;
                color: #0A0E0D;
                width: fit-content;
                margin: auto;

                @media only screen and (max-width: 900px) {
                    font-size: 16px;
                }
            }

            .calculator-nav { 
                .options { 
                    display: flex;
                    gap: 10%;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.22);
                    .option { 
                        flex: 1;
                        text-align: center;
                        padding: 8px;
                        cursor: pointer;
                        font-weight: 400;
                        font-size: 14px;
                        line-height: 17px;
                        color: #0A0E0D;
                        @media only screen and (max-width: 900px) {
                            font-size: 12px;
                            line-height: 15px;
                        }
                        &.active {
                            border-bottom: 1.5px solid #007B5D;
                        }
                    }
                }
            }

            .simple-prompt { 
                font-weight: 400;
                font-size: 16px;
                line-height: 20px;
                color: #0A0E0D;
                margin: 24px 16px 16px;
                @media only screen and (max-width: 900px) {
                    font-size: 14px;
                }
            }

            .timeline { 

                .timeline-inner { 
                    /* width: 87%; */

                    margin: 6px 5px 6px 34px;
                    .bullet-points-container { 
                        border-left: 1px solid #007B5D;
                        position: relative;
                        padding: 11px 0px 9px;
                        .dot { 
                            width: 7px;
                            height: 7px;
                            background: #007B5D;
                            border-radius: 50%;
                            position: absolute;
                            &.top-dot {
                                top: 0px;
                                left: -4px;
                            }
                            &.bottom-dot {
                                bottom: 0;
                                left: -4px;
                            }
                        }

                        .transactional-points { 
                            display: grid;
                            grid-template-columns: 0fr 1fr;
                            grid-gap: 7px;
                            margin: 22px 0px 22px;
                            margin-left: -8px;
                            .point-icon { 
                                background: #007B5D;
                                width: 16px;
                                height: 16px;
                                text-align: center;
                                line-height: 16px;
                                color: white;
                                border-radius: 50%;

                                &.red {
                                    background: #CF0921;
                                }
                            }

                            .point-text { 
                                font-weight: 400;
                                font-size: 12px;
                                line-height: 15px;
                                color: #0A0E0D;

                                .hover-tab {
                                    position: absolute;
                                    display: none;
                                    width: 200px;
                                    background: #fff;
                                    box-shadow: 0px 1px 5px #CCCCCC80;
                                    z-index: +50;
                                    padding: 10px;
                                    cursor: pointer;
                                    margin-left: -80px;

                                    .tab-list {
                                        a {
                                            width: max-content;
                                        }
                                        &:hover {
                                            background: #f8fcfb;
                                            color: #007B5D;
                                        }
                                    }
                                }
                                .click-hover-tab {
                                    cursor: pointer;
                                    color: #007B5D;
                                    font-style: oblique;
                                }
                                .click-hover-tab:hover ~ .hover-tab{
                                    display: inline-block!important;
                                }
                                .hover-tab:hover {
                                    display: inline-block!important;
                                }
                                .green-txt { 

                                }
                            }
                        }
                    }
                }
            }

            .extras { 
                margin: 32px 16px;
                .extras-inner { 
                    display: grid;
                    grid-template-columns: 1fr 0fr;
                    .promo-side { 

                        .promo-code { 
                            width: 80%;
                            height: 31px;
                            border: 0.8px solid rgba(10, 14, 13, 0.16);
                            box-sizing: border-box;
                            border-radius: 6px;
                            padding: 7px 12px;
                        }
                    }

                    .toggle-side { 

                        .toggle { 

                            fancytoggle { 

                            }
                        }
                    }
                }
            }

            .send-btn { 
                width: 95%;
                margin: auto auto 20px;
                padding: 13px;
                display: block;
                background: #FDDB3A;
                border-radius: 6px;
                font-weight: 500;
                font-size: 16px;
                line-height: 28px;
                text-align: center;
                letter-spacing: -0.01em;
                color: #000000;
                border: none;
                cursor: pointer;

                @media only screen and (max-width: 900px) {
                    font-size: 14px;
                }
            }
        }
    }

`

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
    userReferralDiscount

}: any) => {

    const history = useHistory()
  return (
    <Container className="exchange-rate-calculator">
        <div className="calculator-inner">
            <div className="title">
                Choose how recipient gets the money
            </div>

            <div className="calculator-nav">
                <div className="options">
                    <div onClick={() => setTransferMethod('mobile_money')} className={`option ${selectedTransferMethod === "mobile_money" ? "selectedTM active" : ""}`}>
                        Mobile Money
                    </div>

                    <div onClick={() => setTransferMethod('bank_transfer')}  className={`option ${selectedTransferMethod === "bank_transfer" ? "selectedTM active" : ""}`}>
                        Bank Transfer
                    </div>

                    <div onClick={() => setTransferMethod('cash_pickup')} className={`option ${selectedTransferMethod === "cash_pickup" ? "selectedTM active" : ""}`}>
                        Cash Pickup
                    </div>
                </div>
            </div>

            <div className="simple-prompt">
                Enter an amount to send
            </div>
            {
                ExchangeRateInput({data: toSend, changedInput, setChangedInput: () => setChangedInput('toSend'), handleXInputChange,  max: selectedTransferMethod !== constants.MOBILE_MONEY ? max : undefined , countries: payInCountries})
            }
            <div className="timeline">
                <div className="timeline-inner">
                    <div className="bullet-points-container">
                        <div className="dot top-dot"></div>


                        <div className="transactional-points">
                            <div className="point-icon">
                                &times;
                            </div>

                            <div className="point-text">
                                <span className={`deep-green green-txt ${promo?.type === "FIXED_RATE" && isAcceptablePromoValue(promo) ? "strikethrough" : ""}`}>1 {toSend.currency} = {formatCurrency(conversionRate?.rate)} XAF</span>
                            </div>
                        </div>


                        {
                            Boolean(Number(transfer.serviceFee)) && <div className="transactional-points">
                                <div className="point-icon">
                                    +
                                </div>

                                <div className="point-text">
                                    <span className={`${allowOperatorFee ? "" : "strikethrough"}`}> <div style={{display: 'inline'}} dangerouslySetInnerHTML={{__html: getTransferFeeText(selectedTransferMethod)}}></div> <span className={`deep-green ${(promo?.type === "FREE_OPERATOR_FEE"  && isAcceptablePromoValue(promo) || !allowOperatorFee) ? "strikethrough" : ""}`}>{transfer.serviceFee} {toSend.currency}</span></span> 

                                    {/* Mobile Operator <span className="green-txt">Cash Out Fee</span> from: <span className="green-txt"> 0 GBP</span> */}
                                </div>
                            </div>
                        }


                        <div className="transactional-points">
                            <div className="point-icon">
                                -
                            </div>

                            <div className="point-text">
                                SB Remit charges you <span className="green-txt"> 0.00 {toSend.currency} </span> for this transfer
                            </div>
                        </div>

                        { 
                            Boolean(Number(user?.referral?.useCount) || user?.referral?.newUserBonusActive) && 
                            <div className="transactional-points">
                                <div className="point-icon">
                                    -
                                </div>

                                <div className="point-text">
                                    Referral bonus { <span className="deep-green"> { userReferralDiscount?.value } {toSend?.currency} </span> }
                                </div>
                            </div>
                        }


                        {
                            promo && <div className="transactional-points">
                                <div className="point-icon">
                                    -
                                </div>

                                <div className="point-text">
                                    Promo code { promoText ? <span className="deep-green"> {promoText} </span> : <span className="red-txt"> *Spend btw: {promo?.settings?.minimumSpend} {toSend.currency} and {promo?.settings?.maximumSpend} {toSend.currency}  </span> }
                                </div>
                            </div>
                        }

                        <div className="transactional-points">
                            <div className="point-icon red">
                                =
                            </div>

                            <div className="point-text">
                                Total to pay <span className="green-txt"> {formatCurrency(`${toSend.total}`)} {toSend.currency} </span>
                            </div>
                        </div>

                        <div className="dot bottom-dot"></div>
                    </div>
                </div>
            </div>

            {
                ExchangeRateInput({data: toReceive, changedInput, setChangedInput: () => setChangedInput('toReceive'), handleXInputChange, max: selectedTransferMethod === constants.MOBILE_MONEY ? max : undefined, key: 'landingPageToRecieve', countries: payOutCountries})
            }

            <div className="extras">
                <div className="extras-inner">
                    <div className="promo-side">
                        {/* <input type="text" placeholder='Apply promo code' className="promo-code" /> */}
                        <PromoCodeField className="new-landing-page-promo-code-field" transfer={transfer} />

                    </div>
                    <div className="toggle-side">
                        <div className="toggle">
                            <FancyToggle label="Include operator fee" isActive={allowOperatorFee} setIsActive={() => setAllowOperatorFee(!allowOperatorFee)} />
                        </div>
                    </div>
                </div>
            </div>

            <button className="send-btn" onClick={()=>{
                setNewQuoteWithoutAuth(toSend.currency, toReceive.currency, () => history.push(CookieService.get('X-SERVICE_PROVIDER') === _env.X_SERVICE_PROVIDER ? paths.SIGN_IN : paths.SIGN_UP));
                }} >Start sending money</button>

        </div>
    </Container>
  )
}

export default ExchangeRateCalculator