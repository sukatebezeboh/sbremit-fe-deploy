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
    paymentScript.innerHTML = `
      var wpwlOptions = {
        registrations: {
          requireCvv: false,
          hideInitialPaymentForms: true
        },
        onReady: function() {
          var createRegistrationHtml = '<div class="customLabel">Store payment details?</div><div class="customInput"><input type="checkbox" name="createRegistration" value="true" /></div>';
          $('form.wpwl-form-card').find('.wpwl-button').before(createRegistrationHtml);
        },
      };

      // onReady callback function
      function onPaymentWidgetReady() {
        if (window.wpwl) {
          window.wpwl.onReady(wpwlOptions);
        }
      }

      // Append the payment script with onload callback
      var paymentScript = document.createElement('script');
      paymentScript.src = 'https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}';
      paymentScript.onload = onPaymentWidgetReady;
      document.body.appendChild(paymentScript);
    `;

    const paymentFormContainer = paymentFormContainerRef.current;
    if (paymentFormContainer) {
      paymentFormContainer.appendChild(paymentScript);
    }

    // Cleanup function to remove the injected script when unmounting
    return () => {
      if (paymentFormContainer) {
        paymentFormContainer.removeChild(paymentScript);
      }
    };
  }, [checkoutId]);

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
