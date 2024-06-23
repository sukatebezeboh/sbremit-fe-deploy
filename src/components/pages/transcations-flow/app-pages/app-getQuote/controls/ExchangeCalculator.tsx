import { LoadingOutlined, SwapOutlined } from "@ant-design/icons";
import { Avatar, Divider, Space, Switch } from "antd";
import {
  formatAmount,
  transferMethodsInWords,
} from "components/pages/transcations-flow/utils/reuseableUtils";
import { Colors } from "components/pages/transcations-flow/utils/stylesVariables";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { getServiceRate } from "redux/actions/actions";
import {
  calculatePayAmount,
  checkAmountValidation,
  getRewardsValues,
  useExchangeRate,
} from "../GetQuoteHelper";
import {
  CalculatorTabStyles,
  ExchangeCalculatorStyles,
  PayoutInclusiveStyles,
  SummaryFlexItem,
  SummaryWrapper,
} from "../GetQuoteStyles";
import { CalculatorInput } from "./CalculatorInput";
import { PromoInput } from "./PromoInput";

export const ExchangeCalculator = () => {
  const user = useSelector((state: any) => state.auth.user);
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const { PayinCountries } = userAppValues();
  const userCountryCode = user?.profile.location_country;
  const [isPayinInputActive, setIsPayinInputActive] = useState(true);
  const {
    payoutCurrency,
    payinCurrency,
    allowOperatorFee,
    payinActualValue,
    transferMethod,
    payoutActualValue,
    exchangeRate,
    promoType,
  } = transfer;

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

  // Recalculate payout value based on the new exchange rate
  useEffect(() => {
    updatePayoutValue();
  }, [exchangeRate]);

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

  // State to store the validation result
  const [calculatorInputValidator, setCalculatorInputValidator] = useState({
    errorMessage: "",
    isPayin: false,
    isError: false,
    fee: 0,
    operatorFeeCallout: "",
    transferLimitMaxOut: false,
  });

  useEffect(() => {
    // Get service rate details for the current transfer method
    const serviceRate = getServiceRate(transferMethod);
    // Function to get the validation state
    const validation = checkAmountValidation(serviceRate, isPayinInputActive);

    setCalculatorInputValidator((prev: any) => ({
      ...prev,
      errorMessage: validation.errorMessage,
      isPayin: validation.isPayin,
      isError: validation.isError,
      fee: validation.fee,
      operatorFeeCallout: validation.operatorFeeCallout,
      transferLimitMaxOut: validation.transferLimitMaxOut,
    }));
  }, [
    transferMethod,
    payinCurrency,
    payoutCurrency,
    payinActualValue,
    payoutActualValue,
    allowOperatorFee,
    exchangeRate,
    promoType,
  ]);

  return (
    <ExchangeCalculatorStyles>
      <CalculatorTabStyles>
        {/* {tab} */}
        <>
          <CalculatorInput
            rate={exchangeRate}
            isRateLoading={isLoadingRate}
            inputType="payin"
            isError={
              calculatorInputValidator.isError &&
              calculatorInputValidator.isPayin
            }
            errorMessage={calculatorInputValidator.errorMessage}
            setIsPayinInputActive={setIsPayinInputActive}
            operatorFeeCallout={calculatorInputValidator.operatorFeeCallout}
          />

          <div className="rate_and_icon">
            <Space align="center" split>
              <span>{`1 ${payinCurrency} = ${exchangeRate.toFixed(
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
            rate={exchangeRate}
            isRateLoading={isLoadingRate}
            inputType="payout"
            isError={
              calculatorInputValidator.isError &&
              !calculatorInputValidator.isPayin
            }
            errorMessage={calculatorInputValidator.errorMessage}
            setIsPayinInputActive={setIsPayinInputActive}
            operatorFeeCallout={calculatorInputValidator.operatorFeeCallout}
          />
        </>
        <Divider style={{ margin: 0 }} />
        <PayoutInclusiveStyles>
          <p>
            {" "}
            {allowOperatorFee
              ? "Inclusive of partner payout fee"
              : "Pay out fee not included"}{" "}
          </p>
          <div className="payout_inclusive">
            <span>Include operator fee</span>
            <Switch
              checked={allowOperatorFee}
              onChange={onSwitchChange}
              disabled={calculatorInputValidator.transferLimitMaxOut}
            />
          </div>
        </PayoutInclusiveStyles>

        <Divider style={{ margin: 0 }} />

        <PromoInput />

        {/* Qoute summary */}
        <QuoteSummary operatorFee={calculatorInputValidator.fee} />
      </CalculatorTabStyles>
    </ExchangeCalculatorStyles>
  );
};

const QuoteSummary = ({ operatorFee }: { operatorFee: number }) => {
  const user = useSelector((state: any) => state.auth.user);
  const transfer = useSelector((state: any) => state.transfer);
  const {
    payoutCurrency,
    payinCurrency,
    allowOperatorFee,
    payinActualValue,
    transferMethod,
    payoutActualValue,
    totalToPay,
    exchangeRate,
    promoDiscountValue,
    promoRate,
    promoType,
    promoFreeOperatorFee,
    totalToSend,
  } = transfer;

  const rewards = getRewardsValues(user);
  const fee = promoFreeOperatorFee ? 0 : operatorFee;

  const isMobileMoneyTransfer =
    transferMethodsInWords[transferMethod] === "mobile_money";

  return (
    <SummaryWrapper>
      <SummaryFlexItem
        $isStrikethrough={
          (isMobileMoneyTransfer && !allowOperatorFee) || promoFreeOperatorFee
        }
      >
        <p>Operator fee</p>
        <p>
          {" "}
          +{formatAmount(String(operatorFee))} {payinCurrency}
        </p>
      </SummaryFlexItem>

      {promoDiscountValue > 0 &&
        (promoType === "FIXED_RATE" ? (
          <SummaryFlexItem>
            <p>Promo discount rate</p>
            <p>{`1 ${payinCurrency} = ${promoRate} ${payoutCurrency}`}</p>
          </SummaryFlexItem>
        ) : (
          <SummaryFlexItem>
            <p>Promo discount</p>
            <p>
              -{promoDiscountValue} {payinCurrency}
            </p>
          </SummaryFlexItem>
        ))}
      {rewards.active && (
        <SummaryFlexItem>
          <p>{rewards.type} discount</p>
          <p>
            -{rewards.bonus} {payinCurrency}
          </p>
        </SummaryFlexItem>
      )}
      <SummaryFlexItem>
        <p>They get</p>
        {/* if isMobileMoneyTransfer update and add the fee payout conversion else not applicable for other methods */}
        <p>
          {isMobileMoneyTransfer && !allowOperatorFee
            ? `${formatAmount(totalToSend)} ${payoutCurrency}`
            : `${formatAmount(
                totalToSend +
                  (isMobileMoneyTransfer
                    ? Number(calculatePayAmount(fee, exchangeRate, false))
                    : 0)
              )} ${payoutCurrency} `}
        </p>
      </SummaryFlexItem>
      <Divider style={{ margin: 0 }} />
      <SummaryFlexItem>
        <p>Total to pay</p>
        <p>
          {totalToPay < 0 ? 0 : formatAmount(totalToPay)} {payinCurrency}
        </p>
      </SummaryFlexItem>
    </SummaryWrapper>
  );
};
