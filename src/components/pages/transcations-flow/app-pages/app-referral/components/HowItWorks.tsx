import { CheckCircleFilled } from "@ant-design/icons";
import { Space } from "antd";
import {
  Paragraph,
  SpanText,
} from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import { getAppValueDataByName } from "components/pages/transcations-flow/utils/reuseableUtils";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import { useSelector } from "react-redux";
import styled from "styled-components";
import { ReferralContentStyles } from "../ReferralsStyles";
import { paths } from "util/paths";

const HowItWorks = ({ type }: { type: "referral" | "voucher" }) => {
  return type === "referral" ? <Referral /> : <Loyalty />;
};

export default HowItWorks;

const referralGuides = [
  "You recieve £10 when they send over £200",
  "They also get a £3 reward for using your referral code",
  "Terms and Conditions apply.",
];

const Referral = () => {
  return (
    <ReferralContentStyles $noBgColor>
      <Wrapper size={12} direction="vertical">
        <Header>How it works</Header>

        <Space size={12} direction="vertical">
          <SpanText $small>Refer a friend and earn £10</SpanText>
          {referralGuides.map((guide, index) => (
            <Space key={guide + index} className="_guide">
              <CheckCircleFilled rev={undefined} className="_icon" />
              <SpanText $small>{guide}</SpanText>
            </Space>
          ))}
        </Space>
      </Wrapper>
    </ReferralContentStyles>
  );
};

const Loyalty = () => {
  const user = useSelector((state: any) => state.auth.user);
  const { values } = useSelector((state: any) => state.appValues);
  const { PayinCountries } = userAppValues();
  const userCountryCode = user?.profile.location_country;

  const userCurrency = PayinCountries.find(
    (country) =>
      country.countryCode?.toLowerCase() === userCountryCode?.toLowerCase()
  )?.currency;

  const voucherRange = getAppValueDataByName(
    values.data,
    "loyaltyscheme"
  )?.voucherRange;

  const loyaltyConstants = getAppValueDataByName(values.data, "loyaltyscheme");

  const voucherRangeArray = voucherRange && JSON.parse(voucherRange);
  const rawVoucherActivationvalue = loyaltyConstants?.minVoucherAmount;

  const rawVoucherBonus = loyaltyConstants?.voucherBonus;
  const voucherBonus = isNaN(rawVoucherBonus) ? 0 : Number(rawVoucherBonus);

  const voucherActivationvalue = isNaN(rawVoucherActivationvalue)
    ? 0
    : Number(rawVoucherActivationvalue);

  function generatePointsObject(): { [key: string]: string } | undefined {
    const rates = voucherRangeArray[userCurrency || "GBP"];
    if (!rates) return undefined;

    const pointsObject: { [key: string]: string } = {};

    let previousSpend = 0;
    for (const spend in rates) {
      const totalSpend = parseInt(spend);
      const points = rates[totalSpend];

      const formattedTotalSpend =
        totalSpend > voucherActivationvalue
          ? `${voucherActivationvalue}+`
          : previousSpend === 0
          ? `< ${totalSpend}`
          : `${previousSpend} -< ${totalSpend}`;

      pointsObject[`${formattedTotalSpend}`] = `${points} points`;
      previousSpend = totalSpend;
    }

    return pointsObject;
  }

  const pointsObject = generatePointsObject();

  return (
    <LoyaltyTableWrapper size={12} direction="vertical">
      <Header>How it works</Header>

      {pointsObject && (
        <table>
          <thead>
            <tr>
              <th>
                <SpanText $small>Total Spend ({userCurrency})</SpanText>{" "}
              </th>
              <th>
                <SpanText $small>Points</SpanText>
              </th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(pointsObject).map(
              ([spendRange, points]: [string, string]) => (
                <tr key={spendRange}>
                  <td>
                    <SpanText $small>{spendRange}</SpanText>
                  </td>
                  <td>
                    <SpanText $small>{points}</SpanText>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      )}

      <Space direction="vertical">
        <SpanText $small className="_rate">
          {voucherActivationvalue}pts = {userCurrency} {voucherBonus}
        </SpanText>
        <a href={paths.TERMS} target="_blank">
          <SpanText $small>T & C’S APPLY</SpanText>
        </a>
      </Space>
    </LoyaltyTableWrapper>
  );
};

const LoyaltyTableWrapper = styled(Space)`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  

  table {
    background: ${Colors.bgwhite};
    width: 100%;
    border-collapse: collapse;
    border-radius: 14px;
    box-shadow: inset 0 0 0 1px ${Colors.borderColor};
    overflow: hidden;

    width: 800px;
    tr {
      th,
      td {
        color: rgba(106, 106, 106, 1);
        border: 1px solid ${Colors.borderColor};
        text-align: center;
        padding: 12px 0px;
        width: 50%;

        @media (max-width: ${Breakpoint.md}) {
          padding: 8px 0px;
        }
      }

      th {
        span {
          font-weight: 600;
          color: rgba(30, 30, 30, 1);
        }
      }
    }

    @media (max-width: ${Breakpoint.xl}) {
      width: 64vw;
    }

    @media (max-width: ${Breakpoint.md}) {
      width: 85vw;
    }
  }

  ._rate {
    color: rgba(106, 106, 106, 1);
  }

  a {
    color: rgba(106, 106, 106, 1);
    cursor: pointer;
    text-decoration: underline;

    &:hover,
    &:active {
      color: ${Colors.sbGreen};
      text-decoration: underline;
      color: ${Colors.sbGreen};
    }
  }
`;

const Wrapper = styled(Space)`
  width: 100%;

  span {
    color: rgba(33, 33, 33, 1);
  }

  ._guide {
    span {
      color: rgba(66, 66, 66, 1);
    }
    ._icon {
      color: ${Colors.sbGreen};
    }
  }
`;

const Header = styled(Paragraph)`
  color: ${Colors.sbGreen};
  text-transform: uppercase;
  font-weight: 500;
  align-self: center;
`;
