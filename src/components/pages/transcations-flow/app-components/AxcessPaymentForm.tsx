import { useEffect, useRef } from "react";
import { useParams, useLocation } from "react-router-dom";
import styled from "styled-components";
import { Breakpoint, Colors } from "../utils/stylesVariables";
import { PageTitileAndDescription } from "../utils/ReusablePageContent";

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
        shopperResultUrl={`/transfer-completed/${transferId}`}
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
    //Create and inject the payment script
    const paymentScript = document.createElement("script");
    paymentScript.innerText = `
      var wpwlOptions = {
      style: "plain",
        registrations: {
          requireCvv: false,
          hideInitialPaymentForms: true
        }
      };
    `;
    //Moving forward this url should be dynamic to handle live and uat
    //test: https://eu-test.oppwa.com/v1/paymentWidgets.js?checkoutId={checkoutId}
    paymentScript.src = `https://eu-prod.oppwa.com/v1/paymentWidgets.js?checkoutId=${checkoutId}`;
    paymentFormContainerRef.current?.appendChild(paymentScript);
  }, []);

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
  height: 80vh;
  box-sizing: border-box;
  //width: 100%;

  .container {
    display: flex;
    //padding: 32px 24px;
    flex-direction: column;
    align-items: center;
    gap: 32px;
    border-radius: 12px;
    //background: #ededed;
    //width: 60vw;
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
