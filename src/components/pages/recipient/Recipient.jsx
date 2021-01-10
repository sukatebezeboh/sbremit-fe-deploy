import React from 'react'
import { useHistory } from 'react-router-dom';
import { asset } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import NewRecipientModal from '../../ui-components/new-recipient-modal/NewRecipientModal';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import RoundFloatingPlus from '../../ui-components/parts/RoundFloatingPlus';
import TransferDetailsBox from '../../ui-components/parts/TransferDetailsBox';
import ProgressBar from '../../ui-components/progress-bar/ProgressBar';
import Body from './Recipient.css';

const Recipient = () => {
    const history = useHistory();
    const users = [
        {},{},{},{},{}
    ]

    return (
        <Body>
            <NavBar />
            <ProgressBar />
            <NewRecipientModal />
            <div className="page-content">
                <div className="search">
                    <div><input type="text" placeholder="Search recipients"/> <button className=""> <img src={asset("icons", "search.svg")} alt="search"/> </button> </div>
                </div>
                <div>
                    <PageHeading heading="Recipient" subheading="Who are you sending money to?" back="/verification" />
                    <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <RoundFloatingPlus showPlus={true} />
                <div className="box-container">
                    <div className="right part">
                            <div className="heading mobile-hide">
                                <div className="title">My saved recipients</div>
                            </div>
                            <hr className="mobile-hide"/>
                            <div className="small-boxes">
                                <div className="recipient plus mobile-hide">
                                    <img src={asset("icons", "add.svg")} alt="plus"/>
                                    <span>New recipient</span>
                                </div>
                                {
                                    users.map(user=>(
                                        <div className="recipient">
                                            <div><img src={asset("images", "noimage.png")} alt="user"/></div>
                                            <div>Ifepade Adewunmi</div>
                                        </div>
                                    ))
                                }
                            </div>

                    </div>
                    <TransferDetailsBox/>
                </div>
                <div className="btns"><span onClick={()=>history.push('/verification')}>Back</span> <button onClick={()=>history.push('/recipient')}>Continue</button> </div>
            </div>
        </Body>
    )
}

export default Recipient;
