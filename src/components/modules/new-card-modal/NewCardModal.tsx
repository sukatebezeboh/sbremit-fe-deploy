import { Field, Form, Formik } from 'formik';
import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { initiatePayment } from '../../../redux/actions/actions';
import { NewPaymentCardValidator } from '../../../util/form-validators';
import { paths } from '../../../util/paths';
import PageHeading from '../page-heading/PageHeading';
import RadioButton from '../parts/RadioButton';

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
        width: 40%;
        background: #fff;
        margin: 0px auto;
        padding: 60px 0px 0px;
        position: absolute;
        z-index:1;
        top: 200px;
        left: 27%;
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
                    top: -35px;
                    left: 84%;
                }
                >div{
                    font: normal normal normal 15px/19px Montserrat;
                    line-height: 19px;
                }
                
            }
            input[type=text], 
            input[type=number], 
            input[type=password], 
            select{
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
                .show-hide{
                    width: 16px;
                    height: 16px;
                    position: relative;
                    top: -28px;
                    left: 90%;
                }
                input[type=text], 
                input[type=number], 
                input[type=password], 
                select {
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
            .radio-span {

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

function NewCardModal(props: any) {
    const {modalOpen, openModal} = props;

    const [passwordType, setPasswordType] = useState('password');
    const [pwIcon, setPwIcon] = useState('show');
    const dispatch = useDispatch();
    const history = useHistory();

    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'text' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    const initialValues = {
        cardHolder: "",
        cardNumber: "",
        expiryDate: "",
        cvv: ""
    }
    return (
        modalOpen && <Div>
            <div className="overlay">
            </div>
            <div className="modal">
                <div className="head mobile-grid-hide">
                    <div className="t-id">Add a new card</div>
                </div>
                <Formik
                        initialValues={{...initialValues}}
                        validationSchema={NewPaymentCardValidator}
                        onSubmit={values => {
                            dispatch(initiatePayment(()=>history.push(paths.TRANSFER_COMPLETE), values, values))
                        }}>
                        {
                            ({errors, touched, values}: any) => (
                            <Form>
                                <div className="form grid-col-1-1 grid-gap-3">
                                        <div className={`grid-span-1-3 ${(touched.cardHolder && errors.cardHolder) ? 'form-error': ''}`}>
                                            <div>Card holder’s name<i>*</i></div>
                                            <Field name="cardHolder" type="text" placeholder="Enter name as it appears on your card" />
                                            {(touched.cardHolder && errors.cardHolder) && <div className="form-error-message">{errors.cardHolder}</div>}
                                        </div>
                                        <div className={`grid-span-1-3 ${(touched.cardNumber && errors.cardNumber) ? 'form-error': ''}`}>
                                            <div>Card number<i>*</i></div>
                                            <Field name="cardNumber" type="text" placeholder="Long 16-digit number on card" />
                                            {(touched.cardNumber && errors.cardNumber) && <div className="form-error-message">{errors.cardNumber}</div>}
                                        </div>
                                        <div className={`m-grid-span-1-3 ${(touched.expiryDate && errors.expiryDate) ? 'form-error': ''}`}>
                                            <div>Expiry date<i>*</i></div>
                                            <Field name="expiryDate" type="text" placeholder="MM/YY" />
                                            {(touched.expiryDate && errors.expiryDate) && <div className="form-error-message">{errors.expiryDate}</div>}
                                        </div>
                                        <div className={`m-grid-span-1-3 ${(touched.cvv && errors.cvv) ? 'form-error': ''}`}>
                                            <div>CVV/CVC<i>*</i></div>
                                            <Field name="cvv" type={passwordType} placeholder="3-digit code" />
                                            <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                            {(touched.cvv && errors.cvv) && <div className="form-error-message form-error-message-adjust-up">{errors.cvv}</div>}
                                        </div>
                                        
                                    <div className="grid-col-0-1 grid-gap-1 grid-span-1-3 ">
                                        <span>
                                                <RadioButton type="checkbox" />
                                        </span>
                                        <span className="pt-5">
                                                Save this card for future payments
                                        </span>
                                    </div>
                                </div>
                                <div className="modal-btns"><span onClick={()=>openModal(false)}>Cancel payment</span> <button type="submit">Pay 100.95 GBP</button> </div>
                            </Form>
                            )
                        }
                    </Formik>
            </div>

             {/* MOBILE NR MODAL */}
             <div className="desktop-hide mobile-modal">
                <PageHeading heading="Add a new card" back="#" callBack={()=>openModal(false)} />
            </div>
           
        </Div>
    )
}

export default NewCardModal
