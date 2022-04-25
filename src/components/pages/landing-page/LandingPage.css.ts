import styled from "styled-components";

export default styled.div`
    background: white;
    main { 
        background: #007B5D;
        position: relative;
        overflow-x: clip;

        &.mobile-nav-open {
            position: fixed;
            z-index: 1;
        }
        .main-inner { 
            width: 80%;
            margin: auto;
            padding: 50px;
            z-index: 1;
            position: relative;
            @media only screen and (max-width: 900px) {
                width: 100%;
                padding: 25px;
            }

            @media only screen and (max-width: 300px) {
                padding: 5px;
            }
            .nav { 
                display: grid;
                grid-template-columns: 0fr 1fr 0fr;
                @media only screen and (max-width: 900px) {
                    grid-template-columns: 1fr 0fr;
                }

                .mobile-nav-close-x {
                    font-size: 32px;
                    color: white;
                    cursor: pointer;
                }
                .logo-container { 

                    .img-wrapper { 

                        .logo { 
                            width: 200px;
                            @media only screen and (max-width: 900px) {
                                width: 100px;
                            }
                        }
                    }
                }

                .content-links { 
                    text-align: center;
                    @media only screen and (max-width: 900px) {
                        display: none;
                    }
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
                        /* margin-top: 10px; */
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
                            padding: 14px 35px;
                            background: #FDDB3A;
                            border-radius: 6px;
                            border: none;

                            @media only screen and (max-width: 900px) {
                                background: none;
                            }
                        }
                    }
                }
            }

            .mobile-nav { 
                width: 100%;
                background: #F0F5F4;
                position: fixed;
                left: 0;
                margin-top: 10px;
                height: 150vh;
                z-index: 999999;
                .mobile-nav-inner { 
                    padding-top: 20px;
                    ul.links-container { 
                        list-style-type: none;
                        padding: 0;
                        margin: 0;

                        .nav-link { 
                            display: flex;
                            justify-content: space-between;
                            width: 100%;
                            padding: 16px 24px;
                            border-bottom: 1px solid rgba(66, 66, 66, 0.17);
                            .text { 
                                font-weight: 400;
                                font-size: 16px;
                                line-height: 21px;
                                /* identical to box height, or 131% */


                                color: #424242;
                            }

                            .icon { 

                                img { 
                                    width: 20px;
                                }
                            }
                        }
                    }

                    .nav-foot { 
                        height: fit-content;
                        position: fixed;
                        bottom: 30px;
                        text-align: center;
                        width: 100%;
                        padding: 10px;

                        .foot-text { 
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 21px;
                            color: #424242;
                            margin: 10px;
                        }


                        .foot-btn { 

                            button { 
                                background: #FDDB3A;
                                border-radius: 6px;
                                font-weight: 500;
                                font-size: 14px;
                                line-height: 28px;
                                padding: 7px;

                                width: 100%;
                                border: none;
                                letter-spacing: -0.01em;

                                color: #000000;
                            }
                        }
                    }
                }

            }
            .hero { 

                .hero-inner { 
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));;
                    
                    padding: 50px 0px 50px;

                    @media only screen and (max-width: 900px) {
                        grid-template-columns: 1fr;
                    }

                    .left { 
                        /* align-self: flex-end;
                        margin-bottom: 200px; */
                        margin: auto 0;
                        @media only screen and (max-width: 900px) {
                            margin: auto;
                            text-align: center;
                        }
                        .hero-heading { 
                            font-weight: 400;
                            font-size: 42px;
                            line-height: 56px;
                            color: #FFFFFF;

                            @media only screen and (max-width: 900px) {
                                font-size:  28px;
                            }
                        }

                        .hero-text { 
                            font-weight: 400;
                            font-size: 24px;
                            line-height: 40px;
                            letter-spacing: -0.01em;
                            color: #FFFFFF;
                            width: 70%;
                            @media only screen and (max-width: 900px) {
                                margin: auto;
                                font-size: 14px;
                            }
                        }

                        .hero-fca-container {
                            @media only screen and (max-width: 900px) {
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
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
                                margin-bottom: 30px;
                                @media only screen and (max-width: 900px) {
                                    margin: 30px auto;
                                    font-size: 14px;
                                }
                                img { 
                                    margin: auto 18px;
                                    width: 24px;
                                    height: 24px;
                                    @media only screen and (max-width: 900px) {
                                        width: 20px;
                                        height: 20px;
                                    }
                                }
                            }                            
                        }

                    }

                    .right { 
                        @media only screen and (max-width: 900px) {
                        }
                        .right-inner { 

                        }
                    }
                }
            }
        }

        .bg-circle-container {
            position: absolute;
            width: fit-content;
            max-height: 240px;
            overflow-y: hidden;
            left: 25px;
            bottom: 0px;
        }
        .background-circle { 
            width: 600px;
            height: 528px;
            background: rgba(184, 203, 198, 0.1);
            border-radius: 50%;
            z-index: 0;
            &.bg-circle-up {
                right: 50px;
                top: -300px;            
                position: absolute;
            }
            &.bg-circle-down {
                /* left: 25px;
                bottom: -300px; */
                position: relative;
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
            text-align: center;
            @media only screen and (max-width: 900px) {
                font-size: 28px;
                margin: 8px auto;
            }
        }

        .subheading {
            font-weight: 400;
            font-size: 18px;
            line-height: 28px;
            letter-spacing: -0.01em;
            color: #0A0E0D;
            width: fit-content;
            margin: auto;
            @media only screen and (max-width: 900px) {
                font-size: 14px;
            }
        }
        &.countries-remit { 

            .section-inner { 
                padding: 50px;
                @media only screen and (max-width: 900px) {
                    padding: 25px;
                }
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
                    @media only screen and (max-width: 900px) {
                        grid-template-columns: 1fr;
                        width: 90%;
                        margin: 70px auto;
                    }
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
                        @media only screen and (max-width: 900px) {
                            padding: 15px;
                            height: fit-content;
                        }
                        .listing-inner { 
                            display: grid;
                            grid-template-columns: 0fr 1fr;
                            grid-gap: 16px;

                            .img-container {
                                width: 42px;
                                height: 42px;
                                border-radius: 50%;
                                position: relative;
                                img {   
                                    /* width: 20px; */
                                    aspect-ratio: 1/1;
                                    height: 100%;
                                    border-radius: 50%;
                                    position: absolute;
                                }
                            }


                            .text { 
                                /* font-family: 'Faro'; */
                                font-style: normal;
                                font-weight: 400;
                                font-size: 24px;
                                line-height: 32px;
                                color: #0A0E0D;
                                white-space: nowrap;

                                @media only screen and (max-width: 900px) {
                                    font-size: 20px;
                                }
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
                                @media only screen and (max-width: 900px) {
                                    width: 15px;
                                    height: 15px;
                                }
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
                                @media only screen and (max-width: 900px) {

                                }
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
                @media only screen and (max-width: 900px) {
                    min-height: 140px;
                }
                img { 
                    width: 100%;
                    height: 100%;
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

                @media only screen and (max-width: 900px) {
                    margin-top: 0px;
                    font-size: 14px;
                }
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
                @media only screen and (max-width: 900px) {
                    padding: 32px 5px 50px
                }
                .heading { 
                    padding-bottom: 50px;
                    @media only screen and (max-width: 900px) {
                        padding-bottom: 25px;
                    }
                }

                .points-list { 
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    width: fit-content;
                    margin: auto;
                    grid-gap: 24px;
                    @media only screen and (max-width: 900px) {
                        grid-template-columns: 1fr;
                        grid-gap: 16px;
                    }
                    .point-container { 
                        &:last-child {
                            grid-column: 1/3;
                            @media only screen and (max-width: 900px) {
                                grid-column: auto;
                            }
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

                            @media only screen and (max-width: 900px) {
                                padding: 16px;
                            }
                            .icon-side { 

                                .icon-wrapper { 
                                    background: #F3F5F5;
                                    border: 0.3px solid rgba(0, 123, 93, 0.07);
                                    padding: 10px;
                                    width: fit-content;
                                    border-radius: 50%;

                                    @media only screen and (max-width: 900px) {
                                        padding: 7px;
                                    }
                                    .icon { 
                                        width: 34px;
                                        height: 34px;

                                        @media only screen and (max-width: 900px) {
                                            width: 26px;
                                            height: 26px;
                                        }
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

                                    @media only screen and (max-width: 900px) {
                                        font-size: 18px;
                                    }
                                }

                                .text { 
                                    font-weight: 400;
                                    font-size: 16px;
                                    line-height: 28px;
                                    letter-spacing: -0.01em;
                                    color: #334641;

                                    @media only screen and (max-width: 900px) {
                                        font-size: 14px;
                                    }
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
                                width: 340px;
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

                                @media only screen and (max-width: 900px) {

                                }
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
                                        /* font-family: 'Fuzzy Bubbles', 'cursive'; */
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

                        @media only screen and (max-width: 900px) {
                            width: 80%;
                        }
                    }
                }

                .table { 
                    width: 60%;
                    margin: 32px auto;
                    min-width: 850px;
                    @media only screen and (max-width: 900px) {
                        width: 90%;
                        min-width: unset;
                    }

                    .landing-page-table {
                        border-collapse: collapse;
                        width: 100%;
                        @media only screen and (max-width: 900px) {
                            border: none!important;;
                        }
                        td {
                            text-align: center;
                            padding: 13px 0;
                            max-height: 73px;
                        }

                        th {
                            font-weight: 400;
                            font-size: 16px;
                            line-height: 21px;
                            color: #000000;
                            padding: 16px 0;
                        }

                        th, td {
                            border: 1px solid black;
                            border-collapse: collapse;
                        }

                        @media only screen and (max-width: 900px) {


                            td, th, tr {
                                font-weight: 400;
                                font-size: 14px;
                                line-height: 21px;
                                color: #000000;
                                border: none;


                                .inline-heading {
                                    .line {
                                        font-weight: 500;
                                        text-align: left!important;
                                    }
                                }

                                .content-wrapper {
                                    .line {
                                        &.line-1 {
                                            display: grid;
                                            grid-template-areas: 'b a';

                                            span {
                                                grid-area: b;
                                                margin-top: 10px;
                                                margin-right: 10px;
                                            }
                                        }
                                    }
                                }
                            }

                            td {
                                &:last-child {
                                    margin-bottom: 30px;
                                    border-bottom: 1px solid #00000010;
                                }
                            }


                        }
                        &.landing-page-compare-features-table {
                            td.sbremit {
                                padding: 24px;
                                background: #F3F5F5;
                                @media only screen and (max-width: 900px) {
                                    padding: 13px 0px;
                                    background: none;
                                }
                            }
                        }

                        &.landing-page-compare-exchange-rates-table {
                            border: 1px solid #0A0E0D77;
                            th, td {
                                border: none;
                                border-bottom: 1px solid #0A0E0D77;
                            }

                            th {
                                background: #227863;
                                color: white;
                                border: 1px solid #227863;
                                padding: 30px 0px;
                            }

                            td {
                                color: #424242;
                            }

                            td.sbremit {
                                background: #F3F5F5;
                                @media only screen and (max-width: 900px) {
                                    background: none;
                                }
                            }

                            @media only screen and (max-width: 900px) {
                                td {
                                    border: none;
                                    padding-bottom: 21px;
                                    &:last-child {
                                        margin-bottom: 10px;
                                        border-bottom: 1px solid #00000010;
                                        padding-bottom: 76px;
                                    }
                                }
                            }

                            .table-send-btn {
                                padding: 8px 16px;
                                font-weight: 500;
                                font-size: 14px;
                                line-height: 21px;
                                text-align: center;
                                letter-spacing: -0.01em;
                                background: #FCD20F;
                                border-radius: 6px;
                                border: none;
                                color: #000000;


                                
                            }
                        }
                    }

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
                    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
                    padding-bottom: 50px;
                    border-bottom: 1px solid rgba(0, 0, 0, 0.21);
                    img { 
                        /* width: 107px; */
                        height: 32px;
                        margin: 10px;
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
                    /* height: 588px; */
                    width: 45%;
                    position: relative;
                    margin: auto;

                    @media only screen and (max-width: 900px) {
                        width: 90%;
                    }
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
                    @media only screen and (max-width: 900px) {
                        grid-template-columns: 1fr;
                        width: 90%;
                    }
                    .arrow { 
                        margin: 200px 10px 0px;
                        @media only screen and (max-width: 900px) {
                            display: none;
                        }
                        img { 

                        }
                    }

                    .testimonial-cards { 
                        display: flex;
                        gap: 3%;
                        width: 100%;
                        @media only screen and (max-width: 900px) {
                            /* flex-wrap: wrap; */
                            flex-direction: column;
                        }
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
                            @media only screen and (max-width: 900px) {
                            }
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

                @media only screen and (max-width: 900px) {
                    height: 1000px;
                    margin-top: -900px;
                }
            }
        }        
    }


`