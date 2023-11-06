import {
  CheckCircleFilled,
  SwapOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Avatar, Divider, Input, Select, Space, Switch, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { TRANSFER } from "redux/actionTypes";
import { getPromo } from "redux/actions/actions";
import { updateCorrespondingExchangeRate } from "redux/actions/actionsTransfer";
import { paths } from "util/paths";
import LargeButton, {
  PageTitileAndDescription,
  TransactionsSteps,
} from "../../utils/ReusablePageContent";
import { formatAmount, getFlagURL } from "../../utils/reuseableUtils";
import { Colors } from "../../utils/stylesVariables";
import { userAppValues } from "../../utils/useAppValues";
import {
  getTransactionQuoteRequest,
  isWithinPaymentLimit,
} from "./GetQuoteHelper";
import {
  CalculatorInputStyles,
  CalculatorTabStyles,
  ExchangeCalculatorStyles,
  GetPromoStyles,
  GetQuoteContainerStyle,
  PayoutInclusiveStyles,
} from "./GetQuoteStyles";

const { Option } = Select;

export default function GetQuote() {
  const history = useHistory();
  const transfer = useSelector((state: any) => state.transfer);
  const { payinActualValue } = transfer;

  const onContinueClicked = () => {
    const navigateToRecipients = (id: string) => {
      history.push(paths.RECIPIENT, { transferId: id });
    };
    getTransactionQuoteRequest(navigateToRecipients);
  };

  return (
    <GetQuoteContainerStyle>
      <TransactionsSteps step="get-quote" />
      <PageTitileAndDescription
        title="Get quote"
        description="How much would you like to send to your recipient?😉"
      />
      <ExchangeCalculator />
      <LargeButton
        text="Continue"
        onClick={onContinueClicked}
        disabled={isWithinPaymentLimit(transfer) !== ""} // enable when there's no error message
      />
    </GetQuoteContainerStyle>
  );
}

export const ExchangeCalculator = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const {
    exchangeRate,
    payoutCurrency,
    payinCurrency,
    allowOperatorFee,
    payinActualValue,
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
    <ExchangeCalculatorStyles>
      <CalculatorTabStyles>
        {/* {tab} */}
        <>
          <CalculatorInput inputType="payin" />

          <div className="rate_and_icon">
            <Space align="center" split>
              <span>{`1 ${payinCurrency} = ${exchangeRate.toFixed(
                2
              )} ${payoutCurrency}`}</span>
              <Avatar
                icon={
                  <SwapOutlined rev={undefined} style={{ rotate: "-90deg" }} />
                }
                style={{ background: Colors.sbGreen }}
              />
            </Space>
          </div>
          <CalculatorInput inputType="payout" />
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

const PromoInput = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const { payinCurrency } = transfer;
  const [timer, setTimer] = React.useState<NodeJS.Timeout | null>(null);
  const [promoInputValue, setPromoInputValue] = useState("");
  const [isPromoValid, setIsPromoValid] = useState(false);
  const [promoErr, setPromoErr] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  //clear the timer when the component unmounts
  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const validatePromo = (promo: any) => {
    const isValid = Boolean(promo?.id);
    //update promo exchnage rate
    if (isValid) {
      if (promo?.settings?.baseCurrency !== undefined) {
        setPromoSuccess(
          `1 ${payinCurrency} = ${promo.settings.rate} ${payinCurrency}`
        );
      } else {
        setPromoSuccess(
          `Spend between: ${promo.settings.minimumSpend} ${payinCurrency} and ${promo.settings.maximumSpend} ${payinCurrency}`
        );
      }
    } else {
      setPromoErr(promo);
    }

    setIsPromoValid(isValid);
  };

  const handlePromoInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const promoValue = e.target.value;
    setPromoInputValue(promoValue);

    // Clear the existing timer (if any)
    if (timer) {
      clearTimeout(timer);
    }

    const newTimer = setTimeout(async () => {
      //update promo to redux store
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          promoCode: promoValue,
        },
      });

      await getPromo(promoValue, validatePromo);
    }, 400);
    setTimer(newTimer);
  };

  const isPromoInputAndValid = promoInputValue !== "" && isPromoValid;
  const promoInputNotEmpty = promoInputValue !== "";

  return (
    <GetPromoStyles $validPromo={isPromoInputAndValid}>
      <span>Got a promo code?🎁</span>
      <Input
        placeholder="Get discount..."
        type="text"
        size="large"
        value={promoInputValue || ""}
        suffix={
          promoInputNotEmpty ? (
            isPromoInputAndValid ? (
              <CheckCircleFilled rev={undefined} className="icon" />
            ) : (
              <WarningFilled rev={undefined} className="icon" />
            )
          ) : (
            <></>
          )
        }
        onChange={handlePromoInputChange}
      />
      <p>
        {promoInputNotEmpty
          ? isPromoInputAndValid
            ? promoSuccess.toString()
            : promoErr.toString()
          : ""}
      </p>
    </GetPromoStyles>
  );
};

const CalculatorInput = ({ inputType }: { inputType: "payin" | "payout" }) => {
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
    if (exchangeRate === 0) {
      updateCorrespondingExchangeRate(payinCurrency, payoutCurrency);
    }
  }, [payinCurrency, payoutCurrency]);

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
      <Input
        addonBefore={isPayin ? "You send" : "They get"}
        addonAfter={SelectAfter("XAF", payinCurrency, isPayin)}
        placeholder="0.00"
        size="large"
        status={errorMessage != "" ? "error" : ""}
        onChange={handleOnInputChange}
        value={
          isPayin
            ? formatAmount(payinActualValue)
            : formatAmount(payoutActualValue)
        }
      />
      <span className="error_message">{errorMessage}</span>
    </CalculatorInputStyles>
  );
};

const SelectAfter = (
  defaultValue: string,
  payInCurrency: string,
  isPayin: boolean
) => {
  const transfer = useSelector((state: any) => state.transfer);
  const { payinActualValue } = transfer;
  const dispatch = useDispatch();
  const { PayoutCountries, PayinCountries } = userAppValues();
  const PayInCountryData = PayinCountries.find(
    (country) => country.currency === payInCurrency
  );

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
    <Tooltip title={`${PayInCountryData.name}`}>
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
    </Tooltip>
  ) : (
    <Select defaultValue={defaultValue} onChange={handlePayOutCountryChange}>
      {PayoutCountries.map((country, index) => (
        <Option value={country.currency} key={country.name + index}>
          <Tooltip title={`${country.name}`}>
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
          </Tooltip>
        </Option>
      ))}
    </Select>
  );
};
