import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getNewQuote } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { formatCurrencyWithoutFloats } from '../../../util/util';
import ExchangeRateInputWrapper from './ExchangeRateInputWrapper';
import QuotesLayout from './layouts/QuotesLayout';



const ExchangeRateInput = (props: any) =>{

       return (
            <ExchangeRateInputWrapper {...props} LayoutComponent={QuotesLayout} />
        )
}

export default ExchangeRateInput;
