import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { TOAST } from '../../../redux/actionTypes';
import Toast from './toast/Toast'

const ToastFactory = () => {

    const dispatch = useDispatch();
    const toastConfig = useSelector((state: any) => state.toast);

   
    return (
        (toastConfig.show ? <Toast config={toastConfig} /> : "")
    )
}

export default ToastFactory;
