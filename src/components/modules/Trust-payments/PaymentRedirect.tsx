import _env from "env";
import { useEffect, useRef, useState } from "react";
import { resources } from "../../../util/constants";
import { settings } from "../../../util/settings";

import { getDateTimeNowInYYYY_MM_DD__HH_MM_SS_FromServer } from "redux/actions/actions";
import sjcl from "sjcl";
import { getDateTimeNowInYYYY_MM_DD__HH_MM_SS } from "../../../util/util";
import { useSelector } from "react-redux";
require("dotenv").config();

interface IPaymentRedirect {
  stprofile?: string;
  currencyiso3a: string;
  mainamount: number;
  transactionId: string;
  transferId: string;
  enabled: boolean;
  setEnabled: Function;
  credentialsonfile: "1" | "0"; //This must be set to “1”, to indicate the customer agreed for the payment credentials to be stored for future transactions.
}

const PaymentRedirect = ({
  stprofile = "default",
  currencyiso3a,
  mainamount,
  transactionId,
  transferId,
  enabled,
  setEnabled,
  credentialsonfile,
}: IPaymentRedirect) => {
  const user = useSelector((state: any) => state.auth.user);
  const { firstName, lastName } = user.profile;
  const formRef = useRef<HTMLFormElement>(null);
  const [utcDateTime, setUtcDateTime] = useState(
    getDateTimeNowInYYYY_MM_DD__HH_MM_SS()
  );

  useEffect(() => {
    getDateTimeNowInYYYY_MM_DD__HH_MM_SS_FromServer(setUtcDateTime);
  }, []);

  const continueToPayment = (e: any): any => {
    console.log(e);
    e.target.mainamount.value = mainamount;
    e.target.currencyiso3a.value = currencyiso3a;
    setEnabled();
    return true;
  };

  useEffect(() => {
    //manually trigger form submit and action
    if (enabled && formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { bubbles: true, cancelable: true })
      );
      formRef.current.submit();
    }
  }, [enabled]);

  const stdefaultprofile = "st_paymentcardonly";
  const orderReference = transactionId;
  const billingemail = user?.username;
  const billingfirstname = firstName || "";
  const billinglastname = lastName || "";
  const password = process.env.REACT_APP_TRUST_SITE_PASSWORD;
  const siteSecurityTimestamp = utcDateTime;
  const version = 2;
  const ruleIdentifier1 = "STR-1";
  const ruleIdentifier2 = "STR-2";
  const ruleIdentifier3 = "STR-3";
  const ruleIdentifier4 = "STR-4";
  const ruleIdentifier5 = "STR-5";
  const strequiredfields = "nameoncard";
  const stextraurlnotifyfields1 = "nameoncard";
  const stextraurlnotifyfields2 = "issuercountryiso2a";
  const stextraurlnotifyfields3 = "currencyiso3a";
  const stextraurlnotifyfields4 = "mainamount";
  const stextraurlnotifyfields5 = "billingfirstname";
  const stextraurlnotifyfields6 = "billingmiddlename";
  const stextraurlnotifyfields7 = "billinglastname";
  const stextraurlnotifyfields8 = "maskedpan";
  const stextraurlnotifyfields9 = "requesttypedescription";
  const stextraurlnotifyfields10 = "authcode";
  const stextraurlredirectfields = "nameoncard";
  // const credentialsonfile = "1";
  // const ruleIdentifier6 = "STR-6";
  // const ruleIdentifier7 = "STR-7";
  // const ruleIdentifier8 = "STR-8";
  // const ruleIdentifier9 = "STR-9";
  // const ruleIdentifier10 = "STR-10";
  const successfulRedirectURL = `${_env.APP_HOST}/transfer-completed/${transferId}?payment_type=trust_payment`;
  // settings.TRUST_SUCCESSFUL_REDIRECT_URL + transferId;
  // const requesttypedescriptions = "ACCOUNTCHECK";
  let stringToHash = currencyiso3a ?? "";
  stringToHash += mainamount ?? "";
  stringToHash += settings.TRUST_PAYMENT_SITE_REFERENCE ?? "";
  stringToHash += strequiredfields;
  stringToHash += version ?? "";
  stringToHash += stprofile ?? "";
  stringToHash += ruleIdentifier1 ?? "";
  stringToHash += ruleIdentifier2 ?? "";
  stringToHash += ruleIdentifier3 ?? "";
  stringToHash += ruleIdentifier4 ?? "";
  stringToHash += ruleIdentifier5 ?? "";
  // stringToHash += ruleIdentifier6 ?? ''
  // stringToHash += ruleIdentifier7 ?? "";
  // stringToHash += ruleIdentifier8 ?? "";
  // stringToHash += ruleIdentifier9 ?? "";
  // stringToHash += ruleIdentifier10 ?? "";
  stringToHash += stdefaultprofile;
  stringToHash += successfulRedirectURL;
  stringToHash += settings.TRUST_NOTIFICATION_WEBHOOK_URL ?? "";
  stringToHash += settings.TRUST_NOTIFICATION_WEBHOOK_URL ?? "";
  stringToHash += stextraurlnotifyfields1;
  stringToHash += stextraurlnotifyfields2;
  stringToHash += stextraurlnotifyfields3;
  stringToHash += stextraurlnotifyfields4;
  stringToHash += stextraurlnotifyfields5;
  stringToHash += stextraurlnotifyfields6;
  stringToHash += stextraurlnotifyfields7;
  stringToHash += stextraurlnotifyfields8;
  stringToHash += stextraurlnotifyfields9;
  stringToHash += stextraurlnotifyfields10;
  stringToHash += stextraurlredirectfields;
  stringToHash += credentialsonfile;
  // stringToHash += requesttypedescriptions;
  stringToHash += siteSecurityTimestamp;
  stringToHash += password ?? "";
  const siteSecurityHash =
    "h" + sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(stringToHash));

  return (
    <span>
      <form
        ref={formRef}
        method="POST"
        action={resources.TRUST_PAYMENT_URL}
        onSubmit={(e) => continueToPayment(e)}
      >
        <input
          type="hidden"
          name="sitereference"
          value={settings.TRUST_PAYMENT_SITE_REFERENCE}
        />
        <input type="hidden" name="stprofile" value={stprofile} />
        <input type="hidden" name="stdefaultprofile" value={stdefaultprofile} />
        <input type="hidden" name="currencyiso3a" value={currencyiso3a} />
        <input type="hidden" name="mainamount" value={mainamount} />
        <input type="hidden" name="strequiredfields" value={strequiredfields} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier1} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier2} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier3} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier4} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier5} />
        {/* <input type="hidden" name="ruleidentifier" value={ruleIdentifier6} /> */}
        {/* <input type="hidden" name="ruleidentifier" value={ruleIdentifier7} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier8} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier9} />
        <input type="hidden" name="ruleidentifier" value={ruleIdentifier10} /> */}

        {/* Configuration for storing of payment credentials */}
        <input
          type="hidden"
          name="credentialsonfile"
          value={credentialsonfile}
        />

        {/* <input
          type="hidden"
          name="requesttypedescriptions"
          value={requesttypedescriptions}
        /> */}
        {/* end */}

        <input
          type="hidden"
          name="successfulurlnotification"
          value={settings.TRUST_NOTIFICATION_WEBHOOK_URL}
        />
        <input
          type="hidden"
          name="successfulurlredirect"
          value={successfulRedirectURL}
        />

        <input
          type="hidden"
          name="allurlnotification"
          value={settings.TRUST_NOTIFICATION_WEBHOOK_URL}
        />

        <input type="hidden" name="orderreference" value={orderReference} />
        <input type="hidden" name="billingfirstname" value={billingfirstname} />
        <input type="hidden" name="billinglastname" value={billinglastname} />
        <input type="hidden" name="billingemail" value={billingemail} />
        <input type="hidden" name="sitesecurity" value={siteSecurityHash} />

        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields1}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields2}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields3}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields4}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields5}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields6}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields7}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields8}
        />

        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields9}
        />
        <input
          type="hidden"
          name="stextraurlnotifyfields"
          value={stextraurlnotifyfields10}
        />

        <input
          type="hidden"
          name="stextraurlredirectfields"
          value={stextraurlredirectfields}
        />

        <input
          type="hidden"
          name="sitesecuritytimestamp"
          value={siteSecurityTimestamp}
        />

        <input type="hidden" name="version" value={version} />
        {/* 
        <button type="submit" value="Pay">
          {" "}
          Proceed to payment{" "}
        </button> */}
      </form>
    </span>
  );
};

export default PaymentRedirect;