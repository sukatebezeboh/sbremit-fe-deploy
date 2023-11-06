import React, { useEffect, useRef } from "react";
import styled from "styled-components";

interface PaymentFormProps {
  checkoutId: string;
  shopperResultUrl: string;
}

const img = "assets/images/visa_master_am_card.png";

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
    <BodyStyles>
      <div className="container">
        <div className="header">
          <p>Pay with Card:</p>
          <div className="images">
            <img alt="visa mater america-express" src={img} />
          </div>
        </div>

        <div ref={paymentFormContainerRef}>
          <form
            action={shopperResultUrl}
            className="paymentWidgets"
            data-brands="VISA MASTER AMEX"
          />
        </div>

        <div className="footer">
          <p>
            ~ Powered by:{" "}
            <a
              href="https://www.axcessms.com/online-retail/"
              target="_blank"
              rel="noreferrer"
            >
              Axcess Merchant Service
            </a>
          </p>
        </div>
      </div>
    </BodyStyles>
  );
};

export default AxcssPaymentForm;

const BodyStyles = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  box-sizing: border-box;
  //width: 100%;

  .container {
    display: flex;
    //padding: 32px 24px;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    border-radius: 12px;
    //background: #ededed;
    //width: 60vw;
  }
  .header {
    display: flex;
    flex-direction: column;
    align-items: center;
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
    padding: 8px 32px;
    box-sizing: border-box;
    border-radius: 4px;
    border: 1px solid var(--Border-line, #ededed);
    background: rgba(0, 123, 93, 0.1);
  }
  .footer > p {
    color: #808080;
    font-size: 12px;
    font-weight: 400;
    line-height: 150%;
    text-align: center;
    margin: 0px;
  }
  .footer > p > a {
    color: blue;
    text-decoration: underline;
  }
`;
