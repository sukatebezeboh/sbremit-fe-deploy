import {
  BankOutlined,
  DollarOutlined,
  MobileOutlined,
} from "@ant-design/icons";
import { Radio, RadioChangeEvent } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { paths } from "util/paths";
import LargeButton, {
  PageTitileAndDescription,
} from "../../utils/ReusablePageContent";
import {
  SbchrgesStyles,
  TransferMethodContainerStyles,
  TransferMethodsStyles,
} from "./TransferMethodStyles";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";

const cashPickUpLogo = "/assets/icons/cash-pickup.svg";

export default function TransferMethod() {
  const history = useHistory();
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const method = transfer.transferMethod;
  const [loading, setLoading] = useState(false);

  const onMethodChange = ({ target: { value } }: RadioChangeEvent) => {
    //update method to store
    dispatch({
      type: TRANSFER,
      payload: { ...transfer, transferMethod: value },
    });
    //
  };

  const startTransfer = () => {
    setLoading(true);
    history.push(paths.GET_QUOTE, { transferMethod: method });
  };

  return (
    <TransferMethodContainerStyles>
      <PageTitileAndDescription
        title="Select transfer method"
        description="How would you like your recipient to receive the money?💰"
      />
      <TransferMethodsStyles $selectedMethod={method}>
        <div className="methods">
          <Radio.Group
            onChange={onMethodChange}
            value={method}
            optionType="button"
            buttonStyle="solid"
            className="radio_group"
          >
            {Methods.map((method, index) => (
              <Radio
                className="radio"
                value={method.key}
                key={method.name + index}
              >
                <div className="radio_content">
                  {method.icon}
                  <div className="method_name_description">
                    <p>{method.name}</p>
                    <span>{method.description}</span>
                  </div>
                </div>
              </Radio>
            ))}
          </Radio.Group>
        </div>
        <SbchrgesStyles>
          SBremit charges you <span>0.00 GBP</span> for this transfer
        </SbchrgesStyles>
      </TransferMethodsStyles>
      <LargeButton
        hideBackBtn={true}
        text="Start"
        disabled={method == ""}
        onClick={startTransfer}
        loading={loading}
      />
    </TransferMethodContainerStyles>
  );
}

const Methods = [
  {
    icon: <MobileOutlined rev={undefined} />,
    name: "Mobile Money",
    description: "Mobile Money Operator Transfer Fee from 0 GBP",
    key: "mobile_money",
  },
  {
    icon: <BankOutlined rev={undefined} />,
    name: "Bank Transfer",
    description: "Bank Transfer fee from 0 GBP",
    key: "bank_transfer",
  },
  {
    icon: (
      <img
        src={cashPickUpLogo}
        alt="cash pickup"
        className="cash_pickup_icon"
      />
    ), //<DollarOutlined rev={undefined} />,
    name: "Cash Pickup",
    description: "Cash Pick-up fee from 0 GBP",
    key: "cash_pickup",
  },
];
