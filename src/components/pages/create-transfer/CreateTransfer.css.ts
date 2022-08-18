import styled from "styled-components";

export default styled.div`
.page-content {
    margin-top: 150px;
    .box-container {
        display: grid;
        grid-template-columns: 2fr 1.3fr;
        grid-gap: 5.5%;
        padding-top: 50px;
    }
    hr {
        border: 1px solid #f8f7f8;
        margin-bottom: 30px;
    }

    .btns {
        text-align: right;
        margin: 65px 0px;
        display: grid;
        grid-template-columns: 1fr 0fr;
        >span {
            display: inline-block;
            margin-right: 0px;
            font: normal normal normal 25px/30px Montserrat;
            color: #424242;
            cursor: default;
            &.cancel {
                padding-top: 20px;
                margin-right: 40px;
            }
        }
        button {
            background: #FCD20F 0% 0% no-repeat padding-box;
            border-radius: 8px;
            min-width: 550px;
            min-height: 80px;
            text-align: center;
            font: normal normal normal 25px/30px Montserrat;
            color: #424242;
            border: none;
            outline: none;
        }
        .btn-group {
            small {
                display: block;
                color: #A3A3A3;
                font-size: 16px;
            }
        }
    }
    .details {
        
        .pls-note {
            font: normal normal 600 16px Montserrat;
            color: #424242;
        }
        .list {
            font: normal normal normal 16px Montserrat;
            color: #424242;
            ul {
                margin-top: 15px;
                margin-left: -2%;
                list-style: none;
                li{
                    text-indent: 20px;
                    margin-top: 15px;
                    :before {
                        content: ' ';
                        width: 10px;
                        height: 10px;
                        border-radius: 50%;
                        background: #FCD20F;
                        display: inline-block; 
                        margin-right: 4%; 
                        margin-left: -7%;
                    }
                }
            }
        }
        .green-box {
            background: #007B5D 0% 0% no-repeat padding-box;
            box-shadow: 0px 10px 12px #CCCCCC80;
            border-radius: 15px;
            width: 1005;
            /* height: 349px; */
            margin-top: 40px;
            margin-bottom: 50px;
            padding: 0px 50px;
            div{
                font: normal normal normal 16px/44px Montserrat;
                color: #CCCCCC;
                display: grid;
                grid-template-columns: 1fr 1fr;
                padding: 12px 0px;
                border-bottom: 1px solid #3e876c;
                span:last-child {
                    text-align: right;
                    font: normal normal normal 16px/44px Montserrat;
                    color: #FFFFFF;
                }
            }
        }
    }
}

@media only screen and (max-width: 900px) {
.page-content {
    width: 100%;
    height: 120vh;
    margin-top: 60px;
    margin-bottom: -50px;
    padding-top: 10px;
    .page-heading {
        margin-top: 10px;
        .heading {
            z-index: 1;
        }
    }

    .box-container {
        grid-template-columns: 1fr;
        padding-top: 0px;
        margin-top: 10px;
        margin-bottom: 50px;
        .within {
            margin: 20px;
            .list {
                ul {
                    margin-left: -40px;
                    font: normal normal normal 13px/20px Montserrat;
                    color: #424242;
                    li {
                        padding-left: 20px;
                        text-indent: -20px;
                        margin-top: 15px;
                        :before {
                            width: 7px;
                            height: 7px;
                            margin-right: 4%; 
                            margin-left: 0%;
                        }
                    }
                }
            }
            .green-box {
                padding: 0px 20px;
                margin-bottom: 20px;
                div {
                    span {
                        font: normal normal normal 11px/22px Montserrat;
                    }
                }
            }
        }
        
    }
    .btns {
        margin-top: 0px;
        padding: 0px 2%;
        grid-template-columns: 1fr;
        grid-template-areas: 'a' 'b';
        button {
            width: 100%;
            min-height: 40px;
            font: normal normal normal 13px/16px Montserrat;
            min-width: fit-content;
        }
        span {
            font: normal normal normal 13px/16px Montserrat;
            text-align: center;
            display: block;
            margin-right: 0px;
            position: relative;
            top: 70px;
            &.cancel {
                grid-area: b;
            }
        }
    }
    .cpm-text {
        font: normal normal normal 11px/14px Montserrat;
    }
   
}
.view-td {
        text-decoration: underline;
        font: normal normal normal 11px/14px Montserrat;
        color: #007B5D;
        margin-top: 20px;
        margin-left: 4%;
    }
}

@media only screen and (max-width: 900px) { 
.page-content {
    .box-container {
        grid-gap: 1%!important;
    }
   
    .details {
        grid-template-columns: 1fr;
        grid-gap: 15px;
        width: 100%;
        
        
    }
}
}

@media only screen and (max-width: 590px) { 
.page-content {
    .details {
        
        
    }
    
}
    
}
`
