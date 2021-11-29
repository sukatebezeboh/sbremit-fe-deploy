
import styled from "styled-components";

const style = () => styled.div`
    .box {
        background: #ffffff;
        margin: 50px 0px;
        border-radius: 15px;
        box-shadow: 0px 10px 12px #CCCCCC80;
        padding: 30px 50px;
        >div.up {
            display: grid;
            grid-template-columns: 3fr 2fr;
            div.left{
                display: grid;
                grid-template-columns: 0.7fr 3fr 2fr;
                >img {
                    width: 59px;
                    height: 59px;
                    border-radius: 50%;
                }  
                div{
                    div {
                        :first-child {
                            margin-top: 10px;
                            font: normal normal bold 19px/22px Montserrat;
                            color: #424242;
                        }
                        :last-child {
                            font: normal normal normal 15px/41px Montserrat;
                            color: #A3A3A3;
                        }
                    }
                    span.status {
                        display: inline-block;
                        background: #007B5D;
                        border-radius: 15px;
                        font: normal normal normal 12px Montserrat;
                        color: #FFFFFF;
                        padding: 7px 20px 8px 20px;
                        margin-top: 15px;
                    }
                }
            }
            div.right {
                text-align: right;
                padding-top: 15px;
                span{
                    margin-left: 54px; 
                    img {
                        width: 13px;
                        height: 13px;
                        margin-right: 10px;
                    } 
                }
                
            }
        }
        hr {
            border: 1px solid #f5f4f5;
        }
        div.down {
            display: grid;
            grid-template-columns: 2fr 2fr 1fr;
            .detail-grp {
                margin: 40px 0px;
                div{
                    :first-child{
                        font: normal normal normal 16px Montserrat;
                        color: #A3A3A3;
                    }
                    :last-child {
                        font: normal normal normal 20px/44px Montserrat;
                        color: #424242;
                        width: 60%;
                    }
                }
            }
        }
    }

    @media only screen and (max-width: 900px) { 
        background: #FFFFFF;
        padding: 1px 0px;
        .box {
            background: transparent;
            padding: 0px;
            box-shadow: none;
            margin: 0;
            >div.up{
                grid-template-columns: 1fr;
                div.left {
                    grid-template-columns: 0fr 1fr;
                    >img {
                        width: 44px;
                        height: 44px;
                    }
                    div{
                        >div{
                            :first-child {
                                margin-top: 3px;
                                font: normal normal normal 17px Montserrat;
                                color: #000000;
                            }
                            :last-child {
                                font: normal normal normal 13px/35px Montserrat;
                            }
                        }
                        span.status{
                            font: normal normal normal 8px Montserrat;
                            padding: 3px 15px; 
                            margin-top: 0px;
                        }
                    }
                    
                }
                div.right {
                    margin-top: -32px;
                    span  {
                        font: normal normal normal 10px/28px Montserrat;
                        margin-left: 20px;
                        img{
                            width: 9px;
                            height: 10px;
                            margin-right: 7px;
                        }
                        color: #A3A3A3;
                    }
                }
            }
            >div.down {
                grid-template-columns: minmax(0, 1.5fr) minmax(0, 1fr) ;
                .detail-grp {
                    margin: 15px 0px;
                    word-break: break-word;
                    div {
                        :first-child{
                            font: normal normal normal 10px Montserrat;
                        }
                        :last-child {
                            font: normal normal normal 13px/30px Montserrat;
                            width: 100% ;
                        }
                    }
                }
            }
        }
    }
`
export default style;
