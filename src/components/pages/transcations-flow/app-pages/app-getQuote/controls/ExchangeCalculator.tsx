import { SwapOutlined } from "@ant-design/icons";
import { Avatar, Divider, Select, Space, Switch } from "antd";
import { Colors } from "components/pages/transcations-flow/utils/stylesVariables";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import {
  CalculatorTabStyles,
  ExchangeCalculatorStyles,
  PayoutInclusiveStyles,
} from "../GetQuoteStyles";
import { CalculatorInput } from "./CalculatorInput";
import { PromoInput } from "./PromoInput";

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