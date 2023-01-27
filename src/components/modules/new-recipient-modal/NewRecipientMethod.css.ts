import styled from "styled-components";

export default styled.div`
    .overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 150vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 2;
    }

    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 70%;
        min-height: 661px;
        background: #fff;
        margin: 0px auto;
        padding: 60px 0px 20px;
        position: fixed;
        z-index: 2;
        top: 50%;
        left: 14%;
        transform: translateY(-50%);
        .transfer-fields {
            select {
                width: 17% !important;
                margin-right: 5px;
            }
            .branch-code, .bank-code{
                width: 17%; !important;
                margin-right: 5px;
            }
            .key {
                width: 12% !important;
            }
            .account-number {
                width: 25% !important;
                margin-right: 5px;
            }
            .display-show {
                display: inline-block;
            }
            .display-out {
                display: none;
            }

            .show-account-number {
                width: 100% !important;
                margin-right: 5px;
            }
        }
        .transfer-type {
            width: 80%;
            margin: 0px auto;
            padding: 0;
            ul {
                display: flex;
                list-style: none;
                li {
                    cursor: pointer;
                    color: #818080;
                    font-size: 16px;
                    font-weight: 600;
                    margin-left: -40px;
                    :hover {
                        border-bottom: 1px solid #818080;
                    }
                }
                .underline {
                    border-bottom: 1px solid #4c8778;
                    color: #4c8778;
                }
                .microfinance {
                    margin-left: 20px !important;
                }

            }
        }
        .head {
            border-bottom: 1px solid #F0F0F0;
            display: grid!important;
            grid-template-columns: 3fr 4fr;
            width: 80%;
            margin: 0px auto;
            padding: 20px 0px;
            .t-id {
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                span {
                    color: #424242;
                }
            }
            .close {
                text-align: right;
                font: normal normal normal 26px/24px Montserrat;
                color: #A3A3A3;
                cursor: pointer;
            }
        }
        .form {
            width: 80%;
            margin: 30px auto 0px;
            >div{
                margin-top: 20px;
                font: normal normal normal 15px/19px Montserrat;
                color: #A3A3A3;
                i{
                    color: #FCD20F;
                }
                .show-hide{
                    width: 16px;
                    height: 16px;
                    position: relative;
                    top: -33px;
                    left: 90%;
                }
                >div{
                    font: normal normal normal 15px/19px Montserrat;
                    line-height: 19px;
                }
            }
            input, select{
                margin-bottom: 5px;
                width: 100%;
                height: 48px;
                border: 2px solid #7FBCAD;
                border-radius: 4px;
                background: #ffffff;
                outline: none;
                font: normal normal normal 14px Montserrat;
                color: #A3A3A3;
                padding: 10px;
                ::placeholder{
                    color: #A3A3A3;
                }
            }
            select{
                -webkit-appearance: none;
                -moz-appearance: none;
                background: transparent;
                background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(127, 188, 173)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                background-repeat: no-repeat;
                background-position-x: 95%;
                background-position-y: 10px;
                padding: 0px;
                padding-left: 7px;
            }
            select.phone  {
                background-position-x: 22%;
                padding-left: 200px;
                border: none;
            }
            input.phone-no {
                width: 100%;
                border: none;
                border-left: 1px solid #7FBCAD;
                border-radius: 0px;
            }
            div.mobile-head {
                margin-bottom: -50px;
            }
            div.country-code{
                position: relative;
                top: -42px;
                left: 10px;
                display: flex;
                align-items: center;
                width: fit-content;
                height: 25px;
                pointer-events: none;
                img{
                    width: 25px;
                    height: 19px;
                }
            }
            div.phone-no-error-box{
                margin-top: 50px;
            }
            div.margin-adjust {
                margin-bottom: -44px;
            }
            span.reason-close {
                color: red;
                position: relative;
                right: 5%;
                top: -40px;
                float: right;
                cursor: pointer;
                
            }
        }
        .modal-btns {
            text-align: right;
            margin: 65px 10%;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 16px/19px Montserrat;
                /* color: #424242; */
                cursor: default;
            }
            button {
                background: #FCD20F;
                border-radius: 4px;
                width: 200px;
                height: 48px;
                text-align: center;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
    }
@media only screen and (max-width: 900px) {
    padding: 0px;
    .overlay {
        background: #fff;
    }
    .mobile-modal {
        .page-heading {

            .heading {
                z-index: 2;
            }

        }
    }
    .modal {
        width: 100%;
        left: 0%;
        /* top: 50px; */
        padding: 0px;
        box-shadow: none;
        overflow-y: scroll;
        height: 100vh;
        padding-bottom: 100vh;
        .form {
            grid-template-columns: 1fr;
            grid-gap: 0px;
            width: 90%;
            >div {
                margin-top: 15px;

                .modified-tel-input {
                    //width: 40%;
                    .phone-input-wrapper {
                        width: 100%;
                    }
                }
                div {
                    font: normal normal normal 10px/13px Montserrat;
                }
                input, select {
                    //height: 30px;
                    border: 1px solid #7FBCAD;
                    border-radius: 4px;
                    padding: 0px 15px;
                    ::placeholder {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                }
                div.margin-adjust {
                    margin-bottom: -25px;
                }
                input.phone-no {
                    top: 32px;
                    width: calc(100% - 80px);
                    border-top: 1px solid #7FBCAD;
                    border-right: 1px solid #7FBCAD;
                    border-bottom: 1px solid #7FBCAD;
                    padding: 0px 5px;
                }
                select {
                    background-position-y: 3px;
                }
                select.phone{
                    padding: 10px 50%;
                    background-position-y: 3px;
                    background-position-x: 55px;
                }
                .mobile-head {
                    margin-bottom: -31px;
                }
                /* select+img{
                    top: -29px;
                    left: 10px;
                } */
                div.country-code{
                    top: -32px;
                }
                div.phone-no-error-box{
                    margin-top: 30px;
                }
            }
        }
        .modal-btns {
            margin: 20px 0px;
            padding: 0px 5%;
            width: 100%;
            button {
                width: 100%;
                height: 40px;
                font: normal normal normal 13px/16px Montserrat;
                border-radius: 6px;
            }
            >span {
                font: normal normal normal 13px/16px Montserrat;
                text-align: center;
                display: block;
                margin-right: 0px;
                position: relative;
                top: 70px;
            }
        }
    }
}
`