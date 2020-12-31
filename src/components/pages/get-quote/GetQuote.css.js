import styled from "styled-components";

const style = () => styled.div`
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
                margin-top: 150px;
                position: relative;
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
            height: 270px;
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


    

`

export default style;
