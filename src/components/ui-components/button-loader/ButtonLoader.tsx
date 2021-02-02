import React from 'react'
import { asset } from '../../../util/util';
import styled from 'styled-components';

const Img = styled.img`
    width: 50px;
    height: 50px;
`

const ButtonLoader = () => {
    return (
        <Img src={asset('icons', 'ripple-loader.svg')} alt=""/>
    )
}

export default ButtonLoader;
