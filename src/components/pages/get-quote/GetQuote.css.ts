import styled from "styled-components";

const style = styled.div`
    .page-content {
        margin-top: 0px;
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
                margin-top: 200px;
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
            @media only screen and (max-width: 900px) { 
                width: 190px;
            }
        }
        >div:nth-child(2){
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
            margin-top: 19px;
            button{
                background: #f8fcfb 0% 0% no-repeat padding-box;
                border: 1px solid #ebf5f3;
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                height: 48px;
                outline: none;
                :nth-child(1){
                    background: #CF0921 0% 0% no-repeat padding-box;
                    border-radius: 8px 0px 0px 8px;
                    color: #FFFFFF;
                }
                :nth-child(3){
                    border-radius: 0px 8px 8px 0px;
                }
                /* :hover{
                    background: #7FBCAD;
                    color: #fff;
                } */
            }
        }
        .amt-txt {
            margin-top: 60px;
        }
        .x-input{
            display: absolute;
            >div.flg-drp{
                margin: 0px;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
            }
            .you-send {
                color: #A3A3A3;
            }
        }
        .wrapper{
            position: relative;
            z-index: 0;
        }
        .timeline-box {
            height: 320px;
            border-left: 1.5px solid #7FBCAD;
            position: absolute;
            top: -20px;
            left: 30px;
            z-index: 1;
            .timeline{
                position: relative;
                left: -10px;
                margin-top: 30px;
                span{
                    width: 350px;
                    i{
                        font-size: 14px;
                        color: #7FBCAD;
                        img{
                            width: 18px;
                            height: 18px;
                        }
                    }
                    span {
                        font: normal normal normal 15px/19px Montserrat;
                        color: #424242;
                        padding-left: 5px;
                        position: absolute;
                    }
                }
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
                .deep-green{
                    font: normal normal 600 15px/19px Montserrat;
                    color: #007B5D;
                    width: fit-content;
                }
                .sb-charges {
                    .deep-green {
                        /* display: inline-block; */
                        position: unset;
                    }
                }
            }
            .timeline-1{
                margin-top: 20px;
            }
            .timeline-5{
                margin-top: 115px;
                left: -8px;
                >span{
                    span{
                        color: #A3A3A3;
                    }
                    b{
                        color: #424242;
                    }
                }
            }

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
            margin-top: 50px;
        }
        .head {
            width: 100% ;
            span:first-child {
                font: normal normal normal 13px/16px Montserrat;
            }
            span:last-child {
                font: normal normal normal 11px/14px Montserrat;
            }
        }
        .footnote {
            font: italic normal normal 10px/13px Montserrat;
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
                .timeline-box{
                    left: 20px;
                    top: -15px;
                    height: 240px;
                    .timeline {
                        span:not(.deep-green){
                            font-size: 12px;
                            width: 180px;
                            font: normal normal normal 10px/13px Montserrat!important;
                        }
                        .deep-green{
                            width: fit-content;
                            font: normal normal 600 10px/13px Montserrat;
                        }
                    }
                    .timeline-3{
                        position: absolute;
                        top: 235px;
                        left: -10px;
                        >span{
                            >span{
                              display: none;
                            }
                            .sa{
                                font-style: italic;
                                font-size: 9px;
                                font: italic normal normal 9px/13px Montserrat;
                                color: #424242;
                                .deep-green{
                                    font: italic normal 600 9px/13px Montserrat;
                                    position: static;
                                }
                            }
                            i{
                                display: none;
                            }
                        }
                    }
                    .timeline-5 {
                        margin-top: 90px;
                        .we-conv{
                            font: normal normal normal 11px Montserrat;
                            color: #424242;
                        }
                    }
                }
                .receive{
                    margin-top: 150px;
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
