import styled from 'styled-components';

export default styled.div`
    .page-content {
        margin-top: 0px;
        .box-container {
            display: grid;
            grid-template-columns: 2fr 1.3fr;
            grid-gap: 2%;
            padding-top: 50px;
        }
        hr {
            border: 1px solid #f8f7f8;
            margin-bottom: 30px;
        }

        .part{
            background: #FFFFFF;
            box-shadow: 0px 10px 12px #CCCCCC80;
            border-radius: 15px;
            width: 100%;
            padding: 50px;
            margin: 0px auto;
            .heading {
                display: grid;
                grid-template-columns: 1fr 1fr;
                .title {
                    font: normal normal normal 20px/24px Montserrat;
                    color: #A3A3A3;
                }
                .update {
                    text-align: right;
                    font: normal normal normal 16px/19px Montserrat;
                    color: #007B5D;
                }
            }

            .small-boxes {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                .recipient {
                    display: grid!important;
                    grid-template-rows: 1fr 1fr;
                    border-radius: 8px;
                    width: 92%;
                    height: 175px;
                    text-align: center;
                    padding: 35px 0px;
                    box-shadow: 0px 2px 4px #CCCCCC80;
                    margin-top: 35px;
                    font: normal normal normal 16px/20px Montserrat;
                    color: #424242;
                    img{
                        width: 25%;
                        margin: auto;
                        /* width: 55px;
                        height: 55px; */
                        margin-bottom: 15px;
                        border-radius: 50%;
                    }
                    .recipient-transfer-method {
                        color: #A3A3A3;
                    }
                    @media only screen and (min-width: 2550px) and (max-width: 4000px) { 
                        padding: 45px 0px;
                        height: 220px;
                    }
                }
                .plus {
                    background: #007B5D;
                    color: white;
                    img {
                        border-radius: 0px;
                    }
                }
            }
        }

        .search {
            float: right;
            position: absolute;
            right: 14%;
            width: 30%;
            z-index: 1;
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
        background: #fff;
        width: 100%;
        height: fit-content;
        margin-top: -10px;
        padding-top: 10px;
        .page-heading {
            margin-top: 10px;
            .heading {
                z-index: 1;
            }
        }
        .view-td {
            text-decoration: underline;
            font: normal normal normal 11px/14px Montserrat;
            color: #007B5D;
            margin-top: 20px;
            margin-left: 4%;
        }
        .box-container {
            grid-template-columns: 1fr;
            padding-top: 0px;
            margin-top: 80px;
            margin-bottom: 50px;
            .part {
                padding: 20px;
                box-shadow: none;
            }
            .small-boxes {
                grid-template-columns: 1fr;
                .recipient.plus{
                    /* display: none!important; */
                    color: white;
                    height: 50px;
                    padding: 5px 20px;
                    width: fit-content;
                    span {
                        text-align: left;
                        display: inline-block;
                        padding: 10px 15px;
                    }
                }
                .recipient {
                    grid-template-columns: 0fr 7fr;
                    grid-template-rows: 1fr;
                    height: 70px;
                    padding: 15px;
                    font: normal normal normal 16px/20px Montserrat;
                    color: #424242;
                    width: 100%;
                    margin-top: 15px;
                    >div:last-child{
                        padding: 6px 15px;
                        text-align: left;
                    }
                    img {
                        width: 40px;
                        height: 40px;
                    }
                }
            }
            
        }
        .search {
            width: 100%;
            left: 2%;
            top: 210px;
            text-align: center;
            padding: 0px;

            >div {
                input {
                    height: 35px;
                    font: normal normal normal 13px Montserrat;
                    color: #A3A3A3;
                    ::placeholder{
                        font: normal normal normal 13px/16px Montserrat;
                        color: #A3A3A3;
                    }
                }
                button {
                    width: 48px;
                    height: 35px;
                    top: 4px;
                    left: -27px;
                }
            }
        }
        .btns {
            margin-top: -30px;
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
`