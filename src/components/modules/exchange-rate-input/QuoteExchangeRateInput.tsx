import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { getNewQuote } from '../../../redux/actions/actions';
import { TRANSFER } from '../../../redux/actionTypes';
import { formatCurrencyWithoutFloats } from '../../../util/util';
import ExchangeRateInputWrapper from './ExchangeRateInputWrapper';
import LandingPageLayout from './layouts/LandingPageLayout';
import QuotesLayout from './layouts/QuotesLayout';



const QuoteExchangeRateInput = (props: any) =>{

       return (
            <ExchangeRateInputWrapper {...props} LayoutComponent={LandingPageLayout} />
        )
}

export default QuoteExchangeRateInput;
