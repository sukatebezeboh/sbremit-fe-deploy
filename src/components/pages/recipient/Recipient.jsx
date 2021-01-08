import React from 'react'
import { useHistory } from 'react-router-dom';
import { asset } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import TransferDetalsBox from '../../ui-components/parts/TransferDetailsBox';
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
            <div className="page-content">
                <div>
                    <div className="search">
                        ...
                    </div>
                    <PageHeading heading="Verification" subheading="Enter information to verify your identity" back="/verification" />
                    
                </div>
                <div className="box-container">
                    <div className="right part">
                            <div className="heading mobile-hide">
                                <div className="title">My saved recipients</div>
                            </div>
                            <hr className="mobile-hide"/>
                            <div className="small-boxes">
                                <div className="recipient plus">
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
                    <TransferDetalsBox/>
                </div>
                <div className="btns"><span onClick={()=>history.push('/verification')}>Back</span> <button onClick={()=>history.push('/recipient')}>Continue</button> </div>
            </div>
        </Body>
    )
}

export default Recipient;
