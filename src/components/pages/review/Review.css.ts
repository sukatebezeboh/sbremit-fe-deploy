import styled from "styled-components";

export default styled.div`
.page-content {
    margin-top: 0px;
    .box-container {
        display: grid;
        grid-template-columns: 2fr 1.5fr;
        grid-gap: 5%;
        padding-top: 50px;
    }
    hr {
        border: 1px solid #f8f7f8;
        margin-bottom: 30px;
    }

    .search {
        float: right;
        position: absolute;
        right: 14%;
        width: 30%;
        z-index: 0;
        >div {
            input {
                background: #FFFFFF 0% 0% no-repeat padding-box;
                border: 0.5px solid #007B5D;
                border-radius: 8px;
                width: 80%;
                height: 48px;
                font: normal normal normal 16px/19px Montserrat;
                color: #A3A3A3;
                outline: none;
                padding: 0px 20px;
                ::placeholder{
                    font: normal normal normal 16px/19px Montserrat;
                    color: #A3A3A3;
                }
            }
            button {
                background: #007B5D;
                border-radius: 8px;
                border: none;
                width: 48px;
                height: 48px;
                position: relative;
                left: -15px;
                top: 3px;
                img {
                    width: 20px;
                    height: 20px;
                }
            }

        }
    }
    .btns {
        text-align: right;
        margin: 65px 0px;
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
    
}

@media only screen and (max-width: 900px) { 
.page-content {
    width: 100%;
    height: 120vh;
    margin-top: -10px;
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
        .part {
            padding: 20px;
        }
        
    }
    .btns {
        margin-top: -10px;
        padding: 0px 5%;
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
}

@media only screen and (max-width: 900px) { 
    .box-container {
        grid-gap: 1%!important;
    }
    .details {
            grid-template-columns: 1fr;
            grid-gap: 15px;
            width: 100%;
            >div {
                padding: 15px 20px;
                .heading {
                    .title {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                    .update {
                        font: normal normal normal 11px/14px Montserrat;
                    }
                }
                .row {
                    font: normal normal normal 11px/22px Montserrat;
                }
            }
            .recipient-details {
                margin-left: auto;
            }
            .transfer-details {

            }
        }
}
`
