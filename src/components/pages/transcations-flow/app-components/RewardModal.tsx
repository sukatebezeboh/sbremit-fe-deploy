import { CloseCircleFilled } from "@ant-design/icons";
import { Button, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { AUTH } from "redux/actionTypes";
import styled from "styled-components";
import { paths } from "util/paths";
import { convertDate } from "../app-pages/app-transactions/TransactionHelper";
import { getAppValueDataByName } from "../utils/reuseableUtils";
import { Breakpoint, Colors } from "../utils/stylesVariables";
import { userAppValues } from "../utils/useAppValues";

const PotOfGold = "/assets/images/pot_of_gold-amico.png";
const ReferralMedal = "/assets/images/refferal_medal.png";

interface RewradsProps {
  state: boolean;
  type: "referral" | "voucher";
  subtitle: string;
  message: string;
  date: string;
}

export const checkUserReward = (
  user: any,
  referralConstants: any
): RewradsProps => {
  const { Referral, Referrals } = user.referral || {};
  const { Voucher, Vouchers } = user.meta || {};

  const { PayinCountries } = userAppValues();
  const userCountryInfo = PayinCountries.find(
    (country) => country.countryCode === user?.profile?.location_country
  );

  const defaultCurrency = userCountryInfo?.currency;

  const isVoucherActive = user && Voucher === "ACTIVE";
  const isNewBonusStateActive = user && Referral === "ACTIVE";

  const referralsArray = Referrals && JSON.parse(Referrals);
  const vouchersArray = Vouchers && JSON.parse(Vouchers);

  // the lastActiveReferralExpiryDate simulate the FIFO method on the backend
  const lastActiveReferralExpiryDate = convertDate(referralsArray?.[0].Expires);

  const lastActiveVoucherExpiryDate = convertDate(vouchersArray?.[0].Expires);

  const rawUplineReferralBonus = referralConstants?.referredUserDiscountValue;
  const rawDownlineReferralBonus = referralConstants?.referrerDiscountValue;

  const uplineReferralBonus = isNaN(rawUplineReferralBonus)
    ? 0
    : Number(rawUplineReferralBonus);
  const downlineReferralBonus = isNaN(rawDownlineReferralBonus)
    ? 0
    : Number(rawDownlineReferralBonus);

  const isReferralHasUplineBonusAndIsActive = referralsArray?.some(
    (referral: any) =>
      referral.Bonus === uplineReferralBonus &&
      referral.ReferralBonus === "ACTIVE"
  );

  const referralBonus = isReferralHasUplineBonusAndIsActive
    ? uplineReferralBonus
    : downlineReferralBonus;

  if (isNewBonusStateActive) {
    return {
      state: true,
      type: "referral",
      subtitle: `${referralBonus} ${defaultCurrency} referral bonus is ready to use`,
      message: "This will be added to your next transfer.",
      date: `Valid until ${lastActiveReferralExpiryDate}`,
    };
  } else if (isVoucherActive) {
    return {
      state: true,
      type: "voucher",
      subtitle: `You have earned 5 ${defaultCurrency}.`,
      message: "Your loyalty reward will be added to your next transfer.",
      date: `Valid until ${lastActiveVoucherExpiryDate}`,
    };
  } else {
    return {
      state: false,
      message: "",
      type: "referral",
      subtitle: "",
      date: "",
    };
  }
};

export default function RewardModal() {
  const auth = useSelector((state: any) => state.auth);
  const { values } = useSelector((state: any) => state.appValues);
  const dispatch = useDispatch();
  const { isRewardModalChecked, user } = auth || {};

  const referralConstants = getAppValueDataByName(values.data, "settings");

  const reward = checkUserReward(user, referralConstants);
  const location = useLocation();
  const history = useHistory();

  const isDashboardOrRewardPage =
    location.pathname === paths.DASHBOARD ||
    location.pathname === paths.REWARDS;

  const isVisible =
    reward.state && !isRewardModalChecked && isDashboardOrRewardPage; //display the reward modal only on the dashboard or reward page

  const handleCloseModal = (isContinue: boolean) => {
    if (isContinue) {
      history.push(paths.TRANSFER_METHOD);
    }

    return dispatch({
      type: AUTH,
      payload: { ...auth, isRewardModalChecked: true },
    });
  };

  return (
    <RewardModalStyles $customStyle={reward.type === "referral"}>
      <Modal
        className="custom-modal"
        open={isVisible}
        onCancel={() => handleCloseModal(false)}
        width={410}
        footer={null}
        closeIcon={<CloseCircleFilled rev={undefined} />}
        getContainer={false}
      >
        {reward?.type === "voucher" && (
          <VoucherRewardContent reward={reward} onContinue={handleCloseModal} />
        )}
        {reward?.type === "referral" && (
          <ReferralRewardContent
            reward={reward}
            onContinue={handleCloseModal}
          />
        )}
      </Modal>
    </RewardModalStyles>
  );
}

interface RewardProps {
  reward: RewradsProps;
  onContinue: Function;
}

const ReferralRewardContent = ({ reward, onContinue }: RewardProps) => {
  return (
    <ReferralRewardContentStyles>
      <img src={ReferralMedal} alt="Medal" />
      <h1>Congratulations!</h1>
      <h4>{reward.subtitle}</h4>
      <p>{reward.message}</p>
      <Button size="large" type="primary" onClick={() => onContinue(true)}>
        Use voucher
      </Button>
      <span className="_date">{reward.date}</span>
      <a href={paths.TERMS} target="_blank">
        Subject to Ts & Cs
      </a>
    </ReferralRewardContentStyles>
  );
};

const VoucherRewardContent = ({ reward, onContinue }: RewardProps) => {
  return (
    <VoucherRewardContentStyles>
      <h1>Congratulations!</h1>
      <h3>{reward.subtitle}</h3>
      <p>{reward.message}</p>
      <img src={PotOfGold} alt="Pot of gold" />
      <Button size="large" type="primary" onClick={() => onContinue(true)}>
        Use voucher
      </Button>
      <span className="_date">{reward.date}</span>
      <a href={paths.TERMS} target="_blank">
        Subject to Ts & Cs
      </a>
    </VoucherRewardContentStyles>
  );
};

const RewardModalStyles = styled.div<{ $customStyle: boolean }>`
  ${(props) =>
    props.$customStyle &&
    `.custom-modal > .ant-modal-content {
    border: #e5e5e5 !important;
    background: rgba(254, 246, 207, 1) !important;
  }
  `}
`;

const ReferralRewardContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  justify-content: center;

  margin-top: 72px;
  margin-bottom: 40px;
  width: 100%;

  img {
    @media (max-width: ${Breakpoint.sm}) {
      /* width: 80%;
      height: 80%; */
    }
  }

  h1 {
    // width: 230px;
    margin: 0;
    color: #1e1e1e;
    text-align: center;
    font-size: 32px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -1.4px;
    @media (max-width: ${Breakpoint.sm}) {
      font-size: 30px;
      letter-spacing: -1.2px;
    }
  }
  h4 {
    margin: 0;
    color: #1e1e1e;
    text-align: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 150%;
    letter-spacing: -0.8px;
  }
  p {
    margin: 0;
    text-align: center;
    color: #1e1e1e;
    text-align: center;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.5px;
    max-width: 300px;
  }
  Button {
    margin-top: 12px;
    width: 248px;
    height: 48px !important;
  }
  ._date {
    color: #1e1e1e;
    text-align: center;
    font-size: 16px;
    line-height: 20px; /* 125% */
    letter-spacing: -0.8px;
  }
  a {
    margin-top: 24px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    color: ${Colors.sbGreen};

    &:hover,
    &:active {
      text-decoration: underline;
      color: ${Colors.sbGreen};
    }
  }
`;

const VoucherRewardContentStyles = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
  align-items: center;
  justify-content: center;

  margin-top: 32px;
  margin-bottom: 36px;
  @media (max-width: ${Breakpoint.sm}) {
    gap: 10px;
  }
  h1 {
    text-align: center;
    font-size: 36px;
    font-weight: 700;
    line-height: 150%;
    /* color: ${Colors.sbGreen}; */
    color: #0d8d70;
    margin: 0;
    letter-spacing: -1.8px;
    @media (max-width: ${Breakpoint.sm}) {
      font-size: 32px;
      letter-spacing: -1.2px;
    }
  }

  h3 {
    margin: 0;
    color: #0d8d70;
    text-align: center;
    font-size: 20px;
    font-weight: 700;
    line-height: 20px; /* 100% */
    letter-spacing: -1px;
  }
  p {
    margin: 0;
    text-align: center;
    color: #1e1e1e;
    text-align: center;
    font-size: 16px;
    line-height: 150%;
    letter-spacing: -0.5px;
    max-width: 248px;
  }
  img {
  }
  Button {
    margin-top: 12px;
    width: 248px;
    height: 48px !important;
  }
  ._date {
    color: #1e1e1e;
    text-align: center;
    font-size: 16px;
    line-height: 20px; /* 125% */
    letter-spacing: -0.8px;
  }
  a {
    margin-top: 24px;
    font-size: 14px;
    cursor: pointer;
    text-decoration: underline;
    color: ${Colors.sbGreen};

    &:hover,
    &:active {
      text-decoration: underline;
      color: ${Colors.sbGreen};
    }
  }
`;
