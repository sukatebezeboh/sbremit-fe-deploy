import React from 'react'
import { useHistory } from 'react-router-dom';
import styled  from "styled-components";
import { asset } from '../../../util/util';
const Container = styled.div`
    .modal-content {

        .country-flag-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: center;
            max-width: 300px  ;
            gap: 10%;
            margin: 0 auto;

            .resize img{
                width: 100px;
                height: 70px;
                border: 1px solid grey;
                border-radius: 5px;

            }
        }

        .info-container {
            padding: 20px;
            text-align: center;

            .info-text {
                font-size: 25px;
                line-height: 55px;

                .green-text {
                    color: #007B5D;
                    font-weight: bold;
                }
            }

            .modify-btn {
                border: none;
                border-radius: 5px;
                padding: 20px 40px;
                background: #007B5D;
                color: #fff;
                font-size: 20px;
                cursor: pointer;
            }
        }

        .close-btn {
            text-align: right;
            font-size: 50px;
            cursor: pointer;
        }
    }
`
const CurrencyPairDowntimeNotif = ({ toSendFlag, toRecieveFlag, setClose, handleContinue, toSendCountry}: any) => {
    const history = useHistory();
    return (
        <Container>
            <div className="modal-content">
                <div className="close-btn" onClick={setClose}>&times;</div>
                <div className="country-flag-container">
                    <div className="send-flag resize">
                        <img src={asset ( 'flags', `${toSendFlag}` )} />
                    </div>
                    <div className="arrow-between">
                        <img src={asset ( 'icons', 'transfer-green.png' )} />
                    </div>
                    <div className="recieve-flag resize">
                        <img src={asset ( 'flags', `${toRecieveFlag}` )} />
                    </div>
                </div>
                <div className="info-container">
                    <p className="info-text">
                        We are experiencing some delays with payments to
                        <span className="deep-green"> {toSendCountry} </span> caused by temporary downtime.
                        We are working to resolve this quickly and
                        you will be notified once the system is up and
                        running. We apologise for any inconvenience this
                        may have caused.
                    </p>
                    <button className="modify-btn" onClick={handleContinue}>Continue</button>
                </div>
            </div>
        </Container>
    )
}

export default CurrencyPairDowntimeNotif;