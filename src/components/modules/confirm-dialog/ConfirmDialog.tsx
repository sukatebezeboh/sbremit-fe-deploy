import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CONFIRM } from '../../../redux/actionTypes';

const Dialog = styled.div`
    position: absolute;
    top: 300px;
    left: 40%;
    width: 25%;
    background: #fff;
    box-shadow: 1px 2px 50px 3px #ccc;
    padding: 20px 15px;
    border-radius: 10px;
    z-index: 3;
    .field-input {
        width: 100%;
        word-break: break-word;
        min-height: 40px;
    }
    div {
        p {
            color: #5e5d5d;
        }
    }
    hr {
        border: none;
        border-top: 1px solid lightgrey;
    }
    .buttons {
        float: right;
        button {
            padding: 7px 20px;
            margin-left: 10px;
            color: #fff;
            border: none;
            border-radius: 2px;
            cursor: pointer;
            :hover {
                box-shadow: 1px 2px 4px #ccc;
            }
        }
        button.confirm {
            background: #397c5d;
        }

        button.cancel {
            background: grey;
        }
    }
`
export const ConfirmDialog = () => {
    const confirmState = useSelector((state: any) => state.confirmDialog);
    const [fieldValue, setFieldValue] = useState("")
    const dispatch = useDispatch()
    const closeDialog = () => {
        dispatch({type: CONFIRM, payload: {...confirmState, open: false}})
    }
    return (
        <Dialog>
            <div>
                <p>{confirmState.message}</p>
            </div>
            {confirmState.field && <div>
                <h3>{confirmState.field.title}</h3>
                <input className='field-input' type={confirmState.field.type || 'text'} placeholder={confirmState.field.placeholder || 'Extra details here'} required={confirmState.field.required} onChange={(e) => setFieldValue(e.target.value)} />
            </div>}
            <hr/>
            <div className="buttons">
                <button className="cancel" onClick={() => closeDialog()} >Cancel</button>
                <button className={`confirm ${confirmState.isPositive === true ? " green-bg" : confirmState.isPositive === false ? " red-bg" : "yellow-bg" }`} onClick={() => { confirmState.field ? confirmState.callback(fieldValue) : confirmState.callback(); closeDialog()}}>Confirm</button>
            </div>
        </Dialog>
    )
}
