import React, { useEffect } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import TransferDetailsBox from '../../modules/parts/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import SuccessIcon from '../../modules/success-icon/SuccessIcon';
import { asset, getQueryParam } from '../../../util/util';
import Body from './TransferComplete.css'
import { getTransactionDetails } from 'redux/actions/actions';
import { useSelector } from 'react-redux';
import { paths } from 'util/paths';

const TransferComplete = () => {
    let {transferId} = useParams<any>();
    transferId = transferId || getQueryParam('t') ;
    const transfer = useSelector((state: any) => state.transfer.transactionDetails);


    useEffect(() => {
        if ( transferId ) {
            getTransactionDetails( undefined, transferId )
        }
    }, [])
    
    return (
        <Body>
            <NavBar />
            <ProgressBar point={5} />
            <div className="page-content">
                <div className="box-container details">
                    <div className="completed-box">
                        <div className="success-icon">
                            <SuccessIcon />
                        </div>
                        <div className="completed-head">
                            Transfer created!
                        </div>
                        <div className="completed-body">
                            Your transfer process will continue when SBremit receives the payment from your bank. You will receive an email confirmation

                            { 
                                transfer?.meta?.paymentGatewayUsed === 'TRUELAYER' &&
                                <p className='green-txt'>
                                    Your transfer payment status might take a couple of minutes to update
                                </p>
                            }
                        </div>
                        
                        <div className="download">
                            {/* <div>
                                <img src={asset('icons', 'download-file.svg')} alt="download"/><span>Download receipt</span>
                            </div> */}
                        </div>
                        <div className="back">
                            <Link to={paths.DASHBOARD} >Back to Dashboard</Link>
                        </div>
                    </div>

                    { transferId && <TransferDetailsBox transferData={transfer} />}
                </div>
            </div>
        </Body>
    )
}

export default TransferComplete;
