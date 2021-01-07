import React from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import ProgressBar from '../../ui-components/progress-bar/ProgressBar';

const Body = styled.div`
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

        .form {
            
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
                .inputs{
                    margin-top: 50px;
                    margin: 30px auto;
                    width: 100%;
                    .radio-span {
                        input[type=radio] {
                            width: 19px;
                            :before {
                                width: 19px;
                                height: 19px;
                                border-radius: 15px;
                                top: 30%;
                                left: -5%;
                                position: relative;
                                background-color: white;
                                content: '';
                                display: inline-block;
                                visibility: visible;
                                border: 1px solid #FCD20F;
                                pointer-events: none;
                                @media only screen and (max-width: 900px) { 
                                    top: 15%;
                                }
                            }
                            :checked{
                                :after {
                                    width: 11px;
                                    height: 11px;
                                    border-radius: 15px;
                                    top: -57%;
                                    left: 15%;
                                    position: relative;
                                    background-color: #FCD20F;
                                    content: '';
                                    display: inline-block;
                                    visibility: visible;
                                    border: 1px double #FCD20F;
                                    z-index: 1;
                                    pointer-events: none;
                                }
                            }
                        }
                        
                        .radio-txt {
                            padding: 17px 5px;
                        }
                    }
                    input, select{
                        margin-bottom: 5px;
                        width: 100%;
                        height: 48px;
                        border: 1px solid #7FBCAD;
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
                        background-position-x: 15%;
                        background-position-y: 10px;
                        padding: 0px;
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
                        margin-bottom: -44px;
                    }
                    .dob {
                        margin-top: 6px;
                        input {
                            padding: 9px;
                        }
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
                    >div:nth-child(3){
                        margin-top: 0px;
                    }
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
                    >div:first-child {
                        box-sizing: border-box;
                        display: grid;
                        grid-template-columns: 5fr 1fr 5fr;
                    }
            }
        }
        .transfer-details {
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
        height: 100vh;
        margin-top: -10px;
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
            .part {
                padding: 20px;
                box-shadow: none;
                .inputs {
                    margin-top: -10px;
                    >div {
                        grid-template-columns: 1fr;
                    }
                    input{
                        padding: 10px 20px;
                    }
                    input, select{
                        height: 30px!important;
                        font: normal normal normal 14px/18px Montserrat;
                    }
                    input.phone-no {
                        top: 32px;
                        height: 25px!important;
                        margin-left: 15%;
                        width: 85%;
                        padding-left: 5px;
                    }
                    select{
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
                    >div{
                        margin-top: 15px;
                        >div{
                            font: normal normal normal 10px/13px Montserrat;
                            line-height: 19px;
                        }
                        .show-hide{
                            top: -25px;
                            left: 90%;
                        }
                        
                    }
                    div.email{
                         margin-bottom: 20px;
                    }
                    >button{
                        margin-top: 25px;
                        height: 40px;
                        font: normal normal normal 13px/16px Montserrat;
                    }
                    .radio-txt {
                        padding: 10px 5px;
                        font: normal normal normal 14px/19px Montserrat;
                    }
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

        .m-grid-col-1-1-1 {
            display: grid;
            grid-template-columns: 1fr 1fr 1fr;
        }
        .m-grid-col-span-1-4 {
            grid-column: 1/4;
        }
    }
}
`

const Verification = () => {
    const history = useHistory();

    return (
        <Body>
            <NavBar />
            <ProgressBar />
            <div className="page-content">
                <PageHeading heading="Verification" subheading="Enter information to verify your identity" back="/get-quote" />
                <div className="box-container">
                    <div className="form part">
                            <div className="heading mobile-hide">
                                <div className="title">My personal details</div>
                            </div>
                            <hr className="mobile-hide"/>

                        <div className="inputs">
                            <div className="names">
                                <div>
                                    <div>First Name<i>*</i></div>
                                    <input type="text" placeholder="John" />
                                </div>
                                <div></div>
                                <div>
                                    <div>Last Name<i>*</i></div>
                                    <input type="text" placeholder="Doe"/>
                                </div>
                            </div>
                            <div className="grid-col-1-1 grid-gap-3">
                                <div>
                                    <div className="mobile-head">Mobile<i>*</i></div>
                                    <input type="text" className="phone-no" placeholder="e.g 07967885952"/>
                                    <select name="" id="" >
                                        <option value="">United Kingdom</option>
                                    </select>
                                    <img src="./assets/flags/gbp.png" alt="uk"/>
                                </div>
                                <div>
                                <div>Date of birth<i>*</i></div>
                                    <div className="grid-col-1-2-1 grid-gap-3 dob">                              
                                        <div><input type="text" placeholder="Day"/></div>
                                        <div><input type="text" placeholder="Month"/></div>
                                        <div><input type="text" placeholder="Year"/></div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div>Gender<i>*</i></div>
                                <div className="grid-col-1-1-1-2 m-grid-col-1-1-1">
                                    <span className="grid-col-0-1 radio-span">
                                        <input type="radio" name="gender" value="Male" />
                                        <span className="radio-txt">Male</span>
                                    </span>
                                    <span className="grid-col-0-1 radio-span">
                                        <input type="radio" name="gender" value="Fenale" />
                                        <span className="radio-txt">Female</span>
                                    </span>
                                    <span className="grid-col-0-1 radio-span">
                                        <input type="radio" name="gender" value="Other" />
                                        <span className="radio-txt">Other</span>
                                    </span>
                                    <span className="m-grid-col-span-1-4"> <input className="specify" placeholder="Please specify" /> </span>
                                </div>
                                
                            </div>
                            <div>
                                <div>Address line 1<i>*</i></div>
                                <input type="text" placeholder="Street name and no." />
                            </div>
                            <div>
                                <div>Address line 2</div>
                                <input type="text" placeholder="Apartment, suite, unit, building, floor" />
                            </div>
                            <div>
                                <div>City / Town</div>
                                <input type="text" />
                            </div>
                            <div>
                                <div>State</div>
                                <input type="text" />
                            </div>
                            <div>
                                <div>Postal / zip code</div>
                                <input type="text" />
                            </div>


                        </div>

                    </div>
                    <div className="mobile-hide">
                        <div className="transfer-details part">
                                <div className="heading">
                                    <div className="title">Transfer Details</div>
                                    <div className="update">Edit</div>
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
                                    <div className="right"><b className="green-txt">100.95 GBP</b></div>
                                </div>
                                <div className="row">
                                    <div className="left">Transfer time</div>
                                    <div className="right">within 2 hours</div>
                                </div>
                        </div>
                    </div>
                </div>
                <div className="btns"><span onClick={()=>history.push('/get-quote')}>Back</span> <button >Continue</button> </div>

            </div>
        </Body>
    )
}

export default Verification;
