import { useEffect, useState, useRef } from 'react'
import { resources } from '../../../util/constants'
import { settings } from '../../../util/settings'

import sjcl from 'sjcl';
import { getDateTimeNowInYYYY_MM_DD__HH_MM_SS_FromServer } from 'redux/actions/actions';
import { getDateTimeNowInYYYY_MM_DD__HH_MM_SS, getQueryParam } from '../../../util/util';
import AppLoader from 'components/modules/app-loader/AppLoader';
require('dotenv').config();

const TrustPaymentForMobile = () => {
  const [ utcDateTime, setUtcDateTime ] = useState(getDateTimeNowInYYYY_MM_DD__HH_MM_SS())
  const stprofile = 'default',
    currencyiso3a = getQueryParam('currency'),
    mainamount = getQueryParam('amount'),
    transactionId = getQueryParam('transactionId'),
    transferId = getQueryParam('transferId')

    useEffect(() => {
        getDateTimeNowInYYYY_MM_DD__HH_MM_SS_FromServer(setUtcDateTime);
    }, [])

    const submitButton = useRef<any>(null)

    useEffect(() => {
      if(submitButton?.current?.click){
        console.log(submitButton?.current?.click())
      }
      
    }, [submitButton?.current?.click])
    

    if(!utcDateTime){
      return <AppLoader />
    }

    const stdefaultprofile = 'st_paymentcardonly'
    const orderReference = transactionId;
    const password = process.env.REACT_APP_TRUST_SITE_PASSWORD
    const siteSecurityTimestamp = utcDateTime
    const version = 2;
    const ruleIdentifier1 = "STR-1";
    const ruleIdentifier2 = "STR-2";
    const ruleIdentifier3 = "STR-3";
    const ruleIdentifier4 = "STR-4";
    const ruleIdentifier5 = "STR-5";
    // const ruleIdentifier6 = "STR-6";
    const ruleIdentifier7 = "STR-7";
    const ruleIdentifier8 = "STR-8";
    const ruleIdentifier9 = "STR-9";
    const ruleIdentifier10 = "STR-10";
    const successfulRedirectURL = settings.TRUST_SUCCESSFUL_REDIRECT_URL + transferId;
    let stringToHash = currencyiso3a ?? '';
    stringToHash += mainamount ?? ''
    stringToHash += settings.TRUST_PAYMENT_SITE_REFERENCE ?? ''
    stringToHash += version ?? ''
    stringToHash += stprofile ?? ''
    stringToHash += ruleIdentifier1 ?? ''
    stringToHash += ruleIdentifier2 ?? ''
    stringToHash += ruleIdentifier3 ?? ''
    stringToHash += ruleIdentifier4 ?? ''
    stringToHash += ruleIdentifier5 ?? ''
    // stringToHash += ruleIdentifier6 ?? ''
    stringToHash += ruleIdentifier7 ?? ''
    stringToHash += ruleIdentifier8 ?? ''
    stringToHash += ruleIdentifier9 ?? ''
    stringToHash += ruleIdentifier10 ?? ''
    stringToHash += stdefaultprofile
    stringToHash += successfulRedirectURL
    stringToHash += settings.TRUST_NOTIFICATION_WEBHOOK_URL ?? ''
    stringToHash += siteSecurityTimestamp ?? ''
    stringToHash += password ?? ''
    const siteSecurityHash = 'h' + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(stringToHash));

    return (
        <span>
            <form method="POST" action={resources.TRUST_PAYMENT_URL}  >
                <input type="hidden" name="sitereference" value={settings.TRUST_PAYMENT_SITE_REFERENCE} />
                <input type="hidden" name="stprofile" value={stprofile} />
                <input type="hidden" name="stdefaultprofile" value={stdefaultprofile} />
                <input type="hidden" name="currencyiso3a" value={currencyiso3a} />
                <input type="hidden" name="mainamount" value={mainamount} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier1} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier2} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier3} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier4} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier5} />
                {/* <input type="hidden" name="ruleidentifier" value={ruleIdentifier6} /> */}
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier7} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier8} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier9} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier10} />
                <input type="hidden" name="successfulurlnotification" value={settings.TRUST_NOTIFICATION_WEBHOOK_URL} />
                <input type="hidden" name="successfulurlredirect" value={successfulRedirectURL} />
                <input type="hidden" name="orderreference" value={orderReference} />
                <input type="hidden" name="sitesecurity" value={siteSecurityHash} />
                <input type="hidden" name="sitesecuritytimestamp" value={siteSecurityTimestamp} />
                <input type="hidden" name="version" value={version} />

                <button type="submit" value="Pay" ref={submitButton}></button>
                {/* <button type="submit" value="Pay" ref={submitButton}> Proceed to payment </button> */}
            </form>
        </span>
    )
}

export default TrustPaymentForMobile