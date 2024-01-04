import { TwitterOutlined, WhatsAppOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Empty,
  Progress,
  Space,
  Statistic,
  Tabs,
  TabsProps,
} from "antd";
import _env from "env";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserReferrals } from "redux/actions/actions";
import { paths } from "util/paths";
import {
  copyToClipBoard,
  getPercentage,
  //getUserDefaultCurrency,
  getValueFromArray,
} from "../../../../../util/util"; //"util/util";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import {
  generateAlphabetColor,
  getFirstLetter,
} from "../../utils/reuseableUtils";
import { Title } from "../app-dashboard/DashboardSyles";
import {
  HeaderStyles,
  InsightStyles,
  LinkContainerStyles,
  LinkStyles,
  ReferralContainerStyles,
  ReferralContentStyles,
  UsageStyles,
  PromoUserNameStyles,
  VoucherExpiryDateStyles,
} from "./ReferralsStyles";
import { userAppValues } from "../../utils/useAppValues";
import { convertDate } from "../app-transactions/TransactionHelper";
const { Meta } = Card;

function isNotAwaiting(user: any, referralSettings: any) {
  return (
    Number(
      getPercentage(
        user?.[`cummulativeTransfer`],
        referralSettings?.data?.referralActivationAmount
      )
    ) >= 100
  );
}

export default function Referrals() {
  const user = useSelector((state: any) => state.auth.user);
  const appValues = useSelector((state: any) => state.appValues);
  const { PayinCountries } = userAppValues();
  const userCountryInfo = PayinCountries.find(
    (country) => country.countryCode === user?.profile?.location_country
  );

  const getUserDefaultCurrency = () => userCountryInfo?.currency;

  const referralSettings = getValueFromArray(
    "settings",
    "name",
    appValues?.values?.data || []
  );

  const [referralDetails, setReferralDetails] = useState({
    count: 0,
    referredUsers: [],
  });

  useEffect(() => {
    getUserReferrals(setReferralDetails);
  }, []);

  const getShareReferralText = (extraText = "") => {
    return encodeURIComponent(
      `SB REMIT is a cheap, fast and secure way of sending money to Africa. 
		It even gets better - you can earn ${getUserDefaultCurrency()}${
        referralSettings?.data?.referredUserDiscountValue
      } when you sign-up with my referral link and make a successful transfer.

		${extraText}
		`
    );
  };

  const defaultCurrency = getUserDefaultCurrency() ?? "";

  const getAccruedBonus = (users: any) => {
    const filteredUsers = users?.filter(
      (user: any) =>
        user.useStatus === "Active" && isNotAwaiting(user, referralSettings)
    );

    return (
      filteredUsers?.length * referralSettings?.data?.referrerDiscountValue
    );
  };

  return (
    <ReferralContainerStyles>
      <PageTitileAndDescription
        title="My Rewards Page"
        description="Invite a friend and earn £10 in credit!😛"
      />
      <ReferralContentStyles>
        <HeaderStyles>
          <div className="section_1">
            <span>Referral code</span>
            <p>{user?.referral?.code}</p>
            <p>Share this on:</p>
          </div>
          <Space>
            <a
              rel="noreferrer"
              href={`https://api.whatsapp.com/send?text=${getShareReferralText(
                _env.APP_HOST +
                  paths.SIGN_UP +
                  "?referral=" +
                  user?.referral?.code
              )}`}
              target="_blank"
            >
              <Avatar
                icon={<WhatsAppOutlined rev={undefined} />}
                style={{ background: "#25D366" }}
              />
            </a>
            <a
              rel="noreferrer"
              href={`https://twitter.com/intent/tweet?url=${_env.APP_HOST}${
                paths.SIGN_UP
              }?referral=${
                user?.referral?.code
              }&text=${getShareReferralText()}&via=sbremit&hashtags=SBRemit`}
              target="_blank"
            >
              <Avatar
                icon={<TwitterOutlined rev={undefined} />}
                style={{ background: "#1DA1F2" }}
              />
            </a>
          </Space>
        </HeaderStyles>
        <Divider style={{ margin: 0 }}>or</Divider>
        <LinkContainerStyles>
          <LinkStyles
            href={`${_env.APP_HOST}${paths.SIGN_UP}?referral=${user?.referral?.code}`}
            target="_blank"
            rel="noreferrer"
          >
            {_env.APP_HOST}
            {paths.SIGN_UP}?referral={user?.referral?.code}
          </LinkStyles>
          <Button
            onClick={() =>
              copyToClipBoard(
                `${_env.APP_HOST}${paths.SIGN_UP}?referral=${user?.referral?.code}`
              )
            }
          >
            Copy link
          </Button>
        </LinkContainerStyles>
      </ReferralContentStyles>

      <Insights
        count={referralDetails?.count}
        accruedBonus={getAccruedBonus(referralDetails?.referredUsers)}
        defaultCurrency={defaultCurrency}
        user={user}
        referredUsers={referralDetails?.referredUsers}
      />

      <Usage
        referralDetails={referralDetails}
        referralSettings={referralSettings}
      />
    </ReferralContainerStyles>
  );
}

const Insights = ({
  accruedBonus,
  defaultCurrency,
  count,
  user,
  referredUsers,
}: {
  accruedBonus: any;
  defaultCurrency: string;
  count: number;
  user: any;
  referredUsers: any;
}) => {
  const voucherPoints = isNaN(Number(user?.meta?.VoucherPoints))
    ? 0
    : Number(user?.meta?.VoucherPoints);
  const equivalentVoucherBonus = voucherPoints > 500 ? 5 : 0;
  const voucherExpiryDate = convertDate(user?.meta?.VoucherExpire);

  const getTotalReferredUsersByuseStatus = (
    status: "Active" | "Used"
  ): number => {
    const matchedUsers: any[] = [];

    referredUsers.forEach((user: any) => {
      if (user.useStatus === status) {
        matchedUsers.push(user);
      }
    });

    return matchedUsers.length ?? 0;
  };

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
      value: getTotalReferredUsersByuseStatus("Used"),
      color: "#d0cd23",
    },
  ];

  const loyaltInsightArray = [
    {
      title: "Total points",
      value: voucherPoints,
      color: voucherPoints < 500 ? "#d0cd23" : "#18a65f",
    },
    {
      title: "Available balance",
      value: `${equivalentVoucherBonus} ${defaultCurrency}`,
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
                suffix={
                  item.title === "Available balance" && (
                    <VoucherExpiryDateStyles>
                      expires on ({voucherExpiryDate})
                    </VoucherExpiryDateStyles>
                  )
                }
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
      key: "1",
      label: "Referral Insights",
      children: <Insight type="referral" />,
    },
    // {
    //   key: "2",
    //   label: "Loyalty Insights",
    //   children: <Insight type="voucher" />,
    // },
  ];

  return (
    <InsightStyles>
      <Tabs
        className="_tab"
        defaultActiveKey="1"
        items={items}
        // onChange={onChange}
      />
    </InsightStyles>
  );
};

const Usage = ({
  referralDetails,
  referralSettings,
}: {
  referralDetails: any;
  referralSettings: any;
}) => {
  return (
    <UsageStyles>
      <Title>Usage</Title>
      <div className="_uasge">
        {referralDetails?.referredUsers?.length == 0 && <Empty />}
        {referralDetails?.referredUsers?.map((user: any, index: number) => {
          const referalCodeSTyles = {
            width: "100%",
            height: 80,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "8px 8px 0px 0px",
            background: generateAlphabetColor(
              getFirstLetter(user?.firstName) || ""
            ),
          };
          let percentage = Math.min(
            Number(
              getPercentage(
                user?.cummulativeTransfer,
                referralSettings?.data?.referralActivationAmount
              )
            ),
            100
          );

          const getTitle = () => {
            const isUseStatusUsed = user.useStatus === "Used";
            if (percentage === 0) {
              return "Awaiting Activation";
            } else if (percentage !== 0 && isUseStatusUsed) {
              return "Referral Bonus Used";
            } else {
              return "Activation Completed";
            }
          };

          return (
            <Card
              //hoverable
              key={index + user.firstName}
              cover={
                <div style={referalCodeSTyles}>
                  <PromoUserNameStyles>
                    {user.firstName} {user.lastName}
                  </PromoUserNameStyles>
                </div>
              }
            >
              <Meta
                title={getTitle()}
                description={
                  getTitle() === "Referral Bonus Used" ? (
                    <Progress percent={percentage} size="small" />
                  ) : (
                    <Progress
                      percent={percentage}
                      size="small"
                      status="active"
                    />
                  )
                }
              />
            </Card>
          );
        })}
      </div>
    </UsageStyles>
  );
};
