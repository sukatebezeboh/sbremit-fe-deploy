import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

interface PaymentFormProps {
  checkoutId: string;
  shopperResultUrl: string;
}

const AxcssPaymentForm: React.FC<PaymentFormProps> = ({
  checkoutId,
  shopperResultUrl,
}) => {
  const paymentFormContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const paymentScript = document.createElement("script");
    paymentScript.src = `https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    paymentFormContainerRef.current?.appendChild(paymentScript);
  }, []);

  return (
    <div>
      <div ref={paymentFormContainerRef}>
        <form
          action={shopperResultUrl}
          className="paymentWidgets"
          data-brands="VISA MASTER AMEX"
        ></form>
      </div>
    </div>
  );
};

export default AxcssPaymentForm;
