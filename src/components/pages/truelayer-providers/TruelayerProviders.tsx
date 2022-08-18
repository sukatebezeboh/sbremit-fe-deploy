import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/parts/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import { paths } from '../../../util/paths';
import { cancelTransfer, fetchTruelayerProviders, getTransactionDetails, initiateTruelayerPayment, toastAction } from '../../../redux/actions/actions';
import { ConfirmModal } from '../../modules/confirm-modal/ConfirmModal';
import { getQueryParam } from '../../../util/util';

import Body from './TruelayerProviders.css'

const TruelayerProviders = () => {
    const history = useHistory();
    const [selected, setSelected]: any = useState(null)
    const [openConfirmModal, setOpenConfirmModal] = useState(false);
    const transferId = getQueryParam('t');
    // const [redirectToCardPaymentProvider, setRedirectToCardPaymentProvider] = useState(false);
    const [tProviders, setTProviders]: any = useState([])

    const handleProceed = async () => {
        if(!selected){
            toastAction({
                show: true,
                type: 'warning',
                timeout: 10000,
                message: 'Select a provider to proceed'
            })
            return
        }

        initiateTruelayerPayment(selected, transferId);
    }

    const handleCancel = () => {
        cancelTransfer(() => history.push(paths.DASHBOARD))
    }

    useEffect(() => {
        getTransactionDetails(()=>{}, transferId);
        fetchTruelayerProviders(setTProviders);
    }, [])

    return (
        <Body>
            {openConfirmModal ? 
            <ConfirmModal 
                message="Are you sure you want to cancel this transfer?"
                onSave={{
                    label: 'Yes, cancel',
                    fn: ()=>handleCancel()
                }}
                onCancel={{
                    label: "No, don't cancel",
                    fn: () => setOpenConfirmModal(false)
                }}
            /> : <></>}
            <NavBar />
            <ProgressBar point={4} />

            <div className="page-content">
                <div>
                    <PageHeading heading="Pay" subheading="How would you like to pay for the transfer?" back="/review" />
                    <div className="green-txt desktop-hide view-td">View transfer details</div>
                </div>
                <div className="box-container details">
                    <div className="box-container-inner">

                      { tProviders.map((provider: any) => (
                        <div key={provider.provider_id} className={`radio-card ${ selected?.provider_id === provider.provider_id && "selected-border-green"}`} onClick={()=>setSelected(provider)}>
                            <div className="radio-card-inner">
                                <img className="provider-icon" src={provider.logo_url} alt={provider.provider_id} />
                                <div className="provider-name">
                                    {provider.display_name}
                                </div>
                            </div>
                        </div>
                      ))  }

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox transferId={transferId} />
                    </div>
                </div>
                <div className="btns"><span onClick={()=>setOpenConfirmModal(true)}>Cancel transfer</span> 
                 {
                    <span> <button onClick={()=>handleProceed()}>Proceed to payment</button> </span>
                }
                </div>
            </div>
        </Body>
    )
}

export default TruelayerProviders;
