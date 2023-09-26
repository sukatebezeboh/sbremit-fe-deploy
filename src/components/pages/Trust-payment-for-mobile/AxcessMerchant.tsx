import styled from "styled-components";
import AxcssPaymentForm from "../payment-method/payment-option/AxcssPaymentForm";

import { useParams } from "react-router-dom";

const Body = styled.div`
  background: #fff;
  width: auto;
  min-width: 320px;
  max-width: 800px;
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

const CustomFlexBox = styled.div<{ $gap?: number; $direction?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${(prop) => prop.$gap + "px"};
  flex-direction: ${(prop) => prop.$direction};
`;

const Title = styled.p<{ $fontSize?: number; $bold?: boolean }>`
  font-size: ${(props) => props.$fontSize + "px" || "16px"};
  font-weight: 600px;
  line-height: auto;
  font-weight: ${(props) => (props.$bold ? "600" : "400")};
  text-align: center;
`;

export default function AxcessMerchant() {
  const params = useParams<any>();

  //get the checkoutId from params
  const checkoutID = params.checkoutID;
  const transferId = params.transferId;

  return (
    <Body>
      <CustomFlexBox $direction="column" $gap={16}>
        <CustomFlexBox $direction="row" $gap={12}>
          <Title>Pay with Card:</Title>
          <img
            alt="master-card-img"
            width={80}
            src="https://cdn4.iconfinder.com/data/icons/payment-method/160/payment_method_master_card-512.png"
          />
          <img
            alt="visa-card-img"
            width={80}
            src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/363_Visa_Credit_Card_logo-512.png"
          />
          <img
            alt="american-express-img"
            width={80}
            src="https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/16_Amex_Credit_Card_logo_logos-256.png"
          />
        </CustomFlexBox>
        <AxcssPaymentForm
          checkoutId={checkoutID}
          shopperResultUrl={`/transfer-complete/${transferId}`}
        />
        <span>
          Powered by: <strong>Axcess Merchant services</strong>
        </span>
      </CustomFlexBox>
    </Body>
  );
}
