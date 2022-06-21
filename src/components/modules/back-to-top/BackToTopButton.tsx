import React from 'react'
import { useState, useEffect } from 'react'
import { asset } from '../../../util/util';
import styled from 'styled-components';


const Div = styled.div`
    button {
        position: fixed;
        bottom: 50px;
        right: 50px;
        border: none;
        border: 3px solid #ffffff89;
        background: #227863;
        color: white;
        font-size: 20px;
        width: 100px;
        height: 100px;
        border-radius: 50%;
        text-align: center;
        cursor: pointer;
        z-index: 2;
        box-shadow: 0px 2px 9px 10px rgba(0, 0, 0, 0.2);
    }
`

const BackToTopButton = () => {
  const [backToTopButton, setBackToTopButton] = useState(false);
  useEffect(() => {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 1000) {
            setBackToTopButton(true)
        }else {
            setBackToTopButton(false)
        }
    })
  }, [])

  const scrollUp = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    })
  }

  return (
    <Div>
        {backToTopButton && (
            <button onClick={scrollUp}>
                <img src={asset('icons', 'arrow-up.png')} alt="arrow-up" />
            </button>
        )}
    </Div>
  )
}

export default BackToTopButton