import React from 'react'
import styled from 'styled-components';

const Div = styled.div`
    @media only screen and (max-width: 900px) { 
        background:#007B5D;
        display: inline-block;
        width: 55px;
        height: 50px;
        text-align: center;
        padding: 0px;
        color: white;
        font-size: 46px;
        border-radius: 50%;
        font-weight: lighter;
        padding-top: 0px;
        padding-bottom: 55px;
        padding-right: 0px;
        position: fixed;
        bottom: 50px;
        right: 20px;
        z-index: 1;
    }
`

const RoundFloatingPlus = (props) => {
    const {showPlus} = props;
    return (
        <Div className={`round-plus desktop-hide ${showPlus ? '' : 'mobile-hide'}`}>
            +
        </Div>
    )
}

export default RoundFloatingPlus
