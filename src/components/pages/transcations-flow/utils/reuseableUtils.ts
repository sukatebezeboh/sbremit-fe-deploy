import { constants } from "util/constants";

export const getFlagURL = (countryCode: string) => {
  const baseURL = "https://flagcdn.com/h240/";
  const countryCodeLowerCase = countryCode?.toLowerCase();
  return `${baseURL}${countryCodeLowerCase}.png`;
};

export const Countries = [
  {
    name: "Belgium",
    countryCode: "BE",
    dialCode: "+32",
  },
  {
    name: "Canada",
    countryCode: "CA",
    dialCode: "+1",
  },
  {
    name: "Denmark",
    countryCode: "DK",
    dialCode: "+45",
  },
  {
    name: "Finland",
    countryCode: "FI",
    dialCode: "+358",
  },
];

interface getCurrentPathNameProps {
  withoutDash: string;
  withDash: string;
}

export function getCurrentPathName(route: string): getCurrentPathNameProps {
  const formatRoute = route.split("/");
  const replaceDash = [formatRoute[1].replace(/-/g, " ")];

  return {
    withoutDash: `${replaceDash}`,
    withDash: `${formatRoute?.[1]}`,
  };
}

export function getFirstLetter(str: string) {
  if (typeof str !== "string" || str?.length === 0) {
    return;
  }
  return str[0].toUpperCase();
}

export const catergoryList: any[] = [
  "General",
  "Charity",
  "Groceries",
  "Savings",
  "Expenses",
  "Shopping",
  "Entertainment",
  "Family",
  "Health",
  "Investment",
  "Food",
  "Education",
  "Gifts",
  "Transport",
  "Bills",
  "Holidays",
  "Income",
  "Selfcare",
];

const ColorList = [
  "#f56a00",
  "#7265e6",
  "#ffbf00",
  "#00a2ae",
  "#333333", // Dark gray
  "#4a90e2", // Bright blue
  "#d9534f", // Dark red
  "#5bc0de", // Light blue
  "#c8e3e8", // Pale blue
  "#ffc107", // Yellow
  "#28a745", // Green
  "#6610f2", // Purple
  "#FB6A83", // Pink
  "#17a2b8", // Turquoise
  "#343a40", // Black
  "#e83e8c", // Magenta
  "#20c997", // Teal
  "#6c757d", // Gray
  "#dc34a1", // Dark red
  "#fd7e14", // Orange
  "#6610f2", // Indigo
  "#a186c3", // Lavender
  "#20c997", // Mint
  "#d6cd60", // Beige
  "#adb5bd", // Gray
  "#85bb65", // Lime green
  "#cf4b9f", // Orchid
];

export const generateAlphabetColor = (alphabet: string): string => {
  const uppercaseAlphabet = alphabet?.toUpperCase();

  const alphabetIndex = uppercaseAlphabet?.charCodeAt(0) - "A".charCodeAt(0);

  if (alphabetIndex >= 0 && alphabetIndex < ColorList.length) {
    return ColorList[alphabetIndex];
  } else {
    return "#343a40";
  }
};

export const possibleIssues = [
  "Card issued country and country of residence mismatch",
  "Name on card does not match",
  "Amount paid different from amount expected",
  "Card currency mismatch",
];

export const formatAmount = (value: string, currency: string = ""): string => {
  value = value || "0";
  const parts = parseFloat(value)?.toFixed(2)?.toString()?.split(".");
  parts[0] = parts[0]?.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const formattedValue = parts[1] === "00" ? parts[0] : parts?.join(".");
  return currency + formattedValue;
};

export const transferMethodsInWords: any = {
  1: "mobile_money",
  2: "bank_transfer",
  3: "cash_pickup",
  mobile_money: "mobile_money",
  bank_transfer: " bank_transfer",
  cash_pickup: "cash_pickup",
  cardless_withdrawal: "ATM withdrawal",
  bills_payment: "Pay Bills",
  mobile_topup: "Mobile Topup",
};
const paymentMethodEstimatedTimeMap: any = {
  mobile_money: "10 minutes",
  cash_pickup: "2 minutes",
  bank_transfer: "2 hours",
  "ATM withdrawal": "2 minutes",
};

export const getPaymentEstimatedTime = (paymentMethod: string) => {
  let method = transferMethodsInWords[paymentMethod];

  return method ? paymentMethodEstimatedTimeMap[method] : "";
};

export const replaceUnderScore = (method: string) => {
  return method?.replaceAll("_", " ");
};

export function categorizeTransactions(transactions: any) {
  let cancelledCount = 0;
  let pendingCount = 0;
  let completedCount = 0;

  // Count the transactions based on their status
  transactions.forEach((transaction: any) => {
    if (transaction.status === constants.TRANSFER_STATUS_CANCELLED) {
      cancelledCount++;
    } else if (transaction.status === constants.TRANSFER_STATUS_PENDING) {
      pendingCount++;
    } else if (transaction.status === constants.TRANSFER_STATUS_COMPLETE) {
      completedCount++;
    }
  });

  const totalCount = transactions.length;
  const cancelledPercentage = Number(
    ((cancelledCount / totalCount) * 100)?.toFixed(0)
  );
  const pendingPercentage = Number(
    ((pendingCount / totalCount) * 100)?.toFixed(0)
  );
  const completedPercentage = Number(
    ((completedCount / totalCount) * 100)?.toFixed(0)
  );

  const result = {
    cancelled: {
      total: cancelledCount,
      percentage: isNaN(cancelledPercentage) ? 0 : cancelledPercentage,
    },
    pending: {
      total: pendingCount,
      percentage: isNaN(pendingPercentage) ? 0 : pendingPercentage,
    },
    completed: {
      total: completedCount,
      percentage: isNaN(completedPercentage) ? 0 : completedPercentage,
    },
  };

  return result;
}

export const userIsVerified = (user: any): boolean => {
  let verificationList = [];

  if (user?.verifications) {
    for (const key in user.verifications) {
      verificationList.push(user.verifications[key]);
    }
  }

  const idVerification = verificationList?.find(
    (method: { type: string }) => method.type === "IDENTITY"
  );

  const docVerification = verificationList?.find(
    (method: { type: string }) => method.type === "DOCUMENT"
  );

  const docAttempted = docVerification && docVerification?.status !== "PENDING";

  const idAttempted = idVerification && idVerification?.status !== "PENDING";

  const docAndIdAtempted = docAttempted && idAttempted;

  // for cases where user has meta.verified == "1".
  if (Boolean(user?.meta?.verified)) {
    return true;
  }
  //else let consider user.verifications
  return docAndIdAtempted ?? false;
};

export const isUserFirstTransaction = (user: any): boolean => {
  return !Boolean(user?.meta?.exceededMaxUnverifiedTransactions);
};

export const userHasReachedFinalVerificationStage = (user: any) => {
  return (
    user?.settings?.verificationStage === constants.VERIFICATION_STAGE_FINAL
  );
};

export function unreadNotificationsCount(notifications: any): number {
  const unreadNotifications = notifications.filter(
    (notification: any) => notification?.status === "UNREAD"
  );
  return unreadNotifications.length;
}

export const DateFormat = "DD-MM-YYYY";

export const mobileMoneyProviderList: any = {
  UG: [
    { label: "Airtel", value: "Airtel" },
    { label: "MTN", value: "MTN" },
  ],
  KE: [
    { label: "Airtel", value: "Airtel" },
    { label: "Equitel", value: "Equitel" },
    { label: "Safaricom", value: "Safaricom" },
  ],
  TZ: [
    { label: "Airtel", value: "Airtel" },
    { label: "Safaricom", value: "Safaricom" },
    { label: "Tigo", value: "Tigo" },
    { label: "Vodafone", value: "Vodafone" },
  ],
};

export function consoleLogOnLocalHost(logData: any) {
  if (window.location.href.includes("localhost")) {
    console.log(logData);
  } else {
    return null;
  }
}

export function convertToDateFormat(date: string): string {
  const parts = date?.split("-");

  if (parts.length === 3) {
    const day = parts[0];
    const month = parts[1];
    let year = parts[2];

    const formattedDay = day.length === 1 ? `0${day}` : day;
    const formattedMonth = month.length === 1 ? `0${month}` : month;

    // Check and format the year
    if (year.length === 2) {
      year = `20${year}`;
    } else if (year.length !== 4) {
      return "Invalid year format";
    }

    return `${formattedDay}-${formattedMonth}-${year}`;
  } else {
    return "Invalid date format";
  }
}
