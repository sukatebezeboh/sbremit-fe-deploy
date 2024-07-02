import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import { paths } from "util/paths";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import {
  consoleLogOnLocalHost,
  transferMethodsInWords,
} from "../../utils/reuseableUtils";
import {
  getTransactionQuoteRequest,
  isWithinPaymentLimit,
} from "./GetQuoteHelper";
import { GetQuoteContainerStyle } from "./GetQuoteStyles";
import { ExchangeCalculator } from "./controls/ExchangeCalculator";

interface LocationState {
  transferMethod: string;
}

export default function GetQuote() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  //tranferMethod from location(transfer method page) buh if location is null transfer.transferMethod(Resend transfer cases)

  const searchParams = new URLSearchParams(location.search);
  const transferMethodQueryParams = searchParams.get("method") || 1;

  const transferMethod =
    transferMethodsInWords[transferMethodQueryParams] ||
    transferMethodsInWords[transfer?.transferMethod];

  const { payinActualValue, payoutActualValue } = transfer;
  const [loader, setLoader] = useState(false);

  //Reupdate the transferMethod value in the global state: for page refresh case
  useEffect(() => {
    dispatch({
      type: TRANSFER,
      payload: { ...transfer, transferMethod: transferMethod },
    });
  }, [transferMethod]);

  const onContinueClicked = () => {
    setLoader(true);
    const navigateToRecipients = (data: any) => {
      setLoader(false);
      history.push(paths.RECIPIENT, { transferQuoteResponse: data });
    };

    const onErrorEncountered = () => {
      setLoader(false);
    };

    consoleLogOnLocalHost(transferMethod);

    getTransactionQuoteRequest(
      transferMethod,
      navigateToRecipients,
      onErrorEncountered
    );
  };

  return (
    <GetQuoteContainerStyle>
      <TransactionsSteps step="get-quote" />
      <PageTitileAndDescription
        title="Get quote"
        description="How much would you like to send to your recipient?😉"
      />
      <ExchangeCalculator />
      <LargeButton
        text="Continue"
        onClick={onContinueClicked}
        loading={loader}
        disabled={
          isWithinPaymentLimit(transfer) !== "" ||
          payinActualValue <= 0 ||
          payoutActualValue <= 0
        } // enable when there's no error message or payinActualValue > 0
      />
    </GetQuoteContainerStyle>
  );
}
