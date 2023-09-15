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
`
const Modal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    border: 2px solid red;
    width: 100%;
    /* display: flex; */
    /* justify-content: center; */
    /* align-items: center; */
    height: 100vh;
    /* margin: 64px; */
    /* top: 50%;
    left: 50%; */
    /* transform: translate(-50%, -50%); */
    /* background-color: #FFF; */
    /* padding: 50px; */
    /* z-index: 1000; */
    .container{
        border: 5px solid black;
        height: 100%;
        overflow: auto;
    }
`

export const PaymentVerificationModal = () => {

    const portal: any = document.getElementById('portal')

  return ReactDom.createPortal(
    <>
        <Overlay />
        <Modal>
            <div className="container">
                <button onClick={() => {}}>Close Modal</button>
                <VerificationComponent/>
            </div>
        </Modal>
    </>,
    portal
  )
}