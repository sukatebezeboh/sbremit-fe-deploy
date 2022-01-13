import React, {useEffect, useState} from 'react'
import { Redirect, useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/parts/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import styled from "styled-components";
import RadioButton from '../../modules/parts/RadioButton';
import { useDispatch, useSelector } from 'react-redux';
import { paths } from '../../../util/paths';
import { cancelTransfer, confirmTransfer, getTransactionDetails, toastAction } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { ConfirmModal } from '../../modules/confirm-modal/ConfirmModal';
import http from '../../../util/http';
import { formatCurrency, getQueryParam } from '../../../util/util';
import PaymentRedirect from '../../modules/Trust-payments/PaymentRedirect';
import axios from 'axios';

const Body = styled.div`
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
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    grid-gap: 15px;
                }
                .radio-card {
                    display: grid;
                    grid-template-columns: 1.5fr 15fr;
                    background: #FFF;
                    margin-bottom: 30px;
                    box-shadow: 0px 10px 12px #CCCCCC80;
                    border-radius: 15px;
                    padding: 25px;
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
            margin-top: -70px;
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
                    grid-template-columns: 2.5fr 15fr;
                    min-height: fit-content;
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

const TruelayerProviders = () => {
    const history = useHistory();
    const [selected, setSelected] = useState('')
    const recipient = useSelector((state: any)=>state.recipients.recipient)
    const transfer = useSelector((state: any)=>state.transfer);
    const transaction = transfer.transactionDetails;
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const transferId = getQueryParam('t');
    const [redirectToCardPaymentProvider, setRedirectToCardPaymentProvider] = useState(false);
    const [tProviders, setTProviders]: any = useState([])
    const dispatch = useDispatch()

    const handleProceed = async () => {
        if(!selected){
            toastAction({
                show: true,
                type: 'warning',
                timeout: 10000,
                message: 'Select a provider to proceed'
            })
            return
        }

        axios.post('https://pay-api.truelayer-sandbox.com/v2/single-immediate-payment-initiation-requests',         {
            "single_immediate_payment":
            {
                "beneficiary":
                {
                    "account":
                    {
                        "type": "sort_code_account_number",
                        "sort_code":"23-22-90",
                        "account_number":"34690451"
                    }
                },
                "amount_in_minor": 100,
                "currency":"GBP",
                "provider_id": selected,
                "scheme_id": "1"
            },
            "auth_flow": {
                "type": "redirect",
                "return_uri":"https://sbremit.netlify.app/transfer-complete"
            },
            "webhook_uri":"https://api-uat.sbremit.co.uk/truelayer/payment/notification" 
        }, {
        headers: {
            Accept: 'application/json; charset=UTF-8',
            'Content-Type': 'application/json; charset=UTF-8'
            }}).then(function (response) {
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });


    }

    const handleCancel = () => {
        cancelTransfer(() => history.push(paths.DASHBOARD))
    }

    useEffect(() => {
        getTransactionDetails(()=>{}, transferId);

        axios.get('https://auth.truelayer.com/api/providers?client_id=sandbox-sbremit-bba20c')
        .then(res => {
            console.log(res);
            setTProviders(res.data);
        });
    }, [])

    return (
        <Body>
            {openConfirmModal ? 
            <ConfirmModal 
            message="Are you sure you want to cancel this transfer?"
            onSave={{
                label: 'Yes, cancel',
                fn: ()=>handleCancel()
            }}
            onCancel={{
                label: "No, don't cancel",
                fn: () => setOpenConfirmModal(false)
            }}
            /> : <></>}
            <NavBar />
            <ProgressBar point={4} />

            <div className="page-content">
                <div>
                    <PageHeading heading="Pay" subheading="How would you like to pay for the transfer?" back="/review" />
                    <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <div className="box-container details">
                    <div className="box-container-inner">

                      { tProviders.map((provider: any) => (
                        <div className="radio-card" onClick={()=>setSelected(provider.provider_id)}>
                            <div className="radio-div">
                                <RadioButton selected={selected===provider.provider_id} />
                            </div>
                            <div className="radio-card-inner">
                                <img className="provider-icon" src={provider.logo_url} alt={provider.provider_id} />
                                <div className="provider-name">
                                    {provider.display_name}
                                </div>
                            </div>
                        </div>
                      ))  }

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox transferId={transferId} />
                    </div>
                </div>
                <div className="btns"><span onClick={()=>setOpenConfirmModal(true)}>Cancel transfer</span> 
                 {
                    <span> <button onClick={()=>handleProceed()}>Proceed to payment</button> </span>
                }
                </div>
            </div>
        </Body>
    )
}

export default TruelayerProviders;
