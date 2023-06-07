import { useEffect, useState } from "react";
import { toastAction } from "redux/actions/actions";
import store from "redux/store";
import {
  constants,
  currencySymbols,
  remittanceHandlers,
  remittanceHandlersTransferCriteria,
} from "./constants";
import { settings } from "./settings";
require("dotenv").config();

export const asset = (folder: string, name: string) => {
  if (name === "cameroon-flag.png") {
    return `/assets/${folder}/${name}`;
  } else if (folder === "flags") {
    return `https://flagcdn.com/h240/${name
      ?.toLowerCase()
      ?.replace(/\.([a-z]{3,4})$/, "")}.png`;
  }
  return `/assets/${folder}/${name}`;
};

export const isProductionEnv = () => {
  return process.env.REACT_APP_ENV === "production";
};

export const getQueryParam = (key: string): string => {
  const urlParams = new URLSearchParams(window.location.search);
  const searchParam = urlParams.get(key);
  return searchParam || "";
};

export const parseEndpointParameters = (
  endpoint: string,
  $_1: string = "",
  $_2: string = "",
  $_3: string = "",
  $_4: string = ""
) => {
  return endpoint
    .replace("$_1", $_1)
    .replace("$_2", $_2)
    .replace("$_3", $_3)
    .replace("$_4", $_4);
};

export const formatCurrency = (
  value: string,
  currency: string = ""
): string => {
  value = value || "0";
  value = ((getMoneyValue(value) * 100) / 100).toString();
  value = getMoneyValue(value).toFixed(2);
  return currency + Number(value).toLocaleString();
};

export const formatCurrencyWithoutFloats = (
  value: any,
  currency: string = ""
): string => {
  value = value || "0";
  value = getMoneyValue(value);
  return currency + Number(value).toLocaleString();
};

export const getMoneyValue = (formattedAmount: string): number => {
  formattedAmount = formattedAmount.toString();
  return Number(formattedAmount.replace(/,/g, ""));
};

export const convertDateString = (value: any) => {
  if (!value) return "";
  value = parseInt(value) * 1000;
  const d = new Date(value);
  return d.toDateString();
};

export const getValueFromArray = (
  id: string | number,
  targetId: string | number,
  array: any[],
  keyToReturn?: any
): any => {
  if (!array) return {};

  const value = array.filter((a) => a[targetId] == id)[0];
  return value?.[keyToReturn] ?? value;
};

export const genPaginationHashTable = (array: any[], noPerPage: number) => {
  const hashTable: any = {};
  array.forEach((val: any, i: number) => {
    const temp = Math.floor(i / noPerPage) + 1;
    if (hashTable[temp]) {
      hashTable[temp].push(val);
    } else {
      hashTable[temp] = [val];
    }
  });

  const pages = Object.keys(hashTable);

  return { paginated: hashTable, pages };
};

export const isObjectNotEmpty = (object: any) =>
  Boolean(Object.keys(object || {}).length);

export const replaceUnderscores = (method: string) => {
  return method?.replaceAll("_", " ");
};

export const parseWithUnderscores = (method: string) => {
  return method?.replace(" ", "_")?.toLowerCase();
};

export const compareDatesXLessThanY = (x: string, y: string) => {
  const xDate = new Date(x);
  const yDate = new Date(y);
  return xDate < yDate;
};

export const getInclusiveText = (transferMethod: string) => {
  const texts: any = {
    mobile_money: "(inclusive of cash out fee)",
    bank_transfer: "(inclusive of payout partner fee)",
    cash_pickup: "(inclusive of pick-up partner fee)",
    default: "(operator fee inclusive)",
  };

  return texts[transferMethod || "default"];
};

export const translateTransactionStatus = (status: string) => {
  const verboseStatus: any = {
    pending_payment: "Pending payment",
    expired: "Transfer expired",
    payment_completed: "Funds received by SB",
    complete: "Paid to recipient",
    rejected: "Rejected",
    refunded: "Refunded",
    cancelled: "Transfer cancelled",
    pending_verification: "Pending ID verification",
    pending_documentation: "Pending documentation",
    payment_suspended: "Payment suspended",
  };

  return verboseStatus[status] || status?.replaceAll("_", " ");
};

export const sortObjectByProperties = (object: any) => {
  const values: string[] = Object.values(object);
  const keys: string[] = Object.keys(object);
  values.sort((a: any, b: any) => (a > b ? 1 : -1));
  const reverseObject: any = {};
  keys.forEach((key) => {
    reverseObject[object[key]] = key;
  });

  const sortedObject: any = {};
  values.forEach((value: string) => {
    sortedObject[reverseObject[value]] = value;
  });
  return sortedObject;
};

export const getMax = (
  transferMethod: string,
  destinationCountryCode = "",
  originCountryCode = ""
) => {
  const services = store.getState().appValues.services;
  const service =
    services?.data?.find((service: any) => {
      return (
        service?.name?.toLowerCase() === replaceUnderscores(transferMethod) &&
        (service?.country?.toLowerCase() ===
          destinationCountryCode?.toLowerCase() ||
          service?.country?.toLowerCase() === originCountryCode?.toLowerCase())
      );
    }) ||
    services?.data?.find((service: any) => {
      return (
        service?.name?.toLowerCase() === replaceUnderscores(transferMethod) &&
        !service?.country
      );
    });

  return (
    service?.meta?.transferLimitMax ||
    settings[(transferMethod + "_MAX").toUpperCase()]
  );
};

export const secondsToHms = (value: any) => {
  const sec = parseInt(value, 10);
  let hours: string | number = Math.floor(sec / 3600);
  let minutes: string | number = Math.floor((sec - hours * 3600) / 60);
  let seconds: string | number = sec - hours * 3600 - minutes * 60;
  if (hours < 10) {
    hours = "0" + hours;
  }
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }
  if (hours == 0) {
    return +minutes + ":" + seconds; // Return in MM:SS format
  } else {
    return hours + ":" + minutes + ":" + seconds; // Return in HH:MM:SS format
  }
};

export const convertToJSTimestamp = (timestamp: number = 0) => {
  return timestamp * 1000;
};

export const convertFromJSTimestamp = (timestamp: number = 0) => {
  return Math.floor(timestamp / 1000);
};

export const getDateTimeNowInYYYY_MM_DD__HH_MM_SS = () => {
  const date = new Date();
  const aaaa = date.getUTCFullYear();
  let gg: any = date.getUTCDate();
  let mm: any = date.getUTCMonth() + 1;

  if (gg < 10) gg = "0" + gg;

  if (mm < 10) mm = "0" + mm;

  const cur_day = aaaa + "-" + mm + "-" + gg;

  let hours: any = date.getUTCHours();
  let minutes: any = date.getUTCMinutes();
  let seconds: any = date.getUTCSeconds();

  if (hours < 10) hours = "0" + hours;

  if (minutes < 10) minutes = "0" + minutes;

  if (seconds < 10) seconds = "0" + seconds;

  return cur_day + " " + hours + ":" + minutes + ":" + seconds;
};

export const userIsVerified = (user: any): boolean => {
  return Boolean(user.meta.verified) && user?.meta?.verified !== "retry";
};

export const isUserFirstTransaction = (user: any): boolean => {
  return !Boolean(user.meta.exceededMaxUnverifiedTransactions);
};

export const userHasReachedFinalVerificationStage = (user: any) => {
  return (
    user?.settings?.verificationStage === constants.VERIFICATION_STAGE_FINAL
  );
};

export const isMobileOrTablet = () => {
  let check = false;
  // @ts-ignore
  // eslint-disable-next-line
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || (window as any).opera);
  return check;
};

export const getUserReferralDiscount = (user: any, appValues: any) => {
  const referralSettings = getValueFromArray(
    "settings",
    "name",
    appValues?.values?.data || []
  );
  let discount =
    Number(user?.referral?.useCount || 0) *
    Number(referralSettings?.data?.referrerDiscountValue);

  if (user?.referral?.newUserBonusActive) {
    discount += Number(referralSettings?.data?.referredUserDiscountValue);
  }

  return {
    value: discount,
    type: referralSettings?.data?.referralDiscountType,
  };
};

export const copyToClipBoard = (text: string) => {
  const elem = document.createElement("textarea");
  elem.value = text;
  document.body.appendChild(elem);
  elem.select();
  document.execCommand("copy");
  document.body.removeChild(elem);

  toastAction({
    show: true,
    type: "info",
    timeout: 5000,
    message: "Text copied to clipboard",
  });
};

export const getPercentage = (
  needle: number | string,
  haystack: number | string,
  rounding = 0
) => {
  return (((Number(needle) || 0) / Number(haystack)) * 100).toFixed(rounding);
};

export const useResizeObserver = (initial: any) => {
  const [screenType, setScreenType] = useState(initial);

  useEffect(() => {
    new ResizeObserver((entries: any) => {
      for (const entry of entries) {
        if (entry.contentRect.width < 900) {
          setScreenType(constants.MOBILE);
        } else {
          setScreenType(constants.DESKTOP);
        }
      }
    }).observe(document.querySelector("html") as Element);
  }, []);
  //if ( Number(user?.referral?.newUserBonusActive) ) {
  //    discount += (Number(referralSettings?.data?.referredUserDiscountValue))
  //}

  return [screenType];
};

export const getUserDefaultCurrency = (
  user: any,
  appValues: any,
  getSymbol: boolean = false
) => {
  const userCountry = user?.profile?.location_country;

  const countries = getValueFromArray(
    "Countries List",
    "name",
    appValues?.values?.data || []
  );

  const currencies = getValueFromArray(
    "pay-in-currencies",
    "name",
    appValues?.values?.data || []
  );

  const currency = currencies?.data[countries?.data[userCountry]] ?? "GBP";

  return getSymbol ? currencySymbols[currency] : currency;
};

export const isPhoneNumber = (value: string) => {
  return /^\+?\d{7,}$/.test(value);
};

export const generateRandomString = () => {
  let generatedString = "";
  const characters =
    "abcdefghijklmnopqrstuvwxyz1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*?";

  for (let i = 0; i < 10; i++) {
    generatedString += characters.charAt(
      Math.floor(Math.random() * characters.length)
    );
  }
  return generatedString;
};

export const validatePromo = (promo: any, user: any, transfer: any) => {
  const today = new Date();
  const todayInString =
    today.getMonth() + 1 + "-" + today.getDate() + "-" + today.getFullYear();
  const expired = compareDatesXLessThanY(promo?.endDate, todayInString);
  const notDue = compareDatesXLessThanY(todayInString, promo?.startDate);
  const exceededUsageLimit = !user
    ? false
    : Number(user.promos[promo?.code] || 0) >=
      Number(promo?.settings?.usageLimit);
  const incompatibleCurrency =
    promo?.settings?.currenciesValid !== "ALL" &&
    promo?.settings?.currenciesValid?.indexOf(transfer.toSend.currency) === -1;

  if (!expired && !notDue && !exceededUsageLimit && !incompatibleCurrency) {
    return promo;
  } else {
    return undefined;
  }
};

export const scrollTo = (sectionSelector: string) => {
  const section = document.querySelector(sectionSelector);
  section?.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

const resolveRemittanceCriteriaMatch = (
  handlerCriteria: any,
  prop: any,
  transferProp: any
) => {
  if (handlerCriteria[prop].constructor === Array) {
    return Boolean(
      handlerCriteria[prop]?.find(
        (p: string | number) => p === transferProp[prop]
      )
    );
  } else if (handlerCriteria[prop].constructor === Object) {
    for (const newProp in handlerCriteria[prop]) {
      const matched = resolveRemittanceCriteriaMatch(
        handlerCriteria[prop],
        newProp,
        transferProp[prop]
      );
      if (!matched) {
        return false;
      }
    }
    return true;
  } else if (
    typeof handlerCriteria[prop] === "string" ||
    typeof handlerCriteria[prop] === "number"
  ) {
    return Boolean(handlerCriteria[prop] === transferProp[prop]);
  }
  throw new Error(
    "No check in remittance resolver for provided datatype of property," +
      prop +
      " in handler criteria"
  );
};

export const getRemittanceHandler = (
  transfer: any
): "AZA" | "PIVOT" | "MANUAL" => {
  for (const handlerCriteria of remittanceHandlersTransferCriteria) {
    let handlerMatch = true;
    for (const prop in handlerCriteria) {
      if (prop == "handler") {
        continue;
      }

      const matched = resolveRemittanceCriteriaMatch(
        handlerCriteria,
        prop,
        transfer
      );

      if (!matched) {
        handlerMatch = false;
        break;
      }
    }

    if (handlerMatch) {
      return handlerCriteria["handler"];
    }
  }

  return remittanceHandlers.MANUAL_REMITTANCE_HANDLER;
};

export const isCurrencyPairDowntimeUp = (
  baseCurrency: string,
  targetCurrency: string
) => {
  const spreads = store.getState().exchange.exchangeRateSpreads;

  const spread = spreads.find(
    (spread: any) =>
      spread?.base?.toUpperCase() === baseCurrency?.toUpperCase() &&
      spread?.target?.toUpperCase() === targetCurrency?.toUpperCase()
  );

  return Boolean(Number(spread?.downtimeStatus));
};

export const getCountriesFiltered = (payOutCountries: any) => {
  const countries: any = {};
  const allowed: any = [
    "Cameroon",
    "Kenya",
    "Tanzania",
    "Uganda",
    // "Nigeria",
    // "Nigeria::USD",
    // "Ghana",
    // "South Africa",
    // "Burkina Faso",
    // "Benin",
    // "Ivory Coast",
    // "Guinea-Bissau",
    // "Mali",
    // "Niger",
    // "Senegal",
    // "Togo",
    // "Guinea",
  ];

  Object.keys(payOutCountries).forEach((c: any) => {
    if (allowed.find((a: string) => a.toLowerCase() === c.toLowerCase())) {
      countries[c] = payOutCountries[c];
    }
  });

  return countries;
};
