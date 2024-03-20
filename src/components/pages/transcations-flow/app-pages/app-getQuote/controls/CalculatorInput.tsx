import { Input, Select, Space, Tooltip } from "antd";
import {
  formatAmount,
  getFlagURL,
} from "components/pages/transcations-flow/utils/reuseableUtils";
import { userAppValues } from "components/pages/transcations-flow/utils/useAppValues";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { updateCorrespondingExchangeRate } from "redux/actions/actionsTransfer";
import { isWithinPaymentLimit } from "../GetQuoteHelper";
import { CalculatorInputStyles } from "../GetQuoteStyles";

const { Option } = Select;

export const CalculatorInput = ({
  inputType,
}: {
  inputType: "payin" | "payout";
}) => {
  const transfer = useSelector((state: any) => state.transfer);
  const dispatch = useDispatch();
  const {
    payinActualValue,
    payoutActualValue,
    payinCurrency,
    payoutCurrency,
    exchangeRate,
  } = transfer;
  const [errorMessage, setErrorMessage] = useState("");

  const isPayin = inputType === "payin";
  const isAmountValid = isWithinPaymentLimit(transfer);

  useEffect(() => {
    setErrorMessage(isAmountValid);
  }, [payinActualValue, payoutActualValue]);

  const handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Sanitize Input
    const value = Number(e.target.value.replace(",", ""));
    upadatePayInAndPayOut(value);
  };

  const upadatePayInAndPayOut = (value: number) => {
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
    <CalculatorInputStyles $error={errorMessage != ""}>
      <Space direction="vertical" size={8}>
        <span className="label">{isPayin ? "You send" : "They get"}</span>
        <Input
          //addonBefore={isPayin ? "You send" : "They get"}
          addonAfter={SelectAfter("XAF", payinCurrency, isPayin)}
          placeholder="0.00"
          size="large"
          status={errorMessage != "" ? "error" : ""}
          onChange={handleOnInputChange}
          disabled={exchangeRate === 0}
          value={
            isPayin
              ? formatAmount(payinActualValue)
              : formatAmount(payoutActualValue)
          }
        />
        {isPayin && <span className="error_message">{errorMessage}</span>}
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
  const { payinActualValue, payoutCurrency, exchangeRate } = transfer;
  const dispatch = useDispatch();
  const { PayoutCountries, PayinCountries } = userAppValues();
  const PayInCountryData = PayinCountries.find(
    (country) => country.currency === payInCurrency
  );

  useEffect(() => {
    //update excahnge rate onmount
    if (payInCurrency !== "") {
      isPayin && updateCorrespondingExchangeRate(payInCurrency, payoutCurrency);
    }
  }, [payInCurrency]);

  const handlePayOutCountryChange = (value: string) => {
    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        payoutCurrency: value,
      },
    });
    updateCorrespondingExchangeRate(payInCurrency, value);
  };

  return isPayin && PayInCountryData !== undefined ? (
    // <Tooltip title={`${PayInCountryData.name}`}>
    <Space align="center">
      <img
        src={getFlagURL(PayInCountryData.countryCode)}
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
    // </Tooltip>
    <Select defaultValue={defaultValue} onChange={handlePayOutCountryChange}>
      {PayoutCountries.map((country, index) => (
        <Option value={country.currency} key={country.name + index}>
          {/* <Tooltip title={`${country.name}`}> */}
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
          {/* </Tooltip> */}
        </Option>
      ))}
    </Select>
  );
};
