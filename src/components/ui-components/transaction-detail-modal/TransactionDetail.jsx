import React, {useState} from 'react'
import styled from 'styled-components'
import { asset } from '../../../util/util';
import PageHeading from '../page-heading/PageHeading';

// import {Link} from 'react-router-dom';

const style = () => styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: ${(document.body.clientWidth || document.documentElement.clientWidth || window.innerWidth) + 1000}px;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1;

    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 75%;
        background: #fff;
        margin: 47px auto;
        padding: 60px 0px 30px;
        .head {
            border-bottom: 1px solid #f7f6f7;
            display: grid;
            grid-template-columns: 3fr 3fr 4fr;
            width: 85%;
            margin: 0px auto;
            padding: 20px 0px;
            .t-id {
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                span {
                    color: #424242; 
                }
            }
            .status {
                span {
                    display: inline-block;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    font: normal normal normal 13px Montserrat;
                    color: #FFFFFF;
                    padding: 7px 15px;
                    /* height: 30px; */
                }
            }
            .close {
                text-align: right;
                font: normal normal normal 26px/24px Montserrat;
                color: #A3A3A3;
                cursor: default;
                
            }
        }

        .sub {
            display: grid;
            grid-template-columns: 3fr 2fr;
            margin: 30px auto;
            width: 85%;
            .name {
                display: grid;
                grid-template-columns: 1fr 5fr 2fr;
                background: #FFFFFF 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                padding: 30px;
                img {
                    width: 60px;
                    height: 60px;
                    border-radius: 50%;
                }
                >div {
                    :nth-child(2) {
                        div {
                            :first-child {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                                margin-bottom: 10px;
                            }
                            :last-child {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                        }
                    }
                    :last-child {
                        div {
                            text-align: right;
                            :first-child {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                            :last-child {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                            }
                        }
                    }
                }
            }

            .actions {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr;
                >div {
                    border-radius: 15px;
                    width: 124px;
                    height: 124px;
                    text-align: center;
                    margin: auto;
                    padding-top: 26px;
                    div {
                        font: normal normal normal 16px/44px Montserrat;
                    }
                    img {
                        width: 30px;
                        height: 30px;
                    }
                }
                .export {
                    color: #A3A3A3;
                    border: 2px solid #A3A3A3;
                }
                .cancel {
                    color: #CF0921;
                    border: 2px solid #CF0921;

                }
                .resend {
                    color: #007B5D;
                    border: 2px solid #007B5D;
                }
            }
        }

        .timeline {
            background: #007B5D 0% 0% no-repeat padding-box;
            box-shadow: 0px 2px 4px #CCCCCC80;
            padding: 30px 100px;
            margin-bottom: 50px;
            .bar {
                height: 8px;
                width: 90%;
                border-radius: 15px;
                background: #3f896f;
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 0fr;
                padding: 0px;
                margin: auto;
                .point {
                    background: #fff;
                    width: 4px;
                    height: 4px;
                    border-radius: 15px;
                    margin: 2px;
                }
                .point-1 {
                    width: 43px;
                    height: 6px;
                }
            }
            .point-labels {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 0fr;
                margin-top: 20px;
                >div {
                    width: 250px;
                    text-align: center;
                    div:first-child {
                        font: normal normal normal 16px/16px Montserrat;
                        color: #FFFFFF;
                    }
                    div:last-child{
                        font: normal normal normal 13px/18px Montserrat;
                        color: #A3A3A3;
                    }
                }
            }
        }

        .details {
            display: grid;
            grid-template-columns: 3fr 2.3fr;
            width: 90% ;
            margin: 0px auto 50px;
            .recipient-details {
                margin-left: 25px;
            }
            hr {
                margin: 20px 0px;
                border: 1px solid #f8f7f8;
            }
            >div {
                background: #FFFFFF 0% 0% no-repeat padding-box;
                box-shadow: 0px 10px 12px #CCCCCC80;
                border-radius: 15px;
                width: 90%;
                padding: 50px;
                margin: auto;
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
                .row {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    margin: 5px 0px;
                    font: normal normal normal 16px/44px Montserrat;
                    .left {
                        color: #A3A3A3;
                    }
                    .right {
                        text-align: right;
                        color: #424242;
                    }
                }
            }
            
        }
    }
    .green {
        color: #007B5D;
    }

    @media only screen and (max-width: 900px) { 
        padding: 0px;
        background: #FFF;
        height: 100vh;
        position: fixed;
        overflow-y: scroll;;;
        .modal{
            margin: 0px;
            width: 100%;
            box-shadow: none;
            overflow-y: hidden;
            .head {
                display: none;
            }
            .sub {
                grid-template-columns: 1fr;
                margin: 5px auto;
                .name {
                    padding: 15px 10px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                    >div{
                        img:nth-child(1){
                            width: 30px;
                            height: 30px;
                        }
                        :nth-child(2){
                            div {
                                :first-child{
                                    font: normal normal normal 8px Montserrat;
                                    margin-bottom: 5px;
                                }
                                :last-child{
                                    font: normal normal normal 11px Montserrat;
                                }
                            }
                        }
                        :nth-child(3){
                            div{
                                font: normal normal normal 8px Montserrat !important;
                                margin-bottom: 5px;
                            }
                        }
                    }
                }
                .actions {
                    grid-template-columns: 1fr 1fr 1fr;
                    padding-left: 60%;
                    >div {
                        text-align: center;
                        width: 25px;
                        height: 25px;
                        border-radius: 5px;
                        padding-top: 0px;
                        border-width: 1px !important;
                        img {
                            width: 10px;
                            height: 10px;
                        }
                        div {
                            margin-top: -3px;
                            font: normal normal normal 4px Montserrat;
                        }
                    }
                    .export {
                    }
                    
                }
            }
            
            .timeline {
                display: none;
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
        .mobile-modal {

            div.status {
                span {
                    position: absolute;
                    top: 20px;
                    left: 82% ;
                    z-index: 3;
                    /* width: 54px;
                    height: 16px; */
                    display: inline-block;
                    display: inline-block;
                    background: #FCD20F 0% 0% no-repeat padding-box;
                    border-radius: 15px;
                    font: normal normal normal 8px Montserrat;
                    color: #FFFFFF;
                    padding: 3px 10px;
                }
            }
            div.view-details {
                font: normal normal normal 8px/44px Montserrat;
                color: #A3A3A3;
                position: absolute;
                top: 140px;
                left: 6%;
            }
        }

        .timeline-modal-container {
            .overlay {
                position: fixed;
                top: 0px;
                left: 0px;
                z-index: 3;
                width: 100%;
                background: #000000;
                opacity: 0.3;
                backdrop-filter: blur(2px);
                -webkit-backdrop-filter: blur(2px);
                height: 130vh;
            }
            .timeline-modal {
                width: 80%;
                background: #007B5D;
                /* box-shadow: 0px 2px 4px #CCCCCC80; */
                border-radius: 8px;
                height: 330px;
                margin: auto auto;
                position: fixed;
                top: 175px;
                left: 10%;
                display: block;
                z-index: 3;
                padding: 30px 50px;
                .timeline {
                    display: grid;
                    grid-template-columns: 1fr 4fr;
                    grid-gap: 10%;
                    .bar {
                        width: 5px;
                        height: 244px;
                        background: #3f896f;
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr 0fr;
                        grid-gap: 0px;
                        .point {
                            background: #fff;
                            width: 2px;
                            height: 2px;
                            border-radius: 15px;
                            margin: 2px;
                        }
                        .point-1 {
                            width: 3px;
                            height: 100%;
                        }
                    }
                    .point-labels {
                        display: grid;
                        grid-template-rows: 1fr 1fr 1fr 0fr;
                        >div {
                            width: 250px;
                            div:first-child {
                                font: normal normal normal 13px/14px Montserrat;
                                color: #FFFFFF;
                            }
                            div:last-child{
                                font: normal normal normal 11px/14px Montserrat;
                                color: #A3A3A3;
                            }
                        }
                    }
                }
            }
        }
    }

`

const Modal = style();

const TransactionDetail = (props) => {
    const {openTDModal, handleOpenTDModal, handleShowPlus} = props;
    const [openMobileTimeline, handleOpenMobileTimeline] = useState(false);

    const showMobileModal = (bool) => {
        handleOpenMobileTimeline(bool)
    }

    openTDModal ? handleShowPlus(false) : handleShowPlus(true)
    return (
       
        openTDModal && ( 
        <Modal>
            <div className="modal">
                <div className="head">
                    <div className="t-id">Transaction #: <span>SBR334908</span></div>
                    <div className="status"> <span>Pending</span> </div>
                    <div className="close" onClick={()=>handleOpenTDModal(false)} >x</div>
                </div>
                <div className="sub">
                    <div className="name">
                        <div> <img src={asset('images', 'noimage.png')} alt=""/> </div>
                        <div> <div>20 Nov 2020</div> <div>To <b>Ifepade Adewunmi</b></div> </div>
                        <div> <div>70,036 XAF</div> <div>100 GBP</div> </div>
                    </div>
                    <div className="actions">
                        <div className="export">
                            <img src={asset('icons', 'export.svg')} alt="export"/>
                            <div> <span className="mobile-hide">Export </span>PDF</div>
                        </div>
                        <div className="cancel">
                            <img src={asset('icons', 'cancel.svg')} alt="cancel"/>
                            <div>Cancel</div>
                        </div>
                        <div className="resend">
                            <img src={asset('icons', 'reload.svg')} alt="reload"/>
                            <div>Resend</div>
                        </div>
                    </div>
                </div>

                <div className="timeline">
                    <div className="bar">
                        <div className="point point-1"></div>
                        <div className="point point-2"></div>
                        <div className="point point-3"></div>
                        <div className="point point-4"></div>
                    </div>
                    <div className="point-labels">
                        <div className="label-1"> <div>Transfer created</div> <div>20 Nov 2020</div> </div>
                        <div className="label-2"> <div>Received GBP payment</div> <div>20 Nov 2020</div> </div>
                        <div className="label-3"> <div>Vendor processing transfer</div> <div>20 Nov 2020</div> </div>
                        <div className="label-4"> <div>Recipient receives XAF</div> <div>20 Nov 2020</div> </div>
                    </div>
                </div>

                <div className="details">
                    <div className="recipient-details mobile-hide">
                        <div className="heading">
                            <div className="title">Recipient’s Details</div>
                            <div className="update">Update</div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="left">Name</div>
                            <div className="right">Ifepade Adewunmi</div>
                        </div>
                        <div className="row">
                            <div className="left">Mobile No.</div>
                            <div className="right">+2348160402986</div>
                        </div>
                        <div className="row">
                            <div className="left">Email</div>
                            <div className="right">bunmi.i.adewunmi@gmail.com</div>
                        </div>
                        <div className="row">
                            <div className="left">City</div>
                            <div className="right">Lagos</div>
                        </div>
                        <div className="row">
                            <div className="left">Reason</div>
                            <div className="right">Funds to self</div>
                        </div>
                        <div className="row">
                            <div className="left">Recipient’s Bank Name</div>
                            <div className="right">GTB</div>
                        </div>
                        <div className="row">
                            <div className="left">Account Number</div>
                            <div className="right">2230987563</div>
                        </div>
                    </div>
                    <div className="transfer-details">
                        <div className="heading">
                                <div className="title">Transfer Details</div>
                                <div className="update">Update</div>
                            </div>
                            <hr/>
                            <div className="row">
                                <div className="left">Transfer method</div>
                                <div className="right">Bank Transfer</div>
                            </div>
                            <div className="row">
                                <div className="left">You send</div>
                                <div className="right"><b>100 GBP</b></div>
                            </div>
                            <div className="row">
                                <div className="left">Exchange rate</div>
                                <div className="right">1 GBP = 70.36 XAF</div>
                            </div>
                            <div className="row">
                                <div className="left">Service fee</div>
                                <div className="right">+0.95 GBP</div>
                            </div>
                            <div className="row">
                                <div className="left">They get</div>
                                <div className="right"><b>70,036 XAF</b></div>
                            </div>
                            <div className="row">
                                <div className="left">Total to pay</div>
                                <div className="right"><b className="green">100.95 GBP</b></div>
                            </div>
                            <div className="row">
                                <div className="left">Transfer time</div>
                                <div className="right">within 2 hours</div>
                            </div>
                    </div>
                    <div className="recipient-details desktop-hide">
                        <div className="heading">
                            <div className="title">Recipient’s Details</div>
                            <div className="update">Update</div>
                        </div>
                        <hr/>
                        <div className="row">
                            <div className="left">Name</div>
                            <div className="right">Ifepade Adewunmi</div>
                        </div>
                        <div className="row">
                            <div className="left">Mobile No.</div>
                            <div className="right">+2348160402986</div>
                        </div>
                        <div className="row">
                            <div className="left">Email</div>
                            <div className="right">bunmi.i.adewunmi@gmail.com</div>
                        </div>
                        <div className="row">
                            <div className="left">City</div>
                            <div className="right">Lagos</div>
                        </div>
                        <div className="row">
                            <div className="left">Reason</div>
                            <div className="right">Funds to self</div>
                        </div>
                        <div className="row">
                            <div className="left">Recipient’s Bank Name</div>
                            <div className="right">GTB</div>
                        </div>
                        <div className="row">
                            <div className="left">Account Number</div>
                            <div className="right">2230987563</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE TD MODAL */}
            <div className="desktop-hide mobile-modal">
                <PageHeading heading="Transaction #: SBR334908" callBack={()=>handleOpenTDModal(false)} />
                <div className="status"> <span>Pending</span> </div>
                <div className="view-details" onClick={()=>showMobileModal(true)}>View transaction update</div>
            </div>
           {openMobileTimeline && (<div className="timeline-modal-container desktop-hide">
                <div className="overlay" onClick={()=>showMobileModal(false)}></div>
                <div className="timeline-modal">
                    <div className="timeline">
                        <div className="bar">
                            <div className="point point-1"></div>
                            <div className="point point-2"></div>
                            <div className="point point-3"></div>
                            <div className="point point-4"></div>
                        </div>
                        <div className="point-labels">
                            <div className="label-1"> <div>Transfer created</div> <div>20 Nov 2020</div> </div>
                            <div className="label-2"> <div>Received GBP payment</div> <div>20 Nov 2020</div> </div>
                            <div className="label-3"> <div>Vendor processing transfer</div> <div>20 Nov 2020</div> </div>
                            <div className="label-4"> <div>Recipient receives XAF</div> <div>20 Nov 2020</div> </div>
                        </div>
                    </div>
                </div>
            </div>)}
        </Modal> 
        )
    )
}

export default TransactionDetail;
