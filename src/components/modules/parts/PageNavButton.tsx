import React from 'react'
import styled from 'styled-components'

const ButtonWrapper = styled.button`
  &.yellow {
    background: #FCD20F 0% 0% no-repeat padding-box;
    color: #424242;
  }

  &.green {
    background: #007B5D 0% 0% no-repeat padding-box;
    color: #fff;
  }
    
  border-radius: 8px;
  width: 300px;
  height: 80px;
  text-align: center;
  font: normal normal normal 25px/30px Montserrat;
  border: none;
  outline: none;
  cursor: pointer;

  @media only screen and (max-width: 900px) {
    width: 100%;
    height: 40px;
    font: normal normal normal 13px/16px Montserrat;
  }
`

interface IButton {
  onClick: Function,
  label: string,
  theme?: 'yellow' | 'green'
}
const PageNavButton = ({onClick: handleClick, label, theme = "yellow"} : IButton) => {
  return (
    <ButtonWrapper className={theme} onClick={() => handleClick()}> {label} </ButtonWrapper>
  )
}

export default PageNavButton