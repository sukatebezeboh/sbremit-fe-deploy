import styled from "styled-components";

const style = styled.div`
    .page-content {
        margin-top: 0px;
        margin-bottom: 100px;
    }

    .head {
        display: grid;
        grid-template-columns: 1fr 1fr;
        width: 50%;
        margin: 30px auto;
        span {
            :first-child {
                font: normal normal normal 25px/30px Montserrat;
                color: #A3A3A3;
            }
            :last-child {
                text-align: right;
                font: normal normal normal 16px/19px Montserrat;
                color: #007B5D;
            }
        }
    }


    .hero-rect {
        width: 50% ;
        margin: 0px auto;
        padding-bottom: 70px;
        .md-txt{
            font: normal normal normal 25px/30px Montserrat;
            color: #A3A3A3;
        }
        .receive{
                margin-top: 150px;
                position: relative;
        }
        .x-error-message {
            width: 200px;
            position: absolute;
            display: none;
        }
        .toggle {
            width: 300px;
            float: right;
            z-index: 2;
            position: relative;
            @media only screen and (max-width: 1200px) { 
                width: 250px;
            }
            @media only screen and (max-width: 900px) { 
                width: 190px;
            }
        }
       
        .amt-txt {
            margin-top: 60px;
        }

        .wrapper{
            position: relative;
            z-index: 0;
        }

    }

    .footnote {
        text-align: center;
        font: italic normal normal 15px/19px Montserrat;
        color: #424242;
        margin-bottom: 30px;
    }




    .btns {
        text-align: right;
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


    .exchange-rate-calculator {
        box-shadow: none;
        /* border: none; */

        .calculator-inner {
            >.title {
                display: none;
            }

            .send-btn {
                display: none;
            }
        }
    }


@media only screen and (max-width: 900px) { 
    background: white;
    min-height: 100vh;
    .page-heading {
        margin-top: 30px;
    }
    .box {
        margin: 0px;
        box-shadow: none;
        padding: 0px;
        .hero-rect {
            width: 100%;
            margin-top: -10px;
        }
        .head {
            width: 100%;
            margin-top: 50px;
            margin-bottom: 0;
            span:first-child {
                font: normal normal normal 13px/16px Montserrat;
            }
            span:last-child {
                font: normal normal normal 11px/14px Montserrat;
            }
        }
        .footnote {
            font: italic normal normal 10px/13px Montserrat;
            margin: 50px 10px -100px;
        }
    }

    .btns {
        margin-top: -30px;
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

            grid-template-columns: 1fr;
            .hero-texts{
                display: none;
            }
            .hero-rect{
                width: 100%;
                border-radius: 0px;
                box-shadow: none;
                >button{
                    font-size: 13px;
                    height: 54px;
                    padding: 0px;
                }

                
                .md-txt{
                    font: normal normal normal 13px/16px Montserrat;
                    color: #A3A3A3;
                }
                div:nth-child(2){
                    display: grid;
                    grid-template-columns: 1fr 1fr 1fr;
                    margin-top: 15px;
                    button{
                        font: normal normal normal 10px/13px Montserrat;
                        height: 30px;
                    }
                }
                .amt-txt {
                    margin-top: 30px;
                }
                .x-input{
                    height: 54px;
                    padding: 0px 10px;
                    div{
                        font-size: 10px;
                        input {
                            font-size: 15px; 
                        }
                    }
                    >div.flg-drp{
                        margin-top: 10px;
                        img{
                            width: 26px;
                            height: 26px; 
                        }
                        span.data-c{
                            font-size: 13px;
                            margin-right: 23px;
                            margin-top: 3px;
                            text-transform: uppercase;
                        }
                        span.span-angle{
                            font-size: 5px;
                            color: #007B5D;
                            margin-top: 10px;
                            img{
                                height: 9px;
                                width: 10px;
                            }
                        }
                    }
                }
        }



}
    

`

export default style;
