import { Button, Modal } from "antd";
import { Colors } from "components/pages/transcations-flow/utils/stylesVariables";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { updateTandC } from "redux/actions/actions";
import styled from "styled-components";

const SBlogo = `/assets/main-logo.svg`;

export default function TandCModal({ user }: { user: any }) {
  const { readTermsAndCondition } = user?.profile || {};
  const [loader, setLoader] = useState(false);
  const state = readTermsAndCondition === "0" ? true : false;
  const [showTandCmodal, setShowTandCmodal] = useState(false);

  useEffect(() => {
    setShowTandCmodal(state);
  }, [user]);

  const updateAndCloseModal = () => {
    setLoader(true);

    const resetState = () => {
      setShowTandCmodal(false);
      setLoader(false);
    };

    const update = { readTermsAndCondition: "1" };
    const updateAndMetaData = { ...user.profile, ...update };
    updateTandC(updateAndMetaData, resetState);
  };

  return (
    <Modal
      open={showTandCmodal}
      //   onCancel={handleCancel}
      width={410}
      footer={null}
      closeIcon={null}
    >
      <ModalContentStyle>
        <div className="section_1">
          <img src={SBlogo} alt="sbremit logo" />
          <p>We are committed to protecting your privacy</p>
          <span>
            We’ve updated our Terms and Privacy Policy to provide more
            transparency about the data SB Remit collects about you , how it’s
            used and the choices you have. Read more about the key updates to
            our Terms and Privacy Policy by visiting by visiting our policy
            page.{" "}
          </span>
        </div>
        <Button
          onClick={updateAndCloseModal}
          type="primary"
          size="large"
          loading={loader}
        >
          Agree & Continue
        </Button>
      </ModalContentStyle>
    </Modal>
  );
}

const ModalContentStyle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 32px 0;
  gap: 24px;
  .section_1 {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 20px;
    //margin: 32px 0;
    img {
      width: 142px;
      height: 40.924px;
      flex-shrink: 0;
    }

    p {
      color: ${Colors.textColor};
      text-align: center;
      font-size: 24px;
      font-weight: 700;
      line-height: 150%;
      letter-spacing: -1.2px;
      margin: 0;
    }
    span {
      color: ${Colors.textColor2};
      text-align: center;
      font-size: 16px;
      font-weight: 300;
      line-height: 160%;
      letter-spacing: -0.8px;
    }
  }
`;
