import React from 'react'
import { asset } from '../../../util/util';
import styled from 'styled-components';

const Img = styled.img`
    width: 40px;
    height: 40px;
    display: inline!important;
    position: relative;
    float: right;
    vertical-align: middle;
`

const ButtonLoader = () => {
    return (
        <Img src={asset('icons', 'ripple-loader.svg')} alt=""/>
    )
}

export default ButtonLoader;
