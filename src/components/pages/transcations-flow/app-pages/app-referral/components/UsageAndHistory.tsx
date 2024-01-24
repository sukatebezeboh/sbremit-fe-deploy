import { ArrowRightOutlined, TagOutlined } from "@ant-design/icons";
import { Card, Empty, Progress, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import {
  generateAlphabetColor,
  getFirstLetter,
} from "components/pages/transcations-flow/utils/reuseableUtils";
import { getPercentage } from "../../../../../../util/util";
import { Title } from "../../app-dashboard/DashboardSyles";
import { convertDateToSeperateWithDash } from "../../app-transactions/TransactionHelper";
import {
  getActiveReferralExpiredData,
  getVoucherStatusColor,
  getVouchers,
} from "../ReferralsHelper";
import {
  PromoUserNameStyles,
  RefferalStatusAndExpiryDateStyles,
  UsageStyles,
} from "../ReferralsStyles";

export const UsageAndHistory = ({
  referralDetails,
  referralSettings,
  type,
  authUser,
}: {
  referralDetails: any;
  referralSettings: any;
  type: "referral" | "voucher";
  authUser: any;
}) => {
  return (
    <UsageStyles>
      <Title>{type === "referral" ? "Usage" : "History"}</Title>
      {type === "referral" && (
        <div className="_uasge">
          {referralDetails?.referredUsers?.length == 0 ? (
            <Empty />
          ) : (
            referralDetails?.referredUsers?.map((user: any, index: number) => {
              const referalCodeStyles = {
                width: "100%",
                height: 80,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "8px 8px 0px 0px",
                //   background: "#0D8D70",
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

              const expiredData = getActiveReferralExpiredData(
                authUser?.referral,
                user.userId
              );

              const getReferralState = () => {
                const isUseStatusUsed = user?.useStatus === "Used";
                if (percentage < 100) {
                  return {
                    title: "Awaiting Activation",
                    color: "#1677FF",
                    status: "awaiting",
                  };
                } else if (percentage >= 100 && isUseStatusUsed) {
                  return {
                    title: "Used",
                    color: "#888888",
                    status: "used",
                  };
                } else {
                  //percentage === 100
                  const isUsedBonusExpired = expiredData.isExpired === true;
                  return {
                    title: isUsedBonusExpired ? "Expired" : "Activated",
                    color: isUsedBonusExpired ? "#CF0921" : "#0D8D70",
                    status: isUsedBonusExpired ? "expired" : "activated",
                  };
                }
              };

              const bonusExpiryDate =
                getReferralState().status == "activated" ||
                getReferralState().status == "used"
                  ? expiredData.expiryDate
                  : "N/A";

              const statusAndExpiryDate = [
                {
                  label: "Status",
                  child: getReferralState().title,
                  color: getReferralState().color,
                },
                {
                  label: "Expiry Date",
                  child: bonusExpiryDate,
                  color: "#888888",
                },
              ];

              return (
                <Card
                  // hoverable
                  className="_card"
                  key={index + user.firstName}
                  cover={
                    <div style={referalCodeStyles}>
                      <PromoUserNameStyles>
                        {user.firstName} {user.lastName}
                      </PromoUserNameStyles>
                    </div>
                  }
                >
                  <Meta
                    description={
                      <RefferalStatusAndExpiryDateStyles>
                        <Progress
                          percent={percentage}
                          size="small"
                          strokeColor={getReferralState().color}
                          status={
                            getReferralState().status == "expired"
                              ? "exception"
                              : "normal"
                          }
                        />

                        {statusAndExpiryDate.map((item, index) => (
                          <>
                            <div className="_content" key={item.label + index}>
                              <span>{item.label}:</span>
                              <span style={{ color: item.color }}>
                                {item.child}
                              </span>
                            </div>
                          </>
                        ))}
                      </RefferalStatusAndExpiryDateStyles>
                    }
                  />
                </Card>
              );
            })
          )}
        </div>
      )}
      {type === "voucher" && (
        <div className="_history">
          {getVouchers(authUser).length == 0 ? (
            <Empty />
          ) : (
            getVouchers(authUser).map((item, index) => (
              <div className="_voucher" key={"voucher_" + index}>
                <div className="_content_label">
                  <div className="_top">
                    <h1>${item.Bonus}</h1>
                    <div className="_date">
                      <div className="_start_date">
                        <span>start date</span>
                        <span>
                          {convertDateToSeperateWithDash(item.Activated)}
                        </span>
                      </div>
                      <ArrowRightOutlined rev={undefined} />
                      <div className="_end_date">
                        <span>end date</span>
                        <span>
                          {convertDateToSeperateWithDash(item.Expires)}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="_pt_status">
                    <div className="_pt">
                      <TagOutlined rev={undefined} />
                      <p>+500pt</p>
                    </div>
                    {/* status */}
                    {/* <p>{item.VoucherBonus}</p> */}
                    <Tag color={getVoucherStatusColor(item.VoucherBonus)}>
                      {item.VoucherBonus}
                    </Tag>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </UsageStyles>
  );
};
