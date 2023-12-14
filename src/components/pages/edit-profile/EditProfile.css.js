import styled from "styled-components";

const style = () => styled.div`

    .box {
        padding: 100px 5px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .content {
            font: normal normal normal 16px/28px Montserrat;
            color: #424242;
            margin-bottom: 0px;
            margin-left: 5%;
        }
        .form {
            width: 80%;
            .name{
                font: normal normal normal 15px/29px Montserrat;
                color: #A3A3A3;
                i{
                    color: #FCD20F;
                }
            }
            input {
                background: #FFFFFF 0% 0% no-repeat padding-box;
                border: 2px solid #7FBCAD;
                border-radius: 4px;
                width: 100%;
                height: 48px;
                padding: 15px 20px;
                font: normal normal normal 16px/19px Montserrat;
                color: #A3A3A3;
                ::placeholder{
                    font: normal normal normal 16px/19px Montserrat;
                    color: #A3A3A3;
                }
            }
        }
        div.phone-box {
          border: 1px solid #7fbcad;
          border-radius: 4px;
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          margin-bottom: 30px;
          
          img {
            height: 24px;
            width: 36px;
            margin: 0 8px;
          }
          input {
            width: 50%;
            margin-bottom: 0;
            flex: 1;
            margin-left: 8px;
            border-top: 0;
            border-bottom: 0;
          }
          .green-txt.input{
            border: none;
            outline: none;
          }
        }

        .part{
                background: #FFFFFF;
                border-radius: 15px;
                width: 100%;
                padding: 0px 30px;
                margin: 0px auto;
                .heading {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    .title {
                        font: normal normal normal 20px/24px Montserrat;
                        color: #A3A3A3;
                    }
                    .update {
                        text-align: right;
                        font: normal normal normal 16px/19px Montserrat;
                        color: #007B5D;
                    }
                }
                .inputs{
                    margin-top: 50px;
                    margin: 30px auto;
                    width: 100%;
                    .radio-span {
                        input[type=radio] {
                            width: 19px;
                            :before {
                                width: 19px;
                                height: 19px;
                                border-radius: 15px;
                                top: 27%;
                                left: -5%;
                                position: relative;
                                background-color: white;
                                content: '';
                                display: inline-block;
                                visibility: visible;
                                border: 1px solid #FCD20F;
                                pointer-events: none;
                                @media only screen and (max-width: 900px) {
                                    top: 27%;
                                }
                            }
                            :checked{
                                :after {
                                    width: 11px;
                                    height: 11px;
                                    border-radius: 15px;
                                    top: -8px;
                                    left: 15%;
                                    position: relative;
                                    background-color: #FCD20F;
                                    content: '';
                                    display: inline-block;
                                    visibility: visible;
                                    border: 1px double #FCD20F;
                                    z-index: 1;
                                    pointer-events: none;
                                    @media only screen and (max-width: 900px) {
                                        /* top: -57%; */
                                    }
                                }
                            }
                        }
                        .radio-txt {
                            padding: 17px 5px;
                        }
                    }
                    input, select:not(.phone-code) {
                        margin-bottom: 5px;
                        width: 100%;
                        height: 48px;
                        border: 1px solid #7FBCAD;
                        border-radius: 4px;
                        background: #ffffff;
                        outline: none;
                        font: normal normal normal 14px Montserrat;
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
                        background-position-x: 10%;
                        background-position-y: 10px;
                        padding: 0px;
                        padding-left: 75px;
                    }
                    .day-select {
                        padding-left: 10px !important;
                        background-position-x: 100% !important;
                    }
                    .month-select {
                        padding-left: 3px !important;
                        background-position-x: 100% !important;
                    }
                    input.phone-no {
                        margin-bottom: 0;
                    }
                    /* input.phone-no {
                        position: relative;
                        top: 51px;
                        width: 65%;
                        height: 44px;
                        margin-left: 34%;
                        border: 2px solid transparent;
                        background: #fff;
                        padding: 0 !important;
                    } */
                    /* .phone-country-select {
                        background-position-x: 26%;
                        background-position-y: 12px;
                    } */
                    /* div.mobile-head {
                        margin-bottom: -44px;
                    } */
                    .dob {
                        margin-top: 6px;
                        input {
                            padding: 9px;
                        }
                    }
                    select+img{
                        position: relative;
                        top: -35px;
                        left: 20px;
                        width: 25px;
                        height: 19px;
                        box-shadow: 0px 3px 6px #00000029;
                        border-radius: 1px;
                        pointer-events: none;
                    }
                    /* select+.phone-code-value {
                        left: 15px;
                        top: -38px;
                        box-shadow: none;
                    } */

        
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
                        }
                        >div{
                            font: normal normal normal 15px/19px Montserrat;
                            line-height: 19px;
                        }
                    }
                    >div.names {
                        box-sizing: border-box;
                        display: grid;
                        grid-template-columns: 5fr 1fr 5fr;
                    }
            }
        }
        .part.second{
            padding-top: 30px;
            .state-input-div {
                margin-top: 20px!important;
            }
            .city-town-div {
                margin-top: 30px!important;
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





        .btn {
            text-align: right;
            width: 95%;
            span {
                display: inline-block;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                margin-right: 50px;
                cursor: default;
            }
            button{
                margin-top: 50px;
                background: #FCD20F;
                border-radius: 4px;
                width: 220px;
                height: 48px;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                outline: none;
                border: none;
                span{
                    margin: 0px;
                }
            }
        }
        .text {
            height: 450px;
            /* margin-top: 99px; */
            padding: 50px 10%;
            font: normal normal normal 16px/28px Montserrat;
            color: #A3A3A3;
            div {
                width: 79%;
            }
            ul {
                margin-top: 50px;
                margin-left: -2.5%;
                list-style: none;
                li{
                    margin-top: 14px;
                    text-indent: 20px;
                    :before {
                        content: ' ';
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #FCD20F;
                        display: inline-block;
                        margin-right: 7%;
                        margin-left: -7%;
                    }
                }
            }
        }
    }

    .phone-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        border: 1px solid #7FBCAD;
        margin-bottom: 20px;
        padding-left: 16px;
        border-radius: 4px;
        img{
            height: 24px;
            width: 36px;
        }
        p{
            margin: 0 12px;
        }
    }

@media only screen and (max-width: 900px) {
    background: #FFFFFF;
    padding: 1px 0px;
    min-height: 100vh;
    
    .phone-country-select {
        background-position-x: 16% !important;
    }
    .box{
        box-shadow: none;
        grid-template-columns: 1fr;
        margin: 0px;
        padding: 0px;
        .content {
            font: normal normal normal 13px/20px Montserrat;
            margin-bottom: 15px;
        }
        .form {
            margin-top: 15px;
            width: 100%;
            margin-bottom: -20px;
            .name, input {
                font: normal normal normal 10px/13px Montserrat;
                ::placeholder{
                    font: normal normal normal 10px/13px Montserrat;
                }
            }
            input{
                height: 25px;
                border: 1px solid #7FBCAD;
                width: 100%;
            }
        }
        .btn {
            margin-top: 0px;
            width: 100% ;
            button {
                margin-top: 30px;
                height: 40px;
                width: 100% ;
                font: normal normal normal 13px/16px Montserrat;
            }
            >span {
                width: 100%;
                text-align: center;
                margin: 0px;
                position: relative;
                top: 110px;
                font: normal normal normal 13px/16px Montserrat;
            }
        }
        .footer {
            margin-top: 60px;
            font: normal normal normal 11px/12px Montserrat;
            span {
                font: normal normal normal 11px/12px Montserrat;
            }
        }
        .text {
            font: normal normal normal 13px/20px Montserrat;
            border: none;
            height: 220px;
            position: absolute;
            top: 120px;
            left: -5%;
            div {
                width: 100%;
            }
            ul{
                margin-top: 15px;
                li{
                    margin-top: 0px;
                    ::before{
                        width: 5px;
                        height: 5px;
                        margin-right: 5%;
                        margin-left: -46px;
                    }
                }
            }
        }
    }
}
`

export default style;
