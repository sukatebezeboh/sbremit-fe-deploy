import React, { useState } from 'react'
import { asset, isMobileOrTablet } from '../../../util/util'
import styled from 'styled-components'

const Div = styled.div`
  display: none;
  transition: all 1s;
  padding: 10px;
  background: #ffffff6a;
  border-radius: 5px;
  box-shadow: 1px 1px 3px grey;
  width: 350px;
  position: fixed;
  bottom: 3px;
  right: 5px;
  :hover {
    background: white;
    .body {
      opacity: 1;
      height: fit-content;
      transition: all 1s;
      hr {
        border: none;
        border-bottom: 1px solid lightgray;
      }
    }
  }
  .head {
    display: grid;
    grid-template-columns: 0fr 1fr;
    grid-gap: 10px;
    img.whatsapp-icon {
      width: 50px;
    }
    .text {
      margin-top: 10px;
    }
  }
  .body {
    text-align: right;
    opacity: 0;
    height: 0px;
    transition: all 1s;
    .message-field {
      border: 1px solid lightgrey;
      display: block;
      width: 100%;
      min-height: 45px;
      border-radius: 50px;
      padding: 0px 20px;
      text-align: left;
      color: grey;
      outline: none;
      font-size: 16px;
    }
    button {
      background: darkgreen;
      color: white;
      border: none;
      padding: 7px 25px;
      border-radius: 5px;
      margin: 7px;
      cursor: pointer;
    }
  }
`

const FloatingWhatsAppWidget = () => {
  const [message, setMessage] = useState('')
  const handleWhatsAppMessageChange = (e: any) => {
    setMessage(e.target.value?.trim())
  }

  const getLink = () => {
    return `https://${
      isMobileOrTablet() ? 'api' : 'web'
    }.whatsapp.com/send?phone=${'443301334158'}&text=${message}`
  }
  return (
    <Div>
      <div className="head">
        <img
          src={asset('icons', 'whatsapp.png')}
          className="whatsapp-icon"
          alt="WhatsApp"
        />
        <div className="text">Having issues? Talk to us on WhatsApp</div>
      </div>
      <div className="body">
        <hr />
        <input
          placeholder="Type a message"
          className="message-field"
          type="text"
          onChange={handleWhatsAppMessageChange}
        />
        <a href={getLink()} target="_blank" rel="noreferrer">
          <button>Send</button>
        </a>
      </div>
    </Div>
  )
}

export default FloatingWhatsAppWidget
