import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { getServiceRate, toastAction } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { paths } from '../../../util/paths';
import { asset } from '../../../util/util';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import style from './TransferMethod.css'

const Body = style();

const TransferMethod = () => {
    const transfer = useSelector((state: any) => state.transfer)
    const [selected, setSelected] = useState(transfer.transferMethod);
    const dispatch = useDispatch();
    const history = useHistory();
    const [  mobileMoneyStartingFee, setMobileMoneyStartingFee ] = useState(0.00);
    const [  bankTransferStartingFee, setBankTransferStartingFee ] = useState(0.00);
    const [  cashPickUpStartingFee, setCashPickUpStartingFee ] = useState(0.00);
    const { toSend } = transfer;

    const setTransferMethod = (method: string) => {
        setSelected(method);
        dispatch({type: TRANSFER, payload: {...transfer, transferMethod: method}})
    }

    useEffect(()=>{
        getServiceRate();
    }, [transfer.transferMethod])

    useEffect(() => {
        Number(toSend.value) && setMobileMoneyStartingFee(getServiceRate("mobile_money"));
        Number(toSend.value) &&  setBankTransferStartingFee(getServiceRate("bank_transfer"));
        Number(toSend.value) &&  setCashPickUpStartingFee(getServiceRate("cash_pickup"));
        Number(toSend.value) &&  getServiceRate();
    }, [toSend])

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

    const serviceFee = transfer.serviceFee;
    // const serviceFee = Number(toSend.value) ? transfer.serviceFee : formatCurrency("0");


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
                            <div>Mobile Operator Transfer Fee from {mobileMoneyStartingFee} {toSend.currency}</div>
                        </div>
                        <div className={`${selected === "bank_transfer" && "selected"}`} onClick={() => setTransferMethod('bank_transfer')}>
                            <img src={asset('icons', 'bank.svg')} alt="bank transfer"/>
                            <div>Bank Transfer</div>
                            <div>Bank Transfer fee from {bankTransferStartingFee} {toSend.currency}</div>
                        </div>
                        <div className={`pickup ${selected === "cash_pickup" && "selected"}`} onClick={() => setTransferMethod('cash_pickup')}>
                            <img src={asset('icons', 'cash.svg')} alt="cash pickup"/>
                            <div>Cash Pickup</div>
                            <div>Cash Pick-up fee from {cashPickUpStartingFee} {toSend.currency}</div>
                        </div>
                    </div>
                    <div className="footnote">SBremit charges you <b className="green-txt"> 0.00 {toSend.currency}</b> for this transfer</div>
                </div>
                <div className="btns"><span>Cancel</span> <button onClick={handleStartClick}>Start</button> </div>
            </div>
        </Body>
    )
}

export default TransferMethod;
