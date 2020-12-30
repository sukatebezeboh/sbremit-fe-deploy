
import styled from "styled-components";

const style = () => styled.div`
    .box {
        background: #ffffff;
        /* height: 706px; */
        margin: 50px 0px;
        border-radius: 15px;
        box-shadow: 0px 10px 12px #CCCCCC80;
        padding: 30px 50px;
        >div:first-child {
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
            grid-template-columns: 2fr 2fr 0.5fr;
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
`
export default style;
