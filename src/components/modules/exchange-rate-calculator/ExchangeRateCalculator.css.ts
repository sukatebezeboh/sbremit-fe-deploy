import styled from "styled-components";

export default styled.div`
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
                    font-size: 16px;
                    line-height: 17px;
                    color: #0A0E0D;
                    @media only screen and (max-width: 900px) {
                        font-size: 12px;
                        line-height: 15px;
                    }

                    &.active {
                        border-bottom: 5px solid #007B5D;
                        color: #007B5D;
                        font-weight: 600;
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
                font-size: 16px;
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
                font-size: 16px;
            }
        }
    }
}

`