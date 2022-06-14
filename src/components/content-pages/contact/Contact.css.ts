import styled from 'styled-components'

export default styled.div`

main {
    padding: 100px 0;
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    width: 90%;
    margin: auto;
    .detail-panel {
        h1 {
            font: normal normal 600 40px/32px Montserrat;
            color: #424242;
            margin-bottom: 45px;
            &::after {
                content: "";
                display: block;
                width: 50px;
                height: 4px;
                background: #007B5D 0% 0% no-repeat padding-box;
                border-radius: 15px;
                margin: 20px 0;
            }
        }

        .boxes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 51px;
            max-width: 500px;
            min-width: 200px;
            .box {
                text-align: center;
                display: grid;

                img {
                    width: 45px;
                    height: 45px;
                    margin: 25px auto;

                }
                .key {
                    font: normal normal 600 14px/20px Montserrat;
                    color: #424242;
                }
                .value {
                    font: normal normal normal 14px/20px Montserrat;
                    color: #424242;
                }
            }
        }

        .follow {
            >p {
                font: normal normal normal 16px/20px Montserrat;
                color: #424242;
            }
            .socials {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                max-width: 420px;
                .social {
                    background: #FFFFFF 0% 0% no-repeat padding-box;
                    box-shadow: 0px 2px 4px #00000033;
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                    padding: 15px;
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
            }
        }
    }
    .form-panel {
        .box {
            h5 {
                margin: 0px;
                font: normal normal bold 16px/22px Montserrat;
                color: #424242;
            }
            .text {
                font: normal normal normal 16px/22px Montserrat;
                color: #424242;
            }



            .form-group-1, .form-group-2 {
                margin-top: 40px;
                display: grid;
                grid-gap: 7%;
                .input-div {
                    label {
                        font: normal normal normal 15px/29px Montserrat;
                        color: #A3A3A3;
                    }
                    input {
                    }
                    textarea {
                        height: 255px!important;
                    }
                    input, textarea {
                        display: block;
                        width: 100%!important;
                        padding: 12px 20px;
                        font: normal normal normal 16px/19px Montserrat;
                        color: #424242;
                        outline: none;
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        border: 1px solid #CCCCCC;
                        border-radius: 4px;
                        ::placeholder {
                            font: normal normal normal 16px/19px Montserrat;
                            color: #A3A3A3;
                        }
                        :focus {
                            border: 1px solid #007B5D;
                        }
                    }
                }
            }

            .form-group-2 {
                grid-template-columns: 1fr 1fr;
            }

            .form-group-1 {
                grid-template-columns: 1fr;
            }

            button.btn {
                font: normal normal normal 20px/24px Montserrat;
                color: #424242;
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 5px;
                border: none;
                padding: 13px 75px;
                margin: 50px auto 0px;
                display: block;
                cursor: pointer;
            }
        }
    }
}

@media only screen and (max-width: 1000px) {

main {
    .detail-panel {
        .boxes {
            .box {
                padding: 15px;
                max-width: 500px;
                min-width: 200px;
            }
        }
    }
}

}

@media only screen and (max-width: 900px) {
main {
    padding: 100px 0;
    display: grid;
    grid-template-columns: 1fr;
    width: 95%;
    margin: auto;
    font: normal normal normal 13px/20px Montserrat;

    .detail-panel {
        h1 {
            font: normal normal bold 18px/25px Montserrat;
            color: #424242;
            margin-bottom: 20px;
            &::after {
                content: "";
                display: block;
                width: 26px;
                height: 4px;
                background: #007B5D 0% 0% no-repeat padding-box;
                border-radius: 15px;
                margin: 7px 0;
            }
        }

        .boxes {
            display: grid;
            grid-template-columns: 1fr 1fr;
            grid-gap: 4%;
            /* max-width: 200px;
            min-width: 100px; */
            padding: 0px 4%;
            margin: auto;
            .box {
                text-align: center;
                display: grid;
                max-width: 200px;
                min-width: 100px;
                img {
                    width: 35px;
                    height: 35px;
                    margin: 25px auto;
                }
                .key {
                    font: normal normal 600 10px/20px Montserrat;
                    color: #424242;
                }
                .value {
                    font: normal normal normal 10px/20px Montserrat;
                    color: #424242;
                }
            }
        }

        .follow {
            >p {
                text-align: center;
                font: normal normal normal 13px/20px Montserrat;
                color: #424242;
            }
            .socials {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                max-width: 420px;
                margin: auto;
                .social {
                    background: #FFFFFF 0% 0% no-repeat padding-box;
                    box-shadow: 0px 2px 4px #00000033;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    padding: 8px;
                    margin: auto;
                    img {
                        width: 20px;
                        height: 20px;
                    }
                }
            }
        }
    }
    .form-panel {
        .box {
            h5 {
                margin: 0px;
                font: normal normal bold 13px/20px Montserrat;
            }
            .text {
                font: normal normal normal 13px/20px Montserrat;
            }



            .form-group-1, .form-group-2 {
                margin-top: 20px;
                grid-gap: 10%;
                .input-div {
                    label {
                        font: normal normal normal 10px/13px Montserrat;
                    }
                    input {
                    }
                    textarea {
                        height: 100px!important;
                    }
                    input, textarea {
                        display: block;
                        width: 100%!important;
                        padding: 7px 15px;
                        font: normal normal normal 13px/16px Montserrat;
                        color: #424242;
                        outline: none;
                        background: #FFFFFF 0% 0% no-repeat padding-box;
                        border: 1px solid #CCCCCC;
                        border-radius: 4px;
                        ::placeholder {
                            font: normal normal normal 13px/16px Montserrat;
                            color: #A3A3A3;
                        }
                        :focus {
                            border: 1px solid #007B5D;
                        }
                    }
                }
            }

            .form-group-2 {
                grid-template-columns: 1fr;
            }

            .form-group-1 {
                grid-template-columns: 1fr;
            }

            button.btn {
                font: normal normal normal 13px/16px Montserrat;
                color: #424242;
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 5px;
                border: none;
                padding: 12px 75px;
                margin: 50px auto 0px;
                display: block;
                cursor: pointer;
            }
        }
    }
}
}
`
