import { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Breakpoint, Colors } from "../utils/stylesVariables";
import { PageTitileAndDescription } from "../utils/ReusablePageContent";
import _env from "env";

const Body = styled.div`
  //background: #fff;
  width: auto;
  min-width: 320px;
  width: 100%;
  height: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  padding: 32px clamp(20px, 10vw, 60px);
`;

interface LocationState {
  transaferId: string;
  checkoutId: string;
}

export default function AxcessMerchant() {
  const location = useLocation();
  const checkoutID = (location.state as LocationState)?.checkoutId;
  const transferId = (location.state as LocationState)?.transaferId;

  return (
    <Body>
      <AxcssPaymentForm
        checkoutId={checkoutID}
        shopperResultUrl={`${_env.APP_HOST}/transfer-completed/${transferId}`}
      />
    </Body>
  );
}

interface PaymentFormProps {
  checkoutId: string;
  shopperResultUrl: string;
}

const AxcssPaymentForm: React.FC<PaymentFormProps> = ({
  checkoutId,
  shopperResultUrl,
}) => {
  //Reference to the payment form container
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
      paymentScript.src = 'https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}';
      paymentScript.onload = onPaymentWidgetReady;
      document.body.appendChild(paymentScript);
    `;

    // https://eu-test.oppwa.com/v1/checkouts
    // https://eu-prod.oppwa.com/v1/checkouts
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
    <BodyStyles ref={paymentFormContainerRef}>
      <div className="container">
        <PageTitileAndDescription
          title="Pay with your Card 💳"
          description="Securely enter your card information?"
        />

        <form
          action={shopperResultUrl}
          className="paymentWidgets"
          data-brands="VISA MASTER AMEX"
        />

        <div className="footer">
          <p>
            Please note that your payment is processed securely by our trusted
            merchant partner.{" "}
            <a
              href="https://www.axcessms.com/online-retail/"
              target="_blank"
              rel="noreferrer"
            >
              Axcess Merchant Service,
            </a>{" "}
            and We do not store your card information.{" "}
          </p>
        </div>
      </div>
    </BodyStyles>
  );
};

const BodyStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  box-sizing: border-box;

  @media (max-width: ${Breakpoint.sm}) {
    overflow-x: auto;
    margin-top: 60px;
    justify-content: flex-start;
  }
  //width: 100%;

  .container {
    display: flex;
    //padding: 32px 24px;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    border-radius: 12px;
    height: fit-content;
    //background: #ededed;
    //width: 60vw;

    @media (max-width: ${Breakpoint.sm}) {
      gap: 24px;
    }
  }
  .header {
    display: flex;
    align-items: center;
    gap: 16px;
    @media (max-width: ${Breakpoint.sm}) {
      flex-direction: column;
    }
  }
  .header > p {
    color: #000;
    font-size: 18px;
    font-weight: 550;
  }
  .header > .images img {
    width: 130px;
  }
  .wpwl-group-brand {
    display: flex;
    align-items: center;
  }
  .wpwl-button-pay {
    background: #3e947f;
    color: #fff;
    border: none;
    padding: 12px 18px;
  }
  .footer {
    //margin-top: 40px;
    padding: 8px 24px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid var(--Border-line, #ededed);
    background: rgba(0, 123, 93, 0.1);
    width: 480px;
    @media (max-width: ${Breakpoint.xl}) {
      width: 50vw;
    }
    @media (max-width: ${Breakpoint.lg}) {
      width: 40vw;
    }
    @media (max-width: ${Breakpoint.md}) {
      width: 70vw;
    }
    @media (max-width: ${Breakpoint.sm}) {
      width: 100%;
      padding: 10px;
      margin-top: -15px;
    }
  }
  .footer > p {
    color: #808080;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    text-align: center;
    margin: 0px;
  }
  .footer > p > a {
    color: ${Colors.sbGreen};
    text-decoration: underline;
  }
`;
