import styled from 'styled-components';

const style = () => styled.div`
    display: grid;
    grid-template-columns: 11fr 10fr;
    margin-left: 5.3%;
    min-height: 120vh;
    .heading {
        font: normal normal 600 30px/32px Montserrat;
        color: #007B5D;
        margin-top: 240px;
    }
    .content {
        font: normal normal normal 25px/45px Montserrat;
        color: #424242;
        margin-top: 50px;
        margin-bottom: 75px;
        width: 50%;
    }
    .form {
        width: 51.5%;
        margin-top: 25px;
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
        text-align: center;
        width: 51.5%;
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
    .footer{
        margin-top: 80px;
        font: normal normal normal 17px/19px Montserrat;
        text-align: center;
        width: 51.5%;
        color: #A3A3A3;
        span {
            text-decoration: underline;
            font: normal normal normal 17px/19px Montserrat;
            color: #007B5D;
        }
    }
    .text {
        border-left: 1px solid lightgrey;
        height: 450px;
        margin-top: 247px;
        padding: 50px 6.7%;
        font: normal normal normal 25px/45px Montserrat;
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
    @media only screen and (max-width: 1140px) { 
        grid-template-columns: 1fr 1fr;
        .content, .form, .btn, .footer {
            width: 95%
        }
    }

    @media only screen and (max-width: 780px) { 
        grid-template-columns: 1fr;
        >div:first-child{
            margin: auto 30px;
        }
        .heading {
            font: normal normal 600 20px/32px Montserrat;
            margin-top: 82px;
        }
        .content {
            margin-top: 20px;
            font: normal normal normal 13px/20px Montserrat;
            margin-bottom: 195px;
        }
        .form {
            margin-top: 20px;
            .name, input {
                font: normal normal normal 10px/13px Montserrat;
                ::placeholder{
                    font: normal normal normal 10px/13px Montserrat;
                }
            }
            input{
                height: 30px;
                border: 1px solid #7FBCAD;
            }
        }
        .btn {
            margin-top: 0px;
            button {
                margin-top: 30px;
                height: 40px;
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
            top: -100px;
            left: 25px;
            ul{
                margin-top: 15px;
                li{
                    margin-top: 0px;
                    ::before{
                        width: 5px;
                        height: 5px;
                        margin-right: 5%; 
                        margin-left: -46px;
                        background: #A3A3A3;
                    }
                }
            }
            
        }
    }
`
export default style;
