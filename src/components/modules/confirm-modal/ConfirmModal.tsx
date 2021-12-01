import React from 'react';
import styled from 'styled-components';

const Div = styled.div`
    .overlay {
        background: #14141430;
        position: fixed;
        width: 100%;
        height: 100vh;
        z-index: 1;
    }
    .confirm {
        background: #fff;
        position: fixed;
        width: 35%;
        height: 150px;
        display: block;
        left: 30%;
        margin: 250px auto;
        z-index: 2;
        padding: 20px;
        border-radius: 10px;
        box-shadow: 1px 1px 2px 5px lightgrey;
        display: grid;
        grid-template-rows: 1fr 0fr;
        .message {
            font-size: 20px;
            color: dimgrey;
        }
        .footer {
            /* display: grid; */
            /* grid-template-columns: 1fr 1fr; */
            .save {
                background: #FCD20F 0% 0% no-repeat padding-box;
                border-radius: 4px;
                width: 150px;
                height: 40px;
                text-align: center;
                font: normal normal normal 18px Montserrat;
                color: #424242;
                border: none;
                outline: none;
                float: right;
            }
            .cancel {
                background: transparent 0% 0% no-repeat padding-box;
                border-radius: 4px;
                height: 40px;
                text-align: center;
                font: normal normal normal 18px Montserrat;
                color: #424242;
                border: none;
                outline: none;
                float: right;
            }
        }
    }
`

export const ConfirmModal = (props: any) => {
    const {title, message, onSave, onCancel} = props;
    return (
        <Div>
            <div onClick={onCancel?.fn} className="overlay"></div>
            <br/>
            <div className="confirm">
                {title && <h2>{title}</h2>}
                <div className="message">{message}</div>
                <div className="footer"> 
                 <button onClick={onSave?.fn} className="save">{onSave?.label}</button> 
                <button onClick={onCancel?.fn} className="cancel">{onCancel?.label}</button>
                 </div>
            </div>
        </Div>
    )
}
