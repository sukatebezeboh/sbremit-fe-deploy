import { LoadingOutlined, SwapOutlined } from "@ant-design/icons";
import { Avatar, Divider, Space, Switch } from "antd";
import { Colors } from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { useExchangeRate } from "../GetQuoteHelper";
import {
  CalculatorTabStyles,
  ExchangeCalculatorStyles,
  PayoutInclusiveStyles,
} from "../GetQuoteStyles";
import { CalculatorInput } from "./CalculatorInput";
import { PromoInput } from "./PromoInput";

export const ExchangeCalculator = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const { PayinCountries } = userAppValues();
  const userCountryCode = user?.profile.location_country;
  const { payoutCurrency, payinCurrency, allowOperatorFee, payinActualValue } =
    transfer;

  const onSwitchChange = (checked: boolean) => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        allowOperatorFee: checked,
      },
    });
  };

  const userCountryInfo = PayinCountries.find(
    (country) =>
      country.countryCode?.toLowerCase() === userCountryCode?.toLowerCase()
  );

  const { data, isLoading: isLoadingRate } = useExchangeRate(
    payinCurrency,
    payoutCurrency,
    userCountryInfo?.currency === payinCurrency
  );

  const exhangeRate = Number(data?.rate) || 0;
  // Recalculate payout value based on the new exchange rate
  useEffect(() => {
    updatePayoutValue();
  }, [exhangeRate]);

  const updatePayoutValue = () => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        payoutActualValue: Math.round(exhangeRate * payinActualValue).toFixed(
          2
        ),
      },
    });
  };

  return (
    <ExchangeCalculatorStyles>
      <CalculatorTabStyles>
        {/* {tab} */}
        <>
          <CalculatorInput
            rate={exhangeRate}
            isRateLoading={isLoadingRate}
            inputType="payin"
          />

          <div className="rate_and_icon">
            <Space align="center" split>
              <span>{`1 ${payinCurrency} = ${exhangeRate.toFixed(
                2
              )} ${payoutCurrency}`}</span>
              <Avatar
                icon={
                  isLoadingRate ? (
                    <LoadingOutlined rev={undefined} />
                  ) : (
                    <SwapOutlined
                      rev={undefined}
                      style={{ rotate: "-90deg" }}
                    />
                  )
                }
                style={{ background: Colors.sbGreen }}
              />
            </Space>
          </div>
          <CalculatorInput
            rate={exhangeRate}
            isRateLoading={isLoadingRate}
            inputType="payout"
          />
        </>
        <Divider style={{ margin: 0 }} />
        <PayoutInclusiveStyles>
          <p>
            {" "}
            {allowOperatorFee
              ? "Inclusive of partner payout fee"
              : "Pay out fee not included"}
          </p>
          <div className="payout_inclusive">
            <span>Include operator fee</span>
            <Switch checked={allowOperatorFee} onChange={onSwitchChange} />
          </div>
        </PayoutInclusiveStyles>
        <Divider style={{ margin: 0 }} />
        <PromoInput />
      </CalculatorTabStyles>
    </ExchangeCalculatorStyles>
  );
};
