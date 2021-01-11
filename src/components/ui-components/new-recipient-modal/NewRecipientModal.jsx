import React from 'react'
import styled from 'styled-components';
import PageHeading from '../page-heading/PageHeading';

const Div = styled.div`
    .overlay {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 150vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 1;
    }

    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 55%;
        min-height: 661px;
        background: #fff;
        margin: 0px auto;
        padding: 60px 0px 30px;
        position: absolute;
        z-index:1;
        top: 240px;
        left: 22%;
        .head {
            border-bottom: 1px solid #F0F0F0;
            display: grid;
            grid-template-columns: 3fr 4fr;
            width: 80%;
            margin: 0px auto;
            padding: 20px 0px;
            .t-id {
                font: normal normal normal 20px/24px Montserrat;
                color: #A3A3A3;
                span {
                    color: #424242; 
                }
            }
            .close {
                text-align: right;
                font: normal normal normal 26px/24px Montserrat;
                color: #A3A3A3;
                cursor: default;
                
            }
        }
        .form {
            width: 80%;
            margin: 30px auto 0px;
            >div{
                margin-top: 20px;
                font: normal normal normal 15px/19px Montserrat;
                color: #A3A3A3;
                i{
                    color: #FCD20F;
                }
                .show-hide{
                    width: 16px;
                    height: 16px;
                    position: relative;
                    top: -33px;
                    left: 90%;
                }
                >div{
                    font: normal normal normal 15px/19px Montserrat;
                    line-height: 19px;
                }
            }
            input, select{
                margin-bottom: 5px;
                width: 100%;
                height: 48px;
                border: 2px solid #7FBCAD;
                border-radius: 4px;
                background: #ffffff;
                outline: none;
                font: normal normal normal 14px Montserrat;
                color: #A3A3A3;
                padding: 20px;
                ::placeholder{
                    color: #A3A3A3; 
                }
            }
            select{
                -webkit-appearance: none;
                -moz-appearance: none;
                background: transparent;
                background-image: url("data:image/svg+xml;utf8,<svg fill='rgb(127, 188, 173)' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
                background-repeat: no-repeat;
                background-position-x: 95%;
                background-position-y: 10px;
                padding: 0px;
                padding-left: 15px;
            }
            select.phone  {
                background-position-x: 15%;
                padding-left: 75px;
            }
            input.phone-no {
                position: relative;
                top: 51px;
                width: 79%;
                height: 44px;
                margin-left: 20%;
                border: 2px solid transparent;
                background: #fff;
            }
            div.mobile-head {
                margin-bottom: -50px;
            }
            select+img{
                position: relative;
                top: -35px;
                left: 20px;
                width: 25px;
                height: 19px;
                box-shadow: 0px 3px 6px #00000029;
                border-radius: 1px;
                pointer-events: none;
            }
            div.margin-adjust {
                margin-bottom: -44px;
            }
        }
        .modal-btns {
            text-align: right;
            margin: 65px 10%;
            span {
                display: inline-block;
                margin-right: 50px;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                cursor: default;
            }
            button {
                background: #FCD20F;
                border-radius: 4px;
                width: 200px;
                height: 48px;
                text-align: center;
                font: normal normal normal 16px/19px Montserrat;
                color: #424242;
                border: none;
                outline: none;
            }
        }
    }
@media only screen and (max-width: 900px) { 
    padding:0px;
    .overlay {
        background: #fff;
    }
    .mobile-modal {
        .page-heading {
            
            .heading {
                z-index: 2;
            }
            
        }
    }
    .modal {
        width: 100%;
        left: 0%;
        top: 50px;
        padding: 0px;
        box-shadow: none;
        .form {
            grid-template-columns: 1fr;
            grid-gap: 0px;
            width: 90%;
            >div {
                margin-top: 15px;
                div {
                    font: normal normal normal 10px/13px Montserrat;
                }
                input, select {
                    height: 30px;
                    border: 1px solid #7FBCAD;
                    border-radius: 4px;
                    padding: 0px 15px;
                    ::placeholder {
                        font: normal normal normal 13px/16px Montserrat;
                    }
                }
                div.margin-adjust {
                    margin-bottom: -25px;
                }
                input.phone-no {
                        top: 32px;
                        height: 25px!important;
                        margin-left: 15%;
                        width: 85%;
                        padding-left: 5px;
                        border: 1px solid transparent;
                        padding: 0px 5px;
                    }
                    select {
                        background-position-y: 3px;
                    }
                    select.phone{
                        padding: 10px 50%;
                        background-position-y: 3px;
                        background-position-x: 10%;
                    }
                    .mobile-head {
                        margin-bottom: -31px;
                    }
                    select+img{
                        top: -29px;
                        left: 10px;
                    }
            }
        }
        .modal-btns {
            margin: 20px 0px;
            padding: 0px 5%;
            width: 100%;
            button {
                width: 100%;
                height: 40px;
                font: normal normal normal 13px/16px Montserrat;
                border-radius: 6px;
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

function NewRecipientModal(props) {
    const {modalOpen, openModal} = props;

    return (
        modalOpen && <Div>
            <div className="overlay">
            </div>
            <div className="modal">
                <div className="head mobile-hide">
                    <div className="t-id">Add a new recipient</div>
                    <div className="close" onClick={()=>openModal(false)} >x</div>
                </div>
                <div className="form grid-col-1-1 grid-gap-3">
                        <div>
                            <div>First name<i>*</i></div>
                            <input type="text" placeholder="John" />
                        </div>
                        <div>
                            <div>Last name<i>*</i></div>
                            <input type="text" placeholder="Doe" />
                        </div>
                        <div>
                            <div className="mobile-head">Mobile<i>*</i></div>
                            <input type="text" className="phone-no" placeholder="e.g 07967885952"/>
                            <select name="" id="" className="phone" >
                                <option value="">United Kingdom</option>
                            </select>
                            <img src="./assets/flags/gbp.png" alt="uk"/>
                            <div className="margin-adjust"></div>
                        </div>
                        <div>
                            <div>Email<i>*</i></div>
                            <input type="text" placeholder="Recipient’s email address" />
                        </div>
                        <div>
                            <div>State<i>*</i></div>
                            <input type="text" placeholder="" />
                        </div>
                        <div>
                            <div>Reason</div>
                            <select name="reason" id="reason">
                                <option value="Select">Select</option>
                            </select>
                        </div>
                        <div>
                            <div>Recipient's bank name</div>
                            <input type="text" placeholder="" />
                        </div>
                        <div>
                            <div>Account number</div>
                            <input type="text" placeholder="e.g. 3450012398" />
                        </div>
                </div>
                <div className="modal-btns"><span onClick={()=>openModal(false)}>Cancel</span> <button onClick="">Add</button> </div>
            </div>

             {/* MOBILE NR MODAL */}
             <div className="desktop-hide mobile-modal">
                <PageHeading heading="Add a new recipient" back="#" callBack={()=>openModal(false)} />
            </div>
           
        </Div>
    )
}

export default NewRecipientModal
