import styled from "styled-components";

const style = (page) => styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
    min-height: 120vh;
    >div:first-child{
        background: url('./assets/bg/${page}.png');
        backdrop-filter: blur(undefined);
        -webkit-backdrop-filter: blur(undefined);
        background-size: cover;
        background-repeat: no-repeat;
    }
    >div:last-child{
        background: #ffffff;
        .form{
            margin-top: 240px;
            .heading{
                font: normal normal 600 40px/40px Montserrat;
                color: #424242;
                text-align: center;
            }
            .sub-heading{
                font: normal normal normal 20px/30px Montserrat;
                color: #A3A3A3;
                text-align: center;
                margin-top: 25px;
                a{
                    text-decoration: none!important;
                }
                span{
                    color: #007B5D;
                    font: normal normal 600 20px/30px Montserrat;
                }
            }
            .phone-input-wrapper {
                border: 1px solid #007B5D;
            }
            .inputs{
                margin-top: 50px;
                margin: 30px auto;
                width: 60%;
                div.email{
                    margin-bottom: 25px;
                }
                .f-pass{
                    float: right;
                    font: normal normal 600 15px/19px Montserrat;
                    color: #007B5D;
                    cursor: pointer;
                }
                
                input:not(.phone-no), select:not(.phone-code){
                    width: 100%;
                    height: 48px;
                    border: 2px solid #7FBCAD;
                    border-radius: 4px;
                    background: #ffffff;
                    outline: none;
                    font: normal normal normal 16px/19px Montserrat;
                    color: #A3A3A3;
                    padding: 20px;
                    ::placeholder{
                        color: #A3A3A3;
                    }
                }
                select:not(.phone-code){
                    -webkit-appearance: none;
                    -moz-appearance: none;
                    background: transparent;
                    background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(127, 188, 173)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                    background-repeat: no-repeat;
                    background-position-x: 98%;
                    background-position-y: 10px;
                    padding: 0px;
                    padding-left: 65px;
                }
                select+img{
                    position: relative;
                    top: -35px;
                    left: 20px;
                    width: 25px;
                    height: 19px;
                    box-shadow: 0px 3px 6px #00000029;
                    border-radius: 1px;
                }
                >div:nth-child(3){
                    margin-top: 0px;
                }
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
                        cursor: pointer;
                    }
                    >div{
                        font: normal normal normal 15px/19px Montserrat;
                        line-height: 19px;
                    }
                }
                >div:first-child {
                    box-sizing: border-box;
                    display: grid;
                    grid-template-columns: 5fr 1fr 5fr;
                }
                button{
                    background: #FCD20F;
                    border-radius: 4px;
                    outline: none;
                    width: 100%;
                    border: none;
                    height: 48px;
                    font: normal normal normal 16px/19px Montserrat;
                    color: #424242;
                    margin-top: 50px;
                    align-items: center;
                    cursor: pointer;
                }
            }
            hr{
                width: 65%;
                border-radius: 50px;
                border: none;
                border-top: 1px solid #7FBCAD;
                margin-top: 30px;
            }
            .terms{
                margin-top: 30px;
                text-align: center;
                font: normal normal normal 16px/19px Montserrat;
                color: #A3A3A3;
                span {
                    font: normal normal 600 16px/19px Montserrat;
                    color: #007B5D;
                }
            }
        }

    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        /* display: none; <- Crashes Chrome on hover */
        -webkit-appearance: none;
        margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
    }

    input[type=number] {
        -moz-appearance:textfield; /* Firefox */
    }
    .sign-up-mode-select {
        display: inline-block;
        margin-left: 20px;
        margin-right: 5px;
        .mode-toggle {
            display: flex;
            width: fit-content;
            /* gap: 5px; */
            border: 1px solid lightgrey;
            border-radius: 5px;
            .option {
                flex: 1;
                padding: 5px 25px;
                /* border: 1px solid lightgrey; */
                cursor: pointer;
                &:first-child {
                    border-right: none;
                }

                &.active {
                    color: white;
                    background: #007B5D;
                    border: 1px solid #007B5D;
                }
            }
        }
    }

    .marketing-permission-box {
        input[type="checkbox"] {
            width: auto !important;
            height: auto !important;
            -webkit-transform: scale(1.5);
            transform: scale(1.5);
            outline: none;
        }
        label {
            margin-left: 10px;
        }
    }

    @media only screen and (max-width: 1140px) {
        grid-template-columns: 1fr 2fr;
    }
    @media only screen and (max-width: 780px) {
        .marketing-permission-box {
            input[type="checkbox"] {
                width: auto !important;
                height: auto !important;
                -webkit-transform: scale(1.5);
                transform: scale(1.5);
            }
            label {
                margin-left: 10px;
            }
        }
        grid-template-columns: 1fr;
        >div:first-child{
            display: none;
        }
        >div:last-child{
            .form{
                margin-top: 81px;
                .heading{
                    font: normal normal bold 20px/26px Montserrat;
                }
                .sub-heading{
                    font: normal normal normal 15px/30px Montserrat;
                    margin-top: 15px;
                    span{
                        font: normal normal 600 15px/30px Montserrat;
                    }
                }
                .inputs{
                    width: 70%;
                    >div:first-child{
                        grid-template-columns: 1fr;
                        >div:last-child{
                            margin-top: 15px;
                        }
                    }
                    input{
                        padding: 10px 20px;
                    }
                    input:not(.phone-no), select:not(.phone-code){
                        height: 30px;
                        font: normal normal normal 14px/18px Montserrat;
                        border: 1px solid #7FBCAD;
                    }
                    select:not(.phone-code){
                        padding: 0px 40px;
                        background-position-y: 3px;
                    }
                    select:not(.phone-code)+img{
                        top: -25px;
                        left: 10px;
                    }
                    >div{
                        margin-top: 15px;
                        >div{
                            font: normal normal normal 10px/13px Montserrat;
                            line-height: 19px;
                        }
                        .show-hide{
                            top: -25px;
                            left: 90%;
                        }

                    }
                    div.email{
                         margin-bottom: 20px;
                    }
                    >button{
                        margin-top: 25px;
                        height: 40px;
                        font: normal normal normal 13px/16px Montserrat;
                    }
                }
                hr{
                    width: 80%;
                }
                .terms{
                    font: normal normal normal 13px/20px Montserrat;
                    span{
                        font: normal normal 600 13px/20px Montserrat;
                    }
                }

            }

        }
    }
`

export default style;
