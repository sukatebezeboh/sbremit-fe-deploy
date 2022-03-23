import React, {useState} from 'react'
import {useHistory} from 'react-router-dom';
import styled from 'styled-components';
import { paths } from 'util/paths';
import {NewAuthLayout, AuthButton} from '../../modules/new-auth-layout/NewAuthLayout'

const ForgetPassword = () => {
  const [selectedOption, setSelectedOption] = useState('')
  const history = useHistory();
  const onOptionSelect = () => {
    if (selectedOption === 'email'){
        history.push(paths.PASSWORD_EMAIL_RESET)
    }
    if (selectedOption === 'SMS'){
        history.push(paths.PASSWORD_SMS_RESET)
    }
  }

  return (
    <NewAuthLayout
      header='Forgot Password?'
      image="key"
      detail="Don’t worry, resetting your password is easy. Please enter the email address you registered with, you will be sent a link to reset your password."
    >
      <div>
        <OptionHolder>
          <div className='outer' onClick={() => setSelectedOption('email')}>
            <div className={selectedOption === 'email' ? 'inner' : ''} />
          </div>
          <p>Reset password via email address</p>
        </OptionHolder>
        <OptionHolder>
          <div className='outer' onClick={() => setSelectedOption('SMS')}>
            <div className={selectedOption === 'SMS' ? 'inner' : ''} />
          </div>
          <p>Reset password via SMS code</p>
        </OptionHolder>
      </div>
      <AuthButton text='Continue' onClick={onOptionSelect} />
    </NewAuthLayout>
  )
}

export default ForgetPassword;

const OptionHolder = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  /* border: 2px solid red; */
  height: 40px;
  /* input{
    border: 2px solid red;
    background-color: red;
  } */
  .outer{
    height: 25px;
    width: 25px;
    border-radius: 25px;
    margin-right: 12px;
    border: 1px solid #007b5d;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    .inner{
      height: 20px;
      width: 20px;
      border-radius: 20px;
      background-color: #007b5d;
    }
  }
  p{
    text-align: center;
    color: #424242;
    font-size: 18px;
    line-height: 26px;
  }
`;

