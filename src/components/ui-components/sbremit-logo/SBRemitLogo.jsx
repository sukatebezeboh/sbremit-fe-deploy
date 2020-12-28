import React from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom';

const Img = styled.img`
        width: 214px;
        height: 50px;
        position: absolute;
        top: 30px;
        left: 100px;
        z-index: 3;
    @media only screen and (max-width: 780px) { 
        top: 24px;
        left: 20px;
        width: 99px;
    }
`

const SBRemitLogo = () => <Link to="/"> <Img src="./assets/main-logo.svg" alt=""/> </Link>

export default SBRemitLogo;
