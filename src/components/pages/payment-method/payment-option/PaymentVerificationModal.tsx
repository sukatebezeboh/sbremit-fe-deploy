import { VerificationComponent } from 'components/pages/verification/VerificationComponent';
import React from 'react'
import ReactDom from 'react-dom'
import styled from 'styled-components';

// .overlay {
//     background: #14141430;
//     /* background-color: red; */
//     position: fixed;
//     width: 100vw;
//     height: 100vh;
//     z-index: 10;
// }
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, .7);
    /* z-index: 1000; */
    .container{
        /* border: 5px solid red; */
        height: 100%;
        overflow: auto;
        margin: 60px;
        .note{
            background-color: white;
            align-self: center;
            width: 100%;
            margin: 0px auto;
            padding: 20px;
            border-radius: 8px;
            p{
                span{
                    color: red;
                    cursor: pointer;
                }
            }
        }
        button{
            padding: 8px 16px;
            font-size: 16px;
            font-weight: bold;
        }
        button.skip{
            color: red;
        }
    }
    @media only screen and (max-width: 900px) {
        .container{
            margin: 90px 24px;
            .note{
                margin-bottom: 40px;
            }
        }
    }
`

export const PaymentVerificationModal = ({closeModal}: any) => {

  const portal: any = document.getElementById('portal')

  return ReactDom.createPortal(
    <Overlay>
        <div className="container">
            <div className="note">
                <p>Complete your identity verification now or 
                    <span onClick={() => closeModal?.()}> Continue later</span>
                </p>
            </div>
            <VerificationComponent/>
        </div>
    </Overlay>,
    portal
  )
//   return ReactDom.createPortal(
//     <>
//         <Overlay />
//         <Modal>
//             <div className="container">
//                 <button onClick={() => {}}>Skip Verification</button>
//                 <VerificationComponent/>
//             </div>
//         </Modal>
//     </>,
//     portal
//   )
}