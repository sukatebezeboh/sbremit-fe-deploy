import { Field, Form, Formik } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components'
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/transfer-details-box/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';

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
                                    top: -8px;
                                    left: 15%;
                                    position: relative;
                                    background-color: #FCD20F;
                                    content: '';
                                    display: inline-block;
                                    visibility: visible;
                                    border: 1px double #FCD20F;
                                    z-index: 1;
                                    pointer-events: none;
                                    @media only screen and (max-width: 900px) { 
                                        top: -57%;
                                    }
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
                        background-position-x: 95%;
                        background-position-y: 10px;
                        padding: 0px;
                        padding-left: 25px;
                    }
                    .phone-select {
                        padding-left: 75px;
                        background-position-x: 15%;
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
        height: 150vh;
        margin-top: -10px;
        padding-top: 10px;
        margin-bottom: 0px;
        .page-heading {
            margin-top: 10px;
            .heading {
                z-index: 1;
            }
            .subheading {
                margin-bottom: -16px
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
                    .phone-select{
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

const RecipientDetails = () => {
    const history = useHistory();
    const recipient = useSelector((state: any) => state.recipients.recipient)

    return (
        <Body>
            <NavBar />
            <ProgressBar point={2} />
            <div className="page-content">
                <PageHeading heading="Recipient's Details" subheading="Details of the person you are sending money to" back="/recipient" />
                <div className="box-container">
                    <Formik
                            initialValues={{...recipient?.profile}}
                            onSubmit={values => {
                                // dispatch(updateRecipient(values))
                            }}>
                            {
                                ({errors, touched, values}: any) => (

                                    <Form className="form part">
                                            <div className="heading mobile-hide">
                                                <div className="title">Sending to <span>Ifepade Adewunmi</span></div>
                                            </div>
                                            <hr className="mobile-hide"/>

                                        <div className="inputs">
                                            <div className="names">
                                                <div>
                                                    <div>First Name<i>*</i></div>
                                                    <Field name="firstName" type="text" placeholder="John" />
                                                </div>
                                                <div></div>
                                                <div>
                                                    <div>Last Name<i>*</i></div>
                                                    <Field name="lastName" type="text" placeholder="Doe"/>
                                                </div>
                                            </div>
                                            <div className="grid-col-1-1 grid-gap-3">
                                                <div>
                                                    <div className="mobile-head">Mobile<i>*</i></div>
                                                    <Field name="mobile" type="text" className="phone-no" placeholder="e.g 07967885952"/>
                                                    <Field as="select" name="" id="" className="phone-select" >
                                                        <option value="">United Kingdom</option>
                                                    </Field>
                                                    <img src="./assets/flags/UK.png" alt="uk"/>
                                                </div>
                                                <div>
                                                    <div>Email<i>*</i></div>
                                                    <Field name="email" type="text" placeholder="johndoe@email.com"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>Address line 1</div>
                                                <Field name="address1" type="text" placeholder="Street name and no." />
                                            </div>
                                            <div>
                                                <div>Address line 2</div>
                                                <Field name="address2" type="text" placeholder="Apartment, suite, unit, building, floor" />
                                            </div>
                                            <div>
                                                <div>City / Town </div>
                                                <Field name="city" type="text" />
                                            </div>
                                            <div>
                                                <div>State <i>*</i></div>
                                                <Field name="state" type="text" />
                                            </div>
                                            <div>
                                                <div>Postal / zip code</div>
                                                <Field name="zipCode" type="text" />
                                            </div>
                                            <div>
                                                <div>Recipient’s bank name <i>*</i></div>
                                                <Field name="bankName" type="text" placeholder="UBA - United Bank for Africa" />
                                            </div>
                                            <div className="grid-col-1-1 grid-gap-3">
                                                <div>
                                                    <div>Account number<i>*</i></div>
                                                    <Field name="accountNumber" type="text" placeholder="3450012398" />
                                                </div>
                                                <div>
                                                    <div>Branch name<i>*</i></div>
                                                    <Field name="branchName" type="text" placeholder="Yaounde"/>
                                                </div>
                                            </div>
                                            <div>
                                                <div>Reason</div>
                                                <Field as="select" name="reason" id="">
                                                    <option value="family support">- None -</option>
                                                    <option value="family support">Family support</option>
                                                </Field>
                                            </div>

                                        </div>

                                    </Form>
                                )
                            }
                    </Formik>

                    <div className="mobile-hide">
                        <TransferDetailsBox />
                    </div>
                 </div>
                <div className="btns"><span onClick={()=>history.push('/recipient')}>Back</span> <button onClick={()=>history.push('/review')} >Continue</button> </div>

            </div>
        </Body>
    )
}

export default RecipientDetails;
