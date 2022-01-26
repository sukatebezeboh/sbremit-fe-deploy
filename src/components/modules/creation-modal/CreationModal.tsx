import React from 'react'
import { Redirect } from 'react-router-dom'
import styled from 'styled-components'
import { asset } from '../../../util/util'

const Div = styled.div`
  .overlay {
    background: #14141430;
    position: fixed;
    width: 100%;
    height: 100vh;
    z-index: 1;
  }
  .confirm {
    background: #fff;
    position: fixed;
    width: 50%;
    height: auto;
    display: block;
    left: 20%;
    margin: 150px auto;
    z-index: 2;
    padding: 50px;
    border-radius: 10px;
    box-shadow: 0px 10px 12px #cccccc80;
    display: grid;
    grid-template-rows: 1fr 0fr;
    text-align: center;
    .modal-icon {
      img {
        width: 60px;
        height: 60px;
      }
    }
    .title {
      margin-top: 30px;
      h2 {
        font-size: 20px;
      }
    }
    .message {
      font-size: 16px;
      color: #424242;
    }
    .footer {
      margin-top: 30px;
      .save {
        background: #fcd20f 0% 0% no-repeat padding-box;
        border-radius: 4px;
        width: 200px;
        height: 50px;
        text-align: center;
        font: normal normal normal 18px Montserrat;
        color: #424242;
        border: none;
        outline: none;
        font-size: 15px;
      }
    }
  }
`

export const CreationModal = (props: any) => {
  const {
    title,
    callToAction,
    message1,
    message2,
    buttonText,
    redirect,
    setRedirect,
    setModalState,
    redirectLink,
  } = props

  if (redirect) {
    setModalState(false)
    return <Redirect to={redirectLink} />
  }
  return (
    <Div>
      <div className="overlay"></div>
      <div className="confirm">
        <div className="modal-icon">
          <img
            src={
              callToAction === 'success'
                ? asset('icons', 'checked.png')
                : asset('icons', 'cancel.svg')
            }
            alt="checked"
          />
        </div>
        <div className="title">{title && <h2>{title}</h2>}</div>
        <div className="message">
          <div className="paragraph-1">{message1}</div>
          <div className="paragraph-2">
            <p>{message2}</p>
          </div>
        </div>
        <div className="footer">
          <button
            className="save"
            onClick={() => {
              callToAction === 'success'
                ? setRedirect(true)
                : setModalState(false)
            }}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </Div>
  )
}
