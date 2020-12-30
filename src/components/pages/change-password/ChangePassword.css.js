import styled from "styled-components";

const style = () => styled.div`
    .box {
        padding: 100px 50px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        .content {
            font: normal normal normal 16px/28px Montserrat;
            color: #424242;
            margin-bottom: 60px;
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
        .btn {
            text-align: right;
            width: 80%;
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
            }
        }
        .text {
            border-left: 1px solid lightgrey;
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
`

export default style;
