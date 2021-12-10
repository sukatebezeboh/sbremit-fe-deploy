import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { resources } from '../../../util/constants'
import { settings } from '../../../util/settings'
import { getDateTimeNowInYYYY_MM_DD__HH_MM_SS } from '../../../util/util'
import sjcl from 'sjcl';
require('dotenv').config();

interface IPaymentRedirect {
    stprofile?: string,
    currencyiso3a: string,
    mainamount: number,
    transactionId: string
}

const PaymentRedirect = ({stprofile = 'default', currencyiso3a, mainamount, transactionId }: IPaymentRedirect) => {
    const orderReference = transactionId;
    const password = process.env.REACT_APP_TRUST_SITE_PASSWORD
    const siteSecurityTimestamp = getDateTimeNowInYYYY_MM_DD__HH_MM_SS();
    const version = 2;
    const ruleIdentifier = "STR-10";
    let stringToHash = currencyiso3a ?? '';
    stringToHash += mainamount ?? ''
    stringToHash += settings.TRUST_PAYMENT_SITE_REFERENCE ?? ''
    stringToHash += version ?? ''
    stringToHash += stprofile ?? ''
    stringToHash += ruleIdentifier ?? ''
    stringToHash += settings.TRUST_NOTIFICATION_WEBHOOK_URL ?? ''
    stringToHash += "timestamp="+siteSecurityTimestamp
    stringToHash += siteSecurityTimestamp ?? ''
    stringToHash += password ?? ''
    const siteSecurityHash = 'h' + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(stringToHash));
    console.log(orderReference, stringToHash, 'siteSecurityHash: ', siteSecurityHash)

    return (
        <span>
            <form method="POST" action={resources.TRUST_PAYMENT_URL}  >
                <input type="hidden" name="sitereference" value={settings.TRUST_PAYMENT_SITE_REFERENCE} />
                <input type="hidden" name="stprofile" value={stprofile} />
                <input type="hidden" name="currencyiso3a" value={currencyiso3a} />
                <input type="hidden" name="mainamount" value={mainamount} />
                <input type="hidden" name="ruleidentifier" value={ruleIdentifier} />
                <input type="hidden" name="allurlnotification" value={settings.TRUST_NOTIFICATION_WEBHOOK_URL} />
                <input type="hidden" name="orderreference" value={orderReference} />
                <input type="hidden" name="sitesecurity" value={siteSecurityHash} />
                <input type="hidden" name="sitesecuritytimestamp" value={siteSecurityTimestamp} />
                <input type="hidden" name="version" value={version} />
                <input type="hidden" name="stextraurlnotifyfields" value={"timestamp="+siteSecurityTimestamp} />

                <button type="submit" value="Pay"> Proceed to payment </button>
            </form>
        </span>
    )
}

export default PaymentRedirect
