import React from 'react'
import styled  from "styled-components";
import { countriesAndCodes } from 'util/constants';
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
    }
`
const UpcomingCountries = ({ toSendFlag, toRecieveFlag, destinationCountryCode,  setClose}: any) => {
    const country = countriesAndCodes.find(country => country.countryCode === destinationCountryCode)

    return (
        <Container>
            <div className="modal-content">
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
                        We are excited to announce that you will be able to send money to <span className="green-text">{country?.name}</span>
                        &nbsp;from the 22nd of July 2022. To continue, please select a country we currently
                        remit to.
                    </p>
                    <button className="modify-btn" onClick={setClose}>Modify</button>
                </div>
            </div>
        </Container>
    )
}

export default UpcomingCountries;