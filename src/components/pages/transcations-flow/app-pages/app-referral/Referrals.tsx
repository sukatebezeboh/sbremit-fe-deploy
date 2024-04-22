import { TwitterOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Divider, Space } from "antd";
import _env from "env";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUserReferrals } from "redux/actions/actions";
import { paths } from "util/paths";
import {
  copyToClipBoard,
  getPercentage,
  getValueFromArray,
} from "../../../../../util/util"; //"util/util";
import { PageTitileAndDescription } from "../../utils/ReusablePageContent";
import { userAppValues } from "../../utils/useAppValues";
import { useRefferalsData } from "./ReferralsHelper";
import {
  HeaderStyles,
  LinkContainerStyles,
  LinkStyles,
  ReferralContainerStyles,
  ReferralContentStyles,
} from "./ReferralsStyles";
import { Insights } from "./components/Insights";
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

  const { data: referralDetails } = useRefferalsData();

  const getUserDefaultCurrency = () => userCountryInfo?.currency;

  const referralSettings = getValueFromArray(
    "settings",
    "name",
    appValues?.values?.data || []
  );

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

  const getAccruedBonus = (users: any): number => {
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
          <div className="_referral_code">
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
        referralDetails={referralDetails}
        referralSettings={referralSettings}
      />
    </ReferralContainerStyles>
  );
}
