import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { getTransactionsInfo } from "redux/actions/actionsTransfer";
import { paths } from "util/paths";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import { TransactionsInfomations } from "../app-transactions/TransactionDetail";
import {
  RecipientAndTranferContainer,
  ReviewContainerStyle,
} from "./ReviewStyles";

interface LocationState {
  transferId: string;
}

export default function Review() {
  const [trasnferInfo, setTransferInfo] = useState();
  const location = useLocation();
  const transferId = (location.state as LocationState)?.transferId;
  const history = useHistory();

  const startTransfer = () => {
    history.push(paths.PAYMENT_METHOD, {
      transfer: trasnferInfo,
    });
  };

  useEffect(() => {
    getTransactionsInfo(setTransferInfo, transferId);
  }, [transferId]);

  return (
    <ReviewContainerStyle>
      <TransactionsSteps step="review" />
      <PageTitileAndDescription
        title="Review"
        description="Review the details of your transfer🔍"
      />
      <RecipientAndTranferContainer>
        <div className="content">
          {trasnferInfo !== undefined && (
            <TransactionsInfomations transaction={trasnferInfo} />
          )}
        </div>
      </RecipientAndTranferContainer>
      <LargeButton text="Continue" disabled={false} onClick={startTransfer} />
    </ReviewContainerStyle>
  );
}
