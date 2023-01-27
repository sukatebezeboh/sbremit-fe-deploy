import React from 'react'
import { useHistory } from 'react-router-dom';
import { asset } from '../../../util/util';
import Container from './UpcomingCountries.css'
const UpcomingCountries = ({ toSendFlag, toRecieveFlag, setClose, destinationCountry}: any) => {
    const history = useHistory();

    return (
        <Container>
            <div className="modal-content">
                <div className="close-btn" onClick={setClose}>&times;</div>
                <div className="country-flag-container">
                    <div className="send-flag resize">
                        <img src={asset ( 'flags', `${toSendFlag}` )} alt='' />
                    </div>
                    <div className="arrow-between">
                        <img src={asset ( 'icons', 'transfer-green.png' )} alt='' />
                    </div>
                    <div className="recieve-flag resize">
                        <img src={asset ( 'flags', `${toRecieveFlag}` )} alt='' />
                    </div>
                </div>

                <div className="info-container">
                    <p className="info-text">
                        Great News!!! We are excited to announce that we will soon be remitting to  <span className="green-text">{destinationCountry}.</span>
                        &nbsp;Please register to indicate your interest in remitting to this country.
                    </p>
                    <button className="modify-btn" onClick={()=>history.push('/country/register')}>Register your interest</button>
                </div>
            </div>
        </Container>
    )
}

export default UpcomingCountries;