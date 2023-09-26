import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import NavBar from "../../modules/navbar/NavBar";
import TransferDetailsBox from "../../modules/transfer-details-box/TransferDetailsBox";
import ProgressBar from "../../modules/progress-bar/ProgressBar";
import SuccessIcon from "../../modules/success-icon/SuccessIcon";
import { getQueryParam, isCurrencyPairDowntimeUp } from "../../../util/util";
import Body from "./TransferComplete.css";
import {
  getPaymentStatus,
  getSpreads,
  getTransactionDetails,
} from "redux/actions/actions";
import { useSelector } from "react-redux";
import { paths } from "util/paths";
import PageNavButton from "components/modules/parts/PageNavButton";

const ForAuthUsers = () => {
  const history = useHistory();
  let { transferId } = useParams<any>();
  transferId = transferId || getQueryParam("t");
  const transfer = useSelector(
    (state: any) => state.transfer.transactionDetails
  );
  const countries = useSelector((state: any) => state.appValues.countries);

  useEffect(() => {
    getSpreads();
    if (transferId) {
      getTransactionDetails(undefined, transferId);
    }
  }, []);

  useEffect(() => {
    if (transfer !== undefined) {
      const checkoutId = transfer?.meta?.axcess_checkout_id;
      getPaymentStatus(checkoutId);
    }
  }, [transfer]);

  const getCountryFullNameByCountryKey = (key: string): string => {
    return countries[key] || key;
  };

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
            <div className="completed-head">Transfer created!</div>
            <div className="completed-body">
              Your transfer process will continue when SBremit receives the
              payment from your bank. You will receive an email confirmation
              {
                // transfer?.meta?.paymentGatewayUsed === 'TRUELAYER' &&
                <p className="green-txt">
                  Please note, it may take up to 3 minutes for the status of
                  your transaction to be updated.
                </p>
              }
              {isCurrencyPairDowntimeUp(
                transfer?.originCurrency,
                transfer?.destinationCurrency
              ) && (
                <p>
                  We are experiencing some delays with payments to{" "}
                  {getCountryFullNameByCountryKey(
                    transfer?.meta?.destinationCountryCode
                  )}{" "}
                  caused by temporary downtime. We are working to resolve this
                  quickly and you will be notified once the system is up and
                  running, we apologise for any inconvenience this may have
                  caused.
                </p>
              )}
            </div>

            <div className="download">
              {/* <div>
                                <img src={asset('icons', 'download-file.svg')} alt="download"/><span>Download receipt</span>
                            </div> */}
            </div>
            <div className="back">
              <PageNavButton
                onClick={() => history.push(paths.DASHBOARD)}
                label="Back to Dashboard"
              />
            </div>
          </div>

          {transferId && <TransferDetailsBox transferData={transfer} />}
        </div>
      </div>
    </Body>
  );
};

export default ForAuthUsers;
