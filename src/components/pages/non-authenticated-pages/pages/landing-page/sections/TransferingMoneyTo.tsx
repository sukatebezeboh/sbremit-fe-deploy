import { RightOutlined } from "@ant-design/icons";
import { PageResponsiveWidth } from "components/pages/non-authenticated-pages/global-styles/styles";
import { H3 } from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import { getFlagURL } from "components/pages/transcations-flow/utils/reuseableUtils";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import styled from "styled-components";

const TransferingMoneyTo = () => {
  const { PayoutCountries } = userAppValues();
  return (
    <TransferingMoneyToStyles>
      <H3 $large>Transferring money to Africa? We remit to:</H3>
      <div className="_countries">
        {PayoutCountries.map((country, index) => (
          <CountryStyles
            key={country.name + index}
            href={`/${country.name?.toLocaleLowerCase()}`}
          >
            <img
              src={getFlagURL(country.countryCode.toUpperCase())}
              alt={country.name}
            />
            <p>{country.name}</p>
            <RightOutlined rev={undefined} />
          </CountryStyles>
        ))}
      </div>
    </TransferingMoneyToStyles>
  );
};

export default TransferingMoneyTo;

const TransferingMoneyToStyles = styled(PageResponsiveWidth).attrs({
  as: "section",
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 32px;

  @media (max-width: ${Breakpoint.xl}) {
    display: none;
  }

  h3 {
    width: 612px;
    text-align: center;
    align-self: center;
  }

  ._countries {
    display: flex;
    gap: 40px;
    align-items: center;
  }
`;

const CountryStyles = styled.a`
  display: flex;
  padding: 16px 28px;
  /* flex-direction: column; */
  align-items: center;
  justify-content: center;
  gap: 10px;
  overflow: hidden;

  border-radius: 8px;
  border: 1px solid ${Colors.sbGreen};

  color: ${Colors.sbGreen};

  p {
    color: #000;
    text-align: center;
    font-size: 28px;
    font-weight: 400;
    line-height: 100%; /* 28px */
    letter-spacing: -1.4px;
    margin: 0;
  }

  img {
    width: 44px;
    height: 44px;
    border-radius: 100px;
  }
`;
