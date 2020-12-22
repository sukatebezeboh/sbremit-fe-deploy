import styled from "styled-components";

const Img = styled.img`
    position: absolute;
    top: 80px;
    left: 100px;
    width: 300px;
    height: 150px;
`

const Logo = () => <Img src="./assets/main-logo.svg" alt="SBRemit" />


export default Logo;
