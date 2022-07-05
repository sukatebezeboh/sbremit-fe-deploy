import React from 'react'
import { useHistory } from 'react-router-dom';
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

        .close-btn {
            text-align: right;
            font-size: 50px;
            cursor: pointer;
        }
    }
`
const UpcomingCountries = ({ toSendFlag, toRecieveFlag, destinationCountryCode,  setClose}: any) => {
    const country = countriesAndCodes.find(country => country.countryCode === destinationCountryCode)
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
                        Great News!!! We are excited to announce that we will soon be remitting to  <span className="green-text">{country?.name?.toUpperCase()}.</span>
                        &nbsp;Please register to indicate your interest in remitting to this country.
                    </p>
                    <button className="modify-btn" onClick={()=>history.push('/country/register')}>Register your interest</button>
                </div>
            </div>
        </Container>
    )
}

export default UpcomingCountries;