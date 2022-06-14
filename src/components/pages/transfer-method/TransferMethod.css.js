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
        .selected {
            background: #007b5d!important;
            div{
                color: white!important;
            }
            img {
                filter: invert(0%) sepia(21%) saturate(28%) hue-rotate(346deg) brightness(204%) contrast(97%);
            }
        }
        >div {
            width: 88%;
            min-height: 300px;
            text-align: center;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 2px solid #7FBCAD;
            border-radius: 15px;
            padding: 10px;
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
            cursor: pointer;
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
            cursor: pointer;
        }
    }
@media only screen and (max-width: 900px) {
    .box {
        padding: 20px;
        padding-bottom: 40px;
        .row {
            padding: 15px;
            grid-template-columns: 1fr 1fr;

            >div {
                min-height: 120px;
                height: 180px;
                padding: 15px;
                margin-bottom: 30px;
                img {
                    width: 20%;
                    margin: 10px;
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
                margin-bottom: 10px;
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
@media only screen and (max-width: 600px) { 
    .box {
        padding: 30px 25px 70px;
        .row {
            display: flex;
            flex-direction: column;
            >div {
                min-height: 70px;
                height: 70px;
                position: relative;
                width: 100%;
                margin-bottom: 15px;
                display: flex;
                img {
                    margin: 0;
                    width: 30px;
                }
                div {
                    :nth-child(2) {
                        height: fit-content;
                        position: absolute;
                        left: 70px;
                        top: 20px;
                    }
                    :last-child {
                        height: fit-content;
                        position: absolute;
                        left: 70px;
                        top: 45px;
                    }
                }
            }
            .pickup {
                position: relative;
                left: 0 ;
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
