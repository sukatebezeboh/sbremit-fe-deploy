import {
  CheckCircleFilled,
  LoadingOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { refinePromoErrorMessage, useGetPromo } from "../GetQuoteHelper";
import { GetPromoStyles } from "../GetQuoteStyles";

export const PromoInput = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const { payinCurrency } = transfer;
  const [promoInputValue, setPromoInputValue] = useState("");
  const [promoErr, setPromoErr] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");

  const {
    isError,
    error,
    isLoading: isLaodingPromo,
  } = useGetPromo(
    promoInputValue,
    payinCurrency,
    promoInputValue !== "",
    (message: string) => {
      setPromoSuccess(message);
      dispatch({
        type: TRANSFER,
        payload: {
          ...transfer,
          promoCode: promoInputValue,
        },
      });
    }
  );
  const promoError: any = error;

  useEffect(() => {
    setPromoErr(refinePromoErrorMessage(promoError?.message, promoInputValue));
  }, [isError]);

  const handlePromoInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const promoValue = e.target.value;
    setPromoInputValue(promoValue);
  };

  return (
    <GetPromoStyles $validPromo={!isError}>
      <span>Got a promo code?🎁</span>
      <Input
        placeholder="Get discount..."
        type="text"
        size="large"
        allowClear
        value={promoInputValue || ""}
        suffix={
          isLaodingPromo ? (
            <LoadingOutlined rev={undefined} />
          ) : isError ? (
            <WarningFilled rev={undefined} className="icon" />
          ) : promoSuccess ? (
            <CheckCircleFilled rev={undefined} className="icon" />
          ) : (
            <></>
          )
        }
        onChange={handlePromoInputChange}
      />
      <p>{isError ? promoErr?.toString() : promoSuccess}</p>
    </GetPromoStyles>
  );
};
