import { LoadingOutlined } from "@ant-design/icons";
import { Input, Select, Space } from "antd";
import { getCountryColor } from "components/pages/non-authenticated-pages/global-styles/styles";
import { Paragraph } from "components/pages/non-authenticated-pages/global-styles/typogarphy";
import { useExchangeRate } from "components/pages/transcations-flow/app-pages/app-getQuote/GetQuoteHelper";
import {
  formatAmount,
  getFlagURL,
} from "components/pages/transcations-flow/utils/reuseableUtils";
import {
  Breakpoint,
  Colors,
} from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { TRANSFER } from "redux/actionTypes";
import styled from "styled-components";
import { paths } from "util/paths";
import { getAllUniqueCurrencies } from "./HeroHelper";

const { Option } = Select;

const HeroCalculator = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const transfer = useSelector((state: any) => state.transfer);
  const {
    payinActualValue,
    exchangeRate,
    payinCurrency,
    payoutCurrency,
    activeCountryColor,
  } = transfer;
  useEffect(() => {
    updatePayoutValue();
  }, [exchangeRate]);

  // Recalculate payout value based on the new exchange rate
  const updatePayoutValue = () => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        payoutActualValue: Math.round(exchangeRate * payinActualValue).toFixed(
          2
        ),
      },
    });
  };

  return (
    <HeroCalculatorStyles $activeColor={activeCountryColor}>
      <div className="_content">
        <div className="_inputs">
          <CalculatorInput type="payin" />
          <CalculatorInput type="payout" />
        </div>
        <div className="_infos">
          <HeroPaymentMethod />
          <ExchangeRateStyles>
            <Paragraph $small>Exchange Rate</Paragraph>
            <Paragraph $small>
              1 {payinCurrency} = {exchangeRate.toFixed(2)} {payoutCurrency}
            </Paragraph>
          </ExchangeRateStyles>
          <OperatorFeeStyles>
            <Paragraph $small>Operator Fee</Paragraph>
            <Paragraph $small>+2 {payinCurrency}</Paragraph>
          </OperatorFeeStyles>
          <TotalAmountStyles $activeColor={activeCountryColor}>
            <Paragraph $small>Total</Paragraph>
            <Paragraph $small>
              {payinActualValue ? formatAmount(payinActualValue + 2) : 0}{" "}
              {payinCurrency}
            </Paragraph>
          </TotalAmountStyles>
        </div>
      </div>

      <button type="button" onClick={() => history.push(paths.GET_QUOTE)}>
        <Paragraph $small>Start Sending Money</Paragraph>
      </button>
    </HeroCalculatorStyles>
  );
};

export default HeroCalculator;

const CalculatorInput = ({ type }: { type: "payin" | "payout" }) => {
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const { PayoutCountries, PayinCountries } = userAppValues();
  const {
    payinActualValue,
    payoutActualValue,

    payinCurrency,
    payoutCurrency,
    activeCountryColor,
  } = transfer;
  const isPayin = type === "payin";

  const countries = isPayin
    ? getAllUniqueCurrencies(PayinCountries)
    : PayoutCountries;
  const defaultCountry = isPayin ? payinCurrency : payoutCurrency;

  const { data, isLoading: isLoadingRate } = useExchangeRate(
    payinCurrency,
    payoutCurrency,
    true
  );

  const exchangeRate = Number(data?.rate) || 0;

  //update exchange rage to store
  useEffect(() => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        exchangeRate: exchangeRate,
      },
    });
  }, [exchangeRate]);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/,/g, ""));
    if (isPayin) {
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinActualValue: value,
          payoutActualValue: Math.round(value * exchangeRate),
        },
      });
    } else {
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinActualValue: (value / exchangeRate).toFixed(2),
          payoutActualValue: value,
        },
      });
    }
  };

  return (
    <CalculatorInputStyles $activeColor={activeCountryColor}>
      <Input
        placeholder="0.00"
        disabled={isLoadingRate}
        value={
          isPayin
            ? formatAmount(payinActualValue)
            : formatAmount(payoutActualValue)
        }
        addonAfter={ContrySelector(
          countries,
          defaultCountry,
          isPayin,
          isLoadingRate
        )}
        onChange={handleOnInputChange}
      />
      <span className="_label">{isPayin ? "You send" : "You receive"}</span>
    </CalculatorInputStyles>
  );
};

const ContrySelector = (
  countries: any,
  defaultCountry: string,
  isPayin: boolean,
  loading: boolean
) => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const { activeCountryColor, payoutCurrency } = transfer || {};
  const apploader = useSelector((state: any) => state.loading);

  const handleCountryChange = (value: string) => {
    const activeCurrencyColor = getCountryColor(value);
    if (isPayin) {
      return dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinCurrency: value,
        },
      });
    } else {
      return dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payoutCurrency: value,
          activeCountryColor: activeCurrencyColor,
        },
      });
    }
  };

  return (
    <ContrySelectorStyles $activeColor={activeCountryColor}>
      {loading ? (
        <LoadingOutlined rev={undefined} className="_loading_icon" />
      ) : (
        <Select
          className="_select"
          defaultValue={defaultCountry}
          onChange={handleCountryChange}
        >
          {countries?.map((country: any, index: number) => (
            <Option value={country.currency} key={country.name + index}>
              <Space align="center">
                <CountryFlag
                  src={getFlagURL(country.countryCode)}
                  alt={country.name}
                />
                <span>{country.currency}</span>
              </Space>
            </Option>
          ))}
        </Select>
      )}
    </ContrySelectorStyles>
  );
};

const HeroPaymentMethod = () => {
  const methods = [
    { labal: "Mobile Money", value: "mobile_money" },
    { labal: "Bank Transfer", value: "bank_transfer" },
    { labal: "Cash Pickup", value: "cash_pickup" },
  ];

  return (
    <HeroPaymentMethodStyles>
      <Paragraph $small>Delivery Options</Paragraph>
      <Select defaultValue="mobile_money" size="large">
        {methods.map((method, index) => (
          <Option value={method.value} key={"hero_" + method + index}>
            {method.labal}
          </Option>
        ))}
      </Select>
    </HeroPaymentMethodStyles>
  );
};

const HeroCalculatorStyles = styled.div<{ $activeColor?: string }>`
  width: 650px;
  height: 100%;
  flex-shrink: 0;

  @media (max-width: 1440px) {
    width: 550px;
  }

  @media (max-width: ${Breakpoint.xl}) {
    width: 44%;
    height: 550px;
    gap: 8px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 100%;
    height: auto;
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 100%;
  }

  overflow: hidden;

  border-radius: 16px;
  border: 0.7px solid ${(props) => props.$activeColor};
  background: #fff;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  /* gap: 34px; */

  ._content {
    padding: 36px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;

    @media (max-width: ${Breakpoint.xl}) {
      padding: 28px;
      padding-bottom: 8px;
    }

    @media (max-width: ${Breakpoint.md}) {
      padding: 24px;
    }

    @media (max-width: ${Breakpoint.sm}) {
      padding: 20px;
    }

    ._inputs {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    ._infos {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  }

  button {
    color: #fff;
    /* font-size: 24px; */
    font-weight: 400;
    letter-spacing: -1.2px;
    border: none;
    outline: none;
    display: flex;
    width: 100%;
    padding: 26px;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.$activeColor};

    @media (max-width: ${Breakpoint.xl}) {
      padding: 24px;
    }

    @media (max-width: ${Breakpoint.sm}) {
      padding: 20px;
    }

    &:hover {
      cursor: pointer;
      opacity: 0.85;
    }
  }
`;

const ContrySelectorStyles = styled.div<{ $activeColor: string }>`
  height: 120px;
  width: 160px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: ${Breakpoint.xl}) {
    width: 140px;
    height: 100px;
  }

  @media (max-width: ${Breakpoint.sm}) {
    width: 110px;
  }

  ._loading_icon {
    color: #fff;
    font-size: 32px;
  }

  ._select {
    height: 60px;
    width: 160px;
    background: ${(props) => props.$activeColor};
    border: 0.7px solid ${(props) => props.$activeColor};

    @media (max-width: ${Breakpoint.xl}) {
      width: 140px;
    }
    @media (max-width: ${Breakpoint.sm}) {
      width: 110px;
    }
    .ant-select-arrow {
      font-size: 16px;
      font-weight: 700;
      color: #fff;
      margin-right: 8px;

      @media (max-width: ${Breakpoint.sm}) {
        font-size: 14px;
        margin-right: 2px;
      }
    }

    .ant-select-selector,
    .ant-select-focused {
      font-size: 24px;
      font-weight: 700;
      color: #fff !important;

      @media (max-width: ${Breakpoint.xl}) {
        font-size: 20px;
      }

      @media (max-width: ${Breakpoint.sm}) {
        font-size: 16px;
      }

      &:focus,
      &:active,
      &:hover {
        color: #fff !important;
      }
    }
  }
`;

const CalculatorInputStyles = styled.div<{ $activeColor: string }>`
  height: auto;
  flex-shrink: 0;

  border-radius: 8px;
  border: 0.7px solid ${(props) => props.$activeColor};
  background: #fff;

  display: flex;
  align-items: center;
  justify-content: center;

  position: relative;

  Input {
    border: none;
    outline: none;
    height: 120px;
    background: none;

    font-size: 36px;
    font-weight: 700;

    padding-left: 30px;

    @media (max-width: ${Breakpoint.xl}) {
      font-size: 32px;
      padding-left: 20px;
      height: 100px;
    }

    @media (max-width: ${Breakpoint.sm}) {
      font-size: 26px;
    }
  }

  .ant-input-group-addon:last-child {
    background-color: ${(props) => props.$activeColor} !important;
    padding: 0;
  }
  ._label {
    position: absolute;
    left: 0;
    top: 0;
    margin-left: 30px;
    margin-top: 12px;

    color: ${Colors.textColor3};
    font-size: 18px;
    font-style: normal;
    font-weight: 400;

    @media (max-width: ${Breakpoint.xl}) {
      font-size: 16px;
      margin-left: 20px;
    }
  }
`;

const CountryFlag = styled.img`
  width: 28px;
  height: 28px;
  border-radius: 50px;
  margin-top: 7px;

  @media (max-width: ${Breakpoint.xl}) {
    margin-top: 5px;
    width: 24px;
    height: 24px;
  }
`;

const HeroPaymentMethodStyles = styled.div`
  color: ${Colors.textColor3};
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ExchangeRateStyles = styled(HeroPaymentMethodStyles)`
  p:last-child {
    font-weight: 600;
  }
`;

const OperatorFeeStyles = styled(HeroPaymentMethodStyles)`
  p:last-child {
    font-weight: 600;
  }
`;

const TotalAmountStyles = styled(HeroPaymentMethodStyles)<{
  $activeColor: string;
}>`
  color: ${(props) => props.$activeColor};
  p {
    font-weight: 600;
  }
`;
