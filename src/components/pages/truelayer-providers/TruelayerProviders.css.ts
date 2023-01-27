import styled from "styled-components";

export default styled.div`
.page-content {
    margin-top: 0px;
    .box-container {
        display: grid;
        grid-template-columns: 2fr 1.5fr;
        grid-gap: 4%;
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
        grid-template-columns: auto auto;
        gap: 10%;
        .disclaimer {
            text-align: left;
            a {
                text-decoration: underline;
                color: #007B5D;
            }
        }
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
    .details {
        div {
            &.box-container-inner {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(190px, 195px));
                grid-gap: 15px;
            }
            .radio-card {
                display: grid;
                /* grid-template-columns: 1.5fr 15fr; */
                background: #FFF;
                margin-bottom: 30px;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 8px;
                padding: 25px;
                max-height: 200px;
                min-height: 150px;
                text-align: center;
                .radio-card-inner {
                    display: grid;
                    padding: 0px 5px;
                    text-align: center;
                    .provider-icon {
                        width: 40px;
                        height: 40px;
                        margin: auto;
                    }
                    .provider-name {

                    }
                }

            }
        }
        
    }
    
}

@media only screen and (max-width: 900px) { 
.page-content {
    width: 100%;
    min-height: 120vh;
    margin-top: -10px;
    margin-bottom: 150px;
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
        margin-top: -70px;
        padding: 0px 5%;
        grid-template-columns: auto;
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
.page-content {
    .box-container {
        grid-gap: 1%!important;
    }
    .view-td {
        text-decoration: underline;
        font: normal normal normal 11px/14px Montserrat;
        color: #007B5D;
        margin-top: 20px;
        margin-left: 4%;
    }
    .details {
        grid-template-columns: 1fr;
        grid-gap: 15px;
        width: 100%;
        >div {
            padding: 15px 10px;
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
        div {
            &.box-container-inner {

            }
            .radio-card {
                padding: 15px;
                grid-template-columns: 1fr;
                min-height: 100px;
                font-size: small;
                border-radius: 8px;
                .rc-head {
                    font: normal normal 600 15px Montserrat;
                    color: #424242;
                }
                .rc-body {
                    margin-top: 15px;
                    font: normal normal normal 11px Montserrat;
                }
                .rc-foot {
                    margin-top: 25px;
                    font: normal normal normal 11px Montserrat;
                }
            }
        }
    }
}
}
`