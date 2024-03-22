import { constants } from "util/constants";
import { formatAmount } from "../../utils/reuseableUtils";
import { generateAccountStatementPDF } from "../../utils/generateAccountStatementPdf";

interface TableDataType {
  key: React.Key;
  recipient: string;
  date: string;
  amount_paid: string;
  amount_received: string;
  status: string;
  action: any;
}

export const convertDateAndTimeString = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    //timeZoneName: "short",
  };
  const formattedDateTime = date.toLocaleString(undefined, options);

  return formattedDateTime;
};

export const convertDate = (unixTimestamp: number): string => {
  const date = new Date(unixTimestamp * 1000);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "2-digit",
  };

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return "N/A";
  }

  const formattedDate = date.toLocaleString(undefined, options);
  return formattedDate;
};

export const convertDateToSeperateWithDash = (
  unixTimestamp: number
): string => {
  const date = new Date(unixTimestamp * 1000);

  // Check if date is invalid
  if (isNaN(date.getTime())) {
    return "N/A";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();

  return `${day}-${month}-${year}`;
};

export const formatTransactionsReversed = (
  transactions: any,
  recipients: any,
  page: string
) => {
  const dataSource: TableDataType[] = [];
  const isAccountStatement = page === "account_statement";

  if (transactions !== null && transactions !== undefined) {
    transactions
      .filter((transaction: any) =>
        isAccountStatement
          ? transaction?.status === constants.TRANSFER_STATUS_COMPLETE
          : true
      )
      .slice()
      .reverse()
      .forEach((transaction: any, index: number) => {
        const data = {
          key: index,
          recipient: transaction,
          date: `${convertDateAndTimeString(transaction?.dateCreated)}`,
          amount_paid: `${transaction?.originCurrency || "-"} ${
            formatAmount(transaction?.originAmount) || "-"
          }`,
          amount_received: `${transaction?.destinationCurrency || "-"} ${
            formatAmount(transaction?.destinationAmount) || "-"
          }`,
          status: transaction?.status || "-",
          action: transaction,
        };
        dataSource.push(data);
      });
  }

  return dataSource;
};

export const thisRecipient = (recipients: any, recipientId: string) => {
  return recipients?.find((recipient: any) => recipient.id === recipientId);
};

export const formatTransactionStatus = (transactionStatus: string) => {
  const red = "#E24D58",
    green = "#3E947F",
    yellow = "#faad14",
    blue = "#1677FF",
    gray = "#929292";

  // GREEN ZONE
  if (transactionStatus === constants.TRANSFER_STATUS_COMPLETE) {
    return { text: "Completed", color: green };
  }

  // YELLOW ZONE
  if (transactionStatus === constants.TRANSFER_STATUS_PENDING) {
    return { text: "Pending payment", color: yellow };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PAYMENT_COMPLETED) {
    return { text: "Payment completed", color: yellow };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PAYMENT_SUSPENDED) {
    return { text: "Payment suspended", color: yellow };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PENDING_DOCUMENTATION) {
    return { text: "Pending documentation", color: yellow };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PENDING_VERIFICATION) {
    return { text: "Pending verification", color: yellow };
  }

  // RED ZONE
  if (transactionStatus === constants.TRANSFER_STATUS_CANCELLED) {
    return { text: "Cancelled", color: red };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_REJECTED) {
    return { text: "Rejected", color: red };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_REFUNDED) {
    return { text: "Refunded", color: red };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_WATCHLIST_FAILED) {
    return { text: "Watchlist failed", color: red };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PAYMENT_FRAUD) {
    return { text: "Contact us", color: red };
  }

  // BLUE ZONE
  if (transactionStatus === constants.TRANSFER_STATUS_PAYMENT_DECLINED) {
    return { text: "Payment declined", color: blue };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PAYMENT_PROCESSING) {
    return { text: "Processing", color: blue };
  }

  // GRAY ZONE
  if (transactionStatus === constants.TRANSFER_STATUS_EXPIRED) {
    return { text: "Expired", color: gray };
  }
  if (transactionStatus === constants.TRANSFER_STATUS_PAYMENT_CANCELLED) {
    return { text: "Cancelled", color: gray };
  }

  return { text: "Unknown", color: gray };
};

export const downloadStatementPdf = async (
  user: any,
  selecetdRows: any,
  recipients: any,
  setDownloadState: Function
) => {
  setDownloadState(true);
  const { address1, address2, firstName, lastName } = user.profile;
  const { code } = user.referral;
  const customerName = `${firstName} ${lastName}`;
  const customerAddress = address1;
  const accountNumber = code;

  const startDate = selecetdRows[selecetdRows.length - 1].recipient.dateCreated;
  const endDate = selecetdRows[0].recipient.dateCreated;

  const periodValue = `${convertDateToSeperateWithDash(
    startDate
  )} to ${convertDateToSeperateWithDash(endDate)}`;
  const periodHeaderTitle = `Period: ${convertDate(startDate)} to ${convertDate(
    endDate
  )}`;
  const selectedTransaction: any = [];

  selecetdRows
    .slice()
    .reverse()
    .forEach((selected: any, index: number) => {
      const data = selected.recipient;
      const recipientFirstName = thisRecipient(
        recipients,
        data.recipientId
      )?.firstName;
      const recipientLastName = thisRecipient(
        recipients,
        data.recipientId
      )?.lastName;
      selectedTransaction.push([
        `${convertDateToSeperateWithDash(data.dateCreated)}`,
        `SBR${data.meta.transactionId}`,
        `${data.meta.exchangeRate}`,
        `${data.originCurrency} ${data.originAmount}`,
        `${data.destinationAmount} ${data.destinationCurrency}`,
        `${recipientFirstName} ${recipientLastName}`,
      ]);
      return selectedTransaction;
    });
  try {
    await generateAccountStatementPDF({
      customerName,
      customerAddress,
      accountNumber,
      periodValue,
      periodHeaderTitle,
      selectedTransaction,
    });
    setDownloadState(false);
  } catch (error) {}
};
