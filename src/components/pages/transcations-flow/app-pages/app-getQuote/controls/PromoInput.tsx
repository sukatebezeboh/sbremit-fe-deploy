import {
    CheckCircleFilled,
    LoadingOutlined,
    WarningFilled,
} from "@ant-design/icons";
import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TRANSFER } from "redux/actionTypes";
import { getPromo } from "redux/actions/actions";
import { GetPromoStyles } from "../GetQuoteStyles";

export const PromoInput = () => {
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

    // Clear the existing timer and promoErr (if any)
    if (timer) {
      clearTimeout(timer);
      setPromoErr("");
      setIsPromoValid(false);
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

      promoValue !== "" && (await getPromo(promoValue, validatePromo));
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
              <>
                {promoErr === "" ? (
                  <LoadingOutlined rev={undefined} />
                ) : (
                  <WarningFilled rev={undefined} className="icon" />
                )}
              </>
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
