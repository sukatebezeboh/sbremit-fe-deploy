import PageNavButton from "components/modules/parts/PageNavButton";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  getPaymentStatus,
  getSpreads,
  getTransactionDetails,
} from "redux/actions/actions";
import { paths } from "util/paths";
import { getQueryParam, isCurrencyPairDowntimeUp } from "../../../util/util";
import NavBar from "../../modules/navbar/NavBar";
import ProgressBar from "../../modules/progress-bar/ProgressBar";
import SuccessIcon from "../../modules/success-icon/SuccessIcon";
import TransferDetailsBox from "../../modules/transfer-details-box/TransferDetailsBox";
import Body from "./TransferComplete.css";

interface PaymentStatusProps {
  status: string;
  code: any;
  message: string;
}

const ForAuthUsers = () => {
  const history = useHistory();
  let { transferId } = useParams<any>();
  transferId = transferId || getQueryParam("t");
  const transfer = useSelector(
    (state: any) => state.transfer.transactionDetails
  );

  const [paymentSatus, setPaymentStatus] = useState<PaymentStatusProps>();

  useEffect(() => {
    getSpreads();
    if (transferId) {
      getTransactionDetails(undefined, transferId);
    }
  }, []);

  useEffect(() => {
    if (transfer !== undefined) {
      const checkoutId = transfer?.meta?.axcess_checkout_id;

      getPaymentStatus(checkoutId, setPaymentStatus);
    }
  }, [transfer]);

  return (
    <Body>
      <NavBar />
      <ProgressBar point={5} />
      <div className="page-content">
        <div className="box-container details">
          <div className="completed-box">
            {/* {paymentSatus?.status !== null && paymentSatus?.status === "error" ? (
              <div>
                <div className="error-icon">
                  <MdOutlineError size={100} color="#cf0921" />
                </div>
                <div className="completed-head">Payment error!</div>
                <div className="error-body">
                  {paymentSatus?.message} Payment processed with suspicious card
                  details: Country Mismatch
                </div>
              </div>
            ) : ( */}
            <TransferCreated />
            {/* )} */}
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

const TransferCreated = (transfer: any) => {
  const countries = useSelector((state: any) => state.appValues.countries);

  const getCountryFullNameByCountryKey = (key: string): string => {
    return countries[key] || key;
  };
  return (
    <>
      <div className="success-icon">
        <SuccessIcon />
      </div>
      <div className="completed-head">Transfer created!</div>
      <div className="completed-body">
        Your transfer process will continue when SBremit receives the payment
        from your bank. You will receive an email confirmation
        {
          // transfer?.meta?.paymentGatewayUsed === 'TRUELAYER' &&
          <p className="green-txt">
            Please note, it may take up to 3 minutes for the status of your
            transaction to be updated.
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
            caused by temporary downtime. We are working to resolve this quickly
            and you will be notified once the system is up and running, we
            apologise for any inconvenience this may have caused.
          </p>
        )}
      </div>

      <div className="download">
        {/* <div>
                    <img src={asset('icons', 'download-file.svg')} alt="download"/><span>Download receipt</span>
                </div> */}
      </div>
    </>
  );
};
