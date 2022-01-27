import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { TOAST } from '../../../redux/actionTypes';
import Toast from './toast/Toast'
import styled from 'styled-components'

const Div = styled.div`
    position: fixed;
    top: 0px;
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 99999;
`
const ToastFactory = () => {

    const dispatch = useDispatch();
    const toastConfig = useSelector((state: any) => state.toast.toast);
    const toastsConfigs = useSelector((state: any) => state.toast.toasts);

   
    return (
        <Div>
        {toastConfig.show ? <Toast config={toastConfig} /> : <span></span>}
        {
            toastsConfigs.map((toastConfig: any) => {
                return (toastConfig.show ? <Toast config={toastConfig} /> : <span></span>)
            })
        }
        </Div>
    )
}

export default ToastFactory;
