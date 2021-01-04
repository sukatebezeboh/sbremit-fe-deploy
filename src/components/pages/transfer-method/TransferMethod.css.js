import styled from "styled-components";

const style = () => styled.div`
    .page-heading {
        margin-top: 30px;
    }
    .box{
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        padding-bottom: 25px;
    }
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 50px 5%;
        >div {
            width: 88%;
            height: 300px;
            text-align: center;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 2px solid #7FBCAD;
            border-radius: 15px;
            :hover {
                
            }
            img {
                width: 40%;
                margin: 40px;
            }
            >div {
                :nth-child(2) {
                    font: normal normal 600 20px/24px Montserrat;
                    color: #424242;
                    margin-bottom: 10px;
                }
                :last-child {
                    font: normal normal normal 15px/19px Montserrat;
                    color: #424242;
                }
            }
        }
    }
    .footnote {
        text-align: center;
        font: italic normal normal 15px/19px Montserrat;
        color: #424242;
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
    .box {
        padding: 5px;
        padding-bottom: 15px;
        .row {
            padding: 15px;
            grid-template-columns: 1fr 1fr;

            >div {
                height: 180px;
                @media only screen and (max-width: 490px) { 
                    height: 123px;
                }
                padding: 15px;
                margin-bottom: 10px;
                img {
                    margin: 5px;
                }
                div {
                    :nth-child(2) {
                        font: normal normal 600 11px/14px Montserrat;
                    }
                    :last-child {
                        font: normal normal normal 7px Montserrat;
                        margin-top: -8px;
                    }
                }
                
            }
            .pickup {
                position: relative;
                left: 50% ;
            }
        }
    }
    .footnote {
        font: italic normal normal 11px/14px Montserrat;
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
}
`
export default style;
