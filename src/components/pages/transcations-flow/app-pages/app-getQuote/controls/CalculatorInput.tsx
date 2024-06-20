import { InputNumber, InputNumberProps, Select, Space } from "antd";
import {
  formatAmount,
  getFlagURL,
  transferMethodsInWords,
} from "components/pages/transcations-flow/utils/reuseableUtils";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { calculatePayAmount } from "../GetQuoteHelper";
import { CalculatorInputStyles, OperatorFeeCallout } from "../GetQuoteStyles";

const { Option } = Select;

export const CalculatorInput = ({
  inputType,
  isRateLoading,
  rate,
  isError,
  errorMessage,
  setIsPayinInputActive,
  operatorFeeCallout,
}: {
  inputType: "payin" | "payout";
  isRateLoading: boolean;
  rate: number;
  isError: boolean;
  errorMessage: string;
  operatorFeeCallout: string;
  setIsPayinInputActive: Function;
}) => {
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const {
    payinActualValue,
    payoutActualValue,
    payinCurrency,
    payoutCurrency,
    transferMethod,
  } = transfer;

  const isPayin = inputType === "payin";

  //if transferMethod is mobile_money showOperatorFeeCallout on payout else show on payin input
  const showOperatorFeeCallout =
    transferMethodsInWords[transferMethod] === "mobile_money"
      ? !isPayin
      : isPayin;

  const handleOnInputChange: InputNumberProps["onChange"] = (value) => {
    upadatePayInAndPayOut(Number(value));
  };

  const upadatePayInAndPayOut = (value: number) => {
    setIsPayinInputActive(isPayin);
    if (isPayin) {
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinActualValue: value,
          payoutActualValue: calculatePayAmount(value, rate, false),
        },
      });
    } else {
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          payinActualValue: calculatePayAmount(value, rate, true),
          payoutActualValue: value,
        },
      });
    }
  };

  return (
    <CalculatorInputStyles $error={isError}>
      <Space direction="vertical" size={8}>
        <span className="label">{isPayin ? "You send" : "They get"}</span>
        <InputNumber
          controls={false}
          className="_input"
          addonAfter={SelectAfter(payoutCurrency, payinCurrency, isPayin)}
          suffix={
            showOperatorFeeCallout &&
            payinActualValue > 0 && (
              <OperatorFeeCallout>{operatorFeeCallout}</OperatorFeeCallout>
            )
          }
          placeholder="0.00"
          size="large"
          status={isError ? "error" : ""}
          onChange={handleOnInputChange}
          disabled={isRateLoading}
          value={isPayin ? payinActualValue : payoutActualValue}
          formatter={(value) => formatAmount(String(value))}
          parser={(value) =>
            value?.replace(/\$\s?|(,*)/g, "") as unknown as number
          }
        />

        {isError && <span className="error_message">{errorMessage}</span>}
      </Space>
    </CalculatorInputStyles>
  );
};

const SelectAfter = (
  defaultValue: string,
  payInCurrency: string,
  isPayin: boolean
) => {
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const { PayoutCountries, PayinCountries } = userAppValues();
  const PayInCountryData = PayinCountries.find(
    (country) => country.currency === payInCurrency
  );

  const getEquivalentCountryCode = (value: string) => {
    const countries = PayoutCountries || {};
    return countries.find((country: any) => country.currency === value)
      ?.countryCode;
  };

  //Update toSend countryCode state value.
  useEffect(() => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        toSend: {
          ...transfer.toSend,
          countryCode: payInCurrency,
        },
      },
    });
  }, []);

  const handlePayOutCountryChange = (value: string) => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        payoutCurrency: value,
        toReceive: {
          ...transfer.toReceive,
          countryCode: getEquivalentCountryCode(value),
        },
      },
    });
  };

  return isPayin && PayInCountryData !== undefined ? (
    <Space align="center">
      <img
        src={getFlagURL(
          PayInCountryData.currency === "EUR"
            ? "EU"
            : PayInCountryData.countryCode
        )}
        alt={PayInCountryData.name}
        style={{
          width: "24px",
          height: "18px",
          marginTop: "5px",
        }}
      />
      <span>{PayInCountryData.currency}</span>
    </Space>
  ) : (
    <Select defaultValue={defaultValue} onChange={handlePayOutCountryChange}>
      {PayoutCountries.map((country, index) => (
        <Option value={country.currency} key={country.name + index}>
          <Space align="center">
            <img
              src={getFlagURL(country.countryCode)}
              alt={country.name}
              style={{
                width: "24px",
                height: "18px",
                marginTop: "5px",
              }}
            />
            <span>{country.currency}</span>
          </Space>
        </Option>
      ))}
    </Select>
  );
};
