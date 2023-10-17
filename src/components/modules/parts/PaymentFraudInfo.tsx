import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Div: any = styled.div`
  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(2px);
    z-index: 1;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    box-shadow: 0px 10px 12px #cccccc80;
    border-radius: 15px;
    width: 45%;
    height: fit-content;
    background: #fff;
    margin: 0px auto;
    padding: 40px;
    position: fixed;
    z-index: 1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* overflow-y: scroll; */
    @media (max-width: 768px) {
      width: 80%;
    }

    .content {
      h2 {
        color: #1e1e1e;
        font-size: 28px;
        font-weight: 500;

        @media (max-width: 768px) {
          font-size: 24px;
        }
      }
      .list {
        ol {
          list-style-type: disc;
          li {
            padding-bottom: 10px;
            line-height: 150%;
          }
        }
      }
      button {
        border-radius: 8px;
        border: 1px solid #cf0921;
        background: #fff;
        color: #cf0921;

        display: flex;
        height: 43px;
        padding: 12px 25px;
        justify-content: center;
        align-items: center;
        cursor: pointer;

        &:hover {
          background: #cf0921;
          color: #fff;
        }
      }
    }
  }
`;

interface PaymentFraudInfoProps {
  open: boolean;
  setOpen: Function;
  transferInfo: any;
}

export const PaymentFraudInfo = ({
  open,
  setOpen,
  transferInfo,
}: PaymentFraudInfoProps) => {
  const history = useHistory();
  const handleContacUs = () => {
    history.push(`content/contact`, {
      transferId: transferInfo?.meta.transactionId,
    });
  };
  return open ? (
    <Div>
      <div
        className="overlay"
        onClick={() => {
          setOpen(false);
        }}
      />
      <div className="modal">
        <div className="content">
          <h2>Payment Verification not successful</h2>
          <div className="list">
            <ol>
              <li>Card issued country and country of residence mismatch</li>
              <li>Name on card does not match</li>
              <li>Amount paid different from amount expected</li>
              <li>Card currency mismatch</li>
            </ol>
          </div>
          <button onClick={handleContacUs}>Contact Us</button>
        </div>
      </div>
    </Div>
  ) : (
    <></>
  );
};
