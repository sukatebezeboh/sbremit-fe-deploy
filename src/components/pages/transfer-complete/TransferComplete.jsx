import React from 'react'
import { Link, useHistory } from 'react-router-dom';
import NavBar from '../../ui-components/navbar/NavBar';
import TransferDetailsBox from '../../ui-components/parts/TransferDetailsBox';
import ProgressBar from '../../ui-components/progress-bar/ProgressBar';
import styled from "styled-components";
import SuccessIcon from '../../ui-components/success-icon/SuccessIcon';
import { asset } from '../../../util/util';

const Body = styled.div`
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
        .completed-box {
            background: #FFF;
            width: 100%;
            height: 100%;
            background: #FFFFFF 0% 0% no-repeat padding-box;
            box-shadow: 0px 10px 12px #CCCCCC80;
            border-radius: 15px;
            text-align: center;
            .success-icon {
                display: block;
                height: 190px;
                canvas {
                    margin-top: -40px;
                    transform: scale(0.6, 0.6) rotate(-10deg);
                }
                
            }
            .completed-head {
                font: normal normal 600 25px/40px Montserrat;
                letter-spacing: 0px;
                color: #424242;
            }
            .completed-body {
                font: normal normal normal 18px/30px Montserrat;
                color: #A3A3A3;
                margin-top: 20px;
                margin-bottom: 70px;
            }
            .download {
                >div {
                    display: grid;
                    grid-template-columns: 0fr 1fr;
                    text-align: left;
                    width: fit-content;
                    margin: 0px auto;
                    img {
                        width: 24px;
                        height: 24px;
                        margin-right: 10px;
                    }
                    font: normal normal normal 20px/24px Montserrat;
                    color: #007B5D;
                }
               
            }
            .back {
                font: normal normal normal 20px/24px Montserrat;
                color: #424242;
                margin-top: 20px;
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
            .completed-box {
                .success-icon {
                    height: 110px;
                    @media only screen and (max-width: 340px) { 
                        width: 0px;
                    }
                    canvas {
                        margin-top: -70px;
                        transform: scale(0.4, 0.4) rotate(-10deg);
                    }
                    
                }
                .completed-head {
                    font: normal normal 600 15px/40px Montserrat;
                }
                .completed-body {
                    width: 80%;
                    margin: auto;
                    font: normal normal normal 13px/20px Montserrat;
                    margin-bottom: 30px;
                }
                .download {
                    >div {
                        font: normal normal normal 13px/16px Montserrat;
                        img {
                            width: 15px;
                            height: 16px;
                            margin-right: 5px;
                        }
                        
                    }
                
                }
                .back {
                    font: normal normal normal 13px/16px Montserrat;
                    margin-bottom: 50px;
                }
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

const TransferComplete = () => {
    const history = useHistory();

    return (
        <Body>
            <NavBar />
            <ProgressBar point={5} />
            <div className="page-content">
                <div className="box-container details">
                    <div className="completed-box">
                        <div className="success-icon">
                            <SuccessIcon />
                        </div>
                        
                        <div className="completed-head">
                            Transfer created!
                        </div>
                        <div className="completed-body">
                            Your transfer process will continue when SBremit receives the payment from your bank. You will receive an email confirmation
                        </div>
                        <div className="download">
                            <div>
                                <img src={asset('icons', 'download-file.svg')} alt="download"/><span>Download receipt</span>
                            </div>
                        </div>
                        <div className="back">
                            <Link to="/dashboard" >Back to Dashboard</Link>
                        </div>
                    </div>
                    <TransferDetailsBox />
                </div>
            </div>
        </Body>
    )
}

export default TransferComplete;
