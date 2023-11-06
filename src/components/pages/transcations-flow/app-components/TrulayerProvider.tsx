import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  fetchTruelayerProviders,
  getTransactionDetails,
  initiateTruelayerPayment,
} from "redux/actions/actions";
import styled from "styled-components";
import {
  Breakpoint,
  Colors,
  ResponsiveMarginTopForPagesWithSteps,
} from "../utils/stylesVariables";
import LargeButton, {
  PageTitileAndDescription,
} from "../utils/ReusablePageContent";

interface LocationState {
  transaferId: string;
}

export default function TrulayerProvider() {
  const location = useLocation();
  const transferId = (location.state as LocationState)?.transaferId;
  const [tProviders, setTProviders] = useState<any>([]);
  const [selected, setSeleceted] = useState<any>();

  useEffect(() => {
    getTransactionDetails(() => {}, transferId);
    fetchTruelayerProviders(setTProviders);
  }, []);

  const onContinueClicked = () => {
    initiateTruelayerPayment(selected, transferId);
  };

  return (
    <TrulayerProviderStyles>
      <PageTitileAndDescription
        title="Pay"
        description="How would you like to pay with Truelayer?"
      />
      <TrulayerProviderConatinerStyles>
        {tProviders.map((provider: any, index: number) => (
          <ProviderCardStyles
            $slected={selected?.provider_id === provider.provider_id}
            key={"truelayer_provider_" + index}
            onClick={() => setSeleceted(provider)}
          >
            <div className="indicator">
              <div className="dot" />
            </div>
            <img src={provider.logo_url} alt={provider.provider_id} />
            <p> {provider.display_name}</p>
          </ProviderCardStyles>
        ))}
      </TrulayerProviderConatinerStyles>
      <TrulayerProviderFooterStyles>
        <span>
          {" "}
          By continuing you are permitting TrueLayer to initiate a payment from
          your bank account. You also agree to our{" "}
          <a
            href="https://truelayer.com/enduser_tos/"
            target="_blank"
            rel="noreferrer"
          >
            End User Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="https://truelayer.com/privacy/"
            target="_blank"
            rel="noreferrer"
          >
            Privacy Policy
          </a>
        </span>
      </TrulayerProviderFooterStyles>
      <LargeButton
        text="Continue"
        hideBackBtn={true}
        onClick={onContinueClicked}
        disabled={selected === undefined}
      />
    </TrulayerProviderStyles>
  );
}

const TrulayerProviderStyles = styled(ResponsiveMarginTopForPagesWithSteps)`
  box-sizing: border-box;
  margin: 32px 0;

  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 32px;
  @media (max-width: ${Breakpoint.xl}) {
    margin: 24px 0;
    gap: 20;
  }
  @media (max-width: ${Breakpoint.sm}) {
    gap: 20px;
  }
`;

const TrulayerProviderConatinerStyles = styled.div`
  display: flex;
  padding: 28px 24px;
  width: 800px;
  min-height: 400px;
  flex-direction: row;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 24px;
  border-radius: 22px;
  border: 1px solid ${Colors.borderColor};
  background: ${Colors.bgwhite};

  @media (max-width: ${Breakpoint.xl}) {
    width: 64vw;
    gap: 18px;
  }

  @media (max-width: ${Breakpoint.md}) {
    width: 85vw;
    padding: 20px;
    border-radius: 18px;
    gap: 14px;
  }
`;

const TrulayerProviderFooterStyles = styled.div`
  width: 500px;
  @media (max-width: ${Breakpoint.xl}) {
    width: 60vw;
  }
  @media (max-width: ${Breakpoint.md}) {
    width: 80vw;
  }

  text-align: center;
  span {
    color: #333333;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    a {
      color: ${Colors.sbGreen};
      text-decoration: underline;
    }
    @media (max-width: ${Breakpoint.md}) {
      font-size: 12px;
    }
  }
`;

const ProviderCardStyles = styled.div<{ $slected: boolean }>`
  width: 200px;
  height: 149px;
  flex-shrink: 0;
  padding: 16px;

  cursor: pointer;

  position: relative;

  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  justify-content: center;

  border-radius: 18px;
  background: ${Colors.bgwhite};
  border: 1px solid
    ${(props) => (props.$slected ? Colors.sbGreen : Colors.borderColor)};
  box-shadow: 0px 4.16441px 5.32008px 0px rgba(0, 0, 0, 0.08),
    0px 11.44983px 17.86905px 0px rgba(0, 0, 0, 0.08);

  .indicator {
    position: absolute;
    width: 18px;
    height: 18px;
    border-radius: 40px;
    border: 1px solid
      ${(props) => (props.$slected ? Colors.sbGreen : Colors.borderColor2)};

    display: flex;
    align-items: center;
    justify-content: center;

    right: 0;
    top: 0;
    margin-right: 14px;
    margin-top: 14px;
    .dot {
      border-radius: 40px;
      width: 12px;
      height: 12px;
      background: ${(props) =>
        props.$slected ? Colors.sbGreen : Colors.bgwhite};
    }
  }
  img {
    width: 100px;
    height: 100px;
    margin: auto;
  }
  p {
    margin: 0;
    font-size: 14px;
    font-weight: 400;
  }
`;
