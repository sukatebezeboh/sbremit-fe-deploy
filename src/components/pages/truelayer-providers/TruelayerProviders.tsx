import {useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';
import NavBar from '../../modules/navbar/NavBar';
import PageHeading from '../../modules/page-heading/PageHeading';
import TransferDetailsBox from '../../modules/transfer-details-box/TransferDetailsBox';
import ProgressBar from '../../modules/progress-bar/ProgressBar';
import { paths } from '../../../util/paths';
import { cancelTransfer, fetchTruelayerProviders, getTransactionDetails, initiateTruelayerPayment, toastAction } from '../../../redux/actions/actions';
import { ConfirmModal } from '../../modules/confirm-modal/ConfirmModal';
import { getQueryParam } from '../../../util/util';

import Body from './TruelayerProviders.css'
import RadioCardWrapper from 'components/modules/radio-card-wrapper/RadioCardWrapper';

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
                            <RadioCardWrapper
                                clickHandler={()=>setSelected(provider)}
                                name={'truelayer-provider'}
                                id={provider.provider_id}
                                key={provider.provider_id}
                                isChecked={selected?.provider_id === provider.provider_id}
                                selectedConfig={{
                                    className: 'selected-border-green border-thick'
                                }}
                                value={provider.provider_id}
                            >
                                <div className="radio-card-inner">
                                    <img className="provider-icon" src={provider.logo_url} alt={provider.provider_id} />
                                    <div className="provider-name">
                                        {provider.display_name}
                                    </div>
                                </div>
                            </RadioCardWrapper>
                      ))  }

                    </div>
                    <div className="mobile-hide">
                        <TransferDetailsBox transferId={transferId} />
                    </div>
                </div>
                <div className="btns">
                    <div className="disclaimer italicize">
                        By continuing you are permitting TrueLayer to initiate a payment from your bank account. You also agree to our <a href="https://truelayer.com/enduser_tos/" target="_blank" rel="noreferrer">End User Terms of Service</a> and <a href="https://truelayer.com/privacy/" target="_blank" rel="noreferrer">Privacy Policy</a>
                    </div>
                    <div className="btns-right">
                        <span onClick={()=>setOpenConfirmModal(true)}>Cancel transfer</span> 
                        {
                            <span> <button onClick={()=>handleProceed()}>Proceed to payment</button> </span>
                        }
                        </div>                        
                    </div>

            </div>
        </Body>
    )
}

export default TruelayerProviders;
