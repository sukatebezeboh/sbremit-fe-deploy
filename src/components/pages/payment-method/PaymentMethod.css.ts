import styled from "styled-components";


export default styled.div`
    .page-content {
        margin-top: 0px;
        .box-container {
            display: grid;
            grid-template-columns: 2fr 1.5fr;
            grid-gap: 4%;
            padding-top: 50px;

            .box-container {
                display: grid;
                grid-template-columns: 2fr;
                grid-gap: 5%;
                padding-top: 50px;
            }
        }
        hr {
            border: 1px solid #f8f7f8;
            margin-bottom: 30px;
        }

        .payment-options-card {
            background: #fff;
            padding: 20px 15px 15px;
            display: inline-grid;
            grid-template-columns: 0fr 1fr;
            margin: 10px 10px 50px;
            min-width: 200px;
            cursor: pointer;
            box-shadow: 1px 1px 3px grey;
            border-radius: 5px;
            &.selected-pm-green {
                color: white;
                background: #007B5D;
                .method-container {
                    .label {
                        color: white;
                    }
                }
            }
            .inp-container {
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                cursor: pointer;
                font-size: 22px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;

                input {
                    position: absolute;
                    opacity: 0;
                    cursor: pointer;
                    height: 0;
                    width: 0;

                }

                .checkmark {
                    position: absolute;
                    top: 4px;
                    left: 0;
                    height: 21px;
                    width: 21px;
                    /* background-color: #cfcfcf; */
                    border-radius: 50%;
                    border: 2px solid #FCD20F;
                }

                .container:hover input ~ .checkmark {
                    background-color: #ccc;
                }

                input:checked ~ .checkmark {
                    background-color: #007B5D;
                }

                .checkmark:after {
                    content: "";
                    position: absolute;
                    display: none;
                }

                input:checked ~ .checkmark:after {
                    display: block;
                }

                .checkmark:after {
                    top: 2px;
                    left: 2px;
                    width: 13px;
                    height: 13px;
                    border-radius: 50%;
                    background: #FCD20F;
                }

            }

            .method-container {
                min-width: 250px;
                .title {
                    font-size: 18px;
                    font-weight: bold;
                }
                .provider {
                    font-size: 12px;
                    color: #bbbbbb;
                    margin-top: 10px;
                }
                .label {
                    display: grid;
                    grid-template-columns: 1fr 0fr;
                    font-weight: bold;
                    margin-top: 20px;
                    color: #007B5D;
                    img {
                        width: 50px;
                    }
                }

            }
        }

        .btns {
            text-align: right;
            margin: 65px 0px;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                cursor: default;
            }
            button {
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 8px;
                width: 300px;
                height: 80px;
                text-align: center;
                font: normal normal normal 25px/30px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
        .details {
            div {
                .radio-card {
                    display: grid;
                    grid-template-columns: 1.5fr 15fr;
                    background: #FFF;
                    margin-bottom: 30px;
                    box-shadow: 0px 10px 12px #CCCCCC80;
                    border-radius: 15px;
                    padding: 25px;
                    .rc-head {
                        font: normal normal 600 20px Montserrat;
                        color: #424242;
                    }
                    .rc-body {
                        margin-top: 20px;
                        font: normal normal normal 14px Montserrat;
                        color: #A3A3A3;
                        >div {
                            margin-top: 5px;
                        }
                    }
                    .rc-foot {
                        margin-top: 32px;
                        font: normal normal normal 14px Montserrat;
                        color: #424242;
                    }
                }
            }
            
        }
        
    }
    .pls-note {
        font: normal normal 600 16px Montserrat;
        color: #424242;
    }
    .list {
        font: normal normal normal 16px Montserrat;
        color: #424242;
        ul {
            margin-top: 15px;
            list-style: none;
            li{
                text-indent: 20px;
                margin-top: 15px;
                :before {
                    content: ' ';
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background: #FCD20F;
                    display: inline-block;
                    margin-right: 4%;
                    margin-left: -7%;
                }
            }
        }
    }
@media only screen and (max-width: 900px) {
    .page-content {
        width: 100%;
        height: 120vh;
        margin-top: -10px;
        margin-bottom: -50px;
        padding-top: 10px;
        .page-heading {
            margin-top: 10px;
            .heading {
                z-index: 1;
            }
        }

        .box-container {
            grid-template-columns: 1fr;
            padding-top: 0px;
            margin-top: 10px;
            margin-bottom: 50px;
            .part {
                padding: 20px;
            }
        }
        .btns {
            margin-top: -70px;
            padding: 0px 5%;
            button {
                width: 100%;
                height: 40px;
                font: normal normal normal 13px/16px Montserrat;
            }
            span {
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

@media only screen and (max-width: 900px) { 
    .page-content {
        .box-container {
            grid-gap: 1%!important;
        }
        .view-td {
            text-decoration: underline;
            font: normal normal normal 11px/14px Montserrat;
            color: #007B5D;
            margin-top: 20px;
            margin-left: 4%;
        }
        .details {
            grid-template-columns: 1fr;
            grid-gap: 15px;
            width: 100%;
            >div {
                padding: 15px 10px;
                .heading {
                    .title {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                    .update {
                        font: normal normal normal 11px/14px Montserrat;
                    }
                }
                .row {
                    font: normal normal normal 11px/22px Montserrat;
                }
            }
            div {
                .radio-card {
                    padding: 15px;
                    grid-template-columns: 2.5fr 15fr;
                    min-height: fit-content;
                    border-radius: 8px;
                    .rc-head {
                        font: normal normal 600 15px Montserrat;
                        color: #424242;
                    }
                    .rc-body {
                        margin-top: 15px;
                        font: normal normal normal 11px Montserrat;
                    }
                    .rc-foot {
                        margin-top: 25px;
                        font: normal normal normal 11px Montserrat;
                    }
                }
            }
        }
    }
}
`
