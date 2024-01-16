import { Card, Statistic, TabsProps, Tabs } from "antd";
import { useState } from "react";
import { getTotalReferredUsersByuseStatus, getTotalUsedVouchers } from "../ReferralsHelper";
import { InsightStyles } from "../ReferralsStyles";
import { UsageAndHistory } from "./UsageAndHistory";

interface InsightsProps {
  accruedBonus: any;
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
  const [activeTab, setActiveTab] = useState<"referral" | "voucher" | any>(
    "referral"
  );
  const voucherPoints = isNaN(Number(user?.meta?.VoucherPoints))
    ? 0
    : Number(user?.meta?.VoucherPoints);

  // If voucherPoints is greater than 500, convert the voucher to 5 base currency; otherwise, no conversion (0 bonus).
  const equivalentVoucherBonus = voucherPoints > 500 ? 5 : 0;

  const refferalInsightArray = [
    {
      title: "Total referee",
      value: count,
      color: "#d0cd23",
    },
    {
      title: "Accrued bonus",
      value: `${accruedBonus} ${defaultCurrency}`,
      color: "#18a65f",
    },
    {
      title: "Bonus used",
      value: getTotalReferredUsersByuseStatus("Used", referredUsers),
      color: "#d0cd23",
    },
  ];

  const loyaltInsightArray = [
    {
      title: "Points tracked",
      value: voucherPoints,
      color: voucherPoints < 500 ? "#d0cd23" : "#18a65f",
    },
    {
      title: "Total earned",
      value: `${equivalentVoucherBonus} ${defaultCurrency}`,
      color: "#18a65f",
    },
    {
      title: "Total used",
      value: getTotalUsedVouchers(user),
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

      <UsageAndHistory
        type={activeTab}
        referralDetails={referralDetails}
        referralSettings={referralSettings}
        authUser={user}
      />
    </>
  );
};
