import styled from "styled-components";

export const style = (bg = './assets/bg/london-bg.png') => (

styled.div`
    background: url(${bg}) grey;
    max-height: 200vh;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: hidden;
    .f-growing{
        display: none;
    }
    .mobile{
        display: none;
    }
    .nav {
        width: 100%;
        margin: 0px;
        padding-top: 40px;
        padding-right: 100px;
        button, a {
            float: right;
            margin: 10px;
            padding: 0px;
        }
        .sign-up{
            border: 2px solid #007B5D;
            border-radius: 8px;
            width: 180px;
            height: 48px;
            background: transparent;
            font: normal normal normal 20px/24px Montserrat;
            color: #007B5D;
            :hover{
                background: #007B5D;
                color: white
            }
        }
        a{
            font: normal normal normal 20px/24px Montserrat;
            letter-spacing: 0px;
            color: #424242;
            margin: 24px 50px;
            display: inline-block;
            float: right;
            text-decoration: none;
        }
    }
    .hero-grid{
        display: grid;
        grid-template-columns: 1.6fr 1fr;
        width: 100%;
    }
    .hero-texts {
        color: #1F1F1F;
        width: 95%;
        display: inline-block;
        div{
            width: 75%;
            margin-left: 8.5%;
        }
        div:first-child{
            font: normal normal 700 60px/80px Montserrat;
            margin-top: 217px;
        }
        div:nth-child(2){
            font: normal normal normal 40px/65px Montserrat;
            letter-spacing: 0px;
            color: #1F1F1F;
            margin-top: 75px;
            width: 65%;
        }
    }
    .hero-rect {
        margin-top: 45px;
        margin-bottom: 50px;
        width: 87%;
        max-height: 900px;
        background: #fff;
        display: inline-block;
        background: #FFFFFF 0% 0% no-repeat padding-box;
        box-shadow: 0px 15px 30px #CCCCCC80;
        border-radius: 25px;
        padding: 50px;
        z-index: 1;
        .md-txt{
            font: normal normal normal 25px/30px Montserrat;
            color: #A3A3A3;
        }
        .receive{
                margin-top: 206px;
        }
        div:nth-child(2){
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
                :hover{
                    background: #7FBCAD;
                    color: #fff;
                }
            }
        }
        .amt-txt {
            margin-top: 60px;
        }
        >button{
            width: 100%;
            height: 80px;
            background: #FCD20F 0% 0% no-repeat padding-box;
            border-radius: 8px;
            font: normal normal normal 25px/30px Montserrat;
            color: #424242;
            border: none;
            margin-top: 89px;
            outline: none;
        }
        .x-input{
            >div.flg-drp{
                margin: 0px;
            }
        }
        .wrapper{
            position: relative;
        }
        .timeline-box {
            height: 318px;
            border-left: 1.5px solid #7FBCAD;
            position: absolute;
            top: 0px;
            left: 30px;
            z-index: -1;
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
                    }
                }
                .deep-green{
                    font: normal normal 600 15px/19px Montserrat;
                    color: #007B5D;
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
    @media only screen and (max-width: 1700px) { 
        .hero-grid{
            grid-template-columns: 1.5fr 2fr;
        }
    }
    @media only screen and (max-width: 1140px) { 
        .hero-grid{
            grid-template-columns: 1fr 2fr;
            .hero-texts{
                transform: scale(0.75, 0.75);
                margin-top: -150px;
                div{
                    font-size: 30px;
                }
            }
        }
    }
    @media only screen and (max-width: 780px) { 
        background: white;
        height: auto;
        .f-growing{
            display: block;
            font: normal normal bold 20px/26px Montserrat;
            color: #1F1F1F;
            width: 268px;
            text-align: center;
            position: relative;
            top: 55px;
            margin: auto;
            z-index: +3;
        }
        .hero-grid{
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
                    height: 230px;
                    .timeline {
                        span{
                            font-size: 12px
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
                            sa{
                              font-style: italic;
                              font-size: 9px;
                            }
                            i{
                                display: none;
                            }
                        }
                    }
                    .timeline-5 {
                        margin-top: 90px;
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
                    .flg-drp{
                        margin-top: 7px;
                        img{
                            width: 26px;
                            height: 26px; 
                        }
                        span:nth-child(2){
                            font-size: 13px;
                            margin-right: 23px;
                            margin-top: 0px;
                            text-transform: uppercase;
                        }
                        span:nth-child(3){
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
        .nav{
            .sign-in{
                    display: none;
            } 
            .sign-up{
                transform: scale(0.5, 0.5);
                float: none;
                position: absolute;
                right: -25px;
                top: 0px;
            }
        }
    }

`
)
