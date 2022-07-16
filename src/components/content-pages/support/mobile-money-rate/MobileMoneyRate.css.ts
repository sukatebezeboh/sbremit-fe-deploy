import styled from 'styled-components'

export default styled.div`
    padding-top: 200px;
    main {
        .hero {
            .hero-text {
                margin-top: 100px;
                text-align: center;
                font: normal normal normal 32px/40px Montserrat;
                color: #424242;
            }

            .search-box {
                text-align: center;
                .search-container {
                    height: 50px;
                    margin-top: 40px;
                    input {
                        height: 50px;
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        border: 0.5px solid #CCCCCC;
                        border-radius: 24px;
                        width: 35%;
                        outline: none;
                        padding-left: 20px;
                        padding-right: 40px;
                        font: normal normal normal 16px/19px Montserrat;
                        color: #A3A3A3;
                    }
                    button {
                        background: #FCD20F;
                        border-radius: 50%;
                        border: none;
                        width: 50px;
                        height: 50px;
                        position: relative;
                        left: -45px;
                        top: 3px;
                        cursor: pointer;
                        img {
                            width: 20px;
                            height: 20px;
                        }
                    }
                }
            }

            .hero-options {
                text-align: center;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 60%;
                margin: 100px auto;
                grid-gap: 60px;
                .option {
                    background: #FFFFFF 0% 0% no-repeat padding-box;
                    box-shadow: 0px 10px 12px #CCCCCC80;
                    border-radius: 15px;
                    display: inline-block;
                    aspect-ratio: 5/4;
                    /* min-width: 216px; */
                    max-width: 315px;
                    vertical-align: middle;
                    display: grid;
                    text-align: center;
                    grid-template-rows: 2fr 1fr;
                    img {
                        width: 70px;
                        height: 70px;
                        margin: auto;
                    }
                    img.enlarge {
                        width: 100px;
                        height: 100px;

                    }
                    .text {
                        font: normal normal normal 16px/30px Montserrat;
                        color: #424242;
                    }
                }
            }
        }
        .legal, .faq {
            width: 90%;
            margin: auto;
            margin-bottom: 150px;
            h1 {
                font: normal normal 600 40px/32px Montserrat;
                color: #424242;
                margin-bottom: 15px;
            }
            .rate-txt {
                color: #424242;
                margin-bottom: 5px;

                &::after {
                    content: "";
                    display: block;
                    width: 55px;
                    height: 2px;
                    background: #007B5D 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    margin: 5px 0;
                    margin-bottom: 50px
                }
            }
            .content {
                .sub {
                    font: normal normal normal 16px/30px Montserrat;
                    color: #A3A3A3;
                }
                .body {
                    margin-bottom: 60px;
                    h5 {
                        font: normal normal bold 16px/30px Montserrat;
                        color: #424242;
                        margin: 0;
                        margin: 10px 0px;
                        padding: 0;
                    }
                }
            }
        }

        .faq {
            .content {
                display: grid;
                grid-template-columns: 1fr 0fr;
                .open {
                    margin-top: 20px;
                    img {
                        width: 20px;
                        height: 20px;
                        margin-top: 5px;
                        cursor: pointer;
                    }
                }
                .body {
                    border-bottom: 1px solid #ccc;
                    .details {
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        box-shadow: 0px 3px 6px #00000029;
                        border: 0.5px solid #CCCCCC;
                        border-radius: 10px;
                        padding: 30px;
                        .default-link {
                            text-decoration: underline!important;
                            color: #3B7CFF!important;
                        }
                        .green-bold {
                            font-weight: bold;
                            color: #007B5D;
                        }
                        .bullet-point {
                            font: normal normal normal 16px/30px Montserrat;
                            color: #424242;
                            &::before {
                                content: '';
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                background: #007B5D;
                                border-radius: 50%;
                                margin-right: 10px;
                                margin-top: 8px;
                                margin-bottom: 3px;
                            }
                        }
                        .note {
                            font: italic normal normal 16px/26px Montserrat;
                            color: #007B5D;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                            li {
                                .key {
                                    display: inline;
                                    font: normal normal normal 16px/26px Montserrat;
                                    color: #A3A3A3;
                                }
                                .value {
                                    display: inline;
                                }
                            }
                        }
                        p {
                            margin-bottom: 20px;
                        }
                        .helpful {
                            font: normal normal normal 16px/30px Montserrat;
                            color: #A3A3A3;
                            margin-bottom: 20px;
                        }
                        .vote {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            max-width: 300px;
                            .opt {
                                display: inline-grid;
                                grid-template-columns: 0fr 1fr;
                                grid-gap: 10px;
                                img {
                                    width: 19px;
                                    height: 19px;
                                    margin-top: 0px;
                                }
                                div {
                                    font: normal normal normal 16px Montserrat;
                                    color: #424242;
                                }
                            }
                        }
                    }
                    .compare {
                        background: #fff;
                        .section-inner {
                            padding: 20px;

                            .table {
                                width: 100%;
                                margin: 32px auto 50px;
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
                                        &.sbremit {
                                            img.sbremit-logo {
                                                max-width: 100px;
                                            }
                                        }
                                    }

                                    th {
                                        font-weight: 600;
                                        font-size: 16px;
                                        line-height: 21px;
                                        color: #000000;
                                        padding: 16px 10px;
                                        text-transform: uppercase;
                                    }

                                    th, td {
                                        border: 1px solid black;
                                        border-collapse: collapse;
                                    }

                                    @media only screen and (max-width: 900px) {

                                        td, th, tr {
                                            font-weight: 600;
                                            font-size: 16px;
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
                                            &:first-child {
                                                border-right: 1px solid #0A0E0D33;
                                            }
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
                                            font-size: 16px;
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
                }

                &.collapsed {
                    .open {

                    }
                    .body {
                        margin-bottom: 40px;
                        h3 {
                            font: normal normal normal 16px/30px Montserrat;
                        }
                        .details {
                            display: none;
                        }
                    }
                }
            }
        }

    }

@media only screen and (max-width: 900px) {
    padding: 50px 0px;
    main {
        .hero {
            .hero-text {
                font: normal normal normal 20px/32px Montserrat;
                color: #424242;
            }

            .search-box {
                text-align: center;
                .search-container {
                    margin-top: 40px;
                    input {
                        height: 36px;
                        border-radius: 24px;
                        width: 70%;
                        font: normal normal normal 13px/16px Montserrat;
                    }
                    button {
                        width: 37px;
                        height: 37px;
                        left: -35px;
                        top: 0px;
                        img {
                            width: 13px;
                            height: 13px;
                        }
                    }
                }
            }

            .hero-options {
                text-align: center;
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                width: 100%;
                margin: 30px auto;
                grid-gap: 20px;
                overflow-x: scroll;
                padding: 20px;
                ::-webkit-scrollbar {
                    display: none;

                }
                .option {
                    border-radius: 7px;
                    display: inline-block;
                    aspect-ratio: 5/4;
                    width: 155px;
                    display: grid;
                    grid-template-rows: 2fr 1fr;
                    img {
                        width: 33px;
                        height: 33px;
                        margin: auto;
                    }
                    img.enlarge {
                        width: 50px;
                        height: 50px;

                    }
                    .text {
                        font: normal normal normal 13px/20px Montserrat;
                        color: #424242;
                    }
                }
            }
        }
        .legal, .faq {
            width: 90%;
            margin: auto;
            margin-bottom: 150px;
            h1 {
                font: normal normal 600 30px/32px Montserrat;
                color: #424242;
                margin-bottom: 8px;
            }
            .rate-txt {
                color: #424242;
                margin-bottom: 5px;

                &::after {
                    content: "";
                    display: block;
                    width: 55px;
                    height: 2px;
                    background: #007B5D 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    margin: 5px 0;
                    margin-bottom: 50px
                }
            }
            .content {
                margin: auto;
                .sub {
                    font: normal normal normal 13px/20px Montserrat;
                }
                .body {
                    margin-bottom: 30px;
                    h5 {
                        font: normal normal bold 13px/20px Montserrat;
                        margin: 0;
                        margin: 10px 0px;
                        padding: 0;
                    }
                    p {
                        font: normal normal normal 13px/20px Montserrat;
                        margin: 0;
                    }
                    .link {
                        font: normal normal normal 13px/30px Montserrat;
                        img {
                            width: 11px;
                            margin-left: 10px;
                        }
                    }
                }
            }
        }

        .faq {
            .content {
                display: grid;
                grid-template-columns: 1fr 0fr;
                .open {
                    margin-top: 1px;
                    img {
                        width: 15px;
                        height: 15px;
                        margin-top: 5px;
                        cursor: pointer;
                    }
                }
                .body {
                    h3 {
                        margin: 0;
                        padding: 0;
                    }
                    .details {
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        box-shadow: 0px 3px 6px #00000029;
                        border: 0.5px solid #CCCCCC;
                        border-radius: 10px;
                        padding: 30px;
                        .default-link {
                            text-decoration: underline!important;
                            color: #3B7CFF!important;
                        }
                        .green-bold {
                            font-weight: bold;
                            color: #007B5D;
                        }
                        .bullet-point {
                            font: normal normal normal 13px/20px Montserrat;
                            color: #424242;
                            &::before {
                                content: '';
                                display: inline-block;
                                width: 5px;
                                height: 5px;
                                background: #007B5D;
                                border-radius: 50%;
                                margin-right: 10px;
                                margin-top: 8px;
                                margin-bottom: 3px;
                            }
                        }
                        .note {
                            font: normal normal normal 13px/20px Montserrat;
                        }
                        ul {
                            list-style-type: none;
                            padding: 0;
                            margin: 0;
                            li {
                                .key {
                                    display: inline;
                                    font: normal normal normal 13px/20px Montserrat;
                                    color: #A3A3A3;
                                }
                                .value {
                                    display: inline;
                                }
                            }
                        }
                        p {
                            margin-bottom: 20px;
                        }
                        .helpful {
                            font: normal normal normal 13px/20px Montserrat;
                            color: #A3A3A3;
                            margin-bottom: 20px;
                        }
                        .vote {
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            max-width: 300px;
                            .opt {
                                display: inline-grid;
                                grid-template-columns: 0fr 1fr;
                                grid-gap: 10px;
                                img {
                                    width: 19px;
                                    height: 19px;
                                    margin-top: 0px;
                                }
                                div {
                                    font: normal normal normal 13px Montserrat;
                                    color: #424242;
                                }
                            }
                        }
                    }
                }
                &.collapsed {
                    .open {

                    }
                    .body {
                        margin-bottom: 40px;
                        h5 {
                            font: normal normal normal 13px Montserrat;
                        }
                        .details {
                            display: none;
                        }
                    }
                }
            }
        }

    }
}
`