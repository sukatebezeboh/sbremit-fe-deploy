import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import TransferDetailsBox from '../../ui-components/parts/TransferDetailsBox';
import styled from "styled-components";
import RadioButton from '../../ui-components/parts/RadioButton';
import { asset } from '../../../util/util';
import RoundFloatingPlus from '../../ui-components/parts/RoundFloatingPlus';
import NewCardModal from '../../ui-components/new-card-modal/NewCardModal';


const Body = styled.div`
    .page-content {
        margin-top: 150px;
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
                .radio-card {
                    display: grid;
                    grid-template-columns: 1.5fr 15fr;
                    background: #FFF;
                    margin-bottom: 25px;
                    box-shadow: 0px 10px 12px #CCCCCC80;
                    border-radius: 15px;
                    padding: 25px;
                    
                    .content-div {
                        display: grid;
                        grid-template-columns: 0fr 1fr;
                        padding: 0px;
                        height: 30px;
                        img {
                            width: 55px;
                            height: 35px;
                        }
                        >div.inner-content {
                            margin-left: 50px;
                            margin-top: -5px;
                            display: grid;
                            grid-template-columns: 1fr 1fr;
                            
                            .card-no {
                                font: normal normal normal 20px Montserrat;
                                color: #424242;
                            }
                            .expires {
                                font: normal normal normal 16px Montserrat;
                                color: #A3A3A3;
                                
                            }
                            .input {
                                border: 2px solid #7FBCAD;
                                border-radius: 4px;
                                width: 100%;
                                height: 48px;
                                font: normal normal normal 16px Montserrat;
                                padding: 15px;
                                :placeholder {
                                    font: normal normal normal 16px Montserrat;
                                    
                                }
                                :-webkit-input-placeholder:first-letter{
                                    color: yellow!important;
                                    opacity: 1;
                                }
                            }
                            .show-hide {
                                width: 15px;
                                position: relative;
                                top: -42px;
                                left: 80%;
                            }
                        }
                        
                    }
                }
                .selected {
                    border: 2px solid #007B5D;
                }
                .radio-card.green-bg {
                    display: block;
                    padding: 20px;
                    width: 100%;
                }
                .new-card {
                    text-align: center;
                    color: #FFF;
                    display: grid;
                    grid-template-columns: 0fr 1fr;
                    width: fit-content;
                    margin: auto;
                    >img {
                        width: 35px;
                        height: 35px;
                    }
                    >div {
                        display: inline-block;
                        margin-top: 10px;
                        margin-left: 30px;
                        font: normal normal normal 16px/19px Montserrat;
                    }
                }
                .select-text {
                    font: normal normal normal 20px/30px Montserrat;
                    color: #A3A3A3;
                    margin-bottom: 20px;
                    margin-top: 20px; 
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
            .part {
                padding: 20px;
            }
            
        }
        .btns {
            margin-top: 0px;
            padding: 0px 2%;
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
                .radio-card {
                    padding: 15px;
                    grid-template-columns: 2fr 15fr;
                    min-height: fit-content;
                    border-radius: 8px;
                    .content-div {
                        >img {
                            width: 40px;
                            height: 25px;
                        }
                        
                    }
                }
                            
            }
        }
    }
}

@media only screen and (max-width: 590px) { 
    .page-content {
        .details {
            div {
                .radio-card {
                    .content-div {
                        >div.inner-content {
                            grid-template-columns: 1fr;
                            margin-left: 7%;
                            input.input {
                                width: 140px;
                                height: 30px;
                                border-width: 1px;
                                margin-top: 0px;
                                ::placeholder {
                                    font: normal normal normal 13px/16px Montserrat;
                                }
                            }
                            img.show-hide {
                                left: -25px;
                                top: 13px;
                            }
                            .card-no {
                                font: normal normal normal 15px/15px Montserrat;
                            }
                            .expires {
                                font: normal normal normal 11px/20px Montserrat;
                            }
                        }
                        
                    }
                }
                .selected {
                    height: 110px;
                }
            }
            
        }
        .cpm-text {
            font: normal normal normal 11px/14px Montserrat;
        }
    }
        
}
`

const CardPayment = () => {
    const history = useHistory();

    const [passwordType, setPasswordType] = useState('password');
    const [pwIcon, setPwIcon] = useState('show');
    const [openModal, setOpenModal] = useState(false)

    const handlePasswordClick = () => {
        setPasswordType(prevValue=>{
           return prevValue === 'password' ? 'number' : 'password';
        })
        setPwIcon(prevValue=>{
            return prevValue === 'show' ? 'hide' : 'show';
        })
    }

    return (
        <Body>
            <NavBar />
            <RoundFloatingPlus showPlus={true} callBack={()=>setOpenModal(true)} />
            <NewCardModal modalOpen={openModal} openModal={setOpenModal} />
            <div className="page-content">
                <div>
                { !openModal &&  <PageHeading heading="Select saved cards" subheading="Select the card you want to pay with or add a new card" back="/payment-method" />}                    <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <div className="box-container details">
                    <div>
                        <div className="radio-card green-bg mobile-hide" onClick={()=>setOpenModal(true)}>
                            <div className="new-card">
                                <img src={asset('icons', 'add.svg')} alt="add"/>
                                <div>Add a new card</div>
                            </div>
                        </div>
                        <div className="select-text mobile-hide">Select saved card</div>
                        <div className="radio-card selected">
                            <div className="radio-div">
                                <RadioButton />
                            </div>
                            <div className="content-div">
                                <img src={asset('flags', 'visa.png')} alt="visa"/>
                                <div className="inner-content">
                                    <div>
                                        <div className="card-no">**** **** **** 1157</div>
                                        <div className="expires">Expires 09/23</div>
                                    </div>
                                    <div >
                                        <input className="input" type={passwordType} placeholder="CVV/CVC*"/>
                                        <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="radio-card">
                            <div className="radio-div">
                                <RadioButton />
                            </div>
                            <div className="content-div">
                                <img src={asset('flags', 'american-express.jpg')} alt="american-express"/>
                                <div className="inner-content">
                                    <div>
                                        <div className="card-no">**** **** **** 1157</div>
                                        <div className="expires">Expires 09/23</div>
                                    </div>
                                    <div className="mobile-hide">
                                        <input className="input" type={passwordType} placeholder="CVV/CVC*"/>
                                        <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="radio-card">
                            <div className="radio-div">
                                <RadioButton />
                            </div>
                            <div className="content-div">
                                <img src={asset('flags', 'mastercard.svg')} alt="mastercard"/>
                                <div className="inner-content">
                                    <div>
                                        <div className="card-no">**** **** **** 1157</div>
                                        <div className="expires">Expires 09/23</div>
                                    </div>
                                    <div className="mobile-hide">
                                        <input className="input" type={passwordType} placeholder="CVV/CVC*"/>
                                        <img className="show-hide" onClick={handlePasswordClick} src={`./assets/icons/${pwIcon}.svg`} alt="show/hide"/>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="green-txt cpm-text">Change payment method</div>

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox />
                    </div>
                    
                </div>
                <div className="btns"><span onClick={()=>history.push('/payment-method')}>Cancel payment</span> <button onClick={()=>history.push('/transfer-complete')}>Pay 100.95 GBP</button> </div>
            </div>
        </Body>
    )
}

export default CardPayment;
