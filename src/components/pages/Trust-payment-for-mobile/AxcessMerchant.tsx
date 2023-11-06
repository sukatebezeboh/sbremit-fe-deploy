import styled from "styled-components";
import AxcssPaymentForm from "../payment-method/payment-option/AxcssPaymentForm";

import { useParams } from "react-router-dom";

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

  // The design of this page is temporary and will be updated once the redesign is completed by the UI/UX team.

  return (
    <Body>
      <AxcssPaymentForm
        checkoutId={checkoutID}
        shopperResultUrl={`/auth-transfer-complete/${transferId}`}
      />
    </Body>
  );
}
