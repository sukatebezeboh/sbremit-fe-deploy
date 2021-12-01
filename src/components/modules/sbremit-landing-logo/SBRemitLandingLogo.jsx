import styled from "styled-components";

const Img = styled.img`
    position: absolute;
    top: 80px;
    left: 100px;
    width: 300px;
    height: 150px;
    @media only screen and (max-width: 1140px) { 
        top: 3px;
        left: 25px;
        width: 200px;
        height: 120px;
    }
    @media only screen and (max-width: 780px) { 
        top: 3px;
        left: 25px;
        width: 100px;
        height: 60px;
    }
`

const Logo = () => <Img src="./assets/main-logo.svg" alt="SBRemit" />


export default Logo;
