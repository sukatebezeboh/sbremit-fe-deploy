import { Card, Statistic, Tabs, TabsProps } from "antd";
import { getAppValueDataByName } from "components/pages/transcations-flow/utils/reuseableUtils";
import { useState } from "react";
import { useSelector } from "react-redux";
import {
  getAccruedAndUsedBonus,
  getTotalActiveAndUsedVouchers,
} from "../ReferralsHelper";
import { InsightStyles } from "../ReferralsStyles";
import { UsageAndHistory } from "./UsageAndHistory";
import HowItWorks from "./HowItWorks";

interface InsightsProps {
  accruedBonus: number;
  defaultCurrency: string;
  count: number;
  user: any;
  referredUsers: any;
  referralDetails: any;
  referralSettings: any;
}

export const Insights = ({
  accruedBonus,
  defaultCurrency,
  count,
  user,
  referredUsers,
  referralDetails,
  referralSettings,
}: InsightsProps) => {
  const { values } = useSelector((state: any) => state.appValues);
  const [activeTab, setActiveTab] = useState<"referral" | "voucher" | any>(
    "referral"
  );
  const voucherPoints = isNaN(Number(user?.meta?.VoucherPoints))
    ? 0
    : Number(user?.meta?.VoucherPoints);

  const loyaltyConstants = getAppValueDataByName(values.data, "loyaltyscheme");
  const referralConstants = getAppValueDataByName(values.data, "settings");

  const rawVoucherActivationvalue = loyaltyConstants?.minVoucherAmount;
  const voucherActivationvalue = isNaN(rawVoucherActivationvalue)
    ? 0
    : Number(rawVoucherActivationvalue);

  const rawVoucherBonus = loyaltyConstants?.voucherBonus;
  const voucherBonus = isNaN(rawVoucherBonus) ? 0 : Number(rawVoucherBonus);

  const rawUplineBonus = referralConstants?.referredUserDiscountValue;
  const uplineBonus = isNaN(rawUplineBonus) ? 0 : Number(rawUplineBonus);

  // If voucherPoints is greater than 500, convert the voucher to 5 base currency; otherwise, no conversion (0 bonus).
  const equivalentVoucherBonus =
    voucherPoints > voucherActivationvalue ? voucherBonus : 0;

  const bonuses = getAccruedAndUsedBonus(
    accruedBonus,
    referredUsers,
    user,
    uplineBonus
  );

  const refferalInsightArray = [
    {
      title: "Total Referred",
      value: count,
      color: "#d0cd23",
    },
    {
      title: "Redeemable Bonus",
      value: `${bonuses?.accruedBonus} ${defaultCurrency}`,
      color: "#18a65f",
    },
    {
      title: "Total Redeemable",
      value: bonuses?.totalReferralBonusUsed,
      color: "#d0cd23",
    },
  ];

  const loyaltInsightArray = [
    {
      title: "Total Points Earned",
      value: voucherPoints,
      color: voucherPoints < voucherActivationvalue ? "#d0cd23" : "#18a65f",
    },
    {
      title: "Redeemable Bonus",
      value: `${
        getTotalActiveAndUsedVouchers(user).totalActiveVouchers
      } ${defaultCurrency}`,
      color: "#18a65f",
    },
    {
      title: "Total Redeemable",
      value: getTotalActiveAndUsedVouchers(user).totalUsedVouchers,
      color: "#18a65f",
    },
  ];

  const Insight = ({ type }: { type: "voucher" | "referral" }) => {
    if (type === "referral") {
      return (
        <div className="_insights">
          {refferalInsightArray.map((item, index) => (
            <Card className="child" key={item.title + index}>
              <Statistic
                title={item.title}
                value={item.value}
                precision={0}
                valueStyle={{ color: item.color }}
              />
            </Card>
          ))}
        </div>
      );
    } else if (type === "voucher") {
      return (
        <div className="_insights">
          {loyaltInsightArray.map((item, index) => (
            <Card className="child" key={item.title + index}>
              <Statistic
                title={item.title}
                value={item.value}
                precision={0}
                valueStyle={{ color: item.color }}
              />
            </Card>
          ))}
        </div>
      );
    }
    return null;
  };

  const items: TabsProps["items"] = [
    {
      key: "referral",
      label: "Referral Insights",
      children: <Insight type="referral" />,
    },
    {
      key: "voucher",
      label: "Loyalty Insights",
      children: <Insight type="voucher" />,
    },
  ];

  const onTabChange = (key: string) => {
    setActiveTab(key);
  };

  return (
    <>
      <InsightStyles>
        <Tabs
          className="_tab"
          defaultActiveKey="1"
          items={items}
          onChange={onTabChange}
        />
      </InsightStyles>

      <HowItWorks type={activeTab} />

      <UsageAndHistory
        type={activeTab}
        referralDetails={referralDetails}
        referralSettings={referralSettings}
        authUser={user}
        voucherActivationvalue={voucherActivationvalue}
      />
    </>
  );
};
