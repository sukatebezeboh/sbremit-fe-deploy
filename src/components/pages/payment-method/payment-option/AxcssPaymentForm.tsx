import React, { useEffect, useRef } from "react";

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
    paymentScript.innerText = `
      var wpwlOptions = {
        registrations: {
          requireCvv: false,
          hideInitialPaymentForms: true
        }
      };
    `;
    //Moving forward this url should be dynamic to handle live and uat
    paymentScript.src = `https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    paymentFormContainerRef.current?.appendChild(paymentScript);
  }, []);

  return (
    <div>
      <div ref={paymentFormContainerRef}>
        <form
          action={shopperResultUrl}
          className="paymentWidgets"
          data-brands="VISA MASTER AMEX"
        />
      </div>
    </div>
  );
};

export default AxcssPaymentForm;
