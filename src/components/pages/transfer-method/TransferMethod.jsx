import React from 'react'
import { asset } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import style from './TransferMethod.css'

const Body = style();

const TransferMethod = () => {

    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="Transfer method" subheading="How would you like your recipient to receive the money?" back="/dashboard" />
                <div className="box">
                    <div className="row">
                        <div>
                            <img src={asset('icons', 'transfer4.svg')} alt="mobile money"/>
                            <div>Mobile Money</div>
                            <div>Service fee from 0.95 GBP</div>
                        </div>
                        <div>
                            <img src={asset('icons', 'bank.svg')} alt="bank transfer"/>
                            <div>Bank Transfer</div>
                            <div>Service fee from 0.95 GBP</div>
                        </div>
                        <div>
                            <img src={asset('icons', 'cash.svg')} alt="cash pickup"/>
                            <div>Cash Pickup</div>
                            <div>Service fee from 0.95 GBP</div>
                        </div>
                    </div>
                    <div className="footnote">SBremit charges you <b className="green-txt">0.00 GBP</b> for this transfer</div>
                </div>
                <div className="btns"><span>Cancel</span> <button>Start</button> </div>
            </div>
        </Body>
    )
}

export default TransferMethod;
