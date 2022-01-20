import React from 'react'
import { asset } from '../../../util/util';
import styled from 'styled-components';

const Div = styled.div`
    width: 100%;
    height: 150vh;
    background-color: #1a191999;
    position: fixed;
    z-index: 30;
    top: 0px;
    left: 0px;
    img {
        display: block;
        margin: 45vh auto;
        width: 50px;
        height: 50px;
    }
`

const AppLoader = (props: any) => {
    const {show} = props;
    return (
        show ? <Div>
            <img src={asset('icons', 'rolling-loader.svg')} alt="page-loader"/>
        </Div> : <></>
    )
}

export default AppLoader