import styled from "styled-components";

export default styled.div`
    background: white;
    main { 
        background: #086A6A;
        position: relative;
        overflow: hidden;
        .main-inner { 
            width: 75%;
            margin: auto;
            padding: 50px;
            .nav { 
                display: grid;
                grid-template-columns: 0fr 1fr 0fr;
                .logo-container { 

                    .img-wrapper { 

                        .logo { 
                            width: 200px;
                        }
                    }
                }

                .content-links { 
                    text-align: center;

                    .content-links-wrapper { 
                        display: grid;
                        grid-template-columns: 1fr 1fr 1fr;
                        width: fit-content;
                        grid-gap: 30px;
                        margin: 10px auto;
                        .link {
                            font-weight: 500;
                            font-size: 18px;
                            line-height: 20px;
                            color: #FFFFFF;
                            cursor: pointer;
                        }
                    }
                }

                .auth-links { 

                    .auth-links-inner { 
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        grid-gap: 24px;
                        white-space: nowrap;
                        margin-top: 10px;
                        .sign-in { 
                            font-weight: 500;
                            font-size: 18px;
                            line-height: 20px;
                            color: #FFFFFF;
                            border: none;
                            background: none;
                        }

                        .sign-up { 
                            font-weight: 500;
                            font-size: 16px;
                            line-height: 20px;
                            color: #000000;
                            padding: 7px 24px;
                            background: #FDDB3A;
                            border-radius: 6px;
                            border: none;
                        }
                    }
                }
            }

            .hero { 

                .hero-inner { 
                    display: grid;
                    grid-template-columns: 1.2fr 1fr;
                    padding: 150px 0px 50px;
                    .left { 
                        align-self: flex-end;
                        margin-bottom: 200px;
                        .hero-heading { 
                            font-weight: 400;
                            font-size: 42px;
                            line-height: 56px;
                            color: #FFFFFF;
                        }

                        .hero-text { 
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 28px;
                            letter-spacing: -0.01em;
                            color: #FFFFFF;
                            width: 70%;
                        }

                        .hero-fca { 
                            margin-top: 70px;
                            padding: 13px 16px;
                            background: none;
                            border: 1px solid #FFFFFF;
                            box-sizing: border-box;
                            border-radius: 6px;
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 28px;
                            letter-spacing: -0.01em;
                            display: grid;
                            grid-template-columns: 1fr 0fr;
                            color: #FFFFFF;
                            img { 
                                margin: auto 18px;
                            }
                        }
                    }

                    .right { 

                        .right-inner { 

                            .exchange-rate-calculator { 
                                max-width: 500px;
                                background: #FFFFFF;
                                border: 0.3px solid rgba(10, 14, 13, 0.2);
                                box-shadow: 0px 4px 16px #03523C;
                                border-radius: 12px;

                                .calculator-inner { 

                                    .title { 
                                        font-weight: 400;
                                        font-size: 21px;
                                        line-height: 29px;
                                        padding: 16px 0px;
                                        color: #0A0E0D;
                                        width: fit-content;
                                        margin: auto;
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
                                    }

                                    .exchange-rate-input { 
                                        margin: 0px 16px;
                                        .text { 
                                            font-weight: 400;
                                            font-size: 12px;
                                            line-height: 15px;
                                            letter-spacing: 0.04em;
                                            color: #A3A3A3;
                                        }

                                        .input-container { 
                                            display: grid;
                                            grid-template-columns: 1fr 0fr;
                                            grid-gap: 10px;

                                            .input-wrapper { 
                                                display: grid;
                                                grid-template-columns: 1fr 0fr;
                                                input.exchange { 
                                                    border: none;
                                                    border-bottom: 0.5px solid rgba(0, 123, 93, 0.42);
                                                    width: 100%;
                                                    font-weight: 400;
                                                    font-size: 16px;
                                                    line-height: 20px;
                                                    letter-spacing: 0.04em;
                                                    color: #0A0E0D;
                                                    outline: none;
                                                }

                                                .arrow { 
                                                    position: relative;
                                                    top: 12px;
                                                    width: 24px;
                                                    height: 24px;
                                                }
                                            }

                                            .currency-selector { 
                                                min-width: 123px;
                                                display: grid;
                                                grid-template-columns: 0fr 1fr 0fr;
                                                grid-gap: 8px;
                                                border-bottom: 1px solid rgba(0, 123, 93, 0.42);;
                                                padding: 5px 10px 3px 5px;
                                                cursor: pointer;
                                                img.currency-flag { 
                                                    width: 23px;
                                                    height: 16px;
                                                }

                                                .selected-currency { 
                                                    font-weight: 400;
                                                    font-size: 16px;
                                                    line-height: 20px;
                                                    letter-spacing: 0.04em;
                                                    color: #0A0E0D;
                                                }

                                                .caret-down { 
                                                    width: 24px;
                                                    height: 24px;
                                                }
                                            }
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

                                                .promo-code-input { 
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
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        .background-circle { 
            width: 600px;
            height: 528px;
            background: rgba(184, 203, 198, 0.1);
            border-radius: 50%;
            position: absolute;
            &.bg-circle-up {
                right: 50px;
                top: -300px;
            }
            &.bg-circle-down {
                left: 25px;
                bottom: -300px;
            }
        }
    }

    section {
        background: white;
        margin: 0;
        padding: 0;
        h2.heading {
            font-style: normal;
            font-weight: 300;
            font-size: 36px;
            line-height: 64px;
            color: #0A0E0D;
            width: fit-content;
            margin: 16px auto;
        }

        .subheading {
            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            letter-spacing: -0.01em;
            color: #0A0E0D;
            width: fit-content;
            margin: auto;
        }
        &.countries-remit { 

            .section-inner { 
                padding: 50px;
                .heading { 

                }

                .subheading { 

                }

                .listings { 
                    width: 75%;
                    margin: 80px auto;
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    grid-gap: 50px 5%;

                    .listing { 
                        max-width: 550px;
                        width: 100%;
                        margin: auto;
                        height: 90px;
                        background: #FFFFFF;
                        box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
                        border-radius: 6px;
                        padding: 24px 16px;
                        position: relative;
                        .listing-inner { 
                            display: grid;
                            grid-template-columns: 0fr 1fr;
                            grid-gap: 16px;
                            img { 
                                width: 42px;
                                height: 42px;
                                border-radius: 50%;
                            }

                            .text { 
                                /* font-family: 'Faro'; */
                                font-style: normal;
                                font-weight: 400;
                                font-size: 24px;
                                line-height: 32px;
                                color: #0A0E0D;
                                white-space: nowrap;
                            }
                        }

                        .checkmark { 

                            border-radius: 20px;
                            width: fit-content;
                            padding: 5px 18px;
                            position: absolute;
                            top: -20px;
                            right: 15px;

                            img { 
                                width: 24px;
                                height: 24px;
                            }
                            &.active {
                                background: #D9EBE7;
                                border: 0.8px solid #007B5D;
                            }

                            &.inactive {
                                background: #FFFAE3;
                                border: 0.8px solid #D3AF01;
                                /* font-family: 'Faro'; */
                                font-style: normal;
                                font-weight: 400;
                                font-size: 18px;
                                line-height: 28px;
                                letter-spacing: -0.01em;
                                color: #D3AF01;
                            }
                        }
                    }
                }
            }

            .big-image { 
                width: 80%;
                margin: auto;
                overflow: hidden;
                z-index: 1;
                position: relative;
                img { 
                    width: 100%;
                    z-index: 0;
                }
            }

            .register-interest { 
                background: #FBFCFB;
                font-weight: 400;
                font-size: 18px;
                line-height: 28px;
                letter-spacing: -0.01em;
                color: #000000;
                padding: 41px 0px;
                text-align: center;
                border-top: 1px solid lightgrey;
                margin-top: -60px;
                z-index: 2;
                position: relative;
                .register-interest-link { 
                    text-decoration: underline;
                    cursor: pointer;
                }
            }
        }

        &.we-are-different { 
            background: #F3F5F5;
            .section-inner { 
                padding: 64px 10px 100px;
                .heading { 
                    padding-bottom: 50px;
                }

                .points-list { 
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    width: fit-content;
                    margin: auto;
                    grid-gap: 24px;
                    .point-container { 
                        &:last-child {
                            grid-column: 1/3;
                        }
                        .point { 
                            display: grid;
                            grid-template-columns: 0fr 1fr;
                            grid-gap: 24px;
                            background: #FFFFFF;
                            border: 1px solid rgba(10, 14, 13, 0.15);
                            box-sizing: border-box;
                            border-radius: 4px;
                            padding: 32px 24px;
                            max-width: 515px;
                            margin: auto;
                            height: 100%;
                            .icon-side { 

                                .icon-wrapper { 
                                    background: #F3F5F5;
                                    border: 0.3px solid rgba(0, 123, 93, 0.07);
                                    padding: 10px;
                                    width: fit-content;
                                    border-radius: 50%;
                                    .icon { 
                                        width: 34px;
                                        height: 34px;
                                    }
                                }
                            }

                            .text-side { 

                                .title { 
                                    /* font-family: 'Faro'; */
                                    font-style: normal;
                                    font-weight: 600;
                                    font-size: 24px;
                                    line-height: 32px;
                                    color: #5C7E75;
                                }

                                .text { 
                                    font-weight: 400;
                                    font-size: 16px;
                                    line-height: 28px;
                                    letter-spacing: -0.01em;
                                    color: #334641;
                                }
                            }
                        }
                    }
                }
            }
        }

        &.transfer-methods { 

            .section-inner { 
                padding: 80px 10px;
                .heading { 

                }

                .subheading { 

                }

                .methods {
                    display: flex;
                    flex-wrap: wrap;
                    flex-basis: 50%;
                    margin: 50px auto;
                    .method-step { 
                        flex: 1;
                        text-align: center;
                        .image-up { 

                            img { 

                            }
                        }

                        .text-down { 
                            text-align: left;
                            width: fit-content;
                            margin: auto;
                            .step-title { 
                                /* font-family: 'Faro'; */
                                font-style: normal;
                                font-weight: 600;
                                font-size: 24px;
                                line-height: 32px;
                                color: #5C7E75;
                            }

                            .steps { 

                                .step { 
                                    display: grid;
                                    grid-template-columns: 0fr 1fr;
                                    margin: 16px 0;
                                    grid-gap: 10px;
                                    .numbering { 

                                    }

                                    .instruction { 
                                        font-family: 'Fuzzy Bubbles', 'cursive';
                                        font-style: normal;
                                        font-weight: 400;
                                        font-size: 14px;
                                        line-height: 21px;
                                        color: #0A0E0D;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }

        &.compare { 
            background: #E9EFED;
            .section-inner { 
                padding: 50px 1px;

                .heading { 
                    margin-bottom: 50px;
                }

                .btn-div { 

                    button.compare-btn { 
                        background: #086A5E;
                        width: 461px;
                        text-align: center;
                        border: none;
                        color: white;
                        padding: 14px;
                        margin: auto;
                        display: block;
                    }
                }

                .table { 

                }
            }
        }

        &.partners { 

            .section-inner { 
                padding: 70px 10px;
                .small-heading { 
                    /* font-family: 'Faro'; */
                    font-style: normal;
                    font-weight: 400;
                    font-size: 16px;
                    line-height: 21px;
                    letter-spacing: 0.22em;
                    color: #000000;
                    width: fit-content;
                    margin: auto;
                    margin-bottom: 43px;
                }

                .partner-listing { 
                    width: 70%;
                    margin: auto;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                    padding-bottom: 50px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.21);
                    img { 
                        /* width: 107px; */
                        height: 32px;
                    }
                }
            }
        }

        &.happy-customers { 

            .section-inner { 

                .heading { 
                    margin: 40px auto;
                }

                .image-container { 
                    height: 588px;
                    width: 45%;
                    position: relative;
                    margin: auto;
                    img.happy-customer { 
                        width: 100%;
                        height: 100%;
                    }

                    .next-icon { 
                        position: absolute;
                        right: 50px;
                        top: 50%;

                    }
                }

                .testimonials { 
                    display: grid;
                    grid-template-columns: 0fr 1fr 0fr;
                    width: 70%;
                    margin: 80px auto;
                    .arrow { 
                        margin: 200px 10px 0px;
                        img { 

                        }
                    }

                    .testimonial-cards { 
                        display: flex;
                        gap: 3%;
                        width: 100%;
                        .testimonial-card { 
                            flex: 1;
                            background: #FFFFFF;
                            box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.25);
                            border-radius: 6px;
                            max-width: 420px;
                            padding: 23px;
                            position: relative;
                            margin: auto;
                            height: 100%;
                            img.big-quote { 
                                position: absolute;
                            }

                            .text { 
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 28px;
                                /* or 175% */

                                letter-spacing: -0.01em;

                                color: rgba(10, 14, 13, 0.59);
                            }

                            .customer { 
                                /* font-family: 'Faro'; */
                                font-style: normal;
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 28px;
                                letter-spacing: -0.01em;

                                color: #0A0E0D;
                                display: grid;
                                grid-template-columns: 1fr 0fr;
                                width: 100%;
                                .name { 

                                }

                                .from { 
                                    white-space: nowrap;
                                }
                            }
                        }
                    }
                }

                .scroll-dots { 
                    display: block;
                    width: fit-content;
                    margin: auto;
                    .dot { 
                        display: inline-block;
                        width: 10px;
                        height: 10px;
                        background: rgba(10, 14, 13, 0.3);
                        border-radius: 50%;
                        margin: 4px;
                        &.active {
                            background: #334641;
                        }
                    }
                }
            }

            .section-behind-overlap { 
                background: #F3F5F5;
                height: 410px;
                margin-top: -370px;
            }
        }        
    }

`