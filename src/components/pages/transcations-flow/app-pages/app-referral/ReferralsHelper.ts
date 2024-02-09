import { convertDate } from "../app-transactions/TransactionHelper";

interface ReferralProps {
  ReferralBonus: "USED" | "ACTIVE" | "EXPIRED";
  Expires: number;
  Bonus: number;
  ReferrerID: number;
  RefereeID: number;
}

interface VoucherProps {
  VoucherBonus: "USED" | "ACTIVE" | "EXPIRED";
  Activated: number;
  Expires: number;
  Bonus: number;
  UserID: number;
  MailSent: number;
  VoucherDiscount: number;
  Used: number;
}

export const getActiveReferralExpiredData = (
  userMetaReferrals: any,
  referrerID: number
) => {
  const referralsArray: ReferralProps[] = userMetaReferrals?.Referrals
    ? (JSON.parse(userMetaReferrals?.Referrals) as ReferralProps[])
    : [];

  const user = referralsArray.find((user) => user.ReferrerID === referrerID);
  const expiryDate = user && convertDate(user?.Expires);
  const isExpired = user && user.ReferralBonus === "EXPIRED" ? true : false;

  return {
    expiryDate: expiryDate ?? "Pending",
    isExpired,
  };
};

export const getTotalReferredUsersByuseStatus = (
  status: "Active" | "Used",
  referredUsers: any
): number => {
  const matchedUsers: any[] = [];

  referredUsers.forEach((user: any) => {
    if (user.useStatus === status) {
      matchedUsers.push(user);
    }
  });

  return matchedUsers.length ?? 0;
};

export const getVouchers = (user: any): VoucherProps[] => {
  const { Vouchers } = user.meta || {};
  const vouchersArrays = Vouchers && JSON.parse(Vouchers);

  return vouchersArrays ?? [];
};

export const getTotalUsedVouchers = (user: any): number => {
  const status = "USED";
  const matchedVoucher: any[] = [];
  const { Vouchers } = user.meta || {};
  const vouchersArrays = Vouchers && JSON.parse(Vouchers);

  vouchersArrays?.forEach((voucher: any) => {
    if (voucher.VoucherBonus === status) {
      matchedVoucher.push(voucher);
    }
  });

  return matchedVoucher.length ?? 0;
};

export const getVoucherStatusColor = (voucherBonus: string) => {
  if (voucherBonus === "USED") {
    return "#888888";
  } else if (voucherBonus === "ACTIVE") {
    return "#0D8D70";
  }
  //"EXPIRED";
  else {
    return "#CF0921";
  }
};

export const getAccruedAndUsedBonus = (
  accruedBonus: number,
  referredUsers: any,
  user: any
) => {
  const { Referrals } = user?.referral || {};
  const ReferralsArray = Referrals && JSON.parse(Referrals);
  const uplineBonus = 3; // This value is confirmed and agreed from the backend

  const getTotalReferralsBonusUsed = getTotalReferredUsersByuseStatus(
    "Used",
    referredUsers
  );

  const isUserHasUplineBonusAndIsActive = ReferralsArray?.some(
    (referral: any) =>
      referral.Bonus === uplineBonus && referral.ReferralBonus === "ACTIVE"
  );

  const isUserHasUplineBonusAndIsUsed = ReferralsArray?.some(
    (referral: any) =>
      referral.Bonus === uplineBonus && referral.ReferralBonus === "USED"
  );

  const accruedBonusResult = isUserHasUplineBonusAndIsActive
    ? accruedBonus + uplineBonus
    : accruedBonus;

  const totalReferralBonusUsedResult = isUserHasUplineBonusAndIsUsed
    ? getTotalReferralsBonusUsed + uplineBonus
    : getTotalReferralsBonusUsed;

  return {
    accruedBonus: accruedBonusResult ?? 0,
    totalReferralBonusUsed: totalReferralBonusUsedResult ?? 0,
  };
};

// export const getAllUserReferrals = (user: any, referrals: any) => {
//   const { Referrals } = user.referral || {};
//   const uplineBonus = 3;

//   const referralsArray = Referrals && JSON.parse(Referrals);

//   const isUserHasUplineBonus = referralsArray?.find(
//     (referral: any) => referral.Bonus === uplineBonus
//   );

//   console.log(referrals, isUserHasUplineBonus);
// };