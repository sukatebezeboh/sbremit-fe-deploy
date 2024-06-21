import {
  CheckCircleFilled,
  LoadingOutlined,
  WarningFilled,
} from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import {
  getPromoMessages,
  promoCalculator,
  refinePromoErrorMessage,
  useGetPromo,
} from "../GetQuoteHelper";
import { GetPromoStyles } from "../GetQuoteStyles";

export const PromoInput = () => {
  const dispatch = useDispatch();
  const transfer = useSelector((state: any) => state.transfer);
  const {
    payinCurrency,
    payinActualValue,
    payoutActualValue,
    allowOperatorFee,
  } = transfer;
  const [promoInputValue, setPromoInputValue] = useState("");
  const [promoErr, setPromoErr] = useState("");
  const [promoSuccess, setPromoSuccess] = useState("");
  const [promoData, setPromoData] = useState<any>(undefined);

  const {
    isError,
    error,
    isLoading: isLaodingPromo,
  } = useGetPromo(
    promoInputValue,
    payinCurrency,
    payinActualValue,
    promoInputValue !== "",

    (result: any) => {
      // setPromoSuccess(result?.message);
      setPromoData(result?.data);
      // setPromoErr(result?.errMessage);

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
  const externalError = refinePromoErrorMessage(
    promoError?.message,
    promoInputValue
  );

  useEffect(() => {
    if (promoInputValue === "" || isError) {
      //reset all state if isLaodingPromo
      resetPromoStates();
    }
    // setPromoErr(refinePromoErrorMessage(promoError?.message, promoInputValue));
  }, [isError, isLaodingPromo, promoInputValue]);

  useEffect(() => {
    //error and success messages/promts
    const successMessage = getPromoMessages(promoData).successMessage;
    const errMessage = getPromoMessages(promoData).errMessage;
    setPromoSuccess(successMessage);
    setPromoErr(errMessage);

    promoCalculator(promoData);
  }, [payinActualValue, payoutActualValue, allowOperatorFee, promoData]);

  const resetPromoStates = () => {
    setPromoSuccess("");
    setPromoErr("");
    setPromoData(undefined);

    dispatch({
      type: TRANSFER,
      payload: {
        ...transfer,
        promoDiscountValue: 0,
        promoType: "",
        promoRate: 0,
        promoFreeOperatorFee: false,
        promoCode: "",
      },
    });
  };

  const handlePromoInputChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const promoValue = e.target.value;
    setPromoInputValue(promoValue);
  };

  return (
    <GetPromoStyles $validPromo={isError || promoErr !== "" ? false : true}>
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
          ) : isError || promoErr !== "" ? (
            <WarningFilled rev={undefined} className="icon" />
          ) : promoSuccess ? (
            <CheckCircleFilled rev={undefined} className="icon" />
          ) : (
            <></>
          )
        }
        onChange={handlePromoInputChange}
      />
      <p>
        {isError
          ? externalError?.toString()
          : promoErr !== ""
          ? promoErr
          : promoSuccess}
      </p>
    </GetPromoStyles>
  );
};
