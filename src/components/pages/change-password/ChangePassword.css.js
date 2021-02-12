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
                span{
                    margin: 0px;
                }
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
    
@media only screen and (max-width: 900px) { 
    background: #FFFFFF;
    padding: 1px 0px;
    min-height: 100vh;
    .box{
        box-shadow: none;
        grid-template-columns: 1fr;
        margin: 0px;
        padding: 0px;
        .content {
            font: normal normal normal 13px/20px Montserrat;
            margin-bottom: 195px;
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
                height: 30px;
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
            span {
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
