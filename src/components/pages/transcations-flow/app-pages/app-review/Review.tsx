import { useHistory, useLocation } from "react-router-dom";
import { paths } from "util/paths";
import { useGetTransfer } from "../../app-layout/appLayoutHelper";
import LargeButton, {
  CustomError,
  CustomLoader,
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
  const location = useLocation();
  const transferId = (location.state as LocationState)?.transferId;
  const history = useHistory();

  const {
    data: trasnferInfo,
    isLoading,
    isError,
    error,
  } = useGetTransfer(transferId);
  const err: any = error;

  const onContinueClicked = () => {
    history.push(paths.PAYMENT_METHOD, {
      transfer: trasnferInfo,
    });
  };

  return (
    <ReviewContainerStyle>
      <TransactionsSteps step="review" />
      <PageTitileAndDescription
        title="Review"
        description="Review the details of your transfer🔍"
      />
      <RecipientAndTranferContainer>
        <div className="content">
          <RecipientContent
            isLoading={isLoading}
            isError={isError}
            trasnferInfo={trasnferInfo}
            error={err}
          />
        </div>
      </RecipientAndTranferContainer>
      <LargeButton
        text="Continue"
        disabled={false}
        onClick={onContinueClicked}
      />
    </ReviewContainerStyle>
  );
}

const RecipientContent = ({
  isLoading,
  isError,
  trasnferInfo,
  error,
}: {
  isLoading: boolean;
  isError: boolean;
  trasnferInfo: any;
  error: any;
}) => {
  if (isLoading) {
    return <CustomLoader prompt="Fetching transaction details..." />;
  }
  if (isError) {
    const errMessage = error?.message;
    return <CustomError message={errMessage} />;
  }
  return <TransactionsInfomations transaction={trasnferInfo} />;
};
