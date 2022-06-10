import React, { useMemo } from 'react'

import styled from 'styled-components';

const Div: any = styled.div`
    .overlay {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 150vh;
        background: rgba(0, 0, 0, 0.3);
        backdrop-filter: blur(2px);
        z-index: 1;
    }

    .modal {
        box-shadow: 0px 10px 12px #CCCCCC80;
        border-radius: 15px;
        width: 45%;
        height: fit-content;
        background: #fff;
        margin: 0px auto;
        padding: 40px;
        position: fixed;
        z-index:1;
        top: 50%;
        left: 28%;
        transform: translateY(-50%);
        /* overflow-y: scroll; */
    }
@media only screen and (max-width: 900px) {
    padding:0px;
    .overlay {
        background: #fff;
    }
    .mobile-modal {
        .page-heading {
            .heading {
                z-index: 2;
            }
        }
    }
    .modal {
        width: 100%;
        left: 0%;
        top: 400px;
        padding: 0px;
        box-shadow: none;
    }
}

`
interface IModal {
    open: boolean,
    setOpen: Function,
    component: React.FC,
    memoDeps?: []
}
const Modal = ({open, setOpen, component, memoDeps}: IModal) => {

    const Component = useMemo(() => component, [component]);

  return (
    open ? <Div>
                <div className="overlay" onClick={()=>{setOpen(false)}}>
                </div>
                <div className="modal">
                   { <Component /> }
                </div>
           </Div> : <></>
  )
}

export default Modal