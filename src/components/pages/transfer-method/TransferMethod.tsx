import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { toastAction } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { asset } from '../../../util/util';
import NavBar from '../../ui-components/navbar/NavBar';
import PageHeading from '../../ui-components/page-heading/PageHeading';
import style from './TransferMethod.css'

const Body = style();

const TransferMethod = () => {
    const transfer = useSelector((state: any) => state.transfer)
    const [selected, setSelected] = useState(transfer.transferMethod);
    const dispatch = useDispatch();
    const history = useHistory();

    const setTransferMethod = (method: string) => {
        setSelected(method);
        dispatch({type: TRANSFER, payload: {...transfer, transferMethod: method}})
    }

    const handleStartClick = () => {
        if (!selected) {
            return toastAction({
                show: true,
                type: 'warning',
                timeout: 10000,
                message: 'Select a transfer method to proceed'
            })
        }
        return history.push(paths.GET_QUOTE);
    }

    return (
        <Body>
            <NavBar />
            <div className="page-content">
                <PageHeading heading="Transfer method" subheading="How would you like your recipient to receive the money?" back="/dashboard" />
                <div className="box">
                    <div className="row">
                        <div className={`${selected === "mobile_money" && "selected"}`} onClick={() => setTransferMethod('mobile_money')}>
                            <img src={asset('icons', 'transfer4.svg')} alt="mobile money"/>
                            <div>Mobile Money</div>
                            <div>Service fee from 0.95 GBP</div>
                        </div>
                        <div className={`${selected === "bank_transfer" && "selected"}`} onClick={() => setTransferMethod('bank_transfer')}>
                            <img src={asset('icons', 'bank.svg')} alt="bank transfer"/>
                            <div>Bank Transfer</div>
                            <div>Service fee from 0.95 GBP</div>
                        </div>
                        <div className={`pickup ${selected === "cash_pickup" && "selected"}`} onClick={() => setTransferMethod('cash_pickup')}>
                            <img src={asset('icons', 'cash.svg')} alt="cash pickup"/>
                            <div>Cash Pickup</div>
                            <div>Service fee from 0.95 GBP</div>
                        </div>
                    </div>
                    <div className="footnote">SBremit charges you <b className="green-txt">0.00 GBP</b> for this transfer</div>
                </div>
                <div className="btns"><span>Cancel</span> <button onClick={handleStartClick}>Start</button> </div>
            </div>
        </Body>
    )
}

export default TransferMethod;
