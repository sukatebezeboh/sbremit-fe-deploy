import styled from "styled-components";

const style = () => styled.div`
    .row {
        display: grid;
        grid-template-columns: 1fr 1fr 1fr;
        padding: 50px 5%;
        >div {
            width: 300px;
            height: 300px;
            text-align: center;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            border: 2px solid #7FBCAD;
            border-radius: 15px;
            img {
                    width: 120px;
                    height: 120px;
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
    
`
export default style;
